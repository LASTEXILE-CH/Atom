
export class ViConst
{
    static readonly MAX_INT8: number = 0x7F;
    static readonly MIN_INT8: number = -ViConst.MAX_INT8 - 1;
    static readonly ZERO_INT8: number = 0;
    static readonly MAX_UINT8: number = 0XFF;
    static readonly ZERO_UINT8: number = 0;
    //
    static readonly MAX_INT16: number = 0X7FFF;
    static readonly MIN_INT16: number = -ViConst.MAX_INT16 - 1;
    static readonly ZERO_INT16: number = 0;
    static readonly MAX_UINT16: number = 0XFFFF;
    static readonly ZERO_UINT16: number = 0;
    //
    static readonly MAX_INT32: number = 0X7FFFFFFF;
    static readonly MIN_INT32: number = -ViConst.MAX_INT32 - 1;
    static readonly ZERO_INT32: number = 0;
    static readonly MAX_UINT32: number = 0XFFFFFFFF;
    static readonly ZERO_UINT32: number = 0;
    //
    static readonly TWO_PWR_64_DBL = (ViConst.MAX_UINT32 + 1) * (ViConst.MAX_UINT32 + 1);
    static readonly TWO_PWR_63_DBL = ViConst.TWO_PWR_64_DBL / 2;
    static readonly TWO_PWR_32_DBL = (ViConst.MAX_UINT32 + 1);
}

export class ViAssisstant
{
    public static TypeName(obj: any): string
    {
        if (obj && obj.constructor)
        {
            let strFun = obj.constructor.toString();
            let startIdx = strFun.indexOf("class") + "class".length;
            let endIdx = strFun.indexOf('{');
            return strFun.substr(startIdx, endIdx - startIdx).trim();
        }
        return typeof (obj);
    }
    //
    public static Max(a: number, b: number): number
    {
        return (a > b) ? a : b;
    }
    public static Max3(a: number, b: number, c: number): number
    {
        let max = (a > b) ? a : b;
        return (max > c) ? max : c;
    }
    public static Min(a: number, b: number): number
    {
        return (a < b) ? a : b;
    }
    public static Min3(a: number, b: number, c: number): number
    {
        let min = (a < b) ? a : b;
        return (min < c) ? min : c;
    }
    public static InRange(value: number, inf: number, sup: number): boolean
    {
        return ((inf <= value) && (value <= sup));
    }
    public static Abs(value: number): number
    {
        return (value > 0) ? value : -value;
    }
    public static Sqrt(value: number): number
    {
        return Math.sqrt(value);
    }
    //
    public static Clamp(value: number, inf: number, sup: number): number
    {
        if (value < inf)
        {
            return inf;
        }
        else if (value < sup)
        {
            return value;
        }
        else
        {
            return sup;
        }
    }
    //
    public static IntNear(value: number): number
    {
        if (value >= 0)
        {
            return Math.round(value);
        }
        else 
        {
            return -Math.round(-value);
        }
    }
    public static IntInf(value: number): number
    {
        if (value >= 0)
        {
            return Math.floor(value);
        }
        else 
        {
            return -Math.ceil(-value);
        }
    }
    public static IntSup(value: number): number
    {
        if (value >= 0)
        {
            return Math.ceil(value);
        }
        else 
        {
            return -Math.floor(-value);
        }
    }
    //
    public static Int8Near(value: number): number
    {
        return ViAssisstant.Clamp(ViAssisstant.IntNear(value), ViConst.MIN_INT8, ViConst.MAX_INT8);
    }
    public static Int8Inf(value: number): number
    {
        return ViAssisstant.Clamp(ViAssisstant.IntInf(value), ViConst.MIN_INT8, ViConst.MAX_INT8);
    }
    public static Int8Sup(value: number): number
    {
        return ViAssisstant.Clamp(ViAssisstant.IntSup(value), ViConst.MIN_INT8, ViConst.MAX_INT8);
    }
    public static UInt8Near(value: number): number
    {
        return ViAssisstant.Clamp(ViAssisstant.IntNear(value), 0, ViConst.MAX_UINT8);
    }
    public static UInt8Inf(value: number): number
    {
        return ViAssisstant.Clamp(ViAssisstant.IntInf(value), 0, ViConst.MAX_UINT8);
    }
    public static UInt8Sup(value: number): number
    {
        return ViAssisstant.Clamp(ViAssisstant.IntSup(value), 0, ViConst.MAX_UINT8);
    }
    //
    public static Int16Near(value: number): number
    {
        return ViAssisstant.Clamp(ViAssisstant.IntNear(value), ViConst.MIN_INT16, ViConst.MAX_INT16);
    }
    public static Int16Inf(value: number): number
    {
        return ViAssisstant.Clamp(ViAssisstant.IntInf(value), ViConst.MIN_INT16, ViConst.MAX_INT16);
    }
    public static Int16Sup(value: number): number
    {
        return ViAssisstant.Clamp(ViAssisstant.IntSup(value), ViConst.MIN_INT16, ViConst.MAX_INT16);
    }
    public static UInt16Near(value: number): number
    {
        return ViAssisstant.Clamp(ViAssisstant.IntNear(value), 0, ViConst.MAX_UINT16);
    }
    public static UInt16Inf(value: number): number
    {
        return ViAssisstant.Clamp(ViAssisstant.IntInf(value), 0, ViConst.MAX_UINT16);
    }
    public static UInt16Sup(value: number): number
    {
        return ViAssisstant.Clamp(ViAssisstant.IntSup(value), 0, ViConst.MAX_UINT16);
    }
    //
    public static Int32Near(value: number): number
    {
        return ViAssisstant.Clamp(ViAssisstant.IntNear(value), ViConst.MIN_INT32, ViConst.MAX_INT32);
    }
    public static Int32Inf(value: number): number
    {
        return ViAssisstant.Clamp(ViAssisstant.IntInf(value), ViConst.MIN_INT32, ViConst.MAX_INT32);
    }
    public static Int32Sup(value: number): number
    {
        return ViAssisstant.Clamp(ViAssisstant.IntSup(value), ViConst.MIN_INT32, ViConst.MAX_INT32);
    }
    public static UInt32Near(value: number): number
    {
        return ViAssisstant.Clamp(ViAssisstant.IntNear(value), 0, ViConst.MAX_UINT32);
    }
    public static UInt32Inf(value: number): number
    {
        return ViAssisstant.Clamp(ViAssisstant.IntInf(value), 0, ViConst.MAX_UINT32);
    }
    public static UInt32Sup(value: number): number
    {
        return ViAssisstant.Clamp(ViAssisstant.IntSup(value), 0, ViConst.MAX_UINT32);
    }
    //
    public static Bool(value: number): boolean
    {
        return value != 0;
    }
    public static Bool2Number(value: boolean): number
    {
        return value ? 1 : 0;
    }
    //
    public static Str2Str(value: string): string
    {
        return value;
    }
    public static Str2Int(value: string): number
    {
        let numberValue = parseInt(value);
        if (isNaN(numberValue))
        {
            return 0;
        }
        else
        {
            return numberValue;
        }
    }
    public static Str2IntEx(value: string, defaultValue: number): number
    {
        let numberValue = parseInt(value);
        if (isNaN(numberValue))
        {
            return defaultValue;
        }
        else
        {
            return numberValue;
        }
    }
    public static Str2Float(value: string): number
    {
        let numberValue = parseFloat(value);
        if (isNaN(numberValue))
        {
            return 0;
        }
        else
        {
            return numberValue;
        }
    }
    public static Str2FloatEx(value: string, defaultValue: number): number
    {
        let numberValue = parseFloat(value);
        if (isNaN(numberValue))
        {
            return defaultValue;
        }
        else
        {
            return numberValue;
        }
    }
    public static Str2Bool(value: string): boolean
    {
        if (value == "true"
            || value == "True"
            || value == "TRUE")
        {
            return true;
        }
        else
        {
            return false;
        }
    }
}

export class ViProfiler
{
    public static BeginSample(name: string): void { }
    public static EndSample(name: string): void { }
    public static BeginSampleEx(name: ScriptStaticString): void { }
    public static EndSampleEx(name: ScriptStaticString): void { }
}