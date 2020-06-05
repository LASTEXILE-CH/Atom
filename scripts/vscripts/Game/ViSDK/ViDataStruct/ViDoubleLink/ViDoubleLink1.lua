local ViDoubleLink1 = BaseClass("ViDoubleLink1")

local function ViDoubleLink1Ctor(self)
    self._root = ViDoubleLinkNode1.New()
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
    ViDoubleLink1._PushAfterNode(before, node)
end

local function PushBeforeNode(self, after, node)
    node:Detach()
    ViDoubleLink1._PushBeforeNode(after, node)
end

local function PushAfterList(self, before, list)
   if before:IsAttach() == false then
        return
   end
   if list:IsEmpty() then
        return
   end
   ViDoubleLink1._PushAfterList(before, list)
end

local function PushBeforeList(self, after, list)
    if after:IsAttach() == false then
        return
    end
    if list:IsEmpty() then
        return
    end
    ViDoubleLink1._PushBeforeList(after, list)
end

local function _Init(self)
    ViDoubleLink1._Link(self._root, self._root)
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
    ViDoubleLink1._PushBeforeNode(self._root, node)
end

local function PushFrontNode(self, node)
    node:Detach()
    ViDoubleLink1._PushAfterNode(self._root, node)
end

local function PushBackList(self, list)
    ViDoubleLink1._PushBeforeList(self._root, list)
end

local function PushFrontList(self, list)
    ViDoubleLink1._PushAfterList(self._root, list)
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
    ViDoubleLink1._Link(before, node)
    ViDoubleLink1._Link(node, next)
end

local function _PushBeforeNode(after, node)
    local pre = after._pre
    ViDoubleLink1._Link(pre, node)
    ViDoubleLink1._Link(node, after)
end

local function _PushAfterList(before, list)
    if list:IsEmpty() then
        return
    end
    local first = list._root._next
    local back = list._root._pre
    local next = before._next
    ViDoubleLink1._Link(before, first)
    ViDoubleLink1._Link(back, next)
    list:_Init()
end

local function _PushBeforeList(after, list)
    if list:IsEmpty() then
        return
    end
    local first = list._root._next
    local back = list._root._pre
    local pre = after._next
    ViDoubleLink1._Link(pre, first)
    ViDoubleLink1._Link(back, after)
    list:_Init()
end

local function _Link(pre, next)
    pre._next = next
    next._pre = pre
end

ViDoubleLink1.__init = ViDoubleLink1Ctor

ViDoubleLink1._Init = _Init
ViDoubleLink1.Next = Next
ViDoubleLink1.Pre = Pre
ViDoubleLink1.PushAfterNode = PushAfterNode
ViDoubleLink1.PushAfterNode = PushAfterNode
ViDoubleLink1.PushAfterList = PushAfterList
ViDoubleLink1.PushBeforeList = PushBeforeList
ViDoubleLink1.IsEmpty = IsEmpty
ViDoubleLink1.IsNotEmpty = IsNotEmpty
ViDoubleLink1.Contain = Contain
ViDoubleLink1.IsEnd = IsEnd
ViDoubleLink1.GetHead = GetHead
ViDoubleLink1.GetTail = GetTail
ViDoubleLink1.PushBackNode = PushBackNode
ViDoubleLink1.PushFrontNode = PushFrontNode
ViDoubleLink1.PushBackList = PushBackList
ViDoubleLink1.PushFrontList = PushFrontList
ViDoubleLink1.Clear = Clear
ViDoubleLink1._PushAfterNode = _PushAfterNode
ViDoubleLink1._PushBeforeNode = _PushBeforeNode
ViDoubleLink1._PushAfterList = _PushAfterList
ViDoubleLink1._PushBeforeList = _PushBeforeList
ViDoubleLink1._Link = _Link

return ViDoubleLink1