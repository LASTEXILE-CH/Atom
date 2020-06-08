local ViDelegate0 = BaseClass("ViDelegate0")

local function ViDelegate0Cotr(self)
    self._listener = nil
    self._ccallback = nil
end

local function SetDele(self, listener, action)
    self._listener = listener
    self._callback = action
end

local function Invoke(self)
    if self._listener ~= nil and self._callback ~= nil then
        return self._callback(self._listener)
    end
end

local function Clear(self) 
    self._listener =nil
    self._callback =nil
end

ViDelegate0.__init = ViDelegate0Cotr
ViDelegate0.SetDele = SetDele
ViDelegate0.Invoke = Invoke
ViDelegate0.Clear = Clear

return ViDelegate0