local ViDoubleLink2 = BaseClass("ViDoubleLink2")

local function ViDoubleLink2Ctor(self)
    self._root = ViDoubleLinkNode2.New()
    self:_Init()
end

local function Next(node)
    node = node._next
    return node
end

local function Pre(node)
    node = node._pre
    return node
end

local function PushAfterNode(self, before, node)
    node:Detach()
    ViDoubleLink2._PushAfterNode(before, node)
end

local function PushBeforeNode(self, after, node)
    node:Detach()
    ViDoubleLink2._PushBeforeNode(after, node)
end

local function PushAfterList(self, before, list)
   if before:IsAttach() == false then
        return
   end
   if list:IsEmpty() then
        return
   end
   ViDoubleLink2._PushAfterList(before, list)
end

local function PushBeforeList(self, after, list)
    if after:IsAttach() == false then
        return
    end
    if list:IsEmpty() then
        return
    end
    ViDoubleLink2._PushBeforeList(after, list)
end

local function _Init(self)
    ViDoubleLink2._Link(self._root, self._root)
end

local function IsEmpty(self)
    return self._root._next == self._root
end

local function IsNotEmpty(self)
    return self._root._next ~= self._root
end

local function Contain(self, node)
    if not node:IsAttach() then
        return false
    end
    local next = self._root._next
    while next ~= _root do
        if next == node then
            return true
        end
        next = next._next
    end
    return false
end

local function IsEnd(self, node)
    return node == self._root
end

local function GetHead(self)
    return self._root._next
end

local function GetTail(self, node)
    return self._root._pre
end

-------------------------------------------------
local function PushBackNode(self, node)
    node:Detach()
    ViDoubleLink2._PushBeforeNode(self._root, node)
end

local function PushFrontNode(self, node)
    node:Detach()
    ViDoubleLink2._PushAfterNode(self._root, node)
end

local function PushBackList(self, list)
    ViDoubleLink2._PushBeforeList(self._root, list)
end

local function PushFrontList(self, list)
    ViDoubleLink2._PushAfterList(self._root, list)
end

local function Clear(self)
    local next = self._root._next
    while next ~= self._root do
       local nextCopy = next._next
       next._pre = nil
       next._next = nil
       next = nextCopy
    end
    self:_Init()
end

-------------------------------------------------
local function _PushAfterNode(before, node)
    local next = before._next
    ViDoubleLink2._Link(before, node)
    ViDoubleLink2._Link(node, next)
end

local function _PushBeforeNode(after, node)
    local pre = after._pre
    ViDoubleLink2._Link(pre, node)
    ViDoubleLink2._Link(node, after)
end

local function _PushAfterList(before, list)
    if list:IsEmpty() then
        return
    end
    local first = list._root._next
    local back = list._root._pre
    local next = before._next
    ViDoubleLink2._Link(before, first)
    ViDoubleLink2._Link(back, next)
    list:_Init()
end

local function _PushBeforeList(after, list)
    if list:IsEmpty() then
        return
    end
    local first = list._root._next
    local back = list._root._pre
    local pre = after._next
    ViDoubleLink2._Link(pre, first)
    ViDoubleLink2._Link(back, after)
    list:_Init()
end

local function _Link(pre, next)
    pre._next = next
    next._pre = pre
end

ViDoubleLink2.__init = ViDoubleLink2Ctor

ViDoubleLink2._Init = _Init
ViDoubleLink2.Next = Next
ViDoubleLink2.Pre = Pre
ViDoubleLink2.PushAfterNode = PushAfterNode
ViDoubleLink2.PushAfterNode = PushAfterNode
ViDoubleLink2.PushAfterList = PushAfterList
ViDoubleLink2.PushBeforeList = PushBeforeList
ViDoubleLink2.IsEmpty = IsEmpty
ViDoubleLink2.IsNotEmpty = IsNotEmpty
ViDoubleLink2.Contain = Contain
ViDoubleLink2.IsEnd = IsEnd
ViDoubleLink2.GetHead = GetHead
ViDoubleLink2.GetTail = GetTail
ViDoubleLink2.PushBackNode = PushBackNode
ViDoubleLink2.PushFrontNode = PushFrontNode
ViDoubleLink2.PushBackList = PushBackList
ViDoubleLink2.PushFrontList = PushFrontList
ViDoubleLink2.Clear = Clear
ViDoubleLink2._PushAfterNode = _PushAfterNode
ViDoubleLink2._PushBeforeNode = _PushBeforeNode
ViDoubleLink2._PushAfterList = _PushAfterList
ViDoubleLink2._PushBeforeList = _PushBeforeList
ViDoubleLink2._Link = _Link

return ViDoubleLink2