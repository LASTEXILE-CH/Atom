local DoubleLinkNode1 = BaseClass("DoubleLinkNode1")

local function DoubleLinkNode1Ctor(self)
    self._pre = nil
    self._next = nil
end

local function IsAttach(self)
    return self._pre ~= nil
end

local function Detach(self)
   if self._pre ~= nil then
    self._pre._next = self._next
    self._next._pre = self._pre
    self._pre = nil
    self._next = nil
   end
end

DoubleLinkNode1._pre = nil
DoubleLinkNode1._next = nil

DoubleLinkNode1.__init = DoubleLinkNode1Ctor
DoubleLinkNode1.IsAttach = IsAttach
DoubleLinkNode1.Detach = Detach

return DoubleLinkNode1