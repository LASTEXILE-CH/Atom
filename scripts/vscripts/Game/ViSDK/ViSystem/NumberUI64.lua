local NumberUI64 = BaseClass("NumberUI64")

local function NewInstance(value)
    local newValue = NumberUI64.New(value._high, value._low)
    return newValue
end

local function NewSimple(value)
    local high = ViAssisstant.UInt32Near(value / ViConst.MAX_UINT32)
    local low = ViAssisstant.UInt32Near(value - high * ViConst.MAX_UINT32)
    local newValue = NumberUI64.New(high, low)
    return newValue
end

local function High(self)
   return self._high 
end

local function Low(self)
    return self._low
 end

 local function NumberUI64Ctor(self, high, low)
    self._high = ViAssisstant.UInt32Near(high)
    self._low = ViAssisstant.UInt32Near(high)
    self._valueStr = nil
end

local function Value(self)
    local num = self._high * (ViConst.MAX_UINT32 + 1)
    return num + self._low
end

 local function Set(self, high, low)
    self._high = ViAssisstant.UInt32Near(high)
    self._low = ViAssisstant.UInt32Near(low)
    this._valueStr = null
 end

 local function ToString(self)
    if self._valueStr ~= nil then
        local result = ""
        if self._high ~= 0 then
            result = result..(self:_HexString(arshift(this._high, 0), false))
            result = result..(self:_HexString(arshift(this._low, 0), true))
        else
            result = result..(self:_HexString(arshift(this._low, 0), false))
        end
        self._valueStr = result
    end
    return self._valueStr
end

local function _HexString(self, value, align)
{
    local result = value.toString(16)
    if align then
        local preLen = 8 - string.len(result)
        local preStr = ""
        for iter = 0 , iter < preLen do
            preStr = "0"..preStr
        end
        result = preStr..result
    end
    return result
}

local function Mod(self, high, low)
    high = ViAssisstant.UInt32Near(high)
    low = ViAssisstant.UInt32Near(low)
    --
    local num1_48 = arshift(self._high, 16)
    local num1_32 = band(self._high, 0xFFFF)
    local num1_16 = arshift(self._low, 16)
    local num1_00 = band(self._low, 0xFFFF)
    --
    local num2_48 = arshift(high, 16)
    local num2_32 = band(high, 0xFFFF)
    local num2_16 = arshift(low, 16)
    local num2_00 = band(low, 0xFFFF)
    --
    local num_48 = 0
    local num_32 = 0
    local num_16 = 0
    local num_00 = 0
    num_00 = num_00 + num1_00 + num2_00
    num_16 = num_16 + arshift(num_00, 16)
    num_00 = band(num_00, 0xFFFF)
    num_16 = num_16 + num1_16 + num2_16
    num_32 = num_32 + arshift(num_16, 16)
    num_16 = arshift(num_16, 0xFFFF)
    num_32 = num_32 + num1_32 + num2_32
    num_48 = num_48 + arshift(num_32,16)
    num_32 = band(num_32, 0xFFFF)
    num_48 = num_48 + num1_48 + num2_48
    num_48 = band(num_48, 0xFFFF)
    self._high = bor((lshift(num_48, 16)),  num_32)
    self._low = bor((lshift(num_16, 16)), num_00)
    self._valueStr = nil
end

local function GetMask8(self, idx)
    if idx < 4 then
        return band(rshift(self._low, idx) * 8, 0xFF)
    elseif idx < 8 then
        return band(rshift(self._high, (idx - 4) * 8), 0xFF)
    else
        return 0
    end
end

local function GetMask16(self, idx)
    if idx < 2 then
        return band(rshift(self._low, idx * 16), 0xFFFF)
    elseif idx < 4 then
        return band(rshift(self._high, (idx - 2) * 16), 0xFFFF)
    else
        return 0
    end
end

local function EqualRaw(self, high, low)
    return self._high == high and self._low == low
end

local function NotEqualRaw(self, high, low)
    return self._high ~= high or self._low ~= low
end

local function MoreThenRaw(self, high, low)
    return self._high > high or (self._high == high and arshift(self._low, 0) > arshift(low, 0))
end

local function MoreEqualThenRaw(self, high, low)
    return self._high > high or (self._high == high and arshift(this._low, 0) >= arshift(low, 0))
end

local function LessThenRaw(self, high, low)
    return this._high < high or (this._high == high and this._low < low)
end

local function LessEqualThenRaw(self, high, low)
    return self._high <= high or (self._high == high and self._low <= low)
end

local function CopyFrom(self, other)
    self._high = other._high
    self._low = other._low
    self._valueStr = other._valueStr
    return self
end

local function _Equal(left, right)
    return left._high == right._high and left._low == right._low
end

local function _NotEqual(left, right)
    return left._high ~= right._high or left._low ~= right._low
end

local function _MoreThen(left, right)
    return left._high > right._high or (left._high == right._high and left._low > right._low)
end

local function _MoreEqualThen(left, right)
    return left._high >= right._high or (left._high == right._high and left._low >= right._low)
end

local function _LessThen(left, right)
    return left._high < right._high or (left._high == right._high and left._low < right._low)
end

local function _LessEqualThen(left, right)
    return left._high < right._high or (left._high == right._high and left._low <= right._low)
end

NumberUI64.__init = NumberUI64Ctor

NumberUI64.High = High
NumberUI64.Low = Low
NumberUI64.Set = Set
NumberUI64.SetSimple = SetSimple
NumberUI64.Del = Del
NumberUI64.Add = Add
NumberUI64.Value = Value
NumberUI64.ToNumber = ToNumber
NumberUI64.EqualRaw = EqualRaw
NumberUI64.NotEqualRaw = NotEqualRaw
NumberUI64.MoreThenRaw = MoreThenRaw
NumberUI64.MoreEqualThenRaw = MoreEqualThenRaw
NumberUI64.LessThenRaw = LessThenRaw
NumberUI64.LessEqualThenRaw = LessEqualThenRaw
NumberUI64.CopyFrom = CopyFrom
NumberUI64.__tostring  = ToString

--static
NumberUI64.NewInstance = NewInstance
NumberUI64.NewSimple = NewSimple
NumberUI64.__eq = _Equal
NumberUI64.__lt = _LessThen
NumberUI64.__le = _LessEqualThen

return NumberUI64