local ViAssisstant = BaseClass("ViAssisstant")

--https://www.cnblogs.com/whiteyun/archive/2009/08/10/1543040.html

local function TypeName(obj)
    return type(obj)
end

local function Max(a, b)
    return a > b and a or b
end

local function Max3(a, b, c)
    local max = a > b and a or b
    return max > c and max or c
end

local function Min(a, b)
    return a < b and a or b
end

local function Min3(a, b, c)
    local max = a < b and a or b
    return max < c and max or c
end

local function InRange(value, inf, sup)
    return (inf <= value) and (value <= sup)
end

local function Abs(value)
    return value > 0 and value or -value;
end

local function Sqrt(value)
    return math.sqrt(value)
end

local function Clamp(value, inf, sup)
    if value < inf then
        return inf
    elseif value < sup then
        return value
    else
        return sup
    end
end

local function Round(value)
    return math.floor(value + 0.5)
end

local function IntNear(value)
    if value >= 0 then
        return ViAssisstant.Round(value)
    else 
        return -ViAssisstant.Round(-value)
    end
end

local function IntInf(value)
    if value >= 0 then
        return math.floor(value)
    else 
        return -math.ceil(-value)
    end
end

local function IntSup(value)
    if value >= 0 then
        return math.ceil(value)
    else 
        return -math.floor(-value)
    end
end

local function Int8Near(value)
    return ViAssisstant.Clamp(ViAssisstant.IntNear(value), ViConst.MIN_INT8, ViConst.MAX_INT8)
end

local function Int8Inf(value)
    return ViAssisstant.Clamp(ViAssisstant.IntInf(value), ViConst.MIN_INT8, ViConst.MAX_INT8)
end

local function Int8Sup(value)
    return ViAssisstant.Clamp(ViAssisstant.IntSup(value), ViConst.MIN_INT8, ViConst.MAX_INT8)
end

local function UInt8Near(value)
    return ViAssisstant.Clamp(ViAssisstant.IntNear(value), 0, ViConst.MAX_UINT8)
end

local function UInt8Inf(value)
    return ViAssisstant.Clamp(ViAssisstant.IntInf(value), 0, ViConst.MAX_UINT8)
end

local function UInt8Sup(value)
    return ViAssisstant.Clamp(ViAssisstant.IntSup(value), 0, ViConst.MAX_UINT8)
end

local function Int16Near(value)
    return ViAssisstant.Clamp(ViAssisstant.IntNear(value), ViConst.MIN_INT16, ViConst.MAX_INT16)
end

local function Int16Inf(value)
    return ViAssisstant.Clamp(ViAssisstant.IntInf(value), ViConst.MIN_INT16, ViConst.MAX_INT16)
end

local function Int16Sup(value)
    return ViAssisstant.Clamp(ViAssisstant.IntSup(value), ViConst.MIN_INT16, ViConst.MAX_INT16)
end

local function UInt16Near(value)
    return ViAssisstant.Clamp(ViAssisstant.IntNear(value), 0, ViConst.MAX_UINT16)
end

local function UInt16Inf(value)
    return ViAssisstant.Clamp(ViAssisstant.IntInf(value), 0, ViConst.MAX_UINT16)
end

local function UInt16Sup(value)
    return ViAssisstant.Clamp(ViAssisstant.IntSup(value), 0, ViConst.MAX_UINT16)
end

local function Int32Near(value)
    return ViAssisstant.Clamp(ViAssisstant.IntNear(value), ViConst.MIN_INT32, ViConst.MAX_INT32)
end

local function Int32Inf(value)
    return ViAssisstant.Clamp(ViAssisstant.IntInf(value), ViConst.MIN_INT32, ViConst.MAX_INT32)
end

local function Int32Sup(value)
    return ViAssisstant.Clamp(ViAssisstant.IntSup(value), ViConst.MIN_INT32, ViConst.MAX_INT32)
end

local function UInt32Near(value)
    return ViAssisstant.Clamp(ViAssisstant.IntNear(value), 0, ViConst.MAX_UINT32)
end

local function UInt32Inf(value)
    return ViAssisstant.Clamp(ViAssisstant.IntInf(value), 0, ViConst.MAX_UINT32)
end

local function UInt32Sup(value)
    return ViAssisstant.Clamp(ViAssisstant.IntSup(value), 0, ViConst.MAX_UINT32)
end

local function Bool(value)
    return value ~= 0
end

local function Bool2Number(value)
    return value and 1 or 0
end

local function Str2Str(value)
    return value
end

local function isNaN(value)
    return value == nil
end

local function Str2Number(value)
    local numberValue = tonumber(value)
    if ViAssisstant.isNaN(numberValue) then
        return 0
    else
        return numberValue
    end
end

local function Str2NumberEx(value, defaultValue)
    local numberValue = tonumber(value)
    if ViAssisstant.isNaN(numberValue) then
        return defaultValue
    else
        return numberValue
    end
end

local function Str2Bool(value)
    if value == "true"or value == "True"or value == "TRUE" then
        return true
    else
        return false
    end
end

ViAssisstant.TypeName = TypeName
ViAssisstant.Max = Max
ViAssisstant.Max3 = Max3
ViAssisstant.Min = Min
ViAssisstant.Min3 = Min3
ViAssisstant.InRange = InRange
ViAssisstant.Abs = Abs
ViAssisstant.Sqrt = Sqrt
ViAssisstant.Clamp = Clamp
ViAssisstant.Round = Round
ViAssisstant.IntNear = IntNear
ViAssisstant.IntInf = IntInf
ViAssisstant.IntSup = IntSup
ViAssisstant.Int8Near = Int8Near
ViAssisstant.Int8Inf = Int8Inf

ViAssisstant.Int8Sup = Int8Sup
ViAssisstant.UInt8Near = UInt8Near
ViAssisstant.UInt8Inf = UInt8Inf
ViAssisstant.UInt8Sup = UInt8Sup
ViAssisstant.Int16Near = Int16Near
ViAssisstant.Int16Inf = Int16Inf
ViAssisstant.Int16Sup = Int16Sup
ViAssisstant.UInt16Near = UInt16Near
ViAssisstant.UInt16Inf = UInt16Inf
ViAssisstant.UInt16Sup = UInt16Sup
ViAssisstant.Int32Near = Int32Near
ViAssisstant.Int32Inf = Int32Inf
ViAssisstant.Int32Sup = Int32Sup
ViAssisstant.UInt32Near = UInt32Near


ViAssisstant.UInt32Inf = UInt32Inf
ViAssisstant.UInt32Sup = UInt32Sup
ViAssisstant.Bool = Bool
ViAssisstant.Bool2Number = Bool2Number
ViAssisstant.Str2Str = Str2Str
ViAssisstant.isNaN = isNaN
ViAssisstant.Str2Number = Str2Number
ViAssisstant.Str2NumberEx = Str2NumberEx
ViAssisstant.Str2Bool = Str2Bool

return ViAssisstant