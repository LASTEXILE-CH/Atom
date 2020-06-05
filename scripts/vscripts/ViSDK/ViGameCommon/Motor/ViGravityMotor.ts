import { ViAssisstant } from "../../ViSystem/ViSystemConfig";
import { ViVector3, ViVector3Assisstant } from "../../ViMath/ViVector3";
import { ViMath2D } from "../../ViMath/ViMathDefine";
import { ViMotorInterface } from "./ViMotorInterface";

export class ViGravityMotor extends ViMotorInterface
{
	public static readonly GRAVITY: number = 9.8;
	public set Gravity(value: number) { this._gravityAcc = ViAssisstant.Clamp(value, 0.1 * ViGravityMotor.GRAVITY, 5.0 * ViGravityMotor.GRAVITY); }
	public Start(from: ViVector3, to: ViVector3, duration: number): void
	{
		super.Start(from, to, duration);
		//
		ViVector3Assisstant.Del(to, from, this.Direction);
		this.Direction.z = 0.0;
		this.Direction.Normalize();
		let distanceH = ViMath2D.Length(to.x, to.y, from.x, from.y);
		let distanceV = to.z - from.z;
		let time = distanceV / this._gravityAcc / duration;
		let preDeltaTime = duration * 0.5 + time;
		let speedH = distanceH / duration;
		this.Velocity.x = this.Direction.x * speedH;
		this.Velocity.y = this.Direction.y * speedH;
		this.Velocity.z = preDeltaTime * this._gravityAcc;
		this.Direction.CopyFrom(this.Velocity);
		this.Direction.Normalize();
	}
	//
	public _Update(deltaTime: number, target: ViVector3): void
	{
		let distanceH = ViMath2D.Length(target.x, target.y, this.Translate.x, this.Translate.y);
		let distanceV = target.z - this.Translate.z;
		let speedH = distanceH / this.Duration;
		this._gravityAcc = -2.0 * (distanceV / (this.Duration * this.Duration) - this.Velocity.z / this.Duration);
		this._gravityAcc = ViAssisstant.Clamp(this._gravityAcc, -ViGravityMotor.GRAVITY, 5.0 * ViGravityMotor.GRAVITY);
		ViVector3Assisstant.Del(this.Target, this.Translate, this.Direction);
		this.Direction.z = 0.0;
		this.Direction.Normalize();
		this.Velocity.x = this.Direction.x * speedH;
		this.Velocity.y = this.Direction.y * speedH;
		this.Velocity.z -= this._gravityAcc * deltaTime;
		this.Direction.CopyFrom(this.Velocity);
		this.Direction.Normalize();
	}
	//
	private _gravityAcc = ViGravityMotor.GRAVITY;
}