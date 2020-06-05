local ViDelegate1 = BaseClass("ViDelegate1")

local function ViDelegate1Cotr(self)
    self.Callback = nil
end

local function SetDele(self, action)
    self.Callback = action
end

local function Invoke(self, param)
    if self.Callback ~= nil then
        self.Callback(param)
    end
end

local function Clear(self) 
    self.Callback =nil
end

ViDelegate1.__init = ViDelegate1Cotr
ViDelegate1.SetDele = SetDele
ViDelegate1.Invoke = Invoke
ViDelegate1.Clear = Clear

return ViDelegate1