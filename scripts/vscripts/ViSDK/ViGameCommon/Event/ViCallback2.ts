import { ViDelegate3, ViDelegateAssisstant } from "../../ViSystem/ViDelegate";
import { ViDoubleLink, ViDoubleLinkNode } from "../../ViStruct/ViDoubleLink";
import { ViAsynDelegateInterface } from "./ViCallback";

export interface ViCallback2Interface<TParam0, TParam1>
{
    IsActive(): boolean;
    End(): void;
    OnCallerClear(): void;
    Exec(eventID: number, param0: TParam0, param1: TParam1): void;
}

//+-------------------------------------------------------------------------------------------------------------------------------------------------------------
export class ViCallback2<TListener, TParam0, TParam1> implements ViCallback2Interface<TParam0, TParam1>
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
    public Exec(eventID: number, param0: TParam0, param1: TParam1): void
    {
        ViDelegateAssisstant.Invoke3(this._listener, this._func, eventID, param0, param1);
    }
    public Attach(listener: TListener, func: ViDelegate3<number, TParam0, TParam1>, list: ViDoubleLink<ViCallback2Interface<TParam0, TParam1>>): void
    {
        this._listener = listener;
        this._func = func;
        list.PushBackEx(this._node, this);
    }
    //
    private readonly _node = new ViDoubleLinkNode<ViCallback2Interface<TParam0, TParam1>>();
    private _listener: TListener
    private _func: ViDelegate3<number, TParam0, TParam1>;
}

//+-------------------------------------------------------------------------------------------------------------------------------------------------------------
export class ViAsynCallback2<TListener, TParam0, TParam1> extends ViAsynDelegateInterface implements ViCallback2Interface<TParam0, TParam1>
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
    public Exec(eventID: number, param0: TParam0, param1: TParam1): void
    {
        this._funcAsyn = this._func;
        this._eventID = eventID;
        this._param0 = param0;
        this._param1 = param1;
        this._AttachAsyn();
    }
    public _AsynExec(): void
    {
        let func = this._funcAsyn;
        let param0 = this._param0;
        let param1 = this._param1;
        this._funcAsyn = null;
        ViDelegateAssisstant.Invoke3(this._listener, func, this._eventID, param0, param1);
    }
    public Attach(listener: TListener, func: ViDelegate3<number, TParam0, TParam1>, list: ViDoubleLink<ViCallback2Interface<TParam0, TParam1>>): void
    {
        this.End();
        //
        this._listener = listener;
        this._func = func;
        list.PushBackEx(this._node, this);
    }
    //
    private readonly _node = new ViDoubleLinkNode<ViCallback2Interface<TParam0, TParam1>>();
    private _listener: TListener;
    private _func: ViDelegate3<number, TParam0, TParam1>;
    private _funcAsyn: ViDelegate3<number, TParam0, TParam1>;
    //
    private _eventID: number;
    private _param0: TParam0;
    private _param1: TParam1;
}

//+-------------------------------------------------------------------------------------------------------------------------------------------------------------
export class ViEvent2AsynList<TParam0, TParam1>
{
    public get Empty(): boolean { return this._eventList.Empty; }
    public get NotEmpty(): boolean { return !this._eventList.Empty; }
    //
    private readonly CACHE_Invoke_ExecList = new ViDoubleLink<ViCallback2Interface<TParam0, TParam1>>();
    public Invoke(clear: boolean, eventId: number, param0: TParam0, param1: TParam1): void
    {
        if (clear)
        {
            let _eventList = this._eventList;
            while (_eventList.NotEmpty)
            {
                let iterNode = _eventList.GetHead();
                iterNode.Detach();
                let iterCallback = iterNode.Data;
                iterCallback.Exec(eventId, param0, param1);
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
                iterCallback.Exec(eventId, param0, param1);
            }
            //
            this._eventList.PushListBack(this.CACHE_Invoke_ExecList);
        }
    }
    //
    public AttachAsyn<TListener>(node: ViAsynCallback2<TListener, TParam0, TParam1>, listener: TListener, func: ViDelegate3<number, TParam0, TParam1>): void
    {
        node.Attach(listener, func, this._eventList);
    }
    //
    public AttachAsynEx<TListener>(node: ViAsynCallback2<TListener, TParam0, TParam1>, listener: TListener, func: ViDelegate3<number, TParam0, TParam1>, timeSpan: number): void
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
    protected readonly _eventList = new ViDoubleLink<ViCallback2Interface<TParam0, TParam1>>();
}

//+-------------------------------------------------------------------------------------------------------------------------------------------------------------
export class ViEvent2List<TParam0, TParam1> extends ViEvent2AsynList<TParam0, TParam1>
{
    public Attach<TListener>(node: ViCallback2<TListener, TParam0, TParam1>, listener: TListener, func: ViDelegate3<number, TParam0, TParam1>): void
    {
        node.Attach(listener, func, this._eventList);
    }
}
