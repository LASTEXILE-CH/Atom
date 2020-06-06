local ViEvent0AsynList = BaseClass("ViEvent0AsynList")

local function ViEvent0AsynListCtor(self)
    self._eventList = ViDoubleLink2.New()
    self.CACHE_Invoke_ExecList = ViDoubleLink2.New()
end

local function Empty(self)
    return self._eventList:Empty()
end

local function NotEmpty(self)
    return not self._eventList:Empty()
end

local function Invoke(self, clear, eventId)
    if clear then
        local _eventList = self._eventList
        while _eventList:IsNotEmpty() do
           local iterNode = _eventList:GetHead()
           iterNode:Detach()
           local iterCallback = iterNode.Data
           iterCallback:Exec(eventId)
        end
    else
        local _eventList = self._eventList
            while _eventList:IsNotEmpty() do
                local iterNode = _eventList:GetHead()
                self.CACHE_Invoke_ExecList:PushBackNode(iterNode)
                local iterCallback = iterNode.Data
                iterCallback:Exec(eventId)
            end
        _eventList:PushBackList(self.CACHE_Invoke_ExecList);
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
    local _eventList = self._eventList;
    while _eventList:IsNotEmpty() do
        local iterNode = _eventList:GetHead()
        local iterCallback = iterNode.Data
        iterCallback:OnCallerClear()
    end
end

ViEvent0AsynList.__init = ViEvent0AsynListCtor
ViEvent0AsynList.Empty = Empty
ViEvent0AsynList.NotEmpty = NotEmpty
ViEvent0AsynList.Invoke = Invoke
ViEvent0AsynList.AttachAsyn = AttachAsyn
ViEvent0AsynList.AttachAsynEx = AttachAsynEx
ViEvent0AsynList.Clear = Clear

return ViEvent0AsynList