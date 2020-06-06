local ViCallback2 = BaseClass("ViCallback2")

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

local function Exec(self, eventID, param0, param1)
    ViDelegateAssisstant.Invoke3(self._func, eventID, param0, param1)
end

local function Attach(self, func, list)
    self._func = func
    list:PushBackEx(self._node, self)
end

ViCallback2.__init = ViCallback1Ctor
ViCallback2.IsActive = IsActive
ViCallback2.End = End
ViCallback2.OnCallerClear = OnCallerClear
ViCallback2.Exec = Exec
ViCallback2.Attach = Attach

return ViCallback2