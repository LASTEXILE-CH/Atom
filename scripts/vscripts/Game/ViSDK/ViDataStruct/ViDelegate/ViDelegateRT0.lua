local ViDelegateRT0 = BaseClass("ViDelegateRT0")

local function ViDelegateRT0Cotr(self)
    self.Callback = nil
end

local function SetDele(self, action)
    self.Callback = action
end

local function Invoke(self)
    if self.Callback ~= nil then
        return self.Callback()
    end
end

local function Clear(self) 
    self.Callback =nil
end

ViDelegateRT0.__init = ViDelegateRT0Cotr
ViDelegateRT0.SetDele = SetDele
ViDelegateRT0.Invoke = Invoke
ViDelegateRT0.Clear = Clear

return ViDelegateRT0