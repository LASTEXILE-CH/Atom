import { ViConst, ViAssisstant } from "./ViSystemConfig";

export class NumberI64
{
    public static readonly Zero = new NumberI64(0, 0);
    //
    public static Equals(left: NumberI64, right: NumberI64): boolean
    {
        return left._high === right._high && left._low === right._low;
    }
    public static New(value: NumberI64): NumberI64
    {
        let newValue = new NumberI64(value._high, value._low);
        return newValue;
    }
    public static NewSimple(value: number): NumberI64
    {
        let high = ViAssisstant.Int32Near(value / ViConst.MAX_UINT32);
        let low = ViAssisstant.Int32Near(value - high * ViConst.MAX_UINT32);
        let newValue = new NumberI64(high, low);
        return newValue;
    }
    private static readonly CACHE_Delta_Value = new NumberI64();
    public static Delta(left: NumberI64, right: NumberI64): number
    {
        let value = NumberI64.CACHE_Delta_Value;
        value.CopyFrom(left);
        value.Del(right._high, right._low);
        return value.Value;
    }
    //
    public get High(): number { return this._high; }
    public get Low(): number { return this._low; }
    constructor()
    constructor(high: number, low: number)
    constructor(high?: number, low?: number)
    {
        this._high = ViAssisstant.Int32Near(high);
        this._low = ViAssisstant.Int32Near(low);
    }
    //
    public Set(high: number, low: number)
    {
        this._high = ViAssisstant.Int32Near(high);
        this._low = ViAssisstant.Int32Near(low);
        this._valueStr = null;
    }
    public SetSimple(value: number)
    {
        this._high = ViAssisstant.Int32Near(value / ViConst.MAX_UINT32);;
        this._low = ViAssisstant.Int32Near(value - this._high * ViConst.MAX_UINT32);
        this._valueStr = null;
    }
    //
    public ToString(): string
    {
        if (this._valueStr == null)
        {
            this._valueStr = this.ToNumber().toString();
        }
        return this._valueStr;
        // let complementLowValue = 0;
        // let complementHighValue = 0;
        // if (this.High < 0)
        // {
        //     let notLowValue = ~this.Low;
        //     complementLowValue = notLowValue + 1;
        //     let notHIghValue = ~this.High;
        //     complementHighValue = notHIghValue;
        //     if (notLowValue == MAX_UINT32)
        //     {
        //         complementHighValue = complementHighValue + 1;
        //     }
        // }
        // else
        // {
        //     complementHighValue = this.High;
        //     complementLowValue = this.Low;
        // }
        // let result: string = "";
        // if (complementHighValue != 0)
        // {
        //     result += this._HexString(complementHighValue, false);
        //     result += this._HexString(complementLowValue >>> 0, true);
        // }
        // else
        // {
        //     result += this._HexString(complementLowValue >>> 0, false);
        // }
        // if (this.High < 0)
        // {
        //     return "-" + result;
        // }
        // else
        // {
        //     return result;
        // }
    }
    //
    public toString(): string
    {
        return this.ToString();
    }
    //
    public Del(high: number, low: number): void
    {
        let completeHigh = ~high;
        let completeLow = ~low;
        let notValue = new NumberI64(completeHigh, completeLow);
        notValue.Add(0, 1);
        this.Add(notValue._high, notValue._low);
    }
    //
    public Add(high: number, low: number): void
    {
        high = ViAssisstant.Int32Near(high);
        low = ViAssisstant.Int32Near(low);
        //
        let num1_48 = this._high >>> 16;
        let num1_32 = this._high & 0xFFFF;
        let num1_16 = this._low >>> 16;
        let num1_00 = this._low & 0xFFFF;
        //
        let num2_48 = high >>> 16;
        let num2_32 = high & 0xFFFF;
        let num2_16 = low >>> 16;
        let num2_00 = low & 0xFFFF;
        //
        let num_48 = 0, num_32 = 0, num_16 = 0, num_00 = 0;
        num_00 += num1_00 + num2_00;
        num_16 += num_00 >>> 16;
        num_00 &= 0xFFFF;
        num_16 += num1_16 + num2_16;
        num_32 += num_16 >>> 16;
        num_16 &= 0xFFFF;
        num_32 += num1_32 + num2_32;
        num_48 += num_32 >>> 16;
        num_32 &= 0xFFFF;
        num_48 += num1_48 + num2_48;
        num_48 &= 0xFFFF;
        this._high = (num_48 << 16) | num_32;
        this._low = (num_16 << 16) | num_00;
        this._valueStr = null;
    }
    //
    public IsZero(): boolean
    {
        return this._high === 0 && this._low === 0;
    }
    //
    public get Value(): number
    {
        let num = this._high * (ViConst.MAX_UINT32 + 1);
        return num + (this._low >>> 0);
    }
    //
    public GetScaleValue(scale: number): number
    {
        if (scale === 0 || this.IsZero())
        {
            return 0;
        }
        //
        let scaleStr = scale.toString();
        let tailLength = 1;
        if (scaleStr.indexOf(".") === -1)
        {
            tailLength = 0;
        }
        else
        {
            tailLength = scaleStr.length - scaleStr.indexOf(".") - 1;
        }
        let num = parseInt(scaleStr.replace(".", ""));
        let result = this.Value * num / Math.pow(10, tailLength);
        return result;
    }
    //
    public ToNumber(): number
    {
        return (this._high) * (ViConst.MAX_UINT32 + 1) + (this._low >>> 0);
    }
    //
    public Equal(value: NumberI64): boolean
    {
        return this._high === value._high && this._low === value._low;
    }
    //
    public NotEqual(value: NumberI64): boolean
    {
        return this._high !== value._high || this._low !== value._low;
    }
    //
    public MoreThen(value: NumberI64): boolean
    {
        return this._high > value._high || (this._high === value._high && (this._low >>> 0) > (value._low >>> 0));
    }
    //
    public MoreEqualThen(value: NumberI64): boolean
    {
        return this._high > value._high || (this._high === value._high && (this._low >>> 0) >= (value._low >>> 0));
    }
    //
    public LessThen(value: NumberI64): boolean
    {
        return this._high < value._high || (this._high === value._high && (this._low >>> 0) < (value._low >>> 0));
    }
    //
    public LessEqualThen(value: NumberI64): boolean
    {
        return this._high < value._high || (this._high === value._high && (this._low >>> 0) <= (value._low >>> 0));
    }
    //
    public EqualRaw(high: number, low: number): boolean
    {
        return this._high === high && this._low === low;
    }
    //
    public NotEqualRaw(high: number, low: number): boolean
    {
        return this._high !== high || this._low !== low;
    }
    //
    public MoreThenRaw(high: number, low: number): boolean
    {
        return this._high > high || (this._high === high && (this._low >>> 0) > (low >>> 0));
    }
    //
    public MoreEqualThenRaw(high: number, low: number): boolean
    {
        return this._high > high || (this._high === high && (this._low >>> 0) >= (low >>> 0));
    }
    //
    public LessThenRaw(high: number, low: number): boolean
    {
        return this._high < high || (this._high === high && (this._low >>> 0) < (low >>> 0));
    }
    //
    public LessEqualThenRaw(high: number, low: number): boolean
    {
        return this._high < high || (this._high === high && (this._low >>> 0) <= (low >>> 0));
    }
    //
    public CopyFrom(other: NumberI64): NumberI64
    {
        this._high = other._high;
        this._low = other._low;
        this._valueStr = other._valueStr;
        return this;
    }
    //
    private _high: number;
    private _low: number;
    private _valueStr: string = null;
}

export class NumberUI64
{
    public static readonly Zero = new NumberUI64(0, 0);
    //
    public static Equals(left: NumberUI64, right: NumberUI64): boolean
    {
        return left._high === right._high && left._low === right._low;
    }
    public static New(value: NumberUI64): NumberUI64
    {
        let newValue = new NumberUI64(value._high, value._low);
        return newValue;
    }
    //
    public get High(): number { return this._high; }
    public get Low(): number { return this._low; }
    constructor();
    constructor(high: number, low: number)
    constructor(high?: number, low?: number)
    {
        this._high = ViAssisstant.UInt32Near(high);
        this._low = ViAssisstant.UInt32Near(low);
    }
    //
    public get Value(): number
    {
        let num = this._high * (ViConst.MAX_UINT32 + 1);
        return num + this._low;
    }
    //
    public Set(high: number, low: number): void
    {
        this._high = ViAssisstant.UInt32Near(high);
        this._low = ViAssisstant.UInt32Near(low);
        this._valueStr = null;
    }
    //   
    public ToString(): string
    {
        if (this._valueStr == null)
        {
            let result = "";
            if (this._high != 0)
            {
                result += this._HexString(this._high >>> 0, false);
                result += this._HexString(this._low >>> 0, true);
            }
            else
            {
                result += this._HexString(this._low >>> 0, false);
            }
            this._valueStr = result;
        }
        return this._valueStr;
    }
    //
    public toString(): string
    {
        return this.ToString();
    }
    //
    private _HexString(value: number, align: boolean): string
    {
        let result = value.toString(16);
        if (align)
        {
            let preLen = 8 - result.length;
            let preStr = "";
            for (let iter = 0; iter < preLen; ++iter)
            {
                preStr = '0' + preStr;
            }
            result = preStr + result;
        }
        return result;
    }
    //
    public Mod(high: number, low: number): void
    {
        high = ViAssisstant.UInt32Near(high);
        low = ViAssisstant.UInt32Near(low);
        //
        let num1_48 = this._high >>> 16;
        let num1_32 = this._high & 0xFFFF;
        let num1_16 = this._low >>> 16;
        let num1_00 = this._low & 0xFFFF;
        //
        let num2_48 = high >>> 16;
        let num2_32 = high & 0xFFFF;
        let num2_16 = low >>> 16;
        let num2_00 = low & 0xFFFF;
        //
        let num_48 = 0, num_32 = 0, num_16 = 0, num_00 = 0;
        num_00 += num1_00 + num2_00;
        num_16 += num_00 >>> 16;
        num_00 &= 0xFFFF;
        num_16 += num1_16 + num2_16;
        num_32 += num_16 >>> 16;
        num_16 &= 0xFFFF;
        num_32 += num1_32 + num2_32;
        num_48 += num_32 >>> 16;
        num_32 &= 0xFFFF;
        num_48 += num1_48 + num2_48;
        num_48 &= 0xFFFF;
        this._high = (num_48 << 16) | num_32;
        this._low = (num_16 << 16) | num_00;
        this._valueStr = null;
    }
    //
    public GetMask8(idx: number): number
    {
        if (idx < 4)
        {
            return (this._low >> idx * 8) & 0xFF;
        }
        else if (idx < 8)
        {
            return (this._high >> (idx - 4) * 8) & 0xFF;
        }
        else
        {
            return 0;
        }
    }
    //
    public GetMask16(idx: number): number
    {
        if (idx < 2)
        {
            return (this._low >> idx * 16) & 0xFFFF;
        }
        else if (idx < 4)
        {
            return (this._high >> (idx - 2) * 16) & 0xFFFF;
        }
        else
        {
            return 0;
        }
    }
    //
    public Equal(value: NumberUI64): boolean
    {
        return this._high === value._high && this._low === value._low;
    }
    //
    public NotEqual(value: NumberUI64): boolean
    {
        return this._high !== value._high || this._low !== value._low;
    }
    //
    public MoreThen(value: NumberUI64): boolean
    {
        return this._high > value._high || (this._high === value._high && this._low > value._low);
    }
    //
    public MoreEqualThen(value: NumberUI64): boolean
    {
        return this._high >= value._high || (this._high === value._high && this._low >= value._low);
    }
    //
    public LessThen(value: NumberUI64): boolean
    {
        return this._high < value._high || (this._high === value._high && this._low < value._low);
    }
    //
    public LessEqualThen(value: NumberUI64): boolean
    {
        return this._high < value._high || (this._high === value._high && this._low <= value._low);
    }
    //
    public EqualRaw(high: number, low: number): boolean
    {
        return this._high === high && this._low === low;
    }
    //
    public NotEqualRaw(high: number, low: number): boolean
    {
        return this._high !== high || this._low !== low;
    }
    //
    public MoreThenRaw(high: number, low: number): boolean
    {
        return this._high > high || (this._high === high && this._low > low);
    }
    //
    public MoreEqualThenRaw(high: number, low: number): boolean
    {
        return this._high > high || (this._high === high && this._low >= low);
    }
    //
    public LessThenRaw(high: number, low: number): boolean
    {
        return this._high < high || (this._high === high && this._low < low);
    }
    //
    public LessEqualThenRaw(high: number, low: number): boolean
    {
        return this._high <= high || (this._high === high && this._low <= low);
    }
    //
    public CopyFrom(other: NumberUI64): NumberUI64
    {
        this._high = other._high;
        this._low = other._low;
        this._valueStr = other._valueStr;
        return this;
    }
    //
    private _high: number;
    private _low: number;
    private _valueStr: string = null;
}
