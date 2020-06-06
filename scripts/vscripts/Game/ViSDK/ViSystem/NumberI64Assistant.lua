local NumberI64Assistant = BaseClass("NumberI64Assistant")


local function Int32ToViNumberI64(from, to)
    from = bor(from, 0)
    if from < 0 then
        to:Set(from, -1)
    else
        to:Set(from, 0)
    end
end

local function NumberToNumberI64(from, to)
    local value0 = math.floor(from)
    if value0 < -ViConst.TWO_PWR_63_DBL then
        to:Set(0x80000000, 0)
    elseif (value0 + 1 >= ViConst.TWO_PWR_63_DBL) then
        to:Set(0x7FFFFFFF, 0xFFFFFFFF)
    elseif (from < 0) then
        Number64Assistant.NumberToNumberI64(-value0, to)
        Number64Assistant.Negagte(to)
    else
        local left = bor(from % (ViConst.MAX_UINT32), 0)
        local right = bor(from / ViConst.TWO_PWR_32_DBL, 0)
        to.Set(left, right)
    end
end

local function Not(value)
    local high = bnot(value.High)
    local low = bnot(value.Low)
    value:Set(high, low)
end

local function Negagte(value)
    if value:EqualRaw(0x80000000, 0) then
        return
    else
        Number64Assistant.Not(value)
        value:Add(0, 1)
    end
end

local function Mod(value, iDeltaValue)
    Number64Assistant.CACHE_Mod_Value:Set(0, 0)
    Number64Assistant.NumberToNumberI64(iDeltaValue, Number64Assistant.CACHE_Mod_Value)
    value:Add(Number64Assistant.CACHE_Mod_Value.High, Number64Assistant.CACHE_Mod_Value.Low)
end

NumberI64Assistant.CACHE_Mod_Value = NumberI64.New(0, 0)
return NumberI64Assistant