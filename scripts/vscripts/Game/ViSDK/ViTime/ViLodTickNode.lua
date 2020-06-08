local ViLodTickNode = BaseClass("ViLodTickNode")

local function ViLodTickNodeCtor(self)
    self._delegate = ViDelegate1.New()
    self._accumulateTime = 0.0
    self._span = 0.0
    self._node = ViDoubleLinkNode2.New()
end

local function Update(deltaTime)
    local tickList = ViLodTickNode._tickList
    if tickList:IsEmpty() then
        return
    end
    local CACHE_UPDATE_ExecList = ViLodTickNode.CACHE_UPDATE_ExecList
    while tickList:IsNotEmpty() do
        local node = tickList:GetHead()
        CACHE_UPDATE_ExecList:PushBackNode(node)
        local tickNode = node.Data
        if tickNode ~= nil then
            tickNode:Exec(deltaTime)
        end
    end
    tickList:PushBackList(CACHE_UPDATE_ExecList)
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

local function Attach(self, listener, callback)
    self._delegate:SetDele(listener, callback)
    self._node.Data = self
    ViLodTickNode._tickList:PushBackNode(self._node)
end

local function IsAttach(self)
   return self._node:IsAttach()
end

local function Detach(self)
    ViDelegateAssisstant.Clear(self._delegate)
    self._accumulateTime = 0.0
    self._node:DetachEX(nil)
end

local function Clear()
    ViLodTickNode._tickList:Clear()
    ViLodTickNode.CACHE_UPDATE_ExecList:Clear()
end

local function Exec(self, deltaTime)
    self._accumulateTime = self._accumulateTime + deltaTime
    if  self._accumulateTime >= self._span then
        self._accumulateTime = self._accumulateTime - self._span
        self._delegate:Invoke(self._span)
    end
end

ViLodTickNode.__init = ViLodTickNodeCtor
ViLodTickNode.Update = Update
ViLodTickNode.AccumulateTime = AccumulateTime
ViLodTickNode.SetSpan = SetSpan
ViLodTickNode.ClearAccumulateTime = ClearAccumulateTime
ViLodTickNode.Attach = Attach
ViLodTickNode.Detach = Detach
ViLodTickNode.IsAttach = IsAttach
ViLodTickNode.Exec = Exec

ViLodTickNode._tickList = ViDoubleLink2.New()
ViLodTickNode.CACHE_UPDATE_ExecList = ViDoubleLink2.New()

return ViLodTickNode