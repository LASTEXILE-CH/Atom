import { ViDebuger } from "../../ViSystem/ViDebuger";
import { ViDoubleLink, ViDoubleLinkNode } from "../../ViStruct/ViDoubleLink";
import { ViRealTimerInstance } from "../Time/ViTimerInstance";

export abstract class ViAsynDelegateInterface
{
    private static readonly CACHE_Update_ExecList = new ViDoubleLink<ViAsynDelegateInterface>();
    public static Update(): void
    {
        if (ViAsynDelegateInterface._immediateList.NotEmpty)
        {
            let execList = ViAsynDelegateInterface.CACHE_Update_ExecList;
            //
            execList.PushListBack(ViAsynDelegateInterface._immediateList);
            //
            while (execList.NotEmpty)
            {
                let asynCallback = execList.GetHead().Data;
                //ViDebuger.AssertError(asynCallback != null);
                asynCallback._attachNode.DetachEx(null);
                asynCallback._AsynExec();
            }
            ViDebuger.AssertWarning(execList.Empty);
        }
        //
        if (ViAsynDelegateInterface._timeList.NotEmpty)
        {
            let execList = ViAsynDelegateInterface.CACHE_Update_ExecList;
            //
            let time = ViRealTimerInstance.Time;
            for (let _timeList = ViAsynDelegateInterface._timeList, iter = _timeList.GetHead(); !_timeList.IsEnd(iter);)
            {
                let iterCallback = iter.Data;
                iter = _timeList.Next(iter);
                //
                if (time >= iterCallback._execTime)
                {
                    execList.PushBack(iterCallback._attachNode);
                }
            }
            //
            while (execList.NotEmpty)
            {
                let asynCallback = execList.GetHead().Data;
                //ViDebuger.AssertError(asynCallback != null);
                asynCallback._attachNode.DetachEx(null);
                asynCallback._AsynExec();
            }
            ViDebuger.AssertWarning(execList.Empty);
        }
    }
    private static readonly _immediateList = new ViDoubleLink<ViAsynDelegateInterface>();
    private static readonly _timeList = new ViDoubleLink<ViAsynDelegateInterface>();
    //
    public TimeSpan: number = 0;
    //
    protected _AttachAsyn(): void
    {
        if (this._attachNode.IsAttach())
        {
            return;
        }
        //
        if (this.TimeSpan > 0)
        {
            this._execTime = ViRealTimerInstance.Time + this.TimeSpan;
            ViAsynDelegateInterface._timeList.PushBackEx(this._attachNode, this);
        }
        else
        {
            ViAsynDelegateInterface._immediateList.PushBackEx(this._attachNode, this);
        }
    }
    //
    abstract _AsynExec(): void;
    private _execTime: number = 0;
    protected readonly _attachNode = new ViDoubleLinkNode<ViAsynDelegateInterface>();
}