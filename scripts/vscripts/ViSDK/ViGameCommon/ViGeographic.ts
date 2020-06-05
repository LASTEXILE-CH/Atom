import { ViMath2D, ViMathDefine } from "../ViMath/ViMathDefine";
import { ViVector3 } from "../ViMath/ViVector3";

export class ViGeographic
{
	public static readonly FRONT_X: number = 0.0;
	public static readonly FRONT_Y: number = -1.0;
	public static readonly FRONT = new ViVector3(ViGeographic.FRONT_X, ViGeographic.FRONT_Y, 0);
	public static readonly VERTICAL = new ViVector3(0, 0, 1);
	//
	public static GetDirection(x: number, y: number): number
	{
		let desAngle: number = ViMath2D.GetAngle(x, y);
		let srcAngle: number = ViMath2D.GetAngle(ViGeographic.FRONT.x, ViGeographic.FRONT.y);
		let rotateAngle: number = desAngle - srcAngle;
		// 映射到(-M_PI, M_PI)区间上来
		if (rotateAngle > ViMathDefine.PI)
			rotateAngle -= ViMathDefine.PI_X2;
		else if (rotateAngle < -ViMathDefine.PI)
			rotateAngle += ViMathDefine.PI_X2;
		return rotateAngle;
	}
	public static GetDirection2(from: ViVector3, to: ViVector3): number
	{
		let x = to.x - from.x;
		let y = to.y - from.y;
		return ViGeographic.GetDirection(x, y);
	}
	public static GetDirection3(from: ViVector3, to: ViVector3, result: ViVector3): void
	{
		result.x = to.x - from.x;
		result.y = to.y - from.y;
		result.z = to.z - from.z;
		result.Normalize();
	}
	//
	private static readonly CACHE_Rotate = new ViVector3();
	public static Rotate(direction: ViVector3, angle: number): void
	{
		let rotate = ViGeographic.CACHE_Rotate;
		rotate.CopyFrom(direction);
		//! 逆时针旋转
		let sin = Math.sin(angle);
		let cos = Math.cos(angle);
		//! 顺时针旋转
		//float fSin = sin(-fRotateAngle);
		//float fCon = cos(-fRotateAngle);
		direction.x = cos * rotate.x - sin * rotate.y;
		direction.y = sin * rotate.x + cos * rotate.y;
	}
	//
	public static RotateRight90(direction: ViVector3): void
	{
		let temp = direction.x;
		direction.x = direction.y;
		direction.y = -temp;
	}
	//
	public static RotateLeft90(direction: ViVector3): void
	{
		let temp = direction.x;
		direction.x = -direction.y;
		direction.y = temp;
	}
	//
	public static GetRotate(angle: number, direction: ViVector3): void
	{
		//! 逆时针旋转
		let sin = Math.sin(angle);
		let cos = Math.cos(angle);
		//! 顺时针旋转
		//float fSin = sin(-fRotateAngle);
		//float fCon = cos(-fRotateAngle);
		direction.x = cos * ViGeographic.FRONT.x - sin * ViGeographic.FRONT.y;
		direction.y = sin * ViGeographic.FRONT.x + cos * ViGeographic.FRONT.y;
		direction.z = 0.0;
	}
	//
	public static GetDistance(pos1: ViVector3, pos2: ViVector3): number
	{
		return ViGeographic.GetHorizontalDistance(pos1, pos2);
	}
	public static GetDistance2(pos1: ViVector3, pos2: ViVector3): number
	{
		return ViGeographic.GetHorizontalDistance2(pos1, pos2);
	}
	//
	public static GetHorizontalDistance(pos1: ViVector3, pos2: ViVector3): number
	{
		let deltaX = pos1.x - pos2.x;
		let deltaY = pos1.y - pos2.y;
		return ViMathDefine.Sqrt((deltaX * deltaX) + (deltaY * deltaY));
	}
	public static GetHorizontalDistance2(pos1: ViVector3, pos2: ViVector3): number
	{
		let deltaX = pos1.x - pos2.x;
		let deltaY = pos1.y - pos2.y;
		return (deltaX * deltaX) + (deltaY * deltaY);
	}
	// public static ViVector3 GetIntersectionPosByDist(ViVector3 rootPos, ViVector3 toPos, float distance)//! fDistance = 0, reach kRootPos, fDistance< 0 , penetrate this
	// {
	// 	float fSpan = GetHorizontalDistance(rootPos, toPos);
	// 	if (fSpan != 0.0f)
	// 	{
	// 		float fPerc = distance / fSpan;
	// 		float fDeltaX = toPos.x - rootPos.x;
	// 		float fDeltaY = toPos.y - rootPos.y;
	// 		ViVector3 kDest = new ViVector3(rootPos.x + fDeltaX * fPerc, rootPos.y + fDeltaY * fPerc, rootPos.z);
	// 		float diff = GetHorizontalDistance(rootPos, kDest);
	// 		ViDebuger.AssertError(Math.Abs(diff - Math.Abs(distance)) < 0.1f);
	// 		return new ViVector3(rootPos.x + fDeltaX * fPerc, rootPos.y + fDeltaY * fPerc, rootPos.z);
	// 	}
	// 	else
	// 	{
	// 		return rootPos;
	// 	}
	// }
}