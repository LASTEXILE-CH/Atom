local ViCallback1 = BaseClass("ViCallback1")

local function ViCallback1Ctor(self)
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

local function Exec(self, eventID, param0)
    ViDelegateAssisstant.Invoke2(self._func, eventID, param0)
end
local function Attach(self, func, list)
    self._func = func
    list:PushBackEx(self._node, self)
end

ViCallback1.__init = ViCallback1Ctor
ViCallback1.IsActive = IsActive
ViCallback1.End = End
ViCallback1.OnCallerClear = OnCallerClear
ViCallback1.Exec = Exec
ViCallback1.Attach = Attach

return ViCallback1