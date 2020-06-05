import { ViAssisstant } from "../../ViSystem/ViSystemConfig";
import { ViDelegate1 } from "../../ViSystem/ViDelegate";
import { NumberI64 } from "../../ViSystem/ViNumber64";
import { ViTimer, ViTimeNodeInterface } from "./ViTimer";
import { ViTimeNode1 } from "./ViTimeNodeEx";
import { Number64Assistant } from "../../ViSystem/ViNumber64Assistant";

export class DateStruct
{
	Week: number;
	Day: number;
	Hour: number;
	Minute: number;
	Second: number;
}

export class ViTickCount
{
	public static readonly SECOND: number = 100;
	public static readonly MINUTE: number = ViTickCount.SECOND * 60;
	public static readonly HOUR: number = ViTickCount.MINUTE * 60;
	public static readonly DAY: number = ViTickCount.HOUR * 60;
	public static readonly WEEK: number = ViTickCount.DAY * 60;
	public static readonly time1970: Date = new Date(1970, 1, 1);

	public static GetCount(second: number, minute?: number, hour?: number, day?: number, week?: number): number
	{
		let count = second * ViTickCount.SECOND;
		if (minute)
		{
			count += minute * ViTickCount.MINUTE;
		}
		if (hour)
		{
			count += hour * ViTickCount.HOUR;
		}
		if (day)
		{
			count += day * ViTickCount.DAY;
		}
		if (week)
		{
			count += week * ViTickCount.WEEK;
		}
		return count;
	}

	public static GetTime(count: number): DateStruct
	{
		let result = new DateStruct();
		let reserveCount = count + 50;
		result.Week = ViAssisstant.IntInf(reserveCount / ViTickCount.WEEK);
		reserveCount -= result.Week * ViTickCount.WEEK;
		result.Day = ViAssisstant.IntInf(reserveCount / ViTickCount.DAY);
		reserveCount -= result.Day * ViTickCount.DAY;
		result.Hour = ViAssisstant.IntInf(reserveCount / ViTickCount.HOUR);
		reserveCount -= result.Hour * ViTickCount.HOUR;
		result.Minute = ViAssisstant.IntInf(reserveCount / ViTickCount.MINUTE);
		reserveCount -= result.Minute * ViTickCount.MINUTE;
		result.Second = ViAssisstant.IntInf(reserveCount / ViTickCount.SECOND);
		return result;
	}
}

export class ViTimerInstance
{
	static get Time(): NumberI64
	{
		return ViTimerInstance._globalAccumulateTime;
	}
	static get Time1970(): NumberI64
	{
		return ViTimerInstance._time1970;
	}
	static get LocalTime(): number
	{
		return ViTimerInstance._localAccumulateTime;
	}
	static get Timer(): ViTimer
	{
		return ViTimerInstance._timer;
	}
	static get IsRunning(): boolean
	{
		return ViTimerInstance._timer != null;
	}
	static get StartTime(): NumberI64
	{
		return ViTimerInstance._startAccumulateTime;
	}
	static get DayOffset(): number
	{
		return ViTimerInstance._dayOffset;
	}
	//
	public static Start(accumulateTime: NumberI64, time1970: NumberI64, span: number, rollSize0: number, rollSize1: number): void
	{
		ViTimerInstance._timer = new ViTimer();
		//
		ViTimerInstance._startAccumulateTime.CopyFrom(accumulateTime);
		ViTimerInstance._localAccumulateTime = 0.0;
		ViTimerInstance._globalAccumulateTime.CopyFrom(accumulateTime);
		ViTimerInstance._startTime1970.CopyFrom(time1970);
		ViTimerInstance._time1970.CopyFrom(time1970);
		ViTimerInstance._timer.Start(0, span, rollSize0, rollSize1);
	}
	public static End(): void
	{
		ViTimerInstance._timer.End();
	}
	public static Update(deltaTime: number): void
	{
		if (ViTimerInstance.IsRunning)
		{
			let This = ViTimerInstance;
			let localAccumulateTime = This._localAccumulateTime + deltaTime;
			let localAccumulateTime100 = ViAssisstant.IntInf(localAccumulateTime * 100);
			This._localAccumulateTime = localAccumulateTime;
			//
			This._globalAccumulateTime.CopyFrom(This._startAccumulateTime);
			This._globalAccumulateTime.Add(0, localAccumulateTime100);
			//
			This._time1970.CopyFrom(This._startTime1970);
			This._time1970.Add(0, localAccumulateTime100);
			//
			This._timer.Update(localAccumulateTime100);
		}
	}
	//
	public static SetTime<TListener>(delayTime: number, node: ViTimeNode1<TListener>, listener: TListener, dele: ViDelegate1<ViTimeNodeInterface>): void
	{
		node.SetDelegate(listener, dele);
		node.SetTime(ViAssisstant.IntInf((ViTimerInstance._localAccumulateTime + delayTime) * 100));
		ViTimerInstance._timer.Add(node);
	}
	// public static SetTimeFloat<TListener>(node: ViTimeNode1<TListener>, listener: TListener, fDeltaTime: number, dele: ViDelegate1<ViTimeNodeInterface>)
	// {
	// 	node.SetDelegate(listener, dele);
	// 	node.SetTime(ViTimerInstance._timer.Time + Math.floor(fDeltaTime * 100));
	// 	ViTimerInstance._timer.Add(node);
	// }
	//
	public static SetFreq(node: ViTimeNodeInterface, fOldFreq: number, fNewFreq: number): void
	{
		if (node.IsAttach() == false)//! 如果回调已经发生过了, 则无法进行重新设置
		{
			return;
		}
		// let currentTime: ViTime64 = ViTimerInstance._timer.Time;
		// let delta: ViTime64 = node.Time - currentTime;
		// let deltaTimeOldMod: ViTime64 = (delta > 0) ? delta : 0;
		// let deltaTime: ViTime64 = Math.floor(deltaTimeOldMod * fOldFreq);
		// let deltaTimeNewMod: ViTime64 = Math.floor(deltaTime / fNewFreq);
		// node.SetTime(ViTimerInstance._timer.Time + deltaTimeNewMod);
		// ViTimerInstance._timer.Add(node);
	}
	public static Modify(node: ViTimeNodeInterface, deltaTime: number): void
	{
		if (node.IsAttach() == false)//! 如果回调已经发生过了, 则无法进行重新设置
		{
			return;
		}
		if (node.Time > -deltaTime)
		{
			node.SetTime(node.Time + deltaTime);
		}
		else
		{
			node.SetTime(0);
		}
		ViTimerInstance._timer.Add(node);
	}
	//
	public static GetDayNumber(time1970?: NumberI64, dayOffset?: number): number
	{
		return 0;
		// if (time1970 && dayOffset)
		// {
		// 	return ((time1970 - dayOffset) / ViTickCount.DAY);
		// }
		// else if (time1970)
		// {
		// 	return ((time1970 - ViTimerInstance._dayOffset) / ViTickCount.DAY);
		// }
		// else
		// {
		// 	return ((ViTimerInstance.Time1970 - ViTimerInstance._dayOffset) / ViTickCount.DAY);
		// }
	}
	public static SetDayOffset(value: number): void
	{
		ViTimerInstance._dayOffset = value;
	}
	public static TimeToTime1970(time: NumberI64): NumberI64
	{
		//time + ViTimerInstance.Time1970 - ViTimerInstance.Time
		let time1970 = NumberI64.New(time);
		time1970.Add(ViTimerInstance.Time1970.High, ViTimerInstance.Time1970.Low);
		let negTime = new NumberI64(ViTimerInstance.Time1970.High, ViTimerInstance.Time1970.Low);
		Number64Assistant.Negagte(negTime);
		time1970.Add(negTime.High, negTime.Low);
		return time1970;
	}
	public static Time1970ToTime(time1970: NumberI64): NumberI64
	{
		//iTime1970 + ViTimerInstance.Time - ViTimerInstance.Time1970;
		let time = NumberI64.New(time1970);
		time.Add(ViTimerInstance.Time.High, ViTimerInstance.Time.Low);
		let negTime = new NumberI64(ViTimerInstance.Time.High, ViTimerInstance.Time.Low);
		Number64Assistant.Negagte(negTime);
		time.Add(negTime.High, negTime.Low);
		//time.Mod(-ViTimerInstance.Time1970.High, -ViTimerInstance.Time1970.Low);
		return time;
	}
	//
	public static GetTime<TListener>(node: ViTimeNode1<TListener>): NumberI64
	{
		let time = NumberI64.New(ViTimerInstance._startAccumulateTime);
		time.Add(0, node.Time);
		return time;
	}
	//
	public static GetTime1970<TListener>(node: ViTimeNode1<TListener>): NumberI64
	{
		let time = NumberI64.New(ViTimerInstance._startTime1970);
		time.Add(0, node.Time);
		return time;
	}
	//
	private static _timer: ViTimer = null;
	private static readonly _startAccumulateTime: NumberI64 = new NumberI64(0, 0);
	private static readonly _startTime1970: NumberI64 = new NumberI64(0, 0);
	private static _localAccumulateTime: number = 0;
	private static readonly _globalAccumulateTime: NumberI64 = new NumberI64(0, 0);
	private static readonly _time1970: NumberI64 = new NumberI64(0, 0);
	private static _dayOffset: number = 0;
}

export class ViRealTimerInstance
{
	static get Time(): number
	{
		return ViRealTimerInstance._time;
	}
	//
	static get Timer(): ViTimer
	{
		return ViRealTimerInstance._timer;
	}
	//
	public static Start(span: number, rollSize0: number, rollSize1: number): void
	{
		ViRealTimerInstance._timer = new ViTimer();
		ViRealTimerInstance._timer.Start(0, span, rollSize0, rollSize1);
	}
	public static End(): void
	{
		ViRealTimerInstance._timer.End();
	}
	public static Update(deltaTime: number): void
	{
		ViRealTimerInstance._time += deltaTime;
		ViRealTimerInstance._timer.Update(ViAssisstant.IntInf(ViRealTimerInstance._time * 100));
	}
	//
	public static SetTime<TListener>(delayTime: number, node: ViTimeNode1<TListener>, listener: TListener, dele: ViDelegate1<ViTimeNodeInterface>): void
	{
		node.SetDelegate(listener, dele);
		node.SetTime(ViAssisstant.IntInf((ViRealTimerInstance._time + delayTime) * 100));
		ViRealTimerInstance._timer.Add(node);
	}
	// public static SetTimeFloat<TListener>(node: ViTimeNode1<TListener>, listener: TListener, fDeltaTime: number, dele: ViDelegate1<ViTimeNodeInterface>)
	// {
	// 	node.SetDelegate(listener, dele);
	// 	node.SetTime(ViRealTimerInstance._timer.Time + Math.floor(fDeltaTime * 100));
	// 	ViRealTimerInstance._timer.Add(node);
	// }
	//
	public static SetFreq(node: ViTimeNodeInterface, fOldFreq: number, fNewFreq: number): void
	{
		if (node.IsAttach() == false)//! 如果回调已经发生过了, 则无法进行重新设置
		{
			return;
		}
		// let currentTime: ViTime64 = ViRealTimerInstance._timer.Time;
		// let delta: ViTime64 = node.Time - currentTime;
		// let deltaTimeOldMod: ViTime64 = (delta > 0) ? delta : 0;
		// let deltaTime: ViTime64 = Math.floor(deltaTimeOldMod * fOldFreq);
		// let deltaTimeNewMod: ViTime64 = Math.floor(deltaTime / fNewFreq);
		// node.SetTime(ViRealTimerInstance._timer.Time + deltaTimeNewMod);
		// ViRealTimerInstance._timer.Add(node);
	}
	public static Modify(node: ViTimeNodeInterface, deltaTime: number): void
	{
		if (node.IsAttach() == false)//! 如果回调已经发生过了, 则无法进行重新设置
		{
			return;
		}
		if (node.Time > -deltaTime)
		{
			node.SetTime(node.Time + deltaTime);
		}
		else
		{
			node.SetTime(0);
		}
		ViRealTimerInstance._timer.Add(node);
	}
	//
	private static _timer: ViTimer = null;
	private static _time: number = 0;
}

