local ViCallback0 = BaseClass("ViCallback0")

local function ViCallback0Ctor(self)
    self._node = ViDoubleLinkNode2.New()
    self._func = nil
end

local function IsActive(self)
    return self._node:IsAttach()
end

local function End(self)
    self._func = nil
    self._node:DetachEx(nil)
end

local function OnCallerClear(self)
    self._func = nil
    self._node:DetachEx(nil)
end

local function Exec(self, eventID)
    ViDelegateAssisstant.Invoke1(self._func, eventID)
end
local function Attach(self, func, list)
    self._func = func
    list:PushBackEx(self._node, self)
end

ViCallback0.__init = ViCallback0Ctor
ViCallback0.IsActive = IsActive
ViCallback0.End = End
ViCallback0.OnCallerClear = OnCallerClear
ViCallback0.Exec = Exec
ViCallback0.Attach = Attach

return ViCallback0