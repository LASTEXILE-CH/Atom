local ViDelegate1 = BaseClass("ViDelegate1")

local function ViDelegate1Cotr(self)
    self._listener = nil
    self._callback = nil
end

local function SetDele(self, listener, action)
    self._listener = listener
    self._callback = action
end

local function Invoke(self, param)
    if self._listener ~= nil and self._callback ~= nil then
        self._callback(self._listener, param)
    end
end

local function Clear(self) 
    self._listener = nil
    self._callback =nil
end

ViDelegate1.__init = ViDelegate1Cotr
ViDelegate1.SetDele = SetDele
ViDelegate1.Invoke = Invoke
ViDelegate1.Clear = Clear

return ViDelegate1