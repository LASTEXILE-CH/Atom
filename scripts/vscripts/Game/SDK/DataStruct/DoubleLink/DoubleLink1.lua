local DoubleLink1 = BaseClass("DoubleLink1")

local function DoubleLink1Ctor(self)
    self._root = DoubleLinkNode1.New()
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
    DoubleLink1._PushAfterNode(before, node)
end

local function PushBeforeNode(self, after, node)
    node:Detach()
    DoubleLink1._PushBeforeNode(after, node)
end

local function PushAfterList(self, before, list)
   if before:IsAttach() == false then
        return
   end
   if list:IsEmpty() then
        return
   end
   DoubleLink1._PushAfterList(before, list)
end

local function PushBeforeList(self, after, list)
    if after:IsAttach() == false then
        return
    end
    if list:IsEmpty() then
        return
    end
    DoubleLink1._PushBeforeList(after, list)
end

local function _Init(self)
    DoubleLink1._Link(self._root, self._root)
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
    DoubleLink1._PushBeforeList(self._root, list)
end

local function PushFrontList(self, list)
    DoubleLink1._PushAfterList(self._root, list)
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
    DoubleLink1._Link(before, node)
    DoubleLink1._Link(node, next)
end

local function _PushBeforeNode(after, node)
    local pre = after._pre
    DoubleLink1._Link(pre, node)
    DoubleLink1._Link(node, after)
end

local function _PushAfterList(before, list)
    if list:IsEmpty() then
        return
    end
    local first = list._root._next
    local back = list._root._pre
    local next = before._next
    DoubleLink1._Link(before, first)
    DoubleLink1._Link(back, next)
    list:_Init()
end

local function _PushBeforeList(after, list)
    if list:IsEmpty() then
        return
    end
    local first = list._root._next
    local back = list._root._pre
    local pre = after._next
    DoubleLink1._Link(pre, first)
    DoubleLink1._Link(back, after)
    list:_Init()
end

local function _Link(pre, next)
    pre._next = next
    next._pre = pre
end

DoubleLink1.__init = DoubleLink1Ctor

DoubleLink1._Init = _Init
DoubleLink1.Next = Next
DoubleLink1.Pre = Pre
DoubleLink1.PushAfterNode = PushAfterNode
DoubleLink1.PushAfterNode = PushAfterNode
DoubleLink1.PushAfterList = PushAfterList
DoubleLink1.PushBeforeList = PushBeforeList
DoubleLink1.IsEmpty = IsEmpty
DoubleLink1.IsNotEmpty = IsNotEmpty
DoubleLink1.Contain = Contain
DoubleLink1.IsEnd = IsEnd
DoubleLink1.GetHead = GetHead
DoubleLink1.GetTail = GetTail
DoubleLink1.PushBackNode = PushBackNode
DoubleLink1.PushFrontNode = PushFrontNode
DoubleLink1.PushBackList = PushBackList
DoubleLink1.PushFrontList = PushFrontList
DoubleLink1.Clear = Clear
DoubleLink1._PushAfterNode = _PushAfterNode
DoubleLink1._PushBeforeNode = _PushBeforeNode
DoubleLink1._PushAfterList = _PushAfterList
DoubleLink1._PushBeforeList = _PushBeforeList
DoubleLink1._Link = _Link

return DoubleLink1