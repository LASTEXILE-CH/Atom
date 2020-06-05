import { ViAssisstant } from "../../ViSystem/ViSystemConfig";
import { ViDebuger } from "../../ViSystem/ViDebuger";
import { ViMathDefine } from "../../ViMath/ViMathDefine";

export class ViValueInterpolation
{
	public get Value(): number { return this._value; }
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
	public Update(destValue: number, deltaTime: number): boolean
	{
		let _value = this._value;
		if (destValue == _value)
		{
			return false;
		}
		//
		let _accelerate = this._accelerate;
		let _speed = this._speed;
		let diff = destValue - _value;
		deltaTime *= this._timeScale;
		if (diff > 0.0)
		{
			let newSpeed = _speed + _accelerate * deltaTime;
			let brakingSpeed = Math.sqrt(diff * _accelerate * 2.0);
			_speed = ViMathDefine.Min(ViMathDefine.Clamp(newSpeed, this._minSpeed, this._maxSpeed), brakingSpeed);
			let deltaDist = _speed * deltaTime;
			_value += deltaDist;
			if (_value >= destValue)
			{
				_value = destValue;
				_speed = 0.0;
			}
		}
		else
		{
			let newSpeed = _speed - _accelerate * deltaTime;
			let brakingSpeed = -Math.sqrt(-diff * _accelerate * 2.0);
			_speed = ViMathDefine.Max(ViMathDefine.Clamp(newSpeed, -this._maxSpeed, -this._minSpeed), brakingSpeed);
			let deltaDist = _speed * deltaTime;
			_value += deltaDist;
			if (_value <= destValue)
			{
				_value = destValue;
				_speed = 0.0;
			}
		}
		//
		this._value = _value;
		this._speed = _speed;
		//
		return true;
	}
	//
	public Set(value: number, stop: boolean): void
	{
		this._value = value;
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
	private _value = 0.0;
}
