local DoubleLinkNode2 = BaseClass("DoubleLinkNode2")

local function DoubleLinkNode2Ctor(self, data)
    self._pre = nil
    self._next = nil
    self.Data = nil
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

DoubleLinkNode2.__init = DoubleLinkNode2Ctor

DoubleLinkNode2.IsAttach = IsAttach
DoubleLinkNode2.Detach = Detach

return DoubleLinkNode2