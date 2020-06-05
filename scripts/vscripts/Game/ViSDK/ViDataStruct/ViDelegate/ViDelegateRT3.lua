local ViDelegateRT3 = BaseClass("ViDelegateRT3")

local function ViDelegateRT3Cotr(self)
    self.Callback = nil
end

local function SetDele(self, action)
    self.Callback = action
end

local function Invoke(self, param1, param2, param3)
    if self.Callback ~= nil then
        return self.Callback(param1, param2, param3)
    end
end

local function Clear(self) 
    self.Callback =nil
end

ViDelegateRT3.__init = ViDelegateRT3Cotr
ViDelegateRT3.SetDele = SetDele
ViDelegateRT3.Invoke = Invoke
ViDelegateRT3.Clear = Clear

return ViDelegateRT3