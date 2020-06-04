local LodTickNode = BaseClass("LodTickNode", RefListNode1)
local base = LodTickNode.super

local function LodTickNodeCtor(self)
    self._delegate = Delegate.New()
    self._accumulateTime = 0.0
    self._span = 0.0
end

local function Update(deltaTime)
    local tickList = LodTickNode._tickList
    tickList:BeginIterator()
    print(tostring(tickList:Size()))
    if not tickList:IsEnd() then
        local tickNode = tickList:GetCurrentNode()
        tickList:Next()
        tickNode:Exec(deltaTime)
        print(tickNode.Name)
    end
end

local function AccumulateTime(self)
    return self._accumulateTime
end

local function SetSpan(self, span)
    self._span = span
end

local function ClearAccumulateTime(self)
    self._accumulateTime = 0.0
end

local function Attach(self, callback)
    LodTickNode._tickList:Push(self)
    self._delegate:Add(callback)
end

local function Detach(self)
    self._delegate:Clear()
    self._accumulateTime = 0.0
    base:Detach()
end

local function Exec(self, deltaTime)
    self._accumulateTime = self._accumulateTime + deltaTime
    if  self._accumulateTime >= self._span then
        self._accumulateTime = self._accumulateTime - self._span
        self._delegate:Invoke(self._span)
    end
end

LodTickNode.__init = LodTickNodeCtor
LodTickNode.Update = Update
LodTickNode.AccumulateTime = AccumulateTime
LodTickNode.SetSpan = SetSpan
LodTickNode.ClearAccumulateTime = ClearAccumulateTime
LodTickNode.Attach = Attach
LodTickNode.Detach = Detach
LodTickNode.Exec = Exec

LodTickNode._tickList = RefList1.New()

return LodTickNode