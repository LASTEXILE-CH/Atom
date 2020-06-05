local ViDelegate4 = BaseClass("ViDelegate4")

local function ViDelegate4Cotr(self)
    self.Callback = nil
end

local function SetDele(self, action)
    self.Callback = action
end

local function Invoke(self, param1, param2, param3, param4)
    if self.Callback ~= nil then
        self.Callback(param1, param2, param3, param4)
    end
end

local function Clear(self) 
    self.Callback =nil
end

ViDelegate4.__init = ViDelegate4Cotr
ViDelegate4.SetDele = SetDele
ViDelegate4.Invoke = Invoke
ViDelegate4.Clear = Clear

return ViDelegate4