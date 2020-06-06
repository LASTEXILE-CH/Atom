local TimeRoll = BaseClass("TimeRoll")

local function TimeRollCtor(self)
    self._span = 0
    self._timeInf = 0
    self._timeSup = 0
    self._timeListArray = ViList.New()
    self._idx = 0
end

local function Span(self)
    return self._span
end

local function TimeInf(self)
    return self._timeInf
end

local function TimeISup(self)
    return self._timeSup
end

local function Current(self)
    return self._timeListArray:Get(self._idx)
end

local function Init(self, startTime, rollSize, span)
    for iter = 0, rollSize do
        local node = ViDoubleLink2.New()
        self._timeListArray:Push(node)
    end
    self._span = span;
	self._timeInf = startTime;
	self._timeSup = startTime + span * rollSize;
end

local function InRange(self, time)
    return (self._timeInf <= time and time < self._timeSup)
end

local function IsRoll(self)
    return self._idx == 0
end

local function ResetTime(self, deltaTime)
    for iter = 0, this._timeListArray:Count() do
        TimeRoll.ResetTime2(this._timeListArray:Get(iter), deltaTime)
    end
end

local function ResetTime2(self, list, deltaTime)
    local iter = list:GetHead()
    while not list:IsEnd(iter) do
       local iterNode = iter.Data
       iter = list:Next(iter)
       iterNode:SetTime(iterNode.Time + deltaTime)
    end
end

local function Add(self, node)
    local time = node.Time
    local slot = self._idx
    local _timeListArray = self._timeListArray
    if time > this._timeInf then
        local deltaSlot = ViAssisstant.Int32Inf((time - self._timeInf) / self._span)
        slot = deltaSlot + self._idx
        if slot >= _timeListArray:Count() then
            slot = slot - _timeListArray.Count()
        end
    end
    _timeListArray:Get(slot).PushBackNode(node.AttachNode)
end

local function Next(self)
    self._idx = self._idx + 1
    if self._idx == self._timeListArray:Count() then
        self._idx = 0
    end
    self._timeInf = self._timeInf + self._span
    self._timeSup = self._timeSup + self._span
    return self._idx
end

local function Clear(self)
    local count = self._timeListArray:Count()
    for iter = 0, iter < count do
        self._timeListArray:Get(iter):Clear()
    end
    self._timeListArray:Clear()
    self._timeInf = 0
    self._timeSup = 0
    self._span = 0
    self._idx = 0
end

TimeRoll.__init = TimeRollCtor
TimeRoll.Span = Span
TimeRoll.TimeInf = TimeInf
TimeRoll.TimeISup = TimeISup
TimeRoll.Current = Current
TimeRoll.Init = Init
TimeRoll.InRange = InRange
TimeRoll.IsRoll = IsRoll
TimeRoll.ResetTime = ResetTime
TimeRoll.ResetTime2 = ResetTime2
TimeRoll.Add = Add
TimeRoll.Next = Next
TimeRoll.Clear = Clear

return TimeRoll