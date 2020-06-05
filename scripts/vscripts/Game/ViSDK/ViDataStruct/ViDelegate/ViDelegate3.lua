local ViDelegate3 = BaseClass("ViDelegate3")

local function ViDelegate3Cotr(self)
    self.Callback = nil
end

local function SetDele(self, action)
    self.Callback = action
end

local function Invoke(self, param1, param2, param3)
    if self.Callback ~= nil then
        self.Callback(param1, param2, param3)
    end
end

local function Clear(self) 
    self.Callback =nil
end

ViDelegate3.__init = ViDelegate3Cotr
ViDelegate3.SetDele = SetDele
ViDelegate3.Invoke = Invoke
ViDelegate3.Clear = Clear

return ViDelegate3