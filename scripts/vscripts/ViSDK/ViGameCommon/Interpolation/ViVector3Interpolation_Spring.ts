import { ViMathDefine } from "../../ViMath/ViMathDefine";
import { ViVector3, ViVector3Assisstant } from "../../ViMath/ViVector3";

export class ViVector3Interpolation_Spring
{
	public get Value(): ViVector3 { return this._value; }
	public get SpringRate(): number { return this._springRate; }
	public get Speed(): ViVector3 { return this._speed; }
	public get Accelerate(): ViVector3 { return this._accelerate; }
	public get TimeScale(): number { return this._timeScale; }
	public get IsFiltering(): boolean { return this._speed.NotEqual(ViVector3.ZERO); }
	public TimeSpan = 1.0 / 120.0;
	//
	public Init(springRate: number, speedFriction: number, timeScale: number, speed: ViVector3): void
	{
		this._springRate = springRate;
		this._speedFriction = speedFriction;
		this._timeScale = timeScale;
		this._speed.CopyFrom(speed);
	}
	//
	public Update(destValue: ViVector3, deltaTime: number): boolean
	{
		if (ViVector3.Distance(destValue, this._value) <= ViVector3.Epsilon && this._speed.Equal(ViVector3.ZERO))
		{
			return false;
		}
		let span = this.TimeSpan;
		while (deltaTime > span)
		{
			this._Update(destValue, span);
			deltaTime -= span;
		}
		//
		this._Update(destValue, deltaTime);
		//
		return true;
	}
	//
	private static readonly CACHE_Update_Diff = new ViVector3();
	private static readonly CACHE_Update_OldValue = new ViVector3();
	private static readonly CACHE_Update_OldYaw = new ViVector3();
	private static readonly CACHE_Update_NewYaw = new ViVector3();
	private _Update(destValue: ViVector3, deltaTime: number): void
	{
		let diff = ViVector3Interpolation_Spring.CACHE_Update_Diff;
		let oldValue = ViVector3Interpolation_Spring.CACHE_Update_OldValue;
		let oldYaw = ViVector3Interpolation_Spring.CACHE_Update_OldYaw;
		let newYaw = ViVector3Interpolation_Spring.CACHE_Update_NewYaw;
		//
		let _value = this._value;
		let _speed = this._speed;
		let _accelerate = this._accelerate;
		let _sprintCount = this._sprintCount;
		//
		ViVector3Assisstant.Del(destValue, _value, diff);
		let diffLen = diff.Length;
		diff.Normalize();
		deltaTime *= this._timeScale;
		let springForce = this._springRate * diffLen;
		ViVector3Assisstant.AddExx(diff, springForce, _speed, -this._speedFriction, _accelerate);
		ViVector3Assisstant.AddEx(_speed, _accelerate, deltaTime, _speed);
		oldValue.CopyFrom(_value);
		ViVector3Assisstant.AddEx(_value, _speed, deltaTime, _value);
		if (_sprintCount > 0)
		{
			ViVector3Assisstant.Del(oldValue, destValue, oldYaw);
			ViVector3Assisstant.Del(_value, destValue, newYaw);
			oldYaw.Normalize();
			newYaw.Normalize();
			let deltaYaw = Math.acos(ViMathDefine.Clamp01(ViVector3.Dot(oldYaw, newYaw)));
			_sprintCount -= ViMathDefine.Abs(deltaYaw / ViMathDefine.PI);
			if (_sprintCount <= 0)
			{
				_value.CopyFrom(destValue);
				_speed.CopyFrom(ViVector3.ZERO);
				_accelerate.CopyFrom(ViVector3.ZERO);
			}
		}
		//
		this._sprintCount = _sprintCount;
	}
	//
	public StartRingCount(value: number): void
	{
		this._sprintCount = value;
	}
	public EndRingCount(): void
	{
		this._sprintCount = 0;
	}
	//
	public Set(value: ViVector3, stop: boolean): void
	{
		this._value.CopyFrom(value);
		if (stop)
		{
			this._speed.CopyFrom(ViVector3.ZERO);
			this._accelerate.CopyFrom(ViVector3.ZERO);
		}
	}
	//
	public SetEx(value: ViVector3, speed: ViVector3, acc: ViVector3): void
	{
		this._value.CopyFrom(value);
		this._speed.CopyFrom(speed);
		this._accelerate.CopyFrom(acc);
	}
	//
	private _springRate = 20.0;
	private readonly _speed = new ViVector3();
	private readonly _value = new ViVector3();
	private _speedFriction = 3.0;
	private _timeScale = 1.0;
	private readonly _accelerate = new ViVector3();
	private _sprintCount = 0;
	// 	//质量=1.0
}
