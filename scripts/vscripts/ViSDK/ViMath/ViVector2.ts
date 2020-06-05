import { ViMemoryAllocator } from "../ViSystem/ViSystemType";
import { ViMathDefine } from "./ViMathDefine";

export class ViVector2
{
    public static readonly CacheAllocator = new ViMemoryAllocator<ViVector2>(ViVector2, "ViVector2");
    public static readonly Epsilon: number = 1E-05;
    public static readonly ZERO = new ViVector2(0, 0);
    public static readonly UNIT = new ViVector2(1, 1);
    public static readonly UNIT_X = new ViVector2(1, 0);
    public static readonly UNIT_Y = new ViVector2(0, 1);
    //
    private static readonly CACHE_VALUE_0 = new ViVector2();
    private static readonly CACHE_VALUE_1 = new ViVector2();
    //
    public x: number = 0;
    public y: number = 0;
    //
    public get Length(): number { return ViMathDefine.Sqrt((this.x * this.x) + (this.y * this.y)); }
    public get Length2() { return ((this.x * this.x) + (this.y * this.y)); }
    public constructor(x?: number, y?: number)
    {
        if (x != undefined)
        {
            this.x = x;
        }
        if (y != undefined)
        {
            this.y = y;
        }
    }
    //
    public Scale(scale: number): void
    {
        this.x *= scale;
        this.y *= scale;
    }
    public ScaleEx(scale: ViVector2): void
    {
        this.x *= scale.x;
        this.y *= scale.y;
    }
    public Normalize(): void
    {
        let len = this.Length;
        if (len > 1E-05)
        {
            this.x /= len;
            this.y /= len;
        }
    }
    public GetNormalized(): ViVector2
    {
        let value = new ViVector2();
        value.Normalize();
        return value;
    }
    //
    public SetTo(a: number, b: number): void
    {
        this.x = a;
        this.y = b;
    }

    public Distance(a: number, b: number): number
    {
        let deltaX = a - this.x;
        let deltaY = b - this.y;
        return ViMathDefine.Sqrt((deltaX * deltaX) + (deltaY * deltaY));
    }

    public static Distance(a: ViVector2, b: ViVector2): number
    {
        let deltaX = a.x - b.x;
        let deltaY = a.y - b.y;
        return ViMathDefine.Sqrt((deltaX * deltaX) + (deltaY * deltaY));
    }
    public static Distance2(a: ViVector2, b: ViVector2): number
    {
        let deltaX = a.x - b.x;
        let deltaY = a.y - b.y;
        return (deltaX * deltaX) + (deltaY * deltaY);
    }

    public Equal(value: ViVector2): boolean
    {
        return this.x == value.x && this.y == value.y;
    }
    public NotEqual(value: ViVector2): boolean
    {
        return this.x != value.x || this.y != value.y;
    }
    //
    public ToString(): string
    public ToString(format?: number): string
    public ToString(format?: any): string { return "(" + this.x + "," + this.y + ")"; }
    public toString(): string
    {
        return this.ToString();
    }
}