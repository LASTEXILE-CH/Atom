local ViEvent2AsynList = BaseClass("ViEvent2AsynList")

local function ViEvent2AsynListCtor(self)
    self._eventList = ViDoubleLink2.New()
    self.CACHE_Invoke_ExecList = ViDoubleLink2.New()
end

local function Empty(self)
    return self._eventList:Empty()
end

local function NotEmpty(self)
    return not self._eventList:Empty()
end

local function Invoke(self, clear, eventId, param0, param1)
    if clear then
        local _eventList = self._eventList
        while _eventList:IsNotEmpty() do
           local iterNode = _eventList:GetHead()
           iterNode:Detach()
           local iterCallback = iterNode.Data
           iterCallback:Exec(eventId, param0, param1)
        end
    else
        local _eventList = self._eventList
            while _eventList:IsNotEmpty() do
                local iterNode = _eventList:GetHead()
                self.CACHE_Invoke_ExecList:PushBackNode(iterNode)
                local iterCallback = iterNode.Data
                iterCallback:Exec(eventId, param0, param1)
            end
        _eventList:PushBackList(self.CACHE_Invoke_ExecList)
    end
end

local function AttachAsyn(self, node, func)
    node:Attach(func, self._eventList)
end

local function AttachAsynEx(self, node, func, timeSpan)
    node:Attach(func, self._eventList)
    node.TimeSpan = timeSpan
end

local function Clear()
    local _eventList = self._eventList
    while _eventList:IsNotEmpty() do
        local iterNode = _eventList:GetHead()
        local iterCallback = iterNode.Data
        iterCallback:OnCallerClear()
    end
end

ViEvent2AsynList.__init = ViEvent2AsynListCtor
ViEvent2AsynList.Empty = Empty
ViEvent2AsynList.NotEmpty = NotEmpty
ViEvent2AsynList.Invoke = Invoke
ViEvent2AsynList.AttachAsyn = AttachAsyn
ViEvent2AsynList.AttachAsynEx = AttachAsynEx
ViEvent2AsynList.Clear = Clear

return ViEvent2AsynList