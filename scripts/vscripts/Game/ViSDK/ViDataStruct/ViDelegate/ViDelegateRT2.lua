local ViDelegateRT2 = BaseClass("ViDelegateRT2")

local function ViDelegateRT2Cotr(self)
    self.Callback = nil
end

local function SetDele(self, action)
    self.Callback = action
end

local function Invoke(self, param1, param2)
    if self.Callback ~= nil then
        return self.Callback(param1, param2)
    end
end

local function Clear(self) 
    self.Callback =nil
end

ViDelegateRT2.__init = ViDelegateRT2Cotr
ViDelegateRT2.SetDele = SetDele
ViDelegateRT2.Invoke = Invoke
ViDelegateRT2.Clear = Clear

return ViDelegateRT2