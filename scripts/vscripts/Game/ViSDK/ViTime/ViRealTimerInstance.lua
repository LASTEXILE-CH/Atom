local ViRealTimerInstance = BaseClass("ViRealTimerInstance")

local function Time()
    return ViRealTimerInstance._time
end

local function Timer()
    return ViRealTimerInstance._timer
end

local function Start(span, rollSize0, rollSize1)
    ViRealTimerInstance._timer = ViTimer.New()
    ViRealTimerInstance._timer:Start(0, span, rollSize0, rollSize1)
end

local function End()
    ViRealTimerInstance._timer:End()
end

local function Update(deltaTime)
    ViRealTimerInstance._time = ViRealTimerInstance._time + deltaTime
    ViRealTimerInstance._timer:Update(ViAssisstant.IntInf(ViRealTimerInstance._time * 100))
end

local function SetTime(delayTime, node, dele)
	node:SetDelegate(dele)
	node:SetTime(ViAssisstant.IntInf((ViRealTimerInstance._time + delayTime) * 100))
    ViRealTimerInstance._timer:Add(node)
end

local function SetFreq(node, fOldFreq, fNewFreq)
    if node:IsAttach() == false then --! 如果回调已经发生过了, 则无法进行重新设置
        return
    end
    --let currentTime: ViTime64 = ViRealTimerInstance._timer.Time;
    --let delta: ViTime64 = node.Time - currentTime;
    --let deltaTimeOldMod: ViTime64 = (delta > 0) ? delta : 0;
    --let deltaTime: ViTime64 = Math.floor(deltaTimeOldMod * fOldFreq);
    --let deltaTimeNewMod: ViTime64 = Math.floor(deltaTime / fNewFreq);
    --node.SetTime(ViRealTimerInstance._timer.Time + deltaTimeNewMod);
    --ViRealTimerInstance._timer.Add(node);
end

local function Modify(node, deltaTime)
    if node:IsAttach() == false then--! 如果回调已经发生过了, 则无法进行重新设置
        return
    end
    if node.Time > -deltaTime then
        node:SetTime(node.Time + deltaTime)
    else
        node:SetTime(0)
    end
    ViRealTimerInstance._timer:Add(node)
end

ViRealTimerInstance._timer = nil
ViRealTimerInstance._time = 0

ViRealTimerInstance.Time = Time
ViRealTimerInstance.Timer = Timer
ViRealTimerInstance.Start = Start
ViRealTimerInstance.End = End
ViRealTimerInstance.Update = Update
ViRealTimerInstance.SetTime = SetTime
ViRealTimerInstance.SetFreq = SetFreq
ViRealTimerInstance.Modify = Modify


return ViRealTimerInstance