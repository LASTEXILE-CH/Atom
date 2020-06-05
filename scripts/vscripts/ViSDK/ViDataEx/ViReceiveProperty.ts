import { ViList } from "../ViSystem/ViSystemType";
import { ViEntity } from "../ViGameCommon/Entity/ViEntity";
import { ViReceiveDataNode } from "./ViReceiveDataNode";
import { ViReceiveDataInt32 } from "./ViReceiveDataSimple";
import { ViIStream } from "../ViSystem/ViIStream";
import { ViDebuger } from "../ViSystem/ViDebuger";

export class ViReceiveProperty extends ViReceiveDataNode
{
    public static readonly INDEX_PROPERTY_COUNT: number = 0;
    //
    public Start(stream: ViIStream, entity: ViEntity): void { }
    public OnUpdate(stream: ViIStream, entity: ViEntity): void { }
    public End(entity: ViEntity): void { }
    //
    public StartProperty(channelMask: number, stream: ViIStream, entity: ViEntity): void 
    {
        this.ChannelMask = channelMask;
        for (let iter = 0, childList = this.ChildList.Values, count = this.ChildList.Count; iter < count; ++iter)
        {
            let iterNode = childList[iter];
            if ((iterNode.ChannelMask & channelMask) != 0)
            {
                iterNode.Start(stream, entity);
            }
        }
    }
    //
    public OnPropertyUpdate(stream: ViIStream, entity: ViEntity): void 
    {
        let slot = stream.ReadUInt16();
        if (ViDebuger.UseTryCatch)
        {
            if (this._childList != null)
            {
                let node = this._childList.Get(slot);
                if (node != undefined)
                {
                    node.OnUpdate(stream, entity);
                }
                else
                {
                    ViDebuger.Error("_updateSlots[" + slot + "] == null");
                }
            }
        }
        else
        {
            this._childList.Get(slot).OnUpdate(stream, entity);
        }
    }
    //
    public EndProperty(entity: ViEntity): void 
    {
        let channelMask = this.ChannelMask;
        for (let iter = 0, childList = this.ChildList.Values, count = this.ChildList.Count; iter < count; ++iter)
        {
            let iterNode = childList[iter];
            if ((iterNode.ChannelMask & channelMask) != 0)
            {
                iterNode.End(entity);
            }
        }
    }
    //
    public Clear(): void 
    {
        for (let iter = 0, childList = this.ChildList.Values, count = this.ChildList.Count; iter < count; ++iter)
        {
            childList[iter].Clear();
        }
        //
        this._indexPropertys.Clear();
        //
        super.Clear();
    }
    //
    public SetIndexPropertyCapacity(size: number): void
    {
        this._indexPropertys.SetCapacity(size);
    }
    //
    public AddIdxProperty(data: ViReceiveDataInt32): void
    {
        this._indexPropertys.Push(data);
    }
    //
    public AddIndexProperty(data: ViReceiveDataInt32): void
    {
        this._indexPropertys.Push(data);
    }
    //
    public GetIndexProperty(idx: number): ViReceiveDataInt32
    {
        if (idx < this._indexPropertys.Count)
        {
            return this._indexPropertys[idx];
        }
        else
        {
            return null;
        }
    }
    //
    private readonly _indexPropertys = new ViList<ViReceiveDataInt32>();
}

