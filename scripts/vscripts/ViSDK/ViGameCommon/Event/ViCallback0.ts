import { ViDelegateAssisstant, ViDelegate1 } from "../../ViSystem/ViDelegate";
import { ViDoubleLinkNode, ViDoubleLink } from "../../ViStruct/ViDoubleLink";
import { ViAsynDelegateInterface } from "./ViCallback";

export interface ViCallback0Interface
{
    IsActive(): boolean;
    End(): void;
    OnCallerClear(): void;
    Exec(eventID: number): void;
}

//+-------------------------------------------------------------------------------------------------------------------------------------------------------------
export class ViCallback0<TListener> implements ViCallback0Interface
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
    public Exec(eventID: number): void
    {
        ViDelegateAssisstant.Invoke1(this._listener, this._func, eventID);
    }
    public Attach(listener: TListener, func: ViDelegate1<number>, list: ViDoubleLink<ViCallback0Interface>): void
    {
        this._listener = listener;
        this._func = func;
        list.PushBackEx(this._node, this);
    }
    //
    private readonly _node = new ViDoubleLinkNode<ViCallback0Interface>();
    private _listener: TListener
    private _func: ViDelegate1<number>;
}

//+-------------------------------------------------------------------------------------------------------------------------------------------------------------
export class ViAsynCallback0<TListener> extends ViAsynDelegateInterface implements ViCallback0Interface
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
    public Exec(eventID: number): void
    {
        this._funcAsyn = this._func;
        this._eventID = eventID;
        this._AttachAsyn();
    }
    public _AsynExec(): void
    {
        let func = this._funcAsyn;
        this._funcAsyn = null;
        ViDelegateAssisstant.Invoke1(this._listener, func, this._eventID);
    }
    public Attach(listener: TListener, func: ViDelegate1<number>, list: ViDoubleLink<ViCallback0Interface>): void
    {
        this.End();
        //
        this._listener = listener;
        this._func = func;
        list.PushBackEx(this._node, this);
    }
    //
    private readonly _node = new ViDoubleLinkNode<ViCallback0Interface>();
    private _listener: TListener;
    private _func: ViDelegate1<number>;
    private _funcAsyn: ViDelegate1<number>;
    //
    private _eventID: number;
}

//+-------------------------------------------------------------------------------------------------------------------------------------------------------------
export class ViEvent0AsynList
{
    public get Empty(): boolean { return this._eventList.Empty; }
    public get NotEmpty(): boolean { return !this._eventList.Empty; }
    //
    private readonly CACHE_Invoke_ExecList = new ViDoubleLink<ViCallback0Interface>();
    public Invoke(clear: boolean, eventId: number): void
    {
        if (clear)
        {
            let _eventList = this._eventList;
            while (_eventList.NotEmpty)
            {
                let iterNode = _eventList.GetHead();
                iterNode.Detach();
                let iterCallback = iterNode.Data;
                iterCallback.Exec(eventId);
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
                iterCallback.Exec(eventId);
            }
            _eventList.PushListBack(this.CACHE_Invoke_ExecList);
        }
    }
    //
    public AttachAsyn<TListener>(node: ViAsynCallback0<TListener>, listener: TListener, func: ViDelegate1<number>): void
    {
        node.Attach(listener, func, this._eventList);
    }
    public AttachAsynEx<TListener>(node: ViAsynCallback0<TListener>, listener: TListener, func: ViDelegate1<number>, timeSpan: number): void
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
    protected readonly _eventList = new ViDoubleLink<ViCallback0Interface>();
}

//+-------------------------------------------------------------------------------------------------------------------------------------------------------------
export class ViEvent0List extends ViEvent0AsynList
{
    public Attach<TListener>(node: ViCallback0<TListener>, listener: TListener, func: ViDelegate1<number>): void
    {
        node.Attach(listener, func, this._eventList);
    }
}
