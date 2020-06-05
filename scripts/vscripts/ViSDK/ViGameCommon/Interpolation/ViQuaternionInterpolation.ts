import { ViQuaternion } from "../../ViMath/ViQuaternion";
import { ViMathDefine } from "../../ViMath/ViMathDefine";
import { ViDebuger } from "../../ViSystem/ViDebuger";

export class ViQuaternionInterpolation
{
	public get Value(): ViQuaternion { return this._value; }
	public get Accelerate(): number { return this._accelerate; }
	public get Speed(): number { return this._speed; }
	public get MinSpeed(): number { return this._minSpeed; }
	public get MaxSpeed(): number { return this._maxSpeed; }
	public get IsFiltering(): boolean { return this._speed != 0.0; }
	//
	public Update(desireValue: ViQuaternion, delatTime: number): boolean
	{
		let diffLen = ViQuaternion.Distance(desireValue, this._value);
		if (diffLen == 0.0)
		{
			return false;
		}
		let newSpeed = this._speed + this._accelerate * delatTime;
		let brakingSpeed = ViMathDefine.Sqrt(diffLen * this._accelerate * 2.0);
		this._speed = ViMathDefine.Min(ViMathDefine.Clamp(newSpeed, this._minSpeed, this._maxSpeed), brakingSpeed);
		let frontDistance = this._speed * delatTime;
		if (frontDistance > diffLen)
		{
			this._value.CopyFrom(desireValue);
			this._speed = 0.0;
		}
		else
		{
			ViQuaternion.Lerp(this._value, desireValue, frontDistance / diffLen, this._value);
		}
		return true;
	}
	//
	public Set(value: ViQuaternion, stop: boolean): void
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
	private readonly _value = new ViQuaternion();
}
