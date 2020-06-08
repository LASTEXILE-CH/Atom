local ViDelegate4 = BaseClass("ViDelegate4")

local function ViDelegate4Cotr(self)
    self._listener = nil
    self._callback = nil
end

local function SetDele(self, listener, action)
    self._listener = listener
    self._callback = action
end

local function Invoke(self, param1, param2, param3, param4, param5)
    if self._listener ~= nil and self._callback ~= nil then
        return self._callback(self._listener, param1, param2, param3, param4, param5)
    end
end

local function Clear(self) 
    self._listener = nil
    self._callback = nil
end

ViDelegate4.__init = ViDelegate4Cotr
ViDelegate4.SetDele = SetDele
ViDelegate4.Invoke = Invoke
ViDelegate4.Clear = Clear

return ViDelegate4