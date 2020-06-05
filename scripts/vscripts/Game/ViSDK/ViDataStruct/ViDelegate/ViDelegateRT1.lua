local ViDelegateRT1 = BaseClass("ViDelegateRT1")

local function ViDelegateRT1Cotr(self)
    self.Callback = nil
end

local function SetDele(self, action)
    self.Callback = action
end

local function Invoke(self, param)
    if self.Callback ~= nil then
        return self.Callback(param)
    end
end

local function Clear(self) 
    self.Callback = nil
end

ViDelegateRT1.__init = ViDelegateRT1Cotr
ViDelegateRT1.SetDele = SetDele
ViDelegateRT1.Invoke = Invoke
ViDelegateRT1.Clear = Clear

return ViDelegateRT1