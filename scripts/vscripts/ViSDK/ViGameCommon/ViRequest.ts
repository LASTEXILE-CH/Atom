import { ViDoubleLink, ViDoubleLinkNode } from "../ViStruct/ViDoubleLink";
import { ViLinkList } from "../ViStruct/ViLinkList";
import { ViDelegate0, ViDelegateAssisstant } from "../ViSystem/ViDelegate";

export interface ViRequestInterface
{
    IsCompleted(): boolean;
    End(): void;
}

export class ViRequestList
{
    public static UpdateAll(): void
    {
        let _workList = ViRequestList._workList;
        let _execList = ViRequestList._execList;
        for (let iter = _workList.GetHead(); !_workList.IsEnd(iter);)
        {
            let iterRequest = iter.Data;
            iter = _workList.Next(iter);
            //
            if (iterRequest.IsComplete())
            {
                _execList.PushBack(iterRequest._workNode);
            }
        }
        //
        while (_execList.NotEmpty)
        {
            let iterRequest = _execList.GetHead().Data;
            iterRequest._workNode.DetachEx(null);
            //
            let listener = iterRequest._listener;
            let func = iterRequest._func;
            iterRequest._listener = null;
            iterRequest._func = null;
            ViDelegateAssisstant.Invoke0(listener, func);
        }
    }
    private static readonly _workList = new ViDoubleLink<ViRequestList>();
    private static readonly _execList = new ViDoubleLink<ViRequestList>();
    //
    public get Count(): number { return this._list.Count; }
    public IsComplete(): boolean
    {
        let _list = this._list;
        for (let iter = _list.GetHead(); !_list.IsEnd(iter); iter = _list.Next(iter))
        {
            let iterRequest = iter.Data;
            if (!iterRequest.IsCompleted())
            {
                return false;
            }
        }
        return true;
    }
    //
    public Attach(request: ViRequestInterface): void
    {
        if (!this._list.Contain(request))
        {
            this._list.PushBack(request);
        }
    }
    //
    public Detach(request: ViRequestInterface): void
    {
        this._list.EraseValue(request, true);
    }
    //
    public Start(listener: any, func: ViDelegate0): void
    {
        this._listener = listener;
        this._func = func;
        ViRequestList._workList.PushBackEx(this._workNode, this);
    }
    //
    public Clear(end: boolean): void
    {
        let _list = this._list;
        if (end)
        {
            for (let iter = _list.GetHead(); !_list.IsEnd(iter); iter = _list.Next(iter))
            {
                let iterRequest = iter.Data;
                iterRequest.End();
            }
        }
        _list.Clear();
        //
        this._workNode.DetachEx(null);
        this._listener = null;
        this._func = null;
    }
    //
    private readonly _list = new ViLinkList<ViRequestInterface>();
    private readonly _workNode = new ViDoubleLinkNode<ViRequestList>();
    private _listener: any;
    private _func: ViDelegate0;
}