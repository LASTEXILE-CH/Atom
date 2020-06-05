import { ViAssisstant } from "../../ViSystem/ViSystemConfig";
import { ViList } from "../../ViSystem/ViSystemType";
import { ViDebuger } from "../../ViSystem/ViDebuger";
import { ViDoubleLinkNode, ViDoubleLink } from "../../ViStruct/ViDoubleLink";

export abstract class ViTimeNodeInterface
{
	public get Time(): number { return this._time; }
	public readonly AttachNode = new ViDoubleLinkNode<ViTimeNodeInterface>();
	//
	public constructor()
	{
		this.AttachNode.Data = this;
	}
	//
	public IsAttach(): boolean { return this.AttachNode.IsAttach(); }
	public abstract Detach(): void;
	public abstract _Exce(timer: ViTimer): void;
	//
	public SetTime(time: number): void 
	{
		this._time = time;
	}
	//
	public GetReserveDuration(timer: ViTimer): number
	{
		if (this.AttachNode.IsAttach())
		{
			return (this._time > timer.Time) ? (this._time - timer.Time) : 1;
		}
		else
		{
			return 0;
		}
	}
	//
	public Exec(timer: ViTimer): boolean
	{
		if (this.IsAttach())
		{
			this.AttachNode.Detach();
			this._Exce(timer);
			return true;
		}
		else
		{
			return false;
		}
	}
	//
	protected _time: number;
}

class TimeRoll
{
	public get Span(): number { return this._span; }
	public get TimeInf(): number { return this._timeInf; }
	public get TimeISup(): number { return this._timeSup; }
	public get Current(): ViDoubleLink<ViTimeNodeInterface> { return this._timeListArray.Get(this._idx); }
	//
	public Init(startTime: number, rollSize: number, span: number): void
	{
		for (let iter = 0; iter < rollSize; ++iter)
		{
			let node = new ViDoubleLink<ViTimeNodeInterface>();
			this._timeListArray.Push(node);
		}
		this._span = span;
		this._timeInf = startTime;
		this._timeSup = startTime + span * rollSize;
	}
	//
	public InRange(time: number): boolean
	{
		return (this._timeInf <= time && time < this._timeSup);
	}
	//
	public IsRoll(): boolean
	{
		return this._idx == 0;
	}
	//
	public ResetTime(deltaTime: number): void
	{
		for (let iter = 0, count = this._timeListArray.Count; iter < count; ++iter)
		{
			TimeRoll.ResetTime2(this._timeListArray.Get(iter), deltaTime);
		}
	}
	//
	public static ResetTime2(list: ViDoubleLink<ViTimeNodeInterface>, deltaTime: number): void
	{
		for (let iter = list.GetHead(); !list.IsEnd(iter);)
		{
			let iterNode = iter.Data;
			iter = list.Next(iter);
			//
			iterNode.SetTime(iterNode.Time + deltaTime);
		}
	}
	//
	public Add(node: ViTimeNodeInterface): void
	{
		let time = node.Time;
		//ViDebuger.AssertError(this._timeInf <= time && time < this._timeSup);
		let slot = this._idx;
		let _timeListArray = this._timeListArray;
		if (time > this._timeInf)
		{
			let deltaSlot = ViAssisstant.Int32Inf((time - this._timeInf) / this._span);
			slot = deltaSlot + this._idx;
			//ViDebuger.AssertError(deltaSlot < _timeListArray.Count);
			if (slot >= _timeListArray.Count)
			{
				slot -= _timeListArray.Count;
			}
		}
		//ViDebuger.AssertError(slot < _timeListArray.Count);
		_timeListArray.Get(slot).PushBack(node.AttachNode);
	}
	//
	public Next(): number
	{
		++(this._idx);
		if (this._idx == this._timeListArray.Count)
		{
			this._idx = 0;
		}
		this._timeInf += this._span;
		this._timeSup += this._span;
		return this._idx;
	}
	//
	public Clear(): void
	{
		for (let iter = 0, count = this._timeListArray.Count; iter < count; ++iter)
		{
			this._timeListArray.Get(iter).Clear();
		}
		this._timeListArray.Clear();
		this._timeInf = 0;
		this._timeSup = 0;
		this._span = 0;
		this._idx = 0;
	}
	//
	private _timeInf: number = 0;
	private _timeSup: number = 0;
	private _span: number = 0;
	private _idx: number = 0;
	private readonly _timeListArray = new ViList<ViDoubleLink<ViTimeNodeInterface>>();
}

export class ViTimer
{
	get Time(): number { return this._time; }
	//
	public Start(startTime: number, span: number, rollSize0: number, rollSize1: number): void
	{
		this._time = startTime;
		this._roll0.Init(startTime, rollSize0, span);
		this._roll1.Init(startTime, rollSize1, span * rollSize0);
	}
	//
	public End(): void
	{
		this._roll0.Clear();
		this._roll1.Clear();
		this._currentList.Clear();
		this._reserveList.Clear();
		this._time = 0;
	}
	//
	public ResetTime(time: number): void
	{
		let deltaTime = time - this._time;
		this._time = time;
		//
		this._roll0.ResetTime(deltaTime);
		this._roll1.ResetTime(deltaTime);
		TimeRoll.ResetTime2(this._reserveList, deltaTime);
	}
	//
	public Update(time: number): void
	{
		if (this._time >= time)
		{
			return;
		}
		//
		let updateTime = this._time;
		let span = this._roll0.Span;
		let topTime = time - span;
		let _roll0 = this._roll0;
		let _roll1 = this._roll1;
		let _roll0_IsRoll = _roll0.IsRoll.bind(_roll0);
		let _roll0_Next = _roll0.Next.bind(_roll0);
		let _currentList = this._currentList;
		let _ExecTimeList = this._ExecTimeList.bind(this);
		let _currentList_PushListBack = _currentList.PushListBack.bind(_currentList);
		while (updateTime <= topTime)
		{
			updateTime += span;
			//
			if (_roll0_IsRoll())
			{
				ViTimer.Convert2(_roll1.Current, _roll0);
				_roll1.Next();
				if (_roll1.IsRoll())
				{
					ViTimer.Convert(this._reserveList, _roll1);
				}
			}
			//
			this._time = updateTime;
			_currentList_PushListBack(_roll0.Current);
			_roll0_Next();
			_ExecTimeList(_currentList);
		}
	}
	//
	public Add(node: ViTimeNodeInterface): void
	{
		let _roll0 = this._roll0;
		let node_Time = node.Time;
		if (node_Time < _roll0.TimeInf)
		{
			node.SetTime(_roll0.TimeInf);
			node_Time = node.Time;
		}
		//
		if (_roll0.InRange(node_Time))
		{
			_roll0.Add(node);
		}
		else if (this._roll1.InRange(node_Time))
		{
			this._roll1.Add(node);
		}
		else
		{
			this._reserveList.PushBack(node.AttachNode);
		}
	}
	//
	private static Convert(list: ViDoubleLink<ViTimeNodeInterface>, timeRoll: TimeRoll): void
	{
		for (let iter = list.GetHead(); !list.IsEnd(iter);)
		{
			let timeNode = iter.Data;
			//ViDebuger.AssertError(timeNode != null);
			iter = list.Next(iter);
			if (timeRoll.InRange(timeNode.Time))
			{
				timeRoll.Add(timeNode);
			}
		}
	}
	//
	private static Convert2(list: ViDoubleLink<ViTimeNodeInterface>, timeRoll: TimeRoll): void
	{
		for (let iter = list.GetHead(); !list.IsEnd(iter);)
		{
			let timeNode = iter.Data;
			//ViDebuger.AssertError(timeNode != null);
			iter = list.Next(iter);
			if (timeRoll.InRange(timeNode.Time))
			{
				timeRoll.Add(timeNode);
			}
			else
			{
				ViDebuger.Error("timeNode.Time" + timeNode.Time + " in not in timeRoll.Range");
			}
		}
	}
	//
	private _ExecTimeList(list: ViDoubleLink<ViTimeNodeInterface>): void
	{
		while (list.NotEmpty)
		{
			let timeNode = list.GetHead().Data;
			timeNode.AttachNode.Detach();
			timeNode._Exce(this);
		}
		//ViDebuger.AssertError(list.IsEmpty());
	}
	//
	private _time: number = 0;
	private readonly _roll0 = new TimeRoll();
	private readonly _roll1 = new TimeRoll();
	private readonly _currentList = new ViDoubleLink<ViTimeNodeInterface>();
	private readonly _reserveList = new ViDoubleLink<ViTimeNodeInterface>();
}
