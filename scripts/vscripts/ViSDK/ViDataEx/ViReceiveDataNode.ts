import { ViConst } from "../ViSystem/ViSystemConfig";
import { ViList } from "../ViSystem/ViSystemType";
import { ViDebuger } from "../ViSystem/ViDebuger";
import { ViDoubleLink, ViDoubleLinkNode } from "../ViStruct/ViDoubleLink";
import { ViEvent1List } from "../ViGameCommon/Event/ViCallback1";
import { ViEntity } from "../ViGameCommon/Entity/ViEntity";
import { ViIStream } from "../ViSystem/ViIStream";

export abstract class ViReceiveDataNode
{
    public static readonly TYPE_SIZE: number = 1;
    //
    public get TypeSize(): number { return ViReceiveDataNode.TYPE_SIZE; }
    public ChannelMask = 0;
    //
    public get ChildList(): ViList<ViReceiveDataNode>
    {
        if (this._childList == null)
        {
            this._childList = new ViList<ViReceiveDataNode>();
        }
        return this._childList;
    }
    //
    public get CallbackList(): ViEvent1List<ViReceiveDataNode>
    {
        if (this._updateCallbackList == null)
        {
            this._updateCallbackList = new ViEvent1List<ViReceiveDataNode>();
        }
        return this._updateCallbackList;
    }
    //
    public abstract Start(stream: ViIStream, entity: ViEntity): void;
    public abstract OnUpdate(stream: ViIStream, entity: ViEntity): void;
    public abstract End(entity: ViEntity): void;
    //
    public Clear(): void
    {
        if (this._updateCallbackList != null)
        {
            this._updateCallbackList.Clear();
            this._updateCallbackList = null;
        }
        if (this._childList != null)
        {
            this._childList.Clear();
        }
        this._parentListener = null;
    }
    //
    public SetChildCapacity(size: number): void
    {
        if (this._childList == null)
        {
            this._childList = new ViList<ViReceiveDataNode>();
        }
        this._childList.SetCapacity(size);
    }
    //
    public RegisterAsChild(channelMask: number, parentListener: ViReceiveDataNode, childList: ViList<ViReceiveDataNode>): void
    {
        this.ChannelMask = channelMask;
        this._parentListener = parentListener;
        //
        childList.Push(this);
    }
    //
    protected _RegisterAsChild(channelMask: number, parentListener: ViReceiveDataNode): void
    {
        this.ChannelMask = channelMask;
        this._parentListener = parentListener;
    }
    //
    public ResisterInList(): void
    {
        let childList = this.ChildList;
        if (childList.Count >= this.TypeSize)
        {
            this._parentListener = null;
        }
        else
        {
            this.SetChildCapacity(this.TypeSize);
            this.RegisterAsChild(ViConst.MAX_UINT16, null, childList);
        }
    }
    //
    public ResisterOutList(): void
    {
        this._parentListener = null;
    }
    //
    protected OnUpdateInvoke(): void
    {
        if (this._updateCallbackList != null && this._updateCallbackList.NotEmpty)
        {
            this._updateCallbackList.Invoke(false, ViReceiveDataNodeEventID.UPDATE, this);
        }
        if (this._parentListener != null)
        {
            this._parentListener.OnUpdateFromChildren(this);
        }
    }
    //
    private OnUpdateFromChildren(node: ViReceiveDataNode): void
    {
        if (this._updateCallbackList != null && this._updateCallbackList.NotEmpty)
        {
            this._updateCallbackList.Invoke(false, ViReceiveDataNodeEventID.UPDATE, node);
        }
        if (this._parentListener != null)
        {
            this._parentListener.OnUpdateFromChildren(this);
        }
    }
    //
    protected DetachAllCallback(): void
    {
        if (this._updateCallbackList != null)
        {
            this._updateCallbackList.Clear();
        }
    }
    //
    protected _childList: ViList<ViReceiveDataNode>;
    private _parentListener: ViReceiveDataNode = null;
    private _updateCallbackList: ViEvent1List<ViReceiveDataNode>;
}

export abstract class ViReceiveDataNodeEx extends ViReceiveDataNode
{
    public Start(stream: ViIStream, entity: ViEntity): void
    {
        for (let iter = 0, childList = this.ChildList.Values, count = this.ChildList.Count; iter < count; ++iter)
        {
            childList[iter].Start(stream, entity);
        }
    }
    //
    public OnUpdate(stream: ViIStream, entity: ViEntity): void
    {

    }
    //    
    public End(entity: ViEntity): void
    {
        for (let iter = 0, childList = this.ChildList.Values, count = this.ChildList.Count; iter < count; ++iter)
        {
            childList[iter].End(entity);
        }
    }
    //
    public Clear(): void
    {
        for (let iter = 0, childList = this.ChildList.Values, count = this.ChildList.Count; iter < count; ++iter)
        {
            childList[iter].Clear();
        }
        this.ChildList.Clear();
        //
        super.Clear();
    }
}

export abstract class ViReceiveDataNodeExArray<T extends ViReceiveDataNode> extends ViReceiveDataNodeEx
{
    public GetFixArrayElement(idx: number): T
    {
        let property = this as any;
        if (idx >= property.Length)
        {
            return property.E0;
        }
        //
        let value: T = null;
        switch (idx) 
        {
            case 0: value = property.E0; break;
            case 1: value = property.E1; break;
            case 2: value = property.E2; break;
            case 3: value = property.E3; break;
            case 4: value = property.E4; break;
            case 5: value = property.E5; break;
            case 6: value = property.E6; break;
            case 7: value = property.E7; break;
            case 8: value = property.E8; break;
            case 9: value = property.E9; break;
            case 10: value = property.E10; break;
            case 11: value = property.E11; break;
            case 12: value = property.E12; break;
            case 13: value = property.E13; break;
            case 14: value = property.E14; break;
            case 15: value = property.E15; break;
            case 16: value = property.E16; break;
            case 17: value = property.E17; break;
            case 18: value = property.E18; break;
            case 19: value = property.E19; break;
            case 20: value = property.E20; break;
            case 21: value = property.E21; break;
            case 22: value = property.E22; break;
            case 23: value = property.E23; break;
            case 24: value = property.E24; break;
            case 25: value = property.E25; break;
            case 26: value = property.E26; break;
            case 27: value = property.E27; break;
            case 28: value = property.E28; break;
            case 29: value = property.E29; break;
            case 30: value = property.E30; break;
            case 31: value = property.E31; break;
            case 32: value = property.E32; break;
            case 33: value = property.E33; break;
            case 34: value = property.E34; break;
            case 35: value = property.E35; break;
            case 36: value = property.E36; break;
            case 37: value = property.E37; break;
            case 38: value = property.E38; break;
            case 39: value = property.E39; break;
            case 40: value = property.E40; break;
            case 41: value = property.E41; break;
            case 42: value = property.E42; break;
            case 43: value = property.E43; break;
            case 44: value = property.E44; break;
            case 45: value = property.E45; break;
            case 46: value = property.E46; break;
            case 47: value = property.E47; break;
            case 48: value = property.E48; break;
            case 49: value = property.E49; break;
            case 50: value = property.E50; break;
            case 51: value = property.E51; break;
            case 52: value = property.E52; break;
            case 53: value = property.E53; break;
            case 54: value = property.E54; break;
            case 55: value = property.E55; break;
            case 56: value = property.E56; break;
            case 57: value = property.E57; break;
            case 58: value = property.E58; break;
            case 59: value = property.E59; break;
            case 60: value = property.E60; break;
            case 61: value = property.E61; break;
            case 62: value = property.E62; break;
            case 63: value = property.E63; break;
            case 64: value = property.E64; break;
            case 65: value = property.E65; break;
            case 66: value = property.E66; break;
            case 67: value = property.E67; break;
            case 68: value = property.E68; break;
            case 69: value = property.E69; break;
            case 70: value = property.E70; break;
            case 71: value = property.E71; break;
            case 72: value = property.E72; break;
            case 73: value = property.E73; break;
            case 74: value = property.E74; break;
            case 75: value = property.E75; break;
            case 76: value = property.E76; break;
            case 77: value = property.E77; break;
            case 78: value = property.E78; break;
            case 79: value = property.E79; break;
            case 80: value = property.E80; break;
            case 81: value = property.E81; break;
            case 82: value = property.E82; break;
            case 83: value = property.E83; break;
            case 84: value = property.E84; break;
            case 85: value = property.E85; break;
            case 86: value = property.E86; break;
            case 87: value = property.E87; break;
            case 88: value = property.E88; break;
            case 89: value = property.E89; break;
            case 90: value = property.E90; break;
            case 91: value = property.E91; break;
            case 92: value = property.E92; break;
            case 93: value = property.E93; break;
            case 94: value = property.E94; break;
            case 95: value = property.E95; break;
            case 96: value = property.E96; break;
            case 97: value = property.E97; break;
            case 98: value = property.E98; break;
            case 99: value = property.E99; break;
            default: value = property.E0;
        }
        return value;
    }
}

export abstract class ViReceiveDataContainer extends ViReceiveDataNode
{
    private static readonly CACHE_Update_ExecList = new ViDoubleLink<ViReceiveDataContainer>();
    public static UpdateAsynInvoke(): void
    {
        if (ViReceiveDataContainer._asynExecList.Empty)
        {
            return;
        }
        //
        let execList = ViReceiveDataContainer.CACHE_Update_ExecList;
        execList.PushListBack(ViReceiveDataContainer._asynExecList);
        while (execList.NotEmpty)
        {
            let asynCallback = execList.GetHead().Data;
            //ViDebuger.AssertError(asynCallback != null);
            asynCallback._asynInvokeNode.DetachEx(null);
            asynCallback.OnUpdateInvoke();
        }
        ViDebuger.AssertWarning(execList.Empty);
    }
    private static readonly _asynExecList = new ViDoubleLink<ViReceiveDataContainer>();
    //
    protected OnUpdateAsynInvoke(): void
    {
        if (!this._asynInvokeNode.IsAttach())
        {
            ViReceiveDataContainer._asynExecList.PushBackEx(this._asynInvokeNode, this);
        }
    }
    //
    public Clear(): void
    {
        this._asynInvokeNode.DetachEx(null);
        //
        super.Clear();
    }
    //
    private readonly _asynInvokeNode = new ViDoubleLinkNode<ViReceiveDataContainer>();
}

export class ViReceiveDataEmptyNode extends ViReceiveDataNode
{
    public Start(stream: ViIStream, entity: ViEntity): void { }
    public OnUpdate(stream: ViIStream, entity: ViEntity): void { }
    public End(entity: ViEntity): void { }
}

export class ViReceiveDataEmptyContainer extends ViReceiveDataContainer
{
    public Start(stream: ViIStream, entity: ViEntity): void { }
    public OnUpdate(stream: ViIStream, entity: ViEntity): void { }
    public End(entity: ViEntity): void { }
}

export enum ViReceiveDataNodeEventID
{
    START,
    UPDATE,
    DESTROY,
}

export enum ViDataArrayOperator
{
    ADD_BACK,
    ADD_FRONT,
    INSERT,
    MOD,
    DEL,
    CLEAR,
    RESET,
}

export class ViDataExAssisstant
{

}