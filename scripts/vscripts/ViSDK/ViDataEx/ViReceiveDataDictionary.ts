import { ViConst } from "../ViSystem/ViSystemConfig";
import { ViSerialiable, ViMemoryAllocator, ViList } from "../ViSystem/ViSystemType";
import { ViDebuger } from "../ViSystem/ViDebuger";
import { ViDelegateRT2, ViDelegateRT1 } from "../ViSystem/ViDelegate";
import { ViHashMapEx, ViHashMapExAssisstant } from "../ViStruct/ViHashMapEx";
import { ViEntity } from "../ViGameCommon/Entity/ViEntity";
import { ViReceiveDataNode, ViReceiveDataContainer, ViDataArrayOperator } from "./ViReceiveDataNode";
import { ViIStream } from "../ViSystem/ViIStream";

export abstract class ViReceiveDataDictionaryNodeWatcher<TProteKey extends ViSerialiable, TReceiveData extends ViReceiveDataNode>
{
    public get Entity(): ViEntity { return this._entity; }
    public get Key(): TProteKey { return this._key; }
    public get Property(): TReceiveData { return this._property; }
    public get IsDirty(): boolean { return this._property == null; }
    //
    public Init(entity: ViEntity, key: TProteKey, property: TReceiveData): void
    {
        this._entity = entity;
        this._key = key;
        this._property = property;
    }
    public Clear(): void
    {
        this._entity = null;
        this._key = null;
        this._property = null;
    }
    //
    public abstract OnStart(entity: ViEntity, key: TProteKey, property: TReceiveData, immediate: boolean): void;
    public abstract OnUpdate(entity: ViEntity, key: TProteKey, property: TReceiveData): void;
    public abstract OnEnd(entity: ViEntity, key: TProteKey, property: TReceiveData, immediate: boolean): void;
    //
    private _entity: ViEntity;
    private _key: TProteKey;
    private _property: TReceiveData;
}

export class ViReceiveDataDictionaryNode<TProteKey extends ViSerialiable, TReceiveData extends ViReceiveDataNode>
{
    public Watcher: ViReceiveDataDictionaryNodeWatcher<TProteKey, TReceiveData>;
    public get Key(): TProteKey { return this._key; }
    public get Property(): TReceiveData { return this._proeperty; }
    //
    public Start(keyAllocator: ViMemoryAllocator<TProteKey>, valueAllocator: ViMemoryAllocator<TReceiveData>): void
    {
        this._key = keyAllocator.Alloc();
        this._proeperty = valueAllocator.Alloc();
    }
    //
    public End(keyAllocator: ViMemoryAllocator<TProteKey>, valueAllocator: ViMemoryAllocator<TReceiveData>): void
    {
        keyAllocator.Free(this._key);
        this._key = null;
        this._proeperty.ResisterOutList();
        valueAllocator.Free(this._proeperty);
        this._proeperty = null;
    }
    //
    private _key: TProteKey;
    private _proeperty: TReceiveData
}

export class ViReceiveDataDictionary<TProteKey extends ViSerialiable, TReceiveData extends ViReceiveDataNode, TProtoData extends ViSerialiable> extends ViReceiveDataContainer
{
    public static readonly END_SLOT = 0XFFFF;
    public static readonly GLOBAL_NAME = "ReceiveDataDictionary";
    public static readonly NodeAllocator = new ViMemoryAllocator<ViReceiveDataDictionaryNode<any, any>>(ViReceiveDataDictionaryNode, "ViReceiveDataDictionaryNode");
    //
    public WatcherAllocator: ViMemoryAllocator<ViReceiveDataDictionaryNodeWatcher<TProteKey, TReceiveData>>;
    public get Count(): number { return this._keyList.Count; }
    public get Keys(): Array<TProteKey> { return this._keyList.Values; }
    public get Values(): Array<ViReceiveDataDictionaryNode<TProteKey, TReceiveData>> { return this._valueList.Values; }
    //
    public constructor(keyAlloc: ViMemoryAllocator<TProteKey>, valueAlloc: ViMemoryAllocator<TReceiveData>, equals: ViDelegateRT2<boolean, TProteKey, TProteKey>, keyIdentification: ViDelegateRT1<number | string, TProteKey>)
    {
        super();
        //
        this._tempKey = new keyAlloc.AllocFunc();
        this._keyAllocator = keyAlloc;
        this._valueAllocator = valueAlloc;
        this._list.EqualsFunc = equals;
        this._list.KeyIdentificate = keyIdentification;
        //
        this._list.HashFunc = ViHashMapExAssisstant.GetHash(this._tempKey);
        this._list.KeyIdentificateHashFunc = ViHashMapExAssisstant.GetRawHash(this._tempKey);
    }
    //
    public GetKey2(value: TProtoData, defaultKey: TProteKey): TProteKey { return defaultKey; }
    //
    public GetKey(value: TReceiveData, defaultKey: TProteKey): TProteKey
    {
        let keyList = this._keyList.Values;
        let valueList = this._valueList.Values;
        for (let iter = 0, count = this._valueList.Count; iter < count; ++iter)
        {
            let iterNode = valueList[iter];
            if (iterNode.Property == value)
            {
                return keyList[iter];
            }
        }
        return defaultKey;
    }
    //
    public GetValue(key: TProteKey, defaultValue: TReceiveData): TReceiveData
    {
        let node = this._list.Get(key);
        if (node != undefined)
        {
            return node.Property;
        }
        else
        {
            return defaultValue;
        }
    }
    //
    public GetValueAsRaw(key: number | string, defaultValue: TReceiveData): TReceiveData
    {
        let node = this._list.GetAsRaw(key);
        if (node != undefined)
        {
            return node.Property;
        }
        else
        {
            return defaultValue;
        }
    }
    //
    public GetWatcher<TWatcher extends ViReceiveDataDictionaryNodeWatcher<TProteKey, TReceiveData>>(key: TProteKey, defaultValue: TWatcher): TWatcher
    {
        let node = this._list.Get(key);
        if (node != undefined)
        {
            return node.Watcher as TWatcher;
        }
        else
        {
            return defaultValue;
        }
    }
    //
    public GetWatcherAsRaw<TWatcher extends ViReceiveDataDictionaryNodeWatcher<TProteKey, TReceiveData>>(key: number | string, defaultValue: TWatcher): TWatcher
    {
        let node = this._list.GetAsRaw(key);
        if (node != undefined)
        {
            return node.Watcher as TWatcher;
        }
        else
        {
            return defaultValue;
        }
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
                        let newNode = ViReceiveDataDictionary.NodeAllocator.Alloc() as ViReceiveDataDictionaryNode<TProteKey, TReceiveData>;
                        newNode.Start(this._keyAllocator, this._valueAllocator);
                        newNode.Key.CopyFrom(key);
                        newNode.Property.ResisterInList();
                        newNode.Property.Start(stream, entity);
                        this._list.Add(newNode.Key, newNode);
                        this._keyList.Push(newNode.Key);
                        this._valueList.Push(newNode);
                        this.AttachWatcher(newNode, entity, false);
                        this.OnUpdateAsynInvoke();
                    }
                    else
                    {
                        ViDebuger.Warning(ViReceiveDataDictionary.GLOBAL_NAME + ".INSERT at Key(" + key + ") is exist");
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
                        node.Property.End(entity);
                        node.End(this._keyAllocator, this._valueAllocator);
                        ViReceiveDataDictionary.NodeAllocator.Free(node);
                    }
                    else
                    {
                        ViDebuger.Warning(ViReceiveDataDictionary.GLOBAL_NAME + ".DEL at Key(" + key + ") is not exist");
                    }
                }
                break;
            case ViDataArrayOperator.MOD:
                {
                    let key = this._tempKey;
                    key.ReadFrom(stream);
                    let node = this._list.Get(key);
                    if (node != undefined)
                    {
                        let END_SLOT = ViReceiveDataDictionary.END_SLOT;
                        let ReadUInt16 = stream.ReadUInt16.bind(stream);
                        let nodePropertyChildList = node.Property.ChildList;
                        let childGet = nodePropertyChildList.Get.bind(nodePropertyChildList);
                        while (stream.RemainLength > 0)
                        {
                            let slot = ReadUInt16();
                            if (slot != END_SLOT)
                            {
                                childGet(slot).OnUpdate(stream, entity);
                            }
                            else
                            {
                                break;
                            }
                        }
                        this.OnUpdateAsynInvoke();
                        if (node.Watcher != null)
                        {
                            node.Watcher.OnUpdate(entity, key, node.Property);
                        }
                    }
                    else
                    {
                        ViDebuger.Warning(ViReceiveDataDictionary.GLOBAL_NAME + ".MOD at Key(" + key + ") is not exist");
                    }
                }
                break;
            case ViDataArrayOperator.CLEAR:
                {
                    this.Update_Clear(entity, false);
                    this.OnUpdateAsynInvoke();
                }
                break;
            case ViDataArrayOperator.RESET:
                {
                    this.Update_Clear(entity, false);
                    this.Update_Start(stream, entity, false);
                    this.OnUpdateAsynInvoke();
                }
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
        let removeList = ViReceiveDataDictionary.CACHE_Update_Clear_RemoveList;
        for (let iter = 0, list = this._valueList.Values, count = this._valueList.Count, Push = removeList.Push.bind(removeList); iter < count; ++iter)
        {
            Push(list[iter]);
        }
        this._list.Clear(true);
        this._keyList.Clear();
        this._valueList.Clear();
        //
        for (let iter = 0, count = removeList.Count, _keyAllocator = this._keyAllocator, _valueAllocator = this._valueAllocator, DetachWatcher = this.DetachWatcher.bind(this), Free = ViReceiveDataDictionary.NodeAllocator.Free.bind(ViReceiveDataDictionary.NodeAllocator), Get = removeList.Get.bind(removeList); iter < count; ++iter)
        {
            let iterNode = Get(iter) as ViReceiveDataDictionaryNode<TProteKey, TReceiveData>;
            DetachWatcher(iterNode, entity, immediate);
            iterNode.Property.End(entity);
            iterNode.End(_keyAllocator, _valueAllocator);
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
            ViDebuger.Warning("ReceiveDataArray.size Error");
            return;
        }
        //
        this._list.SetSlotSize(size);
        for (let iter = 0, _keyAllocator = this._keyAllocator, _valueAllocator = this._valueAllocator, Alloc = ViReceiveDataDictionary.NodeAllocator.Alloc.bind(ViReceiveDataDictionary.NodeAllocator), _list_Add = this._list.Add.bind(this._list), _keyList_Push = this._keyList.Push.bind(this._keyList), _valueList_Push = this._valueList.Push.bind(this._valueList); iter < size; ++iter)
        {
            let key = this._tempKey;
            key.ReadFrom(stream);
            let newNode = Alloc() as ViReceiveDataDictionaryNode<TProteKey, TReceiveData>;
            newNode.Start(_keyAllocator, _valueAllocator);
            newNode.Key.CopyFrom(key);
            newNode.Property.ResisterInList();
            newNode.Property.Start(stream, entity);
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
    private AttachWatcher(node: ViReceiveDataDictionaryNode<TProteKey, TReceiveData>, entity: ViEntity, immediate: boolean): void
    {
        if (this.WatcherAllocator != null)
        {
            let watcher = this.WatcherAllocator.Alloc();
            node.Watcher = watcher;
            watcher.Init(entity, node.Key, node.Property);
            watcher.OnStart(entity, node.Key, node.Property, immediate);
        }
    }
    //
    private DetachWatcher(node: ViReceiveDataDictionaryNode<TProteKey, TReceiveData>, entity: ViEntity, immediate: boolean): void
    {
        if (this.WatcherAllocator != null)
        {
            node.Watcher.OnEnd(entity, node.Key, node.Property, immediate);
            node.Watcher.Clear();
            this.WatcherAllocator.Free(node.Watcher);
            node.Watcher = null;
        }
    }
    //
    private readonly _tempKey: TProteKey;
    private readonly _keyAllocator: ViMemoryAllocator<TProteKey>;
    private readonly _valueAllocator: ViMemoryAllocator<TReceiveData>;
    private readonly _list = new ViHashMapEx<TProteKey, ViReceiveDataDictionaryNode<TProteKey, TReceiveData>>();
    private readonly _keyList = new ViList<TProteKey>();
    private readonly _valueList = new ViList<ViReceiveDataDictionaryNode<TProteKey, TReceiveData>>();
}
