local ViAsynCallback0 = BaseClass("ViAsynCallback0", ViAsynDelegateInterface)

local function ViAsynCallback0Ctor(self)
    self._node = ViDoubleLinkNode2.New()
    self._attachNode = ViDoubleLinkNode2.New()
    self._func = nil
    self._funcAsyn = nil
    self._eventID = 0
end

local function IsActive(self)
    return self._node:IsAttach()
end

local function IsAsynActive(self)
    return self._attachNode:IsAttach()
end

local function End(self)
    self._func = nil
    self._funcAsyn = nil
    self._node:DetachEx(nil)
    self._attachNode:DetachEx(nil)
end

local function OnCallerClear(self)
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

local function Exec(self, eventID)
    self._funcAsyn = self._func
    self._eventID = eventID
    self:_AttachAsyn()
end

local function _AsynExec(self)
    local func = self._funcAsyn
    self._funcAsyn = nil
    ViDelegateAssisstant.Invoke1(func, self._eventID)
end

local function Attach(self, func, list)
    self:End()
    self._func = func
    self:PushBackEx(self._node, self)
end

ViAsynCallback0.__init = ViAsynCallback0Ctor
ViAsynCallback0.IsActive = IsActive
ViAsynCallback0.End = End
ViAsynCallback0.OnCallerClear = OnCallerClear
ViAsynCallback0.Exec = Exec
ViAsynCallback0.Attach = Attach

ViAsynCallback0.IsAsynActive = IsAsynActive
ViAsynCallback0.ForceExec = ForceExec
ViAsynCallback0._AsynExec = _AsynExec

return ViAsynCallback0