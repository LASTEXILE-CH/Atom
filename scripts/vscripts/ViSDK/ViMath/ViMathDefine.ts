import { float } from "../ViSystem/ViSystemType";

export class ViMathDefine
{
    public static readonly PI = 3.141593;
    public static readonly PI_X2 = ViMathDefine.PI * 2;
    public static readonly PI_X3 = ViMathDefine.PI * 3;
    public static readonly PI_X4 = ViMathDefine.PI * 4;
    public static readonly PI_HALF = ViMathDefine.PI * 0.5;
    public static readonly PI_HALF2 = ViMathDefine.PI * 0.25;
    public static readonly Infinity = 1.0 / 0.0;
    public static readonly NegativeInfinity = -1.0 / 0.0;
    public static readonly Deg2Rad = 0.01745329;
    public static readonly Rad2Deg = 57.29578;
    public static readonly Epsilon = (-1) ** 0 * 2 ** 0 * (parseInt("10000000000000000000000000000000000000000000000000001", 2) * 2 ** -52) - 1;

    public static Sin(f: number): number
    {
        return Math.sin(f);
    }
    public static Cos(f: number): number
    {
        return Math.cos(f);
    }
    public static Tan(f: number): number
    {
        return Math.tan(f);
    }
    public static Asin(f: number): number
    {
        return Math.asin(f);
    }
    public static Acos(f: number): number
    {
        return Math.acos(f);
    }
    public static Atan(f: number): number
    {
        return Math.atan(f);
    }
    public static Atan2(y: number, x: number): number
    {
        return Math.atan2(y, x);
    }
    public static Sqrt(f: number): number
    {
        return Math.sqrt(f);
    }
    //
    public static IntInf(value: number): number
    {
        return Math.floor(value);
    }
    //
    public static IntNear(value: number): number
    {
        if (value >= 0)
        {
            return Math.floor(value + 0.5);
        }
        else
        {
            return Math.floor(value - 0.5);
        }
    }
    //
    public static IntSup(value: number): number
    {
        return Math.ceil(value);
    }
    //
    public static Abs(value: number): number
    {
        return Math.abs(value);
    }
    //
    public static Max(a: number, b: number): number
    {
        return (a > b) ? a : b;
    }
    public static Min(a: number, b: number): number
    {
        return (a < b) ? a : b;
    }
    public static InRange(value: number, inf: number, sup: number): boolean
    {
        return ((inf <= value) && (value <= sup));
    }
    public static Pow(f: number, p: number): number
    {
        return Math.pow(f, p);
    }
    public static Exp(power: number): number
    {
        return Math.exp(power);
    }
    public static Log(f: number): number
    {
        return Math.log(f);
    }
    public static Ceil(f: number): number
    {
        return Math.ceil(f);
    }
    public static Floor(f: number): number
    {
        return Math.floor(f);
    }
    public static Round(f: number): number
    {
        return Math.round(f);
    }
    public static CeilToInt(f: number): number
    {
        return Math.ceil(f);
    }
    public static FloorToInt(f: number): number
    {
        return Math.floor(f);
    }
    public static RoundToInt(f: number): number
    {
        return Math.round(f);
    }
    public static Sign(f: number): number
    {
        return ((f < 0) ? -1 : 1);
    }
    public static Radius2Degree(radius: number): number
    {
        return 180.0 - radius * ViMathDefine.Rad2Deg;
    }
    public static Clamp(value: number, min: number, max: number): number
    {
        if (value < min)
        {
            value = min;
            return value;
        }
        if (value > max)
        {
            value = max;
        }
        return value;
    }
    //
    public static Clamp01(value: number): number
    {
        if (value < 0)
        {
            return 0;
        }
        if (value > 1)
        {
            return 1;
        }
        return value;
    }
    //
    public static Lerp(from: number, to: number, t: number): number
    {
        return (from + ((to - from) * ViMathDefine.Clamp01(t)));
    }
    //
    public static Wrap(val: number, low: number, high: number): number// 取值范围[low, high)
    {
        let ret = (val);
        let rang = (high - low);

        while (ret >= high)
        {
            ret -= rang;
        }
        while (ret < low)
        {
            ret += rang;
        }
        return ret;
    }
    //
    public static MoveTowards(current: number, target: number, maxDelta: number): number
    {
        if (ViMathDefine.Abs((target - current)) <= maxDelta)
        {
            return target;
        }
        return (current + (ViMathDefine.Sign(target - current) * maxDelta));
    }
    //
    public static SmoothStep(from: number, to: number, t: number): number
    {
        t = ViMathDefine.Clamp01(t);
        t = (((-2 * t) * t) * t) + ((3 * t) * t);
        return ((to * t) + (from * (1 - t)));
    }
    //
    public static Gamma(value: number, absmax: number, gamma: number): number
    {
        let flag = false;
        if (value < 0)
        {
            flag = true;
        }
        let num = ViMathDefine.Abs(value);
        if (num > absmax)
        {
            return (!flag ? num : -num);
        }
        let num2 = ViMathDefine.Pow(num / absmax, gamma) * absmax;
        return (!flag ? num2 : -num2);
    }
    //
    public static Approximately(a: number, b: number): boolean
    {
        return (ViMathDefine.Abs((b - a)) < ViMathDefine.Max((1E-06 * ViMathDefine.Max(ViMathDefine.Abs(a), ViMathDefine.Abs(b))), 1.121039E-44));
    }
    //
    public static Repeat(t: number, length: number): number
    {
        return (t - (ViMathDefine.Floor(t / length) * length));
    }
    //
    public static PingPong(t: number, length: number): number
    {
        t = ViMathDefine.Repeat(t, length * 2);
        return (length - ViMathDefine.Abs((t - length)));
    }
    //
    public static InverseLerp(from: number, to: number, value: number): number
    {
        if (from < to)
        {
            if (value < from)
            {
                return 0;
            }
            if (value > to)
            {
                return 1;
            }
            value -= from;
            value /= to - from;
            return value;
        }
        if (from <= to)
        {
            return 0;
        }
        if (value < to)
        {
            return 1;
        }
        if (value > from)
        {
            return 0;
        }
        return (1 - ((value - to) / (from - to)));
    }
}

export class ViMath2D
{
    public static Length(x: number, y: number): number
    public static Length(fSrcX: number, fSrcY: number, fDesX: number, fDesY: number): number
    public static Length(fSrcX: number, fSrcY: number, fDesX?: number, fDesY?: number): number
    {
        if (fDesX)
        {
            let deltaX = fDesX - fSrcX;
            let deltaY = fDesY - fSrcY;
            return Math.sqrt(deltaX * deltaX + deltaY * deltaY);
        }
        else
        {
            return Math.sqrt(fSrcX * fSrcX + fSrcY * fSrcY);
        }
    }
    //
    public static Length2(x: number, y: number): number
    public static Length2(fSrcX: number, fSrcY: number, fDesX: number, fDesY: number): number
    public static Length2(fSrcX: number, fSrcY: number, fDesX?: number, fDesY?: number): number
    {
        if (fDesX)
        {
            let deltaX = fDesX - fSrcX;
            let deltaY = fDesY - fSrcY;
            return (deltaX * deltaX + deltaY * deltaY);
        }
        else
        {
            return (fSrcX * fSrcX + fSrcY * fSrcY);
        }
    }
    public static GetAngle(fX: number, fY: number): number
    {
        let angle = Math.atan2(fX, -fY);
        return angle;
    }
    //
    public static Rotate(fSrcX: number, fSrcy: number, fRotateAngle: number, fDesX: float, fDesY: float): void
    public static Rotate(fX: float, fY: float, fRotateAngle: number): void
    public static Rotate(fSrcX?: any, fSrcy?: any, fRotateAngle?: number, fDesX?: float, fDesY?: float): void
    {
        if (typeof fSrcX === "number")
        {
            //! 逆时针旋转
            let fSin = Math.sin(fRotateAngle);
            let fCon = Math.cos(fRotateAngle);
            //! 顺时针旋转
            fDesX.Value = fCon * fSrcX - fSin * fSrcy;
            fDesY.Value = fSin * fSrcX + fCon * fSrcy;
        }
        else if (fSrcX instanceof float)
        {
            let fSin = Math.sin(fRotateAngle);
            let fCon = Math.cos(fRotateAngle);
            //! 顺时针旋转
            let fDesX = fCon * fSrcX.Value - fSin * fSrcy.Value;
            let fDesY = fSin * fSrcX.Value + fCon * fSrcy.Value;
            fSrcX.Value = fDesX;
            fSrcy.Value = fDesY;
        }
    }
    //
    public static GetSide(fromX: number, fromY: number, toX: number, toY: number, x: number, y: number): number
    {
        let s = (fromX - x) * (toY - y) - (fromY - y) * (toX - x);
        if (s == 0)
        {
            return 0;
        }
        else if (s < 0)//! 右侧
        {
            return -1;
        }
        else
        {
            return 1;
        }
    }
}



/*
class ViMath3D
{
	public static Convert(diretion : ViVector3, roll : number, out ViVector3 horizDir, out ViVector3 normal) : void
	{
		horizDir = diretion;
		horizDir.z = 0.0f;
		horizDir.Normalize();
		diretion.Normalize();
		ViVector3 rotateAxis = ViVector3.Cross(diretion, ViVector3.UNIT_Z);
		rotateAxis.Normalize();
		ViQuaternion verticalRotateQuat = ViQuaternion.FromAxisAngle(rotateAxis, ViMathDefine.PI_HALF);
		normal = verticalRotateQuat * diretion;
		ViQuaternion rollRotateQuat = ViQuaternion.FromAxisAngle(diretion, roll);
		normal = rollRotateQuat * normal;
	}

}

*/