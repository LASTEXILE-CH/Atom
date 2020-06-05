import { ViAssisstant } from "../../ViSystem/ViSystemConfig";
import { ViDebuger } from "../../ViSystem/ViDebuger";
import { ViMathDefine } from "../../ViMath/ViMathDefine";
import { ViAngle } from "../../ViMath/ViAngle";

export class ViAngleInterpolation
{
    public get Value(): number { return this._value; }
    public get Accelerate(): number { return this._accelerate; }
    public get Speed(): number { return this._speed; }
    public get MinSpeed(): number { return this._minSpeed; }
    public get MaxSpeed(): number { return this._maxSpeed; }
    public get IsFiltering(): boolean { return this._speed != 0.0; }
    //
    public Set(value: number, stop: boolean): void
    {
        this._value = ViAngle.Normalize(value);
        if (stop)
        {
            this._speed = 0;
        }
    }
    public SetAccelerate(value: number): void
    {
        this._accelerate = ViMathDefine.Max(0.0, value);
    }
    public SetMinSpeed(value: number): void
    {
        this._minSpeed = ViMathDefine.Max(0.0, value);
    }
    public SetMaxSpeed(value: number): void
    {
        this._maxSpeed = ViMathDefine.Max(0.0, value);
    }
    //
    public Update(newValue: number, deltaTime: number): boolean
    {
		let _value = this._value;
        if (newValue == this._value)
        {
            return false;
		}
		//
		let _accelerate = this._accelerate;
		let _speed = this._speed;
		//
        let diff = newValue - _value;
        diff = ViAngle.Normalize(diff);
        let maxRot = 0.0;
        if (diff > 0.0)
        {
            _speed = ViAssisstant.Abs(_speed);
            let newSpeed = _speed + _accelerate * deltaTime;
            let brakingSpeed = ViAssisstant.Sqrt(diff * _accelerate * 2.0);
            _speed = ViAssisstant.Min(ViAssisstant.Clamp(newSpeed, this._minSpeed, this._maxSpeed), brakingSpeed);
            maxRot = _speed * deltaTime;
        }
        else
        {
            _speed = -ViAssisstant.Abs(_speed);
            let newSpeed = _speed - _accelerate * deltaTime;
            let brakingSpeed = -ViAssisstant.Sqrt(-diff * _accelerate * 2.0);
            _speed = ViMathDefine.Max(ViMathDefine.Clamp(newSpeed, -this._maxSpeed, -this._minSpeed), brakingSpeed);
            maxRot = _speed * deltaTime;
        }
        if (ViAssisstant.Abs(diff) < ViAssisstant.Abs(maxRot))
        {
            _value = newValue;
            _speed = 0.0;
        }
        else
        {
            _value += maxRot;
		}
		//
        this._value = ViAngle.Normalize(_value);
		this._speed = _speed;
		//
        return true;
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
    private _value = 0.0;
    private _accelerate = 2.0;
    private _speed = 0.0;
    private _minSpeed = 0.0;
    private _maxSpeed = 4.0;
}