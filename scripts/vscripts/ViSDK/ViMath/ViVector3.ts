import { ViSerialiable, ViMemoryAllocator } from "../ViSystem/ViSystemType";
import { ViStringIStream } from "../ViSystem/ViStringIStream";
import { ViStringBuilder } from "../ViSystem/ViStringBuilder";
import { ViMathDefine } from "./ViMathDefine";
import { ViOStream } from "../ViSystem/ViOStream";
import { ViIStream } from "../ViSystem/ViIStream";

export class ViVector3 implements ViSerialiable
{
    public static readonly CacheAllocator = new ViMemoryAllocator<ViVector3>(ViVector3, "ViVector3");
    public static readonly Epsilon: number = 1E-05;
    public static readonly ZERO = new ViVector3(0, 0, 0);
    public static readonly UNIT = new ViVector3(1, 1, 1);
    public static readonly UNIT_X = new ViVector3(1, 0, 0);
    public static readonly UNIT_Y = new ViVector3(0, 1, 0);
    public static readonly UNIT_Z = new ViVector3(0, 0, 1);
    //
    private static readonly CACHE_VALUE_0 = new ViVector3();
    private static readonly CACHE_VALUE_1 = new ViVector3();
    //
    public x: number = 0;
    public y: number = 0;
    public z: number = 0;
    //
    public get Length(): number { return ViMathDefine.Sqrt((this.x * this.x) + (this.y * this.y) + (this.z * this.z)); }
    public get Length2() { return ((this.x * this.x) + (this.y * this.y) + (this.z * this.z)); }
    public constructor(x?: number, y?: number, z?: number)
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
    }
    //
    public Scale(scale: number): void
    {
        this.x *= scale;
        this.y *= scale;
        this.z *= scale;
    }
    public ScaleEx(scale: ViVector3): void
    {
        this.x *= scale.x;
        this.y *= scale.y;
        this.z *= scale.z;
    }
    public Normalize(): void
    {
        let len = this.Length;
        if (len > 1E-05)
        {
            this.x /= len;
            this.y /= len;
            this.z /= len;
        }
    }
    public GetNormalized(): ViVector3
    {
        let value = new ViVector3();
        value.Normalize();
        return value;
    }
    //
    public static Dot(lhs: ViVector3, rhs: ViVector3): number
    {
        return (((lhs.x * rhs.x) + (lhs.y * rhs.y)) + (lhs.z * rhs.z));
    }
    public static Cross(v1: ViVector3, v2: ViVector3, result: ViVector3): ViVector3
    {
        result.x = (v1.y * v2.z) - (v1.z * v2.y);
        result.y = (v1.z * v2.x) - (v1.x * v2.z);
        result.z = (v1.x * v2.y) - (v1.y * v2.x);
        return result;
    }
    public static Project(value: ViVector3, direction: ViVector3, result: ViVector3): void
    {
        let len = this.Dot(value, direction);
        if (len > ViMathDefine.Epsilon)
        {
            result.x = direction.x * len;
            result.y = direction.y * len;
            result.z = direction.z * len;
        }
        else
        {
            result = ViVector3.ZERO;
        }
    }
    public static Exclude(value: ViVector3, direction: ViVector3, result: ViVector3): void
    {
        let len = this.Dot(value, direction);
        if (len > ViMathDefine.Epsilon)
        {
            result.x = value.x - direction.x * len;
            result.y = value.y - direction.y * len;
            result.z = value.z - direction.z * len;
        }
        else
        {
            result = value;
        }
    }
    public static Angle(from: ViVector3, to: ViVector3): number
    {
        ViVector3.CACHE_VALUE_0.CopyFrom(from);
        ViVector3.CACHE_VALUE_0.Normalize();
        ViVector3.CACHE_VALUE_1.CopyFrom(to);
        ViVector3.CACHE_VALUE_1.Normalize();
        return (ViMathDefine.Acos(ViMathDefine.Clamp(ViVector3.Dot(ViVector3.CACHE_VALUE_0, ViVector3.CACHE_VALUE_1), -1, 1)));
    }
    public static Distance(a: ViVector3, b: ViVector3): number
    {
        let deltaX = a.x - b.x;
        let deltaY = a.y - b.y;
        let deltaZ = a.z - b.z;
        return ViMathDefine.Sqrt((deltaX * deltaX) + (deltaY * deltaY) + (deltaZ * deltaZ));
    }
    public static Distance2(a: ViVector3, b: ViVector3): number
    {
        let deltaX = a.x - b.x;
        let deltaY = a.y - b.y;
        let deltaZ = a.z - b.z;
        return (deltaX * deltaX) + (deltaY * deltaY) + (deltaZ * deltaZ);
    }
    public static DistanceH(a: ViVector3, b: ViVector3): number
    {
        let deltaX = a.x - b.x;
        let deltaY = a.y - b.y;
        return ViMathDefine.Sqrt((deltaX * deltaX) + (deltaY * deltaY));
    }
    public static DistanceH2(a: ViVector3, b: ViVector3): number
    {
        let deltaX = a.x - b.x;
        let deltaY = a.y - b.y;
        return (deltaX * deltaX) + (deltaY * deltaY);
    }
    // public static ClampMagnitude(vector: ViVector3, maxLength: number): ViVector3
    // {
    //     if (vector.Length2 > (maxLength * maxLength))
    //     {
    //         return ViVector3.Multiply(vector.GetNormalized(), maxLength);
    //     }
    //     return vector;
    // }
    // public static Add(a: ViVector3, b: ViVector3): ViVector3
    // {
    //     return new ViVector3(a.x + b.x, a.y + b.y, a.z + b.z);
    // }
    // public static Subtract(a: ViVector3, b: ViVector3): ViVector3;
    // public static Subtract(a: ViVector3): ViVector3;
    // public static Subtract(a: any, b?: any): ViVector3
    // {
    //     if (b)
    //     {
    //         return new ViVector3(a.x - b.x, a.y - b.y, a.z - b.z);
    //     }
    //     else
    //     {
    //         return new ViVector3(-a.x, -a.y, -a.z);
    //     }
    // }
    // public static Multiply(a: ViVector3, d: number);
    // public static Multiply(d: number, a: ViVector3);
    // public static Multiply(d: any, a: any): ViVector3
    // {
    //     return new ViVector3(a.x * d, a.y * d, a.z * d);
    // }
    public static Divide(a: ViVector3, d: number): ViVector3
    {
        return new ViVector3(a.x / d, a.y / d, a.z / d);
    }
    public Equal(value: ViVector3): boolean
    {
        return this.x == value.x && this.y == value.y && this.z == value.z;
    }
    public NotEqual(value: ViVector3): boolean
    {
        return this.x != value.x || this.y != value.y || this.z != value.z;
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
        Append(")");
    }
    public PrintTo(stream: ViOStream): void
    {
		let IntNear = ViMathDefine.IntNear;
		let AppendInt16 = stream.AppendInt16.bind(stream);
        AppendInt16(IntNear(this.x * 10));
        AppendInt16(IntNear(this.y * 10));
        AppendInt16(IntNear(this.z * 10));
    }
    public ReadFrom(stream: ViIStream): void
    {
		let ReadInt16 = stream.ReadInt16.bind(stream);
        this.x = ReadInt16() * 0.1;
        this.y = ReadInt16() * 0.1;
        this.z = ReadInt16() * 0.1;
    }
    public ReadFromString(stream: ViStringIStream): void
    {
		let ReadFloat32 = stream.ReadFloat32.bind(stream);
        this.x = ReadFloat32();
        this.y = ReadFloat32();
        this.z = ReadFloat32();
    }
    public CopyFrom(other: ViVector3): void
    {
        this.x = other.x;
        this.y = other.y;
        this.z = other.z;
    }
}

export class ViVector3Assisstant
{
    public static New(value: ViVector3): ViVector3
    {
        return new ViVector3(value.x, value.y, value.z);
    }
    public static CopyTo(from: ViVector3, to: ViVector3): void
    {
        to.CopyFrom(from);
    }
    //
    public static PrintTo(stream: ViOStream, value: ViVector3): void
    {
		let IntNear = ViMathDefine.IntNear;
		let AppendInt16 = stream.AppendInt16.bind(stream);
        AppendInt16(IntNear(value.x * 10));
        AppendInt16(IntNear(value.y * 10));
        AppendInt16(IntNear(value.z * 10));
    }
    public static ReadFrom(stream: ViIStream, value: ViVector3): void
    {
		let ReadInt16 = stream.ReadInt16.bind(stream);
        value.x = ReadInt16() * 0.1;
        value.y = ReadInt16() * 0.1;
        value.z = ReadInt16() * 0.1;
    }
    //
    public static Add(a: ViVector3, b: ViVector3, result: ViVector3): void
    {
        let ax = a.x;
        let bx = b.x;
        let ay = a.y;
        let by = b.y;
        let az = a.z;
        let bz = b.z;
        result.x = ax + bx;
        result.y = ay + by;
        result.z = az + bz;
    }
    public static Add2(a: ViVector3, b: ViVector3, c: ViVector3, result: ViVector3): void
    {
        let ax = a.x;
        let bx = b.x;
        let cx = c.x;
        let ay = a.y;
        let by = b.y;
        let cy = c.y;
        let az = a.z;
        let bz = b.z;
        let cz = c.z;
        result.x = ax + bx + cx;
        result.y = ay + by + cy;
        result.z = az + bz + cz;
    }
    public static Add3(a: ViVector3, b: ViVector3, c: ViVector3, d: ViVector3, result: ViVector3): void
    {
        let ax = a.x;
        let bx = b.x;
        let cx = c.x;
        let dx = d.x;
        let ay = a.y;
        let by = b.y;
        let cy = c.y;
        let dy = d.y;
        let az = a.z;
        let bz = b.z;
        let cz = c.z;
        let dz = d.z;
        result.x = ax + bx + cx + dx;
        result.y = ay + by + cy + dy;
        result.z = az + bz + cz + dz;
    }
    public static AddEx(a: ViVector3, b: ViVector3, bScale: number, result: ViVector3): void
    {
        let ax = a.x;
        let bx = b.x;
        let ay = a.y;
        let by = b.y;
        let az = a.z;
        let bz = b.z;
        result.x = ax + bx * bScale;
        result.y = ay + by * bScale;
        result.z = az + bz * bScale;
    }
    public static AddExx(a: ViVector3, aScale: number, b: ViVector3, bScale: number, result: ViVector3): void
    {
        let ax = a.x;
        let bx = b.x;
        let ay = a.y;
        let by = b.y;
        let az = a.z;
        let bz = b.z;
        result.x = ax * aScale + bx * bScale;
        result.y = ay * aScale + by * bScale;
        result.z = az * aScale + bz * bScale;
    }
    public static AddScale(a: ViVector3, aScale: number, b: ViVector3, bScale: number, result: ViVector3): void
    {
        let ax = a.x;
        let bx = b.x;
        let ay = a.y;
        let by = b.y;
        let az = a.z;
        let bz = b.z;
        result.x = ax * aScale + bx * bScale;
        result.y = ay * aScale + by * bScale;
        result.z = az * aScale + bz * bScale;
    }
    public static AddScale2(a: ViVector3, aScale: number, b: ViVector3, bScale: number, c: ViVector3, cScale: number, result: ViVector3): void
    {
        let ax = a.x;
        let bx = b.x;
        let cx = c.x;
        let ay = a.y;
        let by = b.y;
        let cy = c.y;
        let az = a.z;
        let bz = b.z;
        let cz = c.z;
        result.x = ax * aScale + bx * bScale + cx * cScale;
        result.y = ay * aScale + by * bScale + cy * cScale;
        result.z = az * aScale + bz * bScale + cz * cScale;
    }
    public static Del(a: ViVector3, b: ViVector3, result: ViVector3): void
    {
        let ax = a.x;
        let bx = b.x;
        let ay = a.y;
        let by = b.y;
        let az = a.z;
        let bz = b.z;
        result.x = ax - bx;
        result.y = ay - by;
        result.z = az - bz;
    }
    public static Set(value: ViVector3, scale: number, result: ViVector3): void
    {
        let x = value.x;
        let y = value.y;
        let z = value.z;
        result.x = x * scale;
        result.y = y * scale;
        result.z = z * scale;
    }
    public static SetZero(value: ViVector3): void
    {
        value.x = 0.0;
        value.y = 0.0;
        value.z = 0.0;
    }
    public static Equal(a: ViVector3, b: ViVector3): boolean
    {
        return a.x == b.x && a.y == b.y && a.z == b.z;
    }
    public static NotEqual(a: ViVector3, b: ViVector3): boolean
    {
        return a.x != b.x || a.y != b.y || a.z != b.z;
    }
    public static EqualZero(value: ViVector3): boolean
    {
        return value.x == 0 && value.y == 0 && value.z == 0;
    }
    public static NotEqualZero(value: ViVector3): boolean
    {
        return value.x != 0 || value.y != 0 || value.z != 0;
    }
    public static Lerp(from: ViVector3, to: ViVector3, progress: number, result: ViVector3): void
    {
        let fromScale = 1 - progress;
        let toScale = progress;
        let fromx = from.x;
        let tox = to.x;
        let fromy = from.y;
        let toy = to.y;
        let fromz = from.z;
        let toz = to.z;
        result.x = fromx * fromScale + tox * toScale;
        result.y = fromy * fromScale + toy * toScale;
        result.z = fromz * fromScale + toz * toScale;
    }
    public static Min(a: ViVector3, b: ViVector3, result: ViVector3): void
    {
        let ax = a.x;
        let bx = b.x;
        let ay = a.y;
        let by = b.y;
        let az = a.z;
		let bz = b.z;
		let Min = ViMathDefine.Min;
        result.x = Min(ax, bx);
        result.y = Min(ay, by);
        result.z = Min(az, bz);
    }
    public static Max(a: ViVector3, b: ViVector3, result: ViVector3): void
    {
        let ax = a.x;
        let bx = b.x;
        let ay = a.y;
        let by = b.y;
        let az = a.z;
        let bz = b.z;
		let Max = ViMathDefine.Max;
        result.x = Max(ax, bx);
        result.y = Max(ay, by);
        result.z = Max(az, bz);
    }
    private static readonly CACHE_LerpClampDistance_Dir = new ViVector3();
    public static LerpClampDistance(from: ViVector3, to: ViVector3, distance: number, result: ViVector3): void
    {
        if (ViVector3.Distance(from, to) <= distance)
        {
            result.CopyFrom(to);
        }
        else
        {
            let dir = ViVector3Assisstant.CACHE_LerpClampDistance_Dir;
            ViVector3Assisstant.Del(to, from, dir);
            dir.Normalize();
            ViVector3Assisstant.AddEx(from, dir, distance, result);
        }
    }
    //
    public static GetCross(from: ViVector3, speed: number, targetPos: ViVector3, targetVelocity: ViVector3, resultPos: ViVector3, resultDir: ViVector3): boolean
    {
        let deltaX = targetPos.x - from.x;
        let deltaY = targetPos.y - from.y;
        let sqrValue = (deltaX * deltaX + deltaY * deltaY) * speed * speed + 2 * deltaX * deltaY * targetVelocity.x * targetVelocity.x - deltaX * deltaX * targetVelocity.y * targetVelocity.y - deltaY * deltaY * targetVelocity.x * targetVelocity.x;
        if (sqrValue >= 0)
        {
            let temp1 = -deltaX * targetVelocity.x - deltaY * targetVelocity.y + ViMathDefine.Sqrt(sqrValue);
            let temp2 = -deltaX * targetVelocity.x - deltaY * targetVelocity.y - ViMathDefine.Sqrt(sqrValue);
            if (temp1 == 0 && temp2 == 0)
            {
                resultDir.CopyFrom(ViVector3.ZERO);
                resultPos.CopyFrom(ViVector3.ZERO);
                return false;
            }
            else
            {
                let time = 0;
                if (temp1 == 0)
                {
                    time = (deltaX * deltaX + deltaY * deltaY) / temp2;
                }
                else if (temp2 == 0)
                {
                    time = (deltaX * deltaX + deltaY * deltaY) / temp1;
                }
                else
                {
                    time = (deltaX * deltaX + deltaY * deltaY) / ViMathDefine.Max(temp1, temp2);
                }
                resultDir.x = targetVelocity.x + deltaX / time;
                resultDir.y = targetVelocity.y + deltaY / time;
                resultDir.z = 0;
                resultDir.Normalize();
                ViVector3Assisstant.AddEx(from, resultDir, speed * time, resultPos);
                return true;
            }
        }
        else
        {
            resultDir.CopyFrom(ViVector3.ZERO);
            resultPos.CopyFrom(ViVector3.ZERO);
            return false;
        }
    }
}