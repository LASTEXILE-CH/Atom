local ViWorkFlowEvent = BaseClass("ViWorkFlowEvent")

local function ViWorkFlowEventCtor(self)
    self._waitList = ViList.New()
    self._callback = nil
end

local function Count(self)
    return self._waitList:Count()
end

local function Active(self)
    return self:Count() <= 0
end

local function Wait(self, key, callback)
    if self:IsWaiting(key) then
        return
    end
    local newNode = ViWorkFlowEventNode.New(key, callback)
    self._waitList:Add(newNode)
end

local function IsWaiting(self, key, callback)
    for iter = 0, self._waitList:Count() do
        local iterWait = self._waitList:Get(iter)
        if iterWait.Name == key then
            return true
        end
    end
    return false
end

local function EraseWaiting(self, key)
    ViWorkFlowEvent.TempList:Clear()
    local result = false
    for iter = 0, self._waitList:Count() do
        local iterWait = self._waitList:Get(iter)
        if iterWait.Name == key then
            ViWorkFlowEvent.TempList:Add(iter)
            result = true
        end
    end
    for iter = 0, ViWorkFlowEvent.TempList:Count() do
        local iterIndex = ViWorkFlowEvent.TempList:Get(iter)
        local node = self._waitList:Get(iterIndex)
        if node ~= nil then
            ViDelegateAssisstant.Invoke0(node.Callback)
        end
        self._waitList:RemoveAt(iterIndex)
    end
    return result
end

local function Complete(self, key)
    self:EraseWaiting(key)
    if self._waitList:Count() == 0 then
       self:Invoke()
    end
end

local function Reset(self, callback)
    self._waitList:Clear()
    self._callback = callback
end

local function Clear(self)
    self._waitList:Clear()
    self._callback = nil
end

local function Invoke(self)
    local dele = self._callback
    self._callback = nil
    ViDelegateAssisstant.Invoke0(dele)
end

ViWorkFlowEvent.TempList = ViList.New()

ViWorkFlowEvent.__init = ViWorkFlowEventCtor
ViWorkFlowEvent.Count = Count
ViWorkFlowEvent.Active = Active
ViWorkFlowEvent.Wait = Wait
ViWorkFlowEvent.IsWaiting = IsWaiting
ViWorkFlowEvent.EraseWaiting = EraseWaiting
ViWorkFlowEvent.Complete = Complete
ViWorkFlowEvent.Reset = Reset
ViWorkFlowEvent.Clear = Clear
ViWorkFlowEvent.Invoke = Invoke

return ViWorkFlowEvent