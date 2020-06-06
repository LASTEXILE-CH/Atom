local ViActiveValue = BaseClass("ViActiveValue")

local function ViActiveValueCtor(self, value)
    if value ~= nil then
        self._active = true
        self._value = value
    end
end

local function Set(self, value)
    self._active = true
    self._value = value
end

local function Clear(self)
    self._active = false
end

local function GetValue(self)
    if self._active then
        return self._value
    else
        return nil
    end
end

local function Value(self, defautValue)
    if self._active then
        return self._value
    else
        return defautValue
    end
end

ViActiveValue.__init = ViActiveValueCtor
ViActiveValue.Set = Set
ViActiveValue.Clear = Clear
ViActiveValue.GetValue = GetValue
ViActiveValue.Value = Value

return ViActiveValue