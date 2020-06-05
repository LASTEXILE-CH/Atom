import { ViAssisstant } from "../../ViSystem/ViSystemConfig";
import { ViDebuger } from "../../ViSystem/ViDebuger";
import { ViMathDefine } from "../../ViMath/ViMathDefine";
import { ViVector3, ViVector3Assisstant } from "../../ViMath/ViVector3";

export class ViVector3Interpolation
{
	public get Value(): ViVector3 { return this._value; }
	public get Accelerate(): number { return this._accelerate; }
	public set Accelerate(value: number) { this._accelerate = value; }
	public get Speed(): number { return this._speed; }
	public get MinSpeed(): number { return this._minSpeed; }
	public set MinSpeed(value: number) { this._minSpeed = value; }
	public get MaxSpeed(): number { return this._maxSpeed; }
	public set MaxSpeed(value: number) { this._maxSpeed = value; }
	public get TimeScale(): number { return this._timeScale; }
	public set TimeScale(value: number) { this._timeScale = value; }
	public get IsFiltering(): boolean { return this._speed != 0.0; }
	//
	private static readonly CACHE_Update_Diff = new ViVector3();
	public Update(desireValue: ViVector3, deltaTime: number): boolean
	{
		let diff = ViVector3Interpolation.CACHE_Update_Diff;
		ViVector3Assisstant.Del(desireValue, this._value, diff);
		let diffLen = diff.Length;
		if (diffLen == 0.0)
		{
			return false;
		}
		//
		let _value = this._value;
		let _speed = this._speed;
		let _accelerate = this._accelerate;
		//
		deltaTime *= this._timeScale;
		let newSpeed = _speed + _accelerate * deltaTime;
		let brakingSpeed = ViAssisstant.Sqrt(diffLen * _accelerate * 2.0);
		_speed = ViMathDefine.Min(ViMathDefine.Clamp(newSpeed, this._minSpeed, this._maxSpeed), brakingSpeed);
		let frontDistance = _speed * deltaTime;
		if (frontDistance > diffLen)
		{
			_value.CopyFrom(desireValue);
			_speed = 0.0;
		}
		else
		{
			diff.Normalize();
			ViVector3Assisstant.AddEx(_value, diff, frontDistance, _value);
		}
		//
		this._speed = _speed;
		//
		return true;
	}
	//
	public Set(value: ViVector3, stop: boolean): void
	{
		this._value.CopyFrom(value);
		if (stop)
		{
			this._speed = 0;
		}
	}
	//
	public SetSample(distance: number, duration: number, minSpeedScale?: number): void
	{
		if (minSpeedScale == undefined)
		{
			minSpeedScale = 0.0;
		}
		ViDebuger.AssertWarning(distance >= 0, "distance >= 0");
		ViDebuger.AssertWarning(duration >= 0, "duration >= 0");
		let avgSpeed = distance / duration;
		this._minSpeed = avgSpeed * minSpeedScale;
		this._maxSpeed = avgSpeed * (2.0 - minSpeedScale);
		this._accelerate = 2.0 * (this._maxSpeed - this._minSpeed) / duration;
	}
	//
	private _accelerate = 2.0;
	private _speed = 0.0;
	private _minSpeed = 0.0;
	private _maxSpeed = 4.0;
	private _timeScale = 1.0;
	private readonly _value = new ViVector3();
}

