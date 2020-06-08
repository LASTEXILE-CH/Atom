local ViTickNode = BaseClass("ViTickNode")

local function ViTickNodeCtor(self)
    self._delegate = ViDelegate1.New()
    self._node = ViDoubleLinkNode2.New()
end

local function Update(deltaTime)
    local tickList = ViTickNode._tickList
    if tickList:IsEmpty() then
        return
    end
    local CACHE_UPDATE_ExecList = ViTickNode.CACHE_UPDATE_ExecList
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

local function Attach(self, listener, callback)
    self._delegate:SetDele(listener, callback)
    self._node.Data = self
    ViTickNode._tickList:PushBackNode(self._node)
end

local function IsAttach(self)
   return self._node:IsAttach()
end

local function Detach(self)
    ViDelegateAssisstant.Clear(self._delegate)
    self._node:DetachEX(nil)
end

local function Clear()
    ViTickNode._tickList:Clear()
    ViTickNode.CACHE_UPDATE_ExecList:Clear()
end

local function Exec(self, deltaTime)
    self._delegate:Invoke(deltaTime)
end

ViTickNode.__init = ViTickNodeCtor
ViTickNode.Update = Update
ViTickNode.Attach = Attach
ViTickNode.Detach = Detach
ViTickNode.IsAttach = IsAttach
ViTickNode.Exec = Exec

ViTickNode._tickList = ViDoubleLink2.New()
ViTickNode.CACHE_UPDATE_ExecList = ViDoubleLink2.New()

return ViTickNode