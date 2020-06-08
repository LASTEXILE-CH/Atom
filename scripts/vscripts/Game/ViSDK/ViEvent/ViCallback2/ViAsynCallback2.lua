local ViAsynCallback2 = BaseClass("ViAsynCallback2", ViAsynDelegateInterface)

local function ViAsynCallback2Ctor(self)
    self._node = ViDoubleLinkNode2.New()
    self._attachNode = ViDoubleLinkNode2.New()
    self._listener = nil
    self._func = nil
    self._funcAsyn = nil
    self._eventID = 0
    self._param0 = nil
    self._param1 = nil
end

local function IsActive(self)
    return self._node:IsAttach()
end

local function IsAsynActive(self)
    return self._attachNode:IsAttach()
end

local function End(self)
    self._listener = nil
    self._func = nil
    self._funcAsyn = nil
    self._node:DetachEx(nil)
    self._attachNode:DetachEx(nil)
end

local function OnCallerClear(self)
    self._listener = nil
    self._func = nil
    self._funcAsyn = nil
    self._node:DetachEx(nil)
end

local function ForceExec(self)
    if self._attachNode:IsAttach() then
        self._attachNode:DetachEx(nil)
        self:_AsynExec()
    end
end

local function Exec(self, eventID, param0, param1)
    self._funcAsyn = self._func
    self._eventID = eventID
    self._param0 = param0
    self._param1 = param1
    self:_AttachAsyn()
end

local function _AsynExec(self)
    local func = self._funcAsyn
    local param0 = self._param0
    local param1 = self._param1
    self._funcAsyn = nil
    ViDelegateAssisstant.Invoke3(self._listener, func, self._eventID, param0, param1)
end

local function Attach(self, listener, func, list)
    self:End()
    self._listener = listener
    self._func = func
    list:PushBackEx(self._node, self)
end

ViAsynCallback2.__init = ViAsynCallback2Ctor
ViAsynCallback2.IsActive = IsActive
ViAsynCallback2.End = End
ViAsynCallback2.OnCallerClear = OnCallerClear
ViAsynCallback2.Exec = Exec
ViAsynCallback2.Attach = Attach

ViAsynCallback2.IsAsynActive = IsAsynActive
ViAsynCallback2.ForceExec = ForceExec
ViAsynCallback2._AsynExec = _AsynExec

return ViAsynCallback2