local ViDoubleLinkNode1 = BaseClass("ViDoubleLinkNode1")

local function ViDoubleLinkNode1Ctor(self)
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

ViDoubleLinkNode1._pre = nil
ViDoubleLinkNode1._next = nil

ViDoubleLinkNode1.__init = ViDoubleLinkNode1Ctor
ViDoubleLinkNode1.IsAttach = IsAttach
ViDoubleLinkNode1.Detach = Detach

return ViDoubleLinkNode1