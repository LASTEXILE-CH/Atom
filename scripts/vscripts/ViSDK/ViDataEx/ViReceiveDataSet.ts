import { ViSerialiable, ViMemoryAllocator, ViList } from "../ViSystem/ViSystemType";
import { ViDebuger } from "../ViSystem/ViDebuger";
import { ViDelegateRT2, ViDelegateRT1 } from "../ViSystem/ViDelegate";
import { ViHashMapEx, ViHashMapExAssisstant } from "../ViStruct/ViHashMapEx";
import { ViEntity } from "../ViGameCommon/Entity/ViEntity";
import { ViReceiveDataContainer, ViDataArrayOperator } from "./ViReceiveDataNode";
import { ViIStream } from "../ViSystem/ViIStream";

export abstract class ViReceiveDataSetNodeNodeWatcher<TProteKey extends ViSerialiable>
{
    public abstract OnStart(entity: ViEntity, key: TProteKey, immediate: boolean): void;
    public abstract OnUpdate(entity: ViEntity, key: TProteKey): void;
    public abstract OnEnd(entity: ViEntity, key: TProteKey, immediate: boolean): void;
    //
    public get Entity(): ViEntity { return this._entity; }
    public get Key(): TProteKey { return this._key; }
    //
    public Init(entity: ViEntity, key: TProteKey): void
    {
        this._entity = entity;
        this._key = key;
    }
    public Clear(): void
    {
        this._entity = null;
        this._key = null;
    }
    //
    private _entity: ViEntity;
    private _key: TProteKey;
}

export class ViReceiveDataSetNode<TProteKey extends ViSerialiable>
{
    public Watcher: ViReceiveDataSetNodeNodeWatcher<TProteKey>;
    public get Key(): TProteKey { return this._key; }
    //
    public Start(keyAllocator: ViMemoryAllocator<TProteKey>): void
    {
        this._key = keyAllocator.Alloc();
    }
    public End(keyAllocator: ViMemoryAllocator<TProteKey>): void
    {
        keyAllocator.Free(this._key);
        this._key = null;
    }
    //
    private _key: TProteKey;
}

export class ViReceiveDataSet<TProteKey extends ViSerialiable> extends ViReceiveDataContainer
{
    public static readonly END_SLOT = 0XFFFF;
    public static GLOBAL_NAME = "ReceiveDataSet";
    public static readonly NodeAllocator = new ViMemoryAllocator<ViReceiveDataSetNode<any>>(ViReceiveDataSetNode, "ViReceiveDataSetNode");
    //
    public WatcherAllocator: ViMemoryAllocator<ViReceiveDataSetNodeNodeWatcher<TProteKey>>;
    public get Count(): number { return this._keyList.Count; }
    public get Keys(): Array<TProteKey> { return this._keyList.Values; }
    //
    public constructor(keyAlloc: ViMemoryAllocator<TProteKey>, equals: ViDelegateRT2<boolean, TProteKey, TProteKey>, keyIdentification: ViDelegateRT1<number | string, TProteKey>)
    {
        super();
        //
        this._tempKey = new keyAlloc.AllocFunc();
        this._keyAllocator = keyAlloc;
        this._list.EqualsFunc = equals;
        this._list.KeyIdentificate = keyIdentification;
        //
        this._list.HashFunc = ViHashMapExAssisstant.GetHash(this._tempKey);
        this._list.KeyIdentificateHashFunc = ViHashMapExAssisstant.GetRawHash(this._tempKey);
    }
    //
    public Contain(key: TProteKey): boolean
    {
        return this._list.Contain(key);
    }
    //
    public ContainAsRaw(key: number | string): boolean
    {
        return this._list.ContainAsRaw(key);
    }
    //
    public Start(stream: ViIStream, entity: ViEntity): void 
    {
        this.Update_Start(stream, entity, true);
    }
    //
    public OnUpdate(stream: ViIStream, entity: ViEntity): void
    {
        let op = stream.ReadUInt8() as ViDataArrayOperator;
        switch (op)
        {
            case ViDataArrayOperator.INSERT:
                {
                    let key = this._tempKey;
                    key.ReadFrom(stream);
                    if (!this._list.Contain(key))
                    {
                        let newNode = ViReceiveDataSet.NodeAllocator.Alloc() as ViReceiveDataSetNode<TProteKey>;
                        newNode.Start(this._keyAllocator);
                        newNode.Key.CopyFrom(key);
                        this._list.Add(newNode.Key, newNode);
                        this._keyList.Push(newNode.Key);
                        this._valueList.Push(newNode);
                        this.AttachWatcher(newNode, entity, false);
                        this.OnUpdateAsynInvoke();
                    }
                    else
                    {
                        ViDebuger.Warning(ViReceiveDataSet.GLOBAL_NAME + ".INSERT at Key(" + key + ") is exist");
                    }
                }
                break;
            case ViDataArrayOperator.DEL:
                {
                    let key = this._tempKey;
                    key.ReadFrom(stream);
                    let node = this._list.Get(key);
                    if (node != undefined)
                    {
                        this._list.Del(key);
                        this._keyList.RemoveValue(node.Key);
                        this._valueList.RemoveValue(node);
                        this.OnUpdateAsynInvoke();
                        this.DetachWatcher(node, entity, false);
                        node.End(this._keyAllocator);
                        ViReceiveDataSet.NodeAllocator.Free(node);
                    }
                    else
                    {
                        ViDebuger.Warning(ViReceiveDataSet.GLOBAL_NAME + ".DEL at Key(" + key + ") is not exist");
                    }
                }
                break;
            case ViDataArrayOperator.CLEAR:
                this.Update_Clear(entity, false);
                this.OnUpdateAsynInvoke();
                break;
            case ViDataArrayOperator.RESET:
                this.Update_Clear(entity, false);
                this.Update_Start(stream, entity, false);
                this.OnUpdateAsynInvoke();
                break;
            default:
                break;
        }
    }
    //
    public End(entity: ViEntity): void
    {
        this.Update_Clear(entity, true);
        this.WatcherAllocator = null;
        this.DetachAllCallback();
    }
    //
    private static readonly CACHE_Update_Clear_RemoveList = new ViList<any>();
    private Update_Clear(entity: ViEntity, immediate: boolean): void
    {
        let removeList = ViReceiveDataSet.CACHE_Update_Clear_RemoveList;
        for (let iter = 0, list = this._valueList.Values, count = this._valueList.Count, Push = removeList.Push.bind(removeList); iter < count; ++iter)
        {
            Push(list[iter]);
        }
        this._list.Clear(true);
        this._keyList.Clear();
        this._valueList.Clear();
        //
        for (let iter = 0, count = removeList.Count, DetachWatcher = this.DetachWatcher.bind(this), Free = ViReceiveDataSet.NodeAllocator.Free.bind(ViReceiveDataSet.NodeAllocator), Get = removeList.Get.bind(removeList); iter < count; ++iter)
        {
            let iterNode = Get(iter) as ViReceiveDataSetNode<TProteKey>;
            DetachWatcher(iterNode, entity, immediate);
            iterNode.End(this._keyAllocator);
            Free(iterNode);
        }
        //
        removeList.Clear();
    }
    //
    private Update_Start(stream: ViIStream, entity: ViEntity, immediate: boolean): void
    {
        let size = stream.ReadPackedSize();
        if (size > stream.RemainLength)
        {
            ViDebuger.Warning("ReceiveDataSet.size Error");
            return;
        }
        //
        this._list.SetSlotSize(size);
        for (let iter = 0, key = this._tempKey, _keyAllocator = this._keyAllocator, Alloc = ViReceiveDataSet.NodeAllocator.Alloc.bind(ViReceiveDataSet.NodeAllocator), _list_Add = this._list.Add.bind(this._list), _keyList_Push = this._keyList.Push.bind(this._keyList), _valueList_Push = this._valueList.Push.bind(this._valueList); iter < size; ++iter)
        {
            key.ReadFrom(stream);
            let newNode = Alloc() as ViReceiveDataSetNode<TProteKey>;
            newNode.Start(_keyAllocator);
            newNode.Key.CopyFrom(key);
            _list_Add(newNode.Key, newNode);
            _keyList_Push(newNode.Key);
            _valueList_Push(newNode);
        }
        //
        for (let iter = 0, list = this._valueList.Values, count = this._valueList.Count, AttachWatcher = this.AttachWatcher.bind(this); iter < count; ++iter)
        {
            AttachWatcher(list[iter], entity, immediate);
        }
    }
    //
    public Clear(): void
    {
        ViDebuger.AssertWarning(this._list.Count == 0);
        this.WatcherAllocator = null;
        this.DetachAllCallback();
        //
        super.Clear();
    }
    //
    public UpdateWatcher(entity: ViEntity, immediate: boolean): void
    {
        for (let iter = 0, valueList = this._valueList.Values, count = this._valueList.Count, AttachWatcher = this.AttachWatcher.bind(this); iter < count; ++iter)
        {
            let iterNode = valueList[iter];
            if (iterNode.Watcher == null)
            {
                AttachWatcher(iterNode, entity, immediate);
            }
        }
    }
    //
    private AttachWatcher(node: ViReceiveDataSetNode<TProteKey>, entity: ViEntity, immediate: boolean): void
    {
        if (this.WatcherAllocator != null)
        {
            let watcher = this.WatcherAllocator.Alloc();
            node.Watcher = watcher;
            watcher.Init(entity, node.Key);
            watcher.OnStart(entity, node.Key, immediate);
        }
    }
    //
    private DetachWatcher(node: ViReceiveDataSetNode<TProteKey>, entity: ViEntity, immediate: boolean): void
    {
        if (this.WatcherAllocator != null)
        {
            node.Watcher.OnEnd(entity, node.Key, immediate);
            node.Watcher.Clear();
            this.WatcherAllocator.Free(node.Watcher);
            node.Watcher = null;
        }
    }
    //
    private readonly _tempKey: TProteKey;
    private readonly _keyAllocator: ViMemoryAllocator<TProteKey>;
    private readonly _list = new ViHashMapEx<TProteKey, ViReceiveDataSetNode<TProteKey>>();
    private readonly _keyList = new ViList<TProteKey>();
    private readonly _valueList = new ViList<ViReceiveDataSetNode<TProteKey>>();
}
