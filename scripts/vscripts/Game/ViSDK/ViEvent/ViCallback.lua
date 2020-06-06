local ViAsynDelegateInterface = BaseClass("ViAsynDelegateInterface")

local function ViAsynDelegateInterfaceCtor(self)
    self.TimeSpan = 0
    self._execTime = 0
    self._attachNode = ViDoubleLinkNode2.New()
end

local function Update()
    if ViAsynDelegateInterface._immediateList:IsNotEmpty() then
        local execList = ViAsynDelegateInterface.CACHE_Update_ExecList
        execList:PushBackList(ViAsynDelegateInterface._immediateList)
        while execList:IsNotEmpty() do
            local asynCallback = execList:GetHead().Data
            asynCallback._attachNode:DetachEx(nil)
            asynCallback:_AsynExec()
        end
    end
    if ViAsynDelegateInterface._timeList:IsNotEmpty() then
        local execList = ViAsynDelegateInterface.CACHE_Update_ExecList
        local time = ViRealTimerInstance.Time
        local _timeList = ViAsynDelegateInterface._timeList
        local iter = _timeList:GetHead()
        while not _timeList:IsEnd(iter) do
            local iterCallback = iter.Data
            iter = _timeList:Next(iter)
            if time > iterCallback._execTime then
                execList:PushBackNode(iterCallback._attachNode)
            end
        end
        while execList:IsNotEmpty() do
            local asynCallback = execList:GetHead().Data
            asynCallback._attachNode:DetachEx(nil)
            asynCallback:_AsynExec()
        end
    end
end

local function _AttachAsyn(self)
    if self._attachNode:IsAttach() then
        return
    end
    if self.TimeSpan > 0 then
        self._execTime = ViRealTimerInstance.Time + this.TimeSpan
        ViAsynDelegateInterface._timeList:PushBackEx(self._attachNode, self)
    else
        ViAsynDelegateInterface._immediateList:PushBackEx(self._attachNode, self);
    end
end

ViAsynDelegateInterface.__init = ViAsynDelegateInterfaceCtor
ViAsynDelegateInterface.CACHE_Update_ExecList = ViDoubleLink2.New()
ViAsynDelegateInterface._immediateList = ViDoubleLink2.New()
ViAsynDelegateInterface._timeList = ViDoubleLink2.New()

ViAsynDelegateInterface.Update = Update
ViAsynDelegateInterface._AttachAsyn = _AttachAsyn

return ViAsynDelegateInterface