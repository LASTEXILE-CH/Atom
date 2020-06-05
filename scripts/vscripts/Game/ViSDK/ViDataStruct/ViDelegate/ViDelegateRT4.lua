local ViDelegateRT4 = BaseClass("ViDelegateRT4")

local function ViDelegateRT4Cotr(self)
    self.Callback = nil
end

local function SetDele(self, action)
    self.Callback = action
end

local function Invoke(self, param1, param2, param3, param4)
    if self.Callback ~= nil then
        return self.Callback(param1, param2, param3, param4)
    end
end

local function Clear(self) 
    self.Callback =nil
end

ViDelegateRT4.__init = ViDelegateRT4Cotr
ViDelegateRT4.SetDele = SetDele
ViDelegateRT4.Invoke = Invoke
ViDelegateRT4.Clear = Clear

return ViDelegateRT4