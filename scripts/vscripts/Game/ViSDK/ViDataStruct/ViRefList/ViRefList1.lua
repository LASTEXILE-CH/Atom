local ViRefList1 = BaseClass("ViRefList1")

local function StaticNext(node)
    node = node._next
    return node
end

local function ViRefList1Ctor(self)
    self._next = nil
    self._cnt = 0
    self._root = RefListNode1.New()
    self._root._list = self
    self:_Init()
end


local function _Init(self)
    ViRefList1._Link(self._root, self._root)
    self._next = self._root
    self._cnt = 0
end

local function IsEmpty(self)
    return self._root._next == self._root
end

local function Size(self)
    return self._cnt
end

local function GetHead(self)
    return self._root._next
end

local function GetTail(self)
    return self._root._pre
end

local function GetCurrentNode(self)
    return self._next
end

local function Next(self)
    self._next = ViRefList1.StaticNext(self._next)
end

local function BeginIterator(self)
    self._next = self._root
    self._next = ViRefList1.StaticNext(self._next)
end

local function EndIterator(self)
    self._next = self._root
end

local function IsEndNode(self, node)
    return self._next == node
end

local function IsEnd(self)
    return self._next == self._root
end

local function PushBack(self, node)
    node:Detach()
    self._cnt = self._cnt + 1
    node._list = self
    ViRefList1._PushBefore(self._root, node)
end

local function PushFront(self, node)
    node:Detach()
    self._cnt = self._cnt + 1
    node._list = self
    ViRefList1._PushAfter(self._root, node)
end


local function Push(self, node)
    if self:IsEnd() then
        self:PushBack(node)
    else
        self:PushFront(node)
    end
end

local function PushBackList(self, list)
    if list == nil then
        return
    end
    self:PushBeforeList(self._root, list)
end


local function PushFrontList(self, list)
    if list == nil then
        return
    end
    self:PushAfterList(self._root, list)
end

local function PushAfter(self, before, node)
    node:Detach()
    self._cnt = self._cnt + 1
    node._list = self
    ViRefList1._PushAfter(before, node)
end

local function PushBefore(self, after, node)
    node:Detach()
    self._cnt = self._cnt + 1
    node._list = self
    ViRefList1._PushBefore(after, node)
end

local function PushAfterList(self, before, list)
    if list:Size() == 0 then
        return
    end
    if before:IsAttachList(list) then
        return
    end
    if before:IsAttach() == false then
        return
    end
    local receiveList = before._list
    local iter = list._root._next
    while iter ~= list._root do
        iter._list = receiveList
        iter = iter._next
    end
    local first = list._root._next
    local back = list._root._pre
    local next = before._next
    ViRefList1._Link(before, first)
	ViRefList1._Link(back, next)
	receiveList._cnt = receiveList._cnt + list.Size()
	list._Init()
end

local function PushBeforeList(self, after, list)
    if list:Size() == 0 then
        return
    end
    if after:IsAttachList(list) then
        return
    end
    if after:IsAttach() == false then
        return
    end
    local receiveList = after._list
    local iter = list._root._next
    while iter ~= list._root do
        iter._list = receiveList
        iter = iter._next
    end
    local first = list._root._next
    local back = list._root._pre
    local pre = after._pre
    ViRefList1._Link(pre, first)
	ViRefList1._Link(back, after)
	receiveList._cnt = receiveList._cnt + list.Size()
	list._Init()
end

local function Clear(self)
    local next = self._root._next;
    while next ~= self._root do
        local nextCopy = next._next;
        next._pre = nil
        next._next = nil
        next._list = nil
        next = nextCopy
    end
    self:_Init()
end

local function _Detach(self, node)
    if node == self._next then --! 如果是正在迭代的点, 则自动将Next移到下个点
        self._next = Next(_next)
    end
    ViRefList1._Link(node._pre, node._next)
    node._pre = nil
    node._next = nil
    _cnt = _cnt - 1
end

local function _PushAfter(before, node)
    local next = before._next
    ViRefList1._Link(before, node)
    ViRefList1._Link(node, next)
end

local function _PushBefore(after, node)
    local pre = after._pre
    ViRefList1._Link(pre, node)
    ViRefList1._Link(node, after)
end

local function _Link(pre, next)
    pre._next = next
    next._pre = pre
end

--static function
ViRefList1.StaticNext = StaticNext
ViRefList1._PushAfter = _PushAfter
ViRefList1._PushBefore = _PushBefore

--member function
ViRefList1.__init = ViRefList1Ctor
ViRefList1._Init = _Init
ViRefList1.Next = Next
ViRefList1.IsEmpty = IsEmpty
ViRefList1.Size = Size
ViRefList1.GetHead = GetHead
ViRefList1.GetTail = GetTail
ViRefList1.GetCurrentNode = GetCurrentNode
ViRefList1.Next = Next
ViRefList1.BeginIterator = BeginIterator
ViRefList1.EndIterator = EndIterator
ViRefList1.IsEndNode = IsEndNode
ViRefList1.IsEnd = IsEnd
ViRefList1.PushBack = PushBack
ViRefList1.PushFront = PushFront
ViRefList1.Push = Push
ViRefList1.PushBackList = PushBackList
ViRefList1.PushFrontList = PushFrontList
ViRefList1.PushAfter = PushAfter
ViRefList1.PushBefore = PushBefore
ViRefList1.PushAfterList = PushAfterList
ViRefList1.PushBeforeList = PushBeforeList
ViRefList1.Clear = Clear
ViRefList1._Detach = _Detach
ViRefList1._Link = _Link

return ViRefList1