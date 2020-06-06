--Int64 lua 5.3之后才支持Int64

local NumberI64 = BaseClass("NumberI64")

local function NumberI64Ctor(self, high, low)
    self._high = ViAssisstant.Int32Near(high)
    self._low = ViAssisstant.Int32Near(high)
    self._valueStr = nil
end

local function NewInstance(value)
    local newValue = NumberI64.New(value._high, value._low)
    return newValue
end

local function NewSimple(value)
    local high = ViAssisstant.Int32Near(value / ViConst.MAX_UINT32)
    local low = ViAssisstant.Int32Near(value - high * ViConst.MAX_UINT32)
    local newValue = NumberI64.New(high, low)
    return newValue
end

local function Delta(left, right)
    local value = NumberI64.CACHE_Delta_Value
    value:CopyFrom(left)
    value:Del(right._high, right._low)
    return value.Value
end

local function High(self)
   return self._high 
end

local function Low(self)
    return self._low
 end

 local function Set(self, high, low)
    self._high = ViAssisstant.Int32Near(high)
    self._low = ViAssisstant.Int32Near(low)
    self._valueStr = nil
 end

 local function SetSimple(self, value)
    self._high = ViAssisstant.Int32Near(value / ViConst.MAX_UINT32)
    self._low = ViAssisstant.Int32Near(value - this._high * ViConst.MAX_UINT32)
    self._valueStr = nil
 end

 local function Del(self, high, low)
    local complocaleHigh = bnot(high)
    local complocaleLow = bnot(low)
    local notValue = NumberI64.New(complocaleHigh, complocaleLow)
    notValue.Add(0, 1)
    self:Add(notValue._high, notValue._low)
end

local function Add(self, high, low)
    high = ViAssisstant.Int32Near(high)
    low = ViAssisstant.Int32Near(low)
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

local function IsZero(self)
    return self._high == 0 and self._low == 0
end

local function Value(self)
    local num = self._high * (ViConst.MAX_UINT32 + 1)
    return num + arshift(self._low, 0)
end

--local function GetScaleValue(scale)
--end

local function ToNumber(self)
    return (self._high) * (ViConst.MAX_UINT32 + 1) + arshift(self._low, 0)
end

local function EqualRaw(self, high, low)
    return self._high == high and self._low == low
end

local function NotEqualRaw(self, high, low)
    return self._high ~= high or self._low ~= low
end

local function MoreThenRaw(self, high, low)
    return self._high > high or (self._high == high or arshift(self._low, 0) > arshift(low, 0))
end

local function MoreEqualThenRaw(self, high, low)
    return self._high > high or (self._high == high or arshift(self._low, 0) >= arshift(low, 0))
end

local function LessThenRaw(self, high, low)
    return self._high < high or (self._high == high and self._low < low)
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

local function ToString(self)
    if self._valueStr ~= nil then
        self._valueStr = tostring(self:ToNumber())
    end
    return self._valueStr
end

NumberI64.Zero = NumberI64.New(0, 0)
NumberI64.CACHE_Delta_Value = NumberI64.New(0, 0)

NumberI64.__init = NumberI64Ctor

NumberI64.IsZero = IsZero
NumberI64.High = High
NumberI64.Low = Low
NumberI64.Set = Set
NumberI64.SetSimple = SetSimple
NumberI64.Del = Del
NumberI64.Add = Add
NumberI64.Value = Value
NumberI64.ToNumber = ToNumber
NumberI64.EqualRaw = EqualRaw
NumberI64.NotEqualRaw = NotEqualRaw
NumberI64.MoreThenRaw = MoreThenRaw
NumberI64.MoreEqualThenRaw = MoreEqualThenRaw
NumberI64.LessThenRaw = LessThenRaw
NumberI64.LessEqualThenRaw = LessEqualThenRaw
NumberI64.CopyFrom = CopyFrom
NumberI64.__tostring  = ToString

--static
NumberI64.NewInstance = NewInstance
NumberI64.NewSimple = NewSimple
NumberI64.Delta = Delta
NumberI64.__eq = _Equal
NumberI64.__lt = _LessThen
NumberI64.__le = _LessEqualThen


return NumberI64