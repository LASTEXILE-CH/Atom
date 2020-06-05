local ViDelegate2 = BaseClass("ViDelegate2")

local function ViDelegate2Cotr(self)
    self.Callback = nil
end

local function SetDele(self, action)
    self.Callback = action
end

local function Invoke(self, param1, param2)
    if self.Callback ~= nil then
        self.Callback(param1, param2)
    end
end

local function Clear(self) 
    self.Callback =nil
end

ViDelegate2.__init = ViDelegate2Cotr
ViDelegate2.SetDele = SetDele
ViDelegate2.Invoke = Invoke
ViDelegate2.Clear = Clear

return ViDelegate2