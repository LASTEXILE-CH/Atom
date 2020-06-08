local ViDelegate3 = BaseClass("ViDelegate3")

local function ViDelegate3Cotr(self)
    self._listener = nil
    self.Callback = nil
end

local function SetDele(self, listener, action)
    self._listener = listener
    self.Callback = action
end

local function Invoke(self, param1, param2, param3)
    if self._listener ~= nil and self.Callback ~= nil then
        return self.Callback(self._listener, param1, param2, param3)
    end
end

local function Clear(self) 
    self._listener = nil
    self.Callback =nil
end

ViDelegate3.__init = ViDelegate3Cotr
ViDelegate3.SetDele = SetDele
ViDelegate3.Invoke = Invoke
ViDelegate3.Clear = Clear

return ViDelegate3