import { ViDelegate2, ViDelegateAssisstant } from "../../ViSystem/ViDelegate";
import { ViDoubleLinkNode, ViDoubleLink } from "../../ViStruct/ViDoubleLink";
import { ViAsynDelegateInterface } from "./ViCallback";

export interface ViCallback1Interface<TParam0>
{
    IsActive(): boolean;
    End(): void;
    OnCallerClear(): void;
    Exec(eventID: number, param0: TParam0): void;
}

//+-------------------------------------------------------------------------------------------------------------------------------------------------------------
export class ViCallback1<TListener, TParam0> implements ViCallback1Interface<TParam0>
{
    public IsActive(): boolean { return this._node.IsAttach(); }
    //
    public End(): void
    {
        this._listener = null;
        this._func = null;
        this._node.DetachEx(null);
    }
    public OnCallerClear(): void
    {
        this._listener = null;
        this._func = null;
        this._node.DetachEx(null);
    }
    public Exec(eventID: number, param0: TParam0): void
    {
        ViDelegateAssisstant.Invoke2(this._listener, this._func, eventID, param0);
    }
    public Attach(listener: TListener, func: ViDelegate2<number, TParam0>, list: ViDoubleLink<ViCallback1Interface<TParam0>>): void
    {
        this._listener = listener;
        this._func = func;
        list.PushBackEx(this._node, this);
    }
    //
    private readonly _node = new ViDoubleLinkNode<ViCallback1Interface<TParam0>>();
    private _listener: TListener
    private _func: ViDelegate2<number, TParam0>;
}

//+-------------------------------------------------------------------------------------------------------------------------------------------------------------
export class ViAsynCallback1<TListener, TParam0> extends ViAsynDelegateInterface implements ViCallback1Interface<TParam0>
{
    public IsActive(): boolean { return this._node.IsAttach(); }
    public IsAsynActive(): boolean { return this._attachNode.IsAttach(); }
    //
    public End(): void
    {
        this._listener = null;
        this._func = null;
        this._funcAsyn = null;
        this._node.DetachEx(null);
        //
        this._attachNode.DetachEx(null);
    }
    public OnCallerClear(): void
    {
        this._listener = null;
        this._func = null;
        this._funcAsyn = null;
        this._node.DetachEx(null);
    }
    public ForceExec(): void
    {
        if (this._attachNode.IsAttach())
        {
            this._attachNode.DetachEx(null);
            this._AsynExec();
        }
    }
    public Exec(eventID: number, param0: TParam0): void
    {
        this._funcAsyn = this._func;
        this._eventID = eventID;
        this._param0 = param0;
        this._AttachAsyn();
    }
    public _AsynExec(): void
    {
        let func = this._funcAsyn;
        let param0 = this._param0;
        this._funcAsyn = null;
        ViDelegateAssisstant.Invoke2(this._listener, func, this._eventID, param0);
    }
    public Attach(listener: TListener, func: ViDelegate2<number, TParam0>, list: ViDoubleLink<ViCallback1Interface<TParam0>>): void
    {
        this.End();
        //
        this._listener = listener;
        this._func = func;
        list.PushBackEx(this._node, this);
    }
    //
    private readonly _node = new ViDoubleLinkNode<ViCallback1Interface<TParam0>>();
    private _listener: TListener;
    private _func: ViDelegate2<number, TParam0>;
    private _funcAsyn: ViDelegate2<number, TParam0>;
    //
    private _eventID: number;
    private _param0: TParam0;
}

//+-------------------------------------------------------------------------------------------------------------------------------------------------------------
export class ViEvent1AsynList<TParam0>
{
    public get Empty(): boolean { return this._eventList.Empty; }
    public get NotEmpty(): boolean { return !this._eventList.Empty; }
    //
    private readonly CACHE_Invoke_ExecList = new ViDoubleLink<ViCallback1Interface<TParam0>>();
    public Invoke(clear: boolean, eventId: number, param0: TParam0): void
    {
        if (clear)
        {
            let _eventList = this._eventList;
            while (_eventList.NotEmpty)
            {
                let iterNode = _eventList.GetHead();
                iterNode.Detach();
                let iterCallback = iterNode.Data;
                iterCallback.Exec(eventId, param0);
            }
        }
        else
        {
            let _eventList = this._eventList;
            while (_eventList.NotEmpty)
            {
                let iterNode = _eventList.GetHead();
                this.CACHE_Invoke_ExecList.PushBack(iterNode);
                let iterCallback = iterNode.Data;
                iterCallback.Exec(eventId, param0);
            }
            //
            _eventList.PushListBack(this.CACHE_Invoke_ExecList);
        }
    }
    //
    public AttachAsyn<TListener>(node: ViAsynCallback1<TListener, TParam0>, listener: TListener, func: ViDelegate2<number, TParam0>): void
    {
        node.Attach(listener, func, this._eventList);
    }
    //
    public AttachAsynEx<TListener>(node: ViAsynCallback1<TListener, TParam0>, listener: TListener, func: ViDelegate2<number, TParam0>, timeSpan: number): void
    {
        node.Attach(listener, func, this._eventList);
        node.TimeSpan = timeSpan;
    }
    //
    public Clear(): void
    {
        let _eventList = this._eventList;
        while (_eventList.NotEmpty)
        {
            let iterNode = _eventList.GetHead();
            let iterCallback = iterNode.Data;
            iterCallback.OnCallerClear();
        }
    }
    //
    protected readonly _eventList = new ViDoubleLink<ViCallback1Interface<TParam0>>();
}

//+-------------------------------------------------------------------------------------------------------------------------------------------------------------
export class ViEvent1List<TParam0> extends ViEvent1AsynList<TParam0>
{
    public Attach<TListener>(node: ViCallback1<TListener, TParam0>, listener: TListener, func: ViDelegate2<number, TParam0>): void
    {
        node.Attach(listener, func, this._eventList);
    }
}
