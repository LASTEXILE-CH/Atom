import { ViConst } from "../ViSystem/ViSystemConfig";
import { ViMemoryAllocator, ViList, ViSerialiable } from "../ViSystem/ViSystemType";
import { ViDebuger } from "../ViSystem/ViDebuger";
import { ViEntity } from "../ViGameCommon/Entity/ViEntity";
import { ViReceiveDataNode, ViReceiveDataContainer, ViDataArrayOperator } from "./ViReceiveDataNode";
import { ViIStream } from "../ViSystem/ViIStream";

export abstract class ViReceiveDataArrayNodeWatcher<TReceiveData extends ViReceiveDataNode>
{
    public get Entity(): ViEntity { return this._entity; }
    public get Property(): TReceiveData { return this._property; }
    public get IsDirty(): boolean { return this._property == null; }
    //
    public Init(entity: ViEntity, property: TReceiveData): void
    {
        this._entity = entity;
        this._property = property;
    }
    public Clear(): void
    {
        this._entity = null;
        this._property = null;
    }
    //
    public abstract OnStart(entity: ViEntity, property: TReceiveData, immediate: boolean): void;
    public abstract OnUpdate(entity: ViEntity, property: TReceiveData): void;
    public abstract OnEnd(entity: ViEntity, property: TReceiveData, immediate: boolean): void;
    //
    private _entity: ViEntity;
    private _property: TReceiveData;
}

export class ViReceiveDataArrayNode<TReceiveData extends ViReceiveDataNode>
{
    public Watcher: ViReceiveDataArrayNodeWatcher<TReceiveData>;
    public get Property(): TReceiveData { return this._proeperty; }
    //
    public Start(allocator: ViMemoryAllocator<TReceiveData>): void
    {
        this._proeperty = allocator.Alloc();
    }
    public End(allocator: ViMemoryAllocator<TReceiveData>): void
    {
        this._proeperty.ResisterOutList();
        allocator.Free(this._proeperty);
        this._proeperty = null;
    }
    //
    private _proeperty: TReceiveData
}

export class ViReceiveDataArray<TReceiveData extends ViReceiveDataNode, TProto extends ViSerialiable> extends ViReceiveDataContainer
{
    public static readonly END_SLOT = 0XFFFF;
    public static GLOBAL_NAME = "ReceiveDataArray";
    public static readonly NodeAllocator = new ViMemoryAllocator<ViReceiveDataArrayNode<any>>(ViReceiveDataArrayNode, "ViReceiveDataArrayNode");
    //
    public WatcherAllocator: ViMemoryAllocator<ViReceiveDataArrayNodeWatcher<TReceiveData>>;
    public readonly List = new ViList<ViReceiveDataArrayNode<TReceiveData>>();
    //
    public constructor(valueAlloc: ViMemoryAllocator<TReceiveData>)
    {
        super();
        //
        this._valueAllocator = valueAlloc;
    }
    //
    public GetIndex2(data: TProto, defaultIndex: number): number { return defaultIndex; }
    public GetIndex(data: TReceiveData, defaultIndex: number): number
    {
        for (let iter = 0, array = this.List.Values, count = this.List.Count; iter < count; ++iter)
        {
            let iterNode = array[iter];
            if (iterNode.Property == data)
            {
                return iter;
            }
        }
        return defaultIndex;
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
            case ViDataArrayOperator.ADD_BACK:
                {
                    let newNode = ViReceiveDataArray.NodeAllocator.Alloc() as ViReceiveDataArrayNode<TReceiveData>;
                    newNode.Start(this._valueAllocator);
                    newNode.Property.ResisterInList();
                    newNode.Property.Start(stream, entity);
                    this.List.Push(newNode);
                    this.AttachWatcher(newNode, entity, false);
                    this.OnUpdateAsynInvoke();
                }
                break;
            case ViDataArrayOperator.ADD_FRONT:
                {
                    let newNode = ViReceiveDataArray.NodeAllocator.Alloc() as ViReceiveDataArrayNode<TReceiveData>;
                    newNode.Start(this._valueAllocator);
                    newNode.Property.ResisterInList();
                    newNode.Property.Start(stream, entity);
                    this.List.Insert(0, newNode);
                    this.AttachWatcher(newNode, entity, false);
                    this.OnUpdateAsynInvoke();
                }
                break;
            case ViDataArrayOperator.INSERT:
                {
                    let idx = stream.ReadPackedSize();
                    if (idx <= this.List.Count)
                    {
                        let newNode = ViReceiveDataArray.NodeAllocator.Alloc() as ViReceiveDataArrayNode<TReceiveData>;
                        newNode.Start(this._valueAllocator);
                        newNode.Property.ResisterInList();
                        newNode.Property.Start(stream, entity);
                        this.List.Insert(idx, newNode);
                        this.AttachWatcher(newNode, entity, false);
                        this.OnUpdateAsynInvoke();
                    }
                    else
                    {
                        ViDebuger.Warning(ViReceiveDataArray.GLOBAL_NAME + ".INSERT at Slot(" + idx + ") > " + "Count(" + this.List.Count + ")");
                    }
                }
                break;
            case ViDataArrayOperator.DEL:
                {
                    let idx = stream.ReadPackedSize();
                    if (idx < this.List.Count)
                    {
                        let node = this.List.Get(idx);
                        this.List.Remove(idx);
                        this.OnUpdateAsynInvoke();
                        this.DetachWatcher(node, entity, false);
                        node.Property.End(entity);
                        node.End(this._valueAllocator);
                    }
                    else
                    {
                        ViDebuger.Warning(ViReceiveDataArray.GLOBAL_NAME + ".DEL at Slot(" + idx + ") >= " + "Count(" + this.List.Count + ")");
                    }
                }
                break;
            case ViDataArrayOperator.MOD:
                {
                    let idx = stream.ReadPackedSize();
                    if (idx < this.List.Count)
                    {
                        let node = this.List.Get(idx);
                        let END_SLOT = ViReceiveDataArray.END_SLOT;
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
                            node.Watcher.OnUpdate(entity, node.Property);
                        }
                    }
                    else
                    {
                        ViDebuger.Warning(ViReceiveDataArray.GLOBAL_NAME + ".MOD at Slot(" + idx + ") >= " + "Count(" + this.List.Count + ")");
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
    public Clear(): void
    {
        ViDebuger.AssertWarning(this.List.Count == 0);
        this.WatcherAllocator = null;
        this.DetachAllCallback();
        //
        super.Clear();
    }
    //
    private static readonly CACHE_Update_Clear_RemoveList = new ViList<any>();
    private Update_Clear(entity: ViEntity, immediate: boolean): void
    {
        let removeList = ViReceiveDataArray.CACHE_Update_Clear_RemoveList;
        for (let iter = 0, list = this.List.Values, count = this.List.Count, Push = removeList.Push.bind(removeList); iter < count; ++iter)
        {
            Push(list[iter]);
        }
        this.List.Clear();
        //
        for (let iter = 0, count = removeList.Count, _valueAllocator = this._valueAllocator, Free = ViReceiveDataArray.NodeAllocator.Free.bind(ViReceiveDataArray.NodeAllocator), DetachWatcher = this.DetachWatcher.bind(this), Get = removeList.Get.bind(removeList); iter < count; ++iter)
        {
            let iterNode = Get(iter) as ViReceiveDataArrayNode<TReceiveData>;
            DetachWatcher(iterNode, entity, immediate);
            iterNode.Property.End(entity);
            iterNode.End(_valueAllocator);
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
        this.List.SetCapacity(size);
        for (let iter = 0, _valueAllocator = this._valueAllocator, Alloc = ViReceiveDataArray.NodeAllocator.Alloc.bind(ViReceiveDataArray.NodeAllocator), Push = this.List.Push.bind(this.List); iter < size; ++iter)
        {
            let newNode = Alloc() as ViReceiveDataArrayNode<TReceiveData>;
            newNode.Start(_valueAllocator);
            newNode.Property.ResisterInList();
            newNode.Property.Start(stream, entity);
            Push(newNode);
        }
        //
        for (let iter = 0, list = this.List.Values, count = this.List.Count, AttachWatcher = this.AttachWatcher.bind(this); iter < count; ++iter)
        {
            AttachWatcher(list[iter], entity, immediate);
        }
    }
    //
    public UpdateWatcher(entity: ViEntity, immediate: boolean): void
    {
        for (let iter = 0, valueList = this.List.Values, count = this.List.Count, AttachWatcher = this.AttachWatcher.bind(this); iter < count; ++iter)
        {
            let iterNode = valueList[iter];
            if (iterNode.Watcher == null)
            {
                AttachWatcher(iterNode, entity, immediate);
            }
        }
    }
    //
    private AttachWatcher(node: ViReceiveDataArrayNode<TReceiveData>, entity: ViEntity, immediate: boolean): void
    {
        if (this.WatcherAllocator != null)
        {
            let watcher = this.WatcherAllocator.Alloc();
            node.Watcher = watcher;
            watcher.Init(entity, node.Property);
            watcher.OnStart(entity, node.Property, immediate);
        }
    }
    //
    private DetachWatcher(node: ViReceiveDataArrayNode<TReceiveData>, entity: ViEntity, immediate: boolean): void
    {
        if (node.Watcher != null)
        {
            node.Watcher.OnEnd(entity, node.Property, immediate);
            node.Watcher.Clear();
            this.WatcherAllocator.Free(node.Watcher);
            node.Watcher = null;
        }
    }
    //
    public readonly _valueAllocator: ViMemoryAllocator<TReceiveData>;
}