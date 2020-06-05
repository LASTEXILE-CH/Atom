import { ViVector3, ViVector3Assisstant } from "../../ViMath/ViVector3";
import { ViMotorInterface } from "./ViMotorInterface";

export class ViTrackMotor extends ViMotorInterface
{
	public Start(from: ViVector3, to: ViVector3, duration: number): void
	{
		super.Start(from, to, duration);
		//
		ViVector3Assisstant.Del(to, from, this.Direction);
		this.Direction.Normalize();
	}
	//
	public _Update(deltaTime: number, target: ViVector3): void
	{
		ViVector3Assisstant.Del(this.Target, this.Translate, this.Direction);
		this.Direction.Normalize();
		ViVector3Assisstant.Set(this.Direction, this.Speed, this.Velocity);
	}
}
