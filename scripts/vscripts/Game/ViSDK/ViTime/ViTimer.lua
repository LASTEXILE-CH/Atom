local ViTimer = BaseClass("ViTimer")

local function ViTimerCtor(self)
    self._time = 0
    self._roll0 = TimeRoll.New()
    self._roll1 = TimeRoll.New()
    self._currentList = ViDoubleLink2.New()
    self._reserveList = ViDoubleLink2.New()
end

local function Time(self)
    return self._time
end

local function Start(self, startTime, span, rollSize0, rollSize1)
    self._time = startTime
    self._roll0:Init(startTime, rollSize0, span)
    self._roll1:Init(startTime, rollSize1, span * rollSize0)
end

local function End(self)
    self._roll0:Clear()
    self._roll1:Clear()
    self._currentList:Clear()
    self._reserveList:Clear()
    self._time = 0
end

local function ResetTime(self, time)
    local deltaTime = time - self._time
    self._time = time
    self._roll0:ResetTime(deltaTime)
    self._roll1:ResetTime(deltaTime)
    TimeRoll.ResetTime2(self._reserveList, deltaTime)
end

local function Update(self, time)
    if self._time >= time then
        return
    end
    local updateTime = self._time
	local span = self._roll0.Span
	local topTime = time - span
	local _roll0 = self._roll0
	local _roll1 = self._roll1
	local _roll0_IsRoll = _roll0.IsRoll.bind(_roll0)
	local _roll0_Next = _roll0.Next.bind(_roll0)
    local _currentList = self._currentList
    while updateTime <= topTime do
        updateTime = updateTime + span
        if self:_roll0_IsRoll() then
            ViTimer.Convert2(self._roll1.Current, self._roll0)
            self._roll1:Next()
            if self._roll1:IsRoll() then
                ViTimer.Convert(self._reserveList, self._roll1)
            end
        end
        self._time = updateTime
        _currentList:PushListBack(self._roll0.Current)
        _roll0:Next()
        self:_ExecTimeList(_currentList)
    end
end

local function Add(self, node)
    local _roll0 = self._roll0
    local node_Time = node.Time
    if node_Time < _roll0.TimeInf then
        node:SetTime(_roll0.TimeInf)
        node_Time = node.Time
    end
    if _roll0:InRange(node_Time) then
        _roll0:Add(node)
    elseif self._roll1:InRange(node_Time) then
        self._roll1:Add(node)
    else
        self._reserveList:PushBackNode(node.AttachNode)
    end
end

local function Convert(list, timeRoll)
    local iter = list:GetHead()
    while not list:IsEnd(iter) do
        local timeNode = iter.Data
        iter = list:Next(iter)
        if timeRoll:InRange(timeNode.Time) then
            timeRoll:Add(timeNode)
        end
    end
end

local function Convert2(list, timeRoll)
    local iter = list:GetHead()
    while not list:IsEnd(iter) do
        local timeNode = iter.Data
        iter = list:Next(iter)
        if timeRoll:InRange(timeNode.Time) then
            timeRoll:Add(timeNode)
        else
            print("Convert2")
        end
    end
end

local function _ExecTimeList(self, list)
    while list:NotEmpty() do
        local timeNode = list:GetHead().Data
        timeNode.AttachNode:Detach()
        timeNode:_Exce(self)
    end
end

ViTimer.__init = ViTimerCtor
ViTimer.Time = Time
ViTimer.Start = Start
ViTimer.End = End
ViTimer.ResetTime = ResetTime
ViTimer.Update = Update
ViTimer.Add = Add
ViTimer.Convert = Convert
ViTimer.Convert2 = Convert2
ViTimer._ExecTimeList = _ExecTimeList

return ViTimer