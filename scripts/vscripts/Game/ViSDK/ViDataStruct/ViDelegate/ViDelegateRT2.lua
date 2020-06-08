local ViDelegate2 = BaseClass("ViDelegate2")

local function ViDelegate2Cotr(self)
    self._listener = nil
    self._callback = nil
end

local function SetDele(self, listener, action)
    self._listener = listener
    self._callback = action
end

local function Invoke(self, param1, param2)
    if self._listener ~= nil and self._callback ~= nil then
        return self._callback(self._listener, param1, param2)
    end
end

local function Clear(self) 
    self._listener = nil
    self._callback =nil
end

ViDelegate2.__init = ViDelegate2Cotr
ViDelegate2.SetDele = SetDele
ViDelegate2.Invoke = Invoke
ViDelegate2.Clear = Clear

return ViDelegate2