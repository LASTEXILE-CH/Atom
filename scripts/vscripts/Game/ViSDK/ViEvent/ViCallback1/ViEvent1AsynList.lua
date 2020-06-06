local ViEvent1AsynList = BaseClass("ViEvent1AsynList")

local function ViEvent1AsynListCtor(self)
    self._eventList = ViDoubleLink2.New()
    self.CACHE_Invoke_ExecList = ViDoubleLink2.New()
end

local function Empty(self)
    return self._eventList:Empty()
end

local function NotEmpty(self)
    return not self._eventList:Empty()
end

local function Invoke(self, clear, eventId, param0)
    if clear then
        local _eventList = self._eventList
        while _eventList:IsNotEmpty() do
           local iterNode = _eventList:GetHead()
           iterNode:Detach()
           local iterCallback = iterNode.Data
           iterCallback:Exec(eventId, param0)
        end
    else
        local _eventList = self._eventList
            while _eventList:IsNotEmpty() do
                local iterNode = _eventList:GetHead()
                self.CACHE_Invoke_ExecList:PushBackNode(iterNode)
                local iterCallback = iterNode.Data
                iterCallback:Exec(eventId, param0)
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

ViEvent1AsynList.__init = ViEvent1AsynListCtor
ViEvent1AsynList.Empty = Empty
ViEvent1AsynList.NotEmpty = NotEmpty
ViEvent1AsynList.Invoke = Invoke
ViEvent1AsynList.AttachAsyn = AttachAsyn
ViEvent1AsynList.AttachAsynEx = AttachAsynEx
ViEvent1AsynList.Clear = Clear

return ViEvent1AsynList