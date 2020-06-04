local RefList1 = BaseClass("RefList1")

local function StaticNext(node)
    node = node._next
    return node
end

local function RefList1Ctor(self)
    self._next = nil
    self._cnt = 0
    self._root = RefListNode1.New()
    self._root._list = self
    self:_Init()
end


local function _Init(self)
    RefList1._Link(self._root, self._root)
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
    self._next = RefList1.StaticNext(self._next)
end

local function BeginIterator(self)
    self._next = self._root
    self._next = RefList1.StaticNext(self._next)
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
    RefList1._PushBefore(self._root, node)
end

local function PushFront(self, node)
    node:Detach()
    self._cnt = self._cnt + 1
    node._list = self
    RefList1._PushAfter(self._root, node)
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
    RefList1._PushAfter(before, node)
end

local function PushBefore(self, after, node)
    node:Detach()
    self._cnt = self._cnt + 1
    node._list = self
    RefList1._PushBefore(after, node)
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
    RefList1._Link(before, first)
	RefList1._Link(back, next)
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
    RefList1._Link(pre, first)
	RefList1._Link(back, after)
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
    RefList1._Link(node._pre, node._next)
    node._pre = nil
    node._next = nil
    _cnt = _cnt - 1
end

local function _PushAfter(before, node)
    local next = before._next
    RefList1._Link(before, node)
    RefList1._Link(node, next)
end

local function _PushBefore(after, node)
    local pre = after._pre
    RefList1._Link(pre, node)
    RefList1._Link(node, after)
end

local function _Link(pre, next)
    pre._next = next
    next._pre = pre
end

--static function
RefList1.StaticNext = StaticNext
RefList1._PushAfter = _PushAfter
RefList1._PushBefore = _PushBefore

--member function
RefList1.__init = RefList1Ctor
RefList1._Init = _Init
RefList1.Next = Next
RefList1.IsEmpty = IsEmpty
RefList1.Size = Size
RefList1.GetHead = GetHead
RefList1.GetTail = GetTail
RefList1.GetCurrentNode = GetCurrentNode
RefList1.Next = Next
RefList1.BeginIterator = BeginIterator
RefList1.EndIterator = EndIterator
RefList1.IsEndNode = IsEndNode
RefList1.IsEnd = IsEnd
RefList1.PushBack = PushBack
RefList1.PushFront = PushFront
RefList1.Push = Push
RefList1.PushBackList = PushBackList
RefList1.PushFrontList = PushFrontList
RefList1.PushAfter = PushAfter
RefList1.PushBefore = PushBefore
RefList1.PushAfterList = PushAfterList
RefList1.PushBeforeList = PushBeforeList
RefList1.Clear = Clear
RefList1._Detach = _Detach
RefList1._Link = _Link

return RefList1