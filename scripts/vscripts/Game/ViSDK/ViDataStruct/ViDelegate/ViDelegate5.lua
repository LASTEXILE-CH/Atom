local ViDelegate5 = BaseClass("ViDelegate5")

local function ViDelegate5Cotr(self)
    self.Callback = nil
end

local function SetDele(self, action)
    self.Callback = action
end

local function Invoke(self, param1, param2, param3, param4, param5)
    if self.Callback ~= nil then
        self.Callback(param1, param2, param3, param4, param5)
    end
end

local function Clear(self) 
    self.Callback =nil
end

ViDelegate5.__init = ViDelegate5Cotr
ViDelegate5.SetDele = SetDele
ViDelegate5.Invoke = Invoke
ViDelegate5.Clear = Clear

return ViDelegate5