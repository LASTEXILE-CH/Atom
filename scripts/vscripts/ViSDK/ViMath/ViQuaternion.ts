import { ViSerialiable } from "../ViSystem/ViSystemType";
import { ViVector3 } from "./ViVector3";
import { ViStringBuilder } from "../ViSystem/ViStringBuilder";
import { ViMathDefine } from "./ViMathDefine";
import { ViStringIStream } from "../ViSystem/ViStringIStream";
import { ViOStream } from "../ViSystem/ViOStream";
import { ViIStream } from "../ViSystem/ViIStream";

export class ViQuaternion implements ViSerialiable
{
	public static readonly Zero = new ViQuaternion(0, 0, 0, 0);
	public static readonly Origin = new ViQuaternion(0, 0, 0, 0);
	public static readonly XAxis = new ViQuaternion(1, 0, 0, 0);
	public static readonly YAxis = new ViQuaternion(0, 1, 0, 0);
	public static readonly ZAxis = new ViQuaternion(0, 0, 1, 0);
	public static readonly WAxis = new ViQuaternion(0, 0, 0, 1);
	public static readonly Epsilon: number = 1E-05;
	//
	private static readonly CACHE_FromAxisAngle_Axis = new ViVector3();
	public static FromAxisAngle(axis: ViVector3, radians: number, result: ViQuaternion): void
	{
		let localAxis = ViQuaternion.CACHE_FromAxisAngle_Axis;
		localAxis.CopyFrom(axis);
		let sin = Math.sin(radians * 0.5);
		let cos = Math.cos(radians * 0.5);
		localAxis.Normalize();
		result.x = localAxis.x * sin;
		result.y = localAxis.y * sin;
		result.z = localAxis.z * sin;
		result.w = cos;
	}
	//
	public static FromYawPitchRoll(yaw: number, pitch: number, roll: number, result: ViQuaternion): void
	{
		let halfRoll = roll * 0.5;
		let halfPitch = pitch * 0.5;
		let halfYaw = yaw * 0.5;
		let sinRoll = Math.sin(halfRoll);
		let cosRoll = Math.cos(halfRoll);
		let sinPitch = Math.sin(halfPitch);
		let cosPitch = Math.cos(halfPitch);
		let sinYaw = Math.sin(halfYaw);
		let cosYaw = Math.cos(halfYaw);
		result.x = (cosYaw * sinPitch * cosRoll) + (sinYaw * cosPitch * sinRoll);
		result.y = (cosYaw * cosPitch * sinRoll) - (sinYaw * sinPitch * cosRoll);
		result.z = (sinYaw * cosPitch * cosRoll) - (cosYaw * sinPitch * sinRoll);
		result.w = (cosYaw * cosPitch * cosRoll) + (sinYaw * sinPitch * sinRoll);
	}
	//
	// public static Multiply(left: ViQuaternion, right: ViQuaternion, result: ViQuaternion): void
	// {
	// 	let E = (left.x + left.y) * (right.x + right.z);
	// 	let F = (left.y - left.x) * (right.x - right.z);
	// 	let G = (left.w + left.z) * (right.w - right.y);
	// 	let H = (left.w - left.z) * (right.w + right.y);
	// 	let A = F - E;
	// 	let B = F + E;
	// 	result.x = (left.w - left.x) * (right.z + right.y) + (B + G - H) * 0.5;
	// 	result.y = (left.y - left.z) * (right.z - right.y) + (A + G + H) * 0.5;
	// 	result.z = (left.z + left.y) * (right.w - right.x) + (B - G + H) * 0.5;
	// 	result.w = (left.w + left.x) * (right.w + right.x) + (A - G - H) * 0.5;
	// }
	// //
	// public static Transform(source: ViVector3, rotation: ViQuaternion, result: ViVector3): void
	// {
	// 	var x = source.x, y = source.y, z = source.z, qx = rotation.x, qy = rotation.y, qz = rotation.z, qw = rotation.w,
	// 		ix = qw * x + qy * z - qz * y, iy = qw * y + qz * x - qx * z, iz = qw * z + qx * y - qy * x, iw = -qx * x - qy * y - qz * z;
	// 	result.x = ix * qw + iw * -qx + iy * -qz - iz * -qy;
	// 	result.y = iy * qw + iw * -qy + iz * -qx - ix * -qz;
	// 	result.z = iz * qw + iw * -qz + ix * -qy - iy * -qx;
	// }	
	//
	public static Add(a: ViQuaternion, b: ViQuaternion, result: ViQuaternion): void
	{
		result.x = a.x + b.x;
		result.y = a.y + b.y;
		result.z = a.z + b.z;
		result.w = a.w + b.w;
	}
	//
	public static Del(a: ViQuaternion, b: ViQuaternion, result: ViQuaternion): void
	{
		result.x = a.x - b.x;
		result.y = a.y - b.y;
		result.z = a.z - b.z;
		result.w = a.w - b.w;
	}
	//
	public static DotProduct(a: ViQuaternion, b: ViQuaternion): number
	{
		return a.x * b.x + a.y * b.y + a.z * b.z + a.w * b.w;
	}
	//
	public static Lerp(a: ViQuaternion, b: ViQuaternion, t: number, result: ViQuaternion): void
	{
		let fScale0 = 0;
		let fScale1 = 0;
		let dCos = ViQuaternion.DotProduct(a, b);
		if ((1.0 - Math.abs(dCos)) > 0)
		{
			let dTemp = Math.acos(Math.abs(dCos));
			let dSin = Math.sin(dTemp);
			fScale0 = Math.sin((1.0 - t) * dTemp) / dSin;
			fScale1 = Math.sin(t * dTemp) / dSin;
		}
		else
		{
			fScale0 = 1.0 - t;
			fScale1 = t;
		}
		if (dCos < 0.0)
		{
			fScale1 = -fScale1;
		}
		result.x = (a.x * fScale0) + (b.x * fScale1);
		result.y = (a.y * fScale0) + (b.y * fScale1);
		result.z = (a.z * fScale0) + (b.z * fScale1);
		result.w = (a.w * fScale0) + (b.w * fScale1);
	}
	//
	public static Equal(a: ViQuaternion, b: ViQuaternion): boolean
	{
		return a.x == b.x && a.y == b.y && a.z == b.z && a.w == b.w;
	}
	//
	public static NotEqual(a: ViQuaternion, b: ViQuaternion): boolean
	{
		return a.x != b.x || a.y != b.y || a.z != b.z || a.w != b.w;
	}
	//
	public static Distance(a: ViQuaternion, b: ViQuaternion): number
	{
		let cos = ViQuaternion.DotProduct(a, b);
		if (Math.abs(cos) >= 1)
		{
			return 0;
		}
		else
		{
			return Math.acos(cos);
		}
	}
	//
	public x: number = 0;
	public y: number = 0;
	public z: number = 0;
	public w: number = 0;
	//
	public get Length(): number { return ViMathDefine.Sqrt((this.x * this.x) + (this.y * this.y) + (this.z * this.z)); }
	//
	public constructor(x?: number, y?: number, z?: number, w?: number)
	{
		if (x != undefined)
		{
			this.x = x;
		}
		if (y != undefined)
		{
			this.y = y;
		}
		if (z != undefined)
		{
			this.z = z;
		}
		if (w != undefined)
		{
			this.w = w;
		}
	}
	//
	public Normalize(): void
	{
		let length = this.Length;
		if (length > 0)
		{
			this.x /= length;
			this.y /= length;
			this.z /= length;
			this.w /= length;
		}
	}
	//
	public ToString(): string
	public ToString(format?: number): string
	public ToString(format?: any): string { return "(" + this.x + "," + this.y + "," + this.z + ")"; }
	public toString(): string
	{
		return this.ToString();
	}
	//
	public Print(stream: ViStringBuilder): void
	{
		let Append = stream.Append.bind(stream);
		Append("(");
		Append(this.x.toString());
		Append(", ");
		Append(this.y.toString());
		Append(", ");
		Append(this.z.toString());
		Append(", ");
		Append(this.w.toString());
		Append(")");
	}
	public PrintTo(stream: ViOStream): void
	{
		let IntNear = ViMathDefine.IntNear;
		let AppendInt16 = stream.AppendInt16.bind(stream);
		AppendInt16(IntNear(this.x * 10));
		AppendInt16(IntNear(this.y * 10));
		AppendInt16(IntNear(this.z * 10));
		AppendInt16(IntNear(this.w * 10));
	}
	public ReadFrom(stream: ViIStream): void
	{
		let ReadInt16 = stream.ReadInt16.bind(stream);
		this.x = ReadInt16() * 0.1;
		this.y = ReadInt16() * 0.1;
		this.z = ReadInt16() * 0.1;
		this.w = ReadInt16() * 0.1;
	}
	public ReadFromString(stream: ViStringIStream): void
	{
		let ReadFloat32 = stream.ReadFloat32.bind(stream);
		this.x = ReadFloat32();
		this.y = ReadFloat32();
		this.z = ReadFloat32();
		this.w = ReadFloat32();
	}
	public CopyFrom(other: ViQuaternion): void
	{
		this.x = other.x;
		this.y = other.y;
		this.z = other.z;
		this.w = other.w;
	}
	//
}