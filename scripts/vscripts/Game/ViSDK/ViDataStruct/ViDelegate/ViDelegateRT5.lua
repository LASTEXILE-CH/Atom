local ViDelegateRT5 = BaseClass("ViDelegateRT5")

local function ViDelegateRT5Cotr(self)
    self.Callback = nil
end

local function SetDele(self, action)
    self.Callback = action
end

local function Invoke(self, param1, param2, param3, param4, param5)
    if self.Callback ~= nil then
        return self.Callback(param1, param2, param3, param4, param5)
    end
end

local function Clear(self) 
    self.Callback =nil
end

ViDelegateRT5.__init = ViDelegateRT5Cotr
ViDelegateRT5.SetDele = SetDele
ViDelegateRT5.Invoke = Invoke
ViDelegateRT5.Clear = Clear

return ViDelegateRT5