local ViCallback2 = BaseClass("ViCallback2")

local function ViCallback1Ctor(self)
    self._node = ViDoubleLinkNode2.New()
    self._listener = nil
    self._func = nil
    self._listener = nil
end

local function IsActive(self)
    return self._node:IsAttach()
end

local function End(self)
    self._listener = nil
    self._func = nil
    self._listener = nil
    self._node:DetachEx(nil)
end

local function OnCallerClear(self)
    self._listener = nil
    self._func = nil
    self._listener = nil
    self._node:DetachEx(nil)
end

local function Exec(self, eventID, param0, param1)
    ViDelegateAssisstant.Invoke3(self._listener, self._func, eventID, param0, param1)
end

local function Attach(self, listener, func, list)
    self._func = func
    self._listener = listener
    list:PushBackEx(self._node, self)
end

ViCallback2.__init = ViCallback1Ctor
ViCallback2.IsActive = IsActive
ViCallback2.End = End
ViCallback2.OnCallerClear = OnCallerClear
ViCallback2.Exec = Exec
ViCallback2.Attach = Attach

return ViCallback2