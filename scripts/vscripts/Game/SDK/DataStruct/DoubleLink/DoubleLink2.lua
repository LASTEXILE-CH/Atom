local DoubleLink2 = BaseClass("DoubleLink2")

local function DoubleLink2Ctor(self)
    self._root = DoubleLinkNode2.New()
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
    DoubleLink2._PushAfterNode(before, node)
end

local function PushBeforeNode(self, after, node)
    node:Detach()
    DoubleLink2._PushBeforeNode(after, node)
end

local function PushAfterList(self, before, list)
   if before:IsAttach() == false then
        return
   end
   if list:IsEmpty() then
        return
   end
   DoubleLink2._PushAfterList(before, list)
end

local function PushBeforeList(self, after, list)
    if after:IsAttach() == false then
        return
    end
    if list:IsEmpty() then
        return
    end
    DoubleLink2._PushBeforeList(after, list)
end

local function _Init(self)
    DoubleLink2._Link(self._root, self._root)
end

local function IsEmpty(self)
    return self._root._next == self._root
end

local function IsNotEmpty(self)
    return self._root._next == self._root
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
    DoubleLink1._PushBeforeNode(self._root, node)
end

local function PushFrontNode(self, node)
    node:Detach()
    DoubleLink1._PushAfterNode(self._root, node)
end

local function PushBackList(self, list)
    DoubleLink2._PushBeforeList(self._root, list)
end

local function PushFrontList(self, list)
    DoubleLink2._PushAfterList(self._root, list)
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
    DoubleLink2._Link(before, node)
    DoubleLink2._Link(node, next)
end

local function _PushBeforeNode(after, node)
    local pre = after._pre
    DoubleLink2._Link(pre, node)
    DoubleLink2._Link(node, after)
end

local function _PushAfterList(before, list)
    if list:IsEmpty() then
        return
    end
    local first = list._root._next
    local back = list._root._pre
    local next = before._next
    DoubleLink2._Link(before, first)
    DoubleLink2._Link(back, next)
    list:_Init()
end

local function _PushBeforeList(after, list)
    if list:IsEmpty() then
        return
    end
    local first = list._root._next
    local back = list._root._pre
    local pre = after._next
    DoubleLink2._Link(pre, first)
    DoubleLink2._Link(back, after)
    list:_Init()
end

local function _Link(pre, next)
    pre._next = next
    next._pre = pre
end

DoubleLink2.__init = DoubleLink2Ctor

DoubleLink2._Init = _Init
DoubleLink2.Next = Next
DoubleLink2.Pre = Pre
DoubleLink2.PushAfterNode = PushAfterNode
DoubleLink2.PushAfterNode = PushAfterNode
DoubleLink2.PushAfterList = PushAfterList
DoubleLink2.PushBeforeList = PushBeforeList
DoubleLink2.IsEmpty = IsEmpty
DoubleLink2.IsNotEmpty = IsNotEmpty
DoubleLink2.Contain = Contain
DoubleLink2.IsEnd = IsEnd
DoubleLink2.GetHead = GetHead
DoubleLink2.GetTail = GetTail
DoubleLink2.PushBackNode = PushBackNode
DoubleLink2.PushFrontNode = PushFrontNode
DoubleLink2.PushBackList = PushBackList
DoubleLink2.PushFrontList = PushFrontList
DoubleLink2.Clear = Clear
DoubleLink2._PushAfterNode = _PushAfterNode
DoubleLink2._PushBeforeNode = _PushBeforeNode
DoubleLink2._PushAfterList = _PushAfterList
DoubleLink2._PushBeforeList = _PushBeforeList
DoubleLink2._Link = _Link

return DoubleLink2