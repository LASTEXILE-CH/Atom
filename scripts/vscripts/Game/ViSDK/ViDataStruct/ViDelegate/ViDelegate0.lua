local ViDelegate0 = BaseClass("ViDelegate0")

local function ViDelegate0Cotr(self)
    self.Callback = nil
end

local function SetDele(self, action)
    self.Callback = action
end

local function Invoke(self)
    if self.Callback ~= nil then
        self.Callback()
    end
end

local function Clear(self) 
    self.Callback =nil
end

ViDelegate0.__init = ViDelegate0Cotr
ViDelegate0.SetDele = SetDele
ViDelegate0.Invoke = Invoke
ViDelegate0.Clear = Clear

return ViDelegate0