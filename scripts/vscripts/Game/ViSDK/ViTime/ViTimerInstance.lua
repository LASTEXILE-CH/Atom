local ViTimerInstance = BaseClass("ViTimerInstance")


local function Time()
    return ViTimerInstance._globalAccumulateTime
end

local function Time1970()
    return ViTimerInstance._time1970
end

local function LocalTime()
    return ViTimerInstance._localAccumulateTime
end

local function Timer()
    return ViTimerInstance._timer
end

local function IsRunning()
    return ViTimerInstance._timer ~= nil
end

local function StartTime()
    return ViTimerInstance._startAccumulateTime
end

local function DayOffset()
    return ViTimerInstance._dayOffset
end

local function Start(accumulateTime, time1970, span, rollSize0, rollSize1)
    ViTimerInstance._timer = ViTimer.New()
    ViTimerInstance._startAccumulateTime:CopyFrom(accumulateTime)
    ViTimerInstance._localAccumulateTime = 0
    ViTimerInstance._globalAccumulateTime:CopyFrom(accumulateTime)
    ViTimerInstance._startTime1970:CopyFrom(time1970)
    ViTimerInstance._time1970:CopyFrom(time1970)
    ViTimerInstance._timer:Start(0, span, rollSize0, rollSize1)
end

local function End()
    ViTimerInstance._timer:End()
end

local function Update(deltaTime)
    if ViTimerInstance.IsRunning() then
        local This = ViTimerInstance
        local localAccumulateTime = This._localAccumulateTime + deltaTime
        local localAccumulateTime100 = ViAssisstant.IntInf(localAccumulateTime * 100)
        This._localAccumulateTime = localAccumulateTime
        --
        This._globalAccumulateTime:CopyFrom(This._startAccumulateTime)
        This._globalAccumulateTime:Add(0, localAccumulateTime100)
        --
        This._time1970:CopyFrom(This._startTime1970)
        This._time1970:Add(0, localAccumulateTime100)
        --
        This._timer:Update(localAccumulateTime100)
    end
end

local function SetTime(delayTime, node, dele)
    node:SetDelegate(dele)
    node:SetTime(ViAssisstant.IntInf((ViTimerInstance._localAccumulateTime + delayTime) * 100))
    ViTimerInstance._timer:Add(node)
end

local function SetFreq(node, fOldFreq, fNewFreq)
    if node:IsAttach() == false then-- 如果回调已经发生过了, 则无法进行重新设置
        return
    end
    -- local currentTime = ViTimerInstance._timer.Time
    -- local delta = node.Time - currentTime
    -- local deltaTimeOldMod = (delta > 0) and delta or 0
    -- local deltaTime = math.floor(deltaTimeOldMod * fOldFreq)
    -- local deltaTimeNewMod = math.floor(deltaTime / fNewFreq)
    -- node:SetTime(ViTimerInstance._timer.Time + deltaTimeNewMod)
    -- ViTimerInstance._timer:Add(node)
end

local function Modify(node, deltaTime)
    if node:IsAttach() == false then --! 如果回调已经发生过了, 则无法进行重新设置
        return
    end
    if node.Time > -deltaTime then
        node:SetTime(node.Time + deltaTime)
    else
        node:SetTime(0)
    end
    ViTimerInstance._timer:Add(node)
end

local function GetDayNumber(time1970, dayOffset)
    return 0;
    -- if (time1970 && dayOffset)
    -- {
    -- 	return ((time1970 - dayOffset) / ViTickCount.DAY);
    -- }
    -- else if (time1970)
    -- {
    -- 	return ((time1970 - ViTimerInstance._dayOffset) / ViTickCount.DAY);
    -- }
    -- else
    -- {
    -- 	return ((ViTimerInstance.Time1970 - ViTimerInstance._dayOffset) / ViTickCount.DAY);
    -- }
end

local function SetDayOffset(value)
    ViTimerInstance._dayOffset = value
end

local function TimeToTime1970(time)
	--time + ViTimerInstance.Time1970 - ViTimerInstance.Time
	local time1970 = NumberI64.NewInstance(time)
	time1970:Add(ViTimerInstance.Time1970.High, ViTimerInstance.Time1970.Low)
	local negTime = NumberI64.New(ViTimerInstance.Time1970.High, ViTimerInstance.Time1970.Low)
	Number64Assistant.Negagte(negTime)
	time1970:Add(negTime.High, negTime.Low)
	return time1970
end

local function Time1970ToTime(time1970)
    --iTime1970 + ViTimerInstance.Time - ViTimerInstance.Time1970
    local time = NumberI64.New(time1970)
    time:Add(ViTimerInstance.Time.High, ViTimerInstance.Time.Low)
    local negTime = NumberI64.New(ViTimerInstance.Time.High, ViTimerInstance.Time.Low)
    Number64Assistant.Negagte(negTime)
    time:Add(negTime.High, negTime.Low)
    --time:Mod(-ViTimerInstance.Time1970.High, -ViTimerInstance.Time1970.Low)
    return time
end

local function GetTime(node)
    local time = NumberI64.NewInstance(ViTimerInstance._startAccumulateTime)
    time:Add(0, node.Time)
    return time
end

local function GetTime1970(node)
    local time = NumberI64.NewInstance(ViTimerInstance._startTime1970)
    time:Add(0, node.Time)
    return time
end

ViTimerInstance._timer = nil
ViTimerInstance._startAccumulateTime = NumberI64.New(0, 0)
ViTimerInstance._startTime1970 = NumberI64.New(0, 0)
ViTimerInstance._localAccumulateTime = 0
ViTimerInstance._globalAccumulateTime = NumberI64.New(0, 0)
ViTimerInstance._time1970 = NumberI64.New(0, 0)
ViTimerInstance._dayOffset = 0

ViTimerInstance.Time = Time
ViTimerInstance.Time1970 = Time1970
ViTimerInstance.LocalTime = LocalTime
ViTimerInstance.Timer = Timer
ViTimerInstance.IsRunning = IsRunning
ViTimerInstance.StartTime = StartTime
ViTimerInstance.DayOffset = DayOffset
ViTimerInstance.Start = Start
ViTimerInstance.End = End
ViTimerInstance.Update = Update

ViTimerInstance.SetTime = SetTime
ViTimerInstance.SetFreq = SetFreq
ViTimerInstance.Modify = Modify
ViTimerInstance.GetDayNumber = GetDayNumber

ViTimerInstance.SetDayOffset = SetDayOffset
ViTimerInstance.TimeToTime1970 = TimeToTime1970
ViTimerInstance.Time1970ToTime = Time1970ToTime
ViTimerInstance.GetTime = GetTime
ViTimerInstance.GetTime1970 = GetTime1970

return ViTimerInstance