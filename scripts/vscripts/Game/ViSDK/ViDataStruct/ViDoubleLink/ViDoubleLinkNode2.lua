local ViDoubleLinkNode2 = BaseClass("ViDoubleLinkNode2")

local function ViDoubleLinkNode2Ctor(self, data)
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

local function DetachEX(self, data)
    if self._pre ~= nil then
     self._pre._next = self._next
     self._next._pre = self._pre
     self._pre = nil
     self._next = nil
    end
    self.Data = data
 end

ViDoubleLinkNode2.__init = ViDoubleLinkNode2Ctor

ViDoubleLinkNode2.IsAttach = IsAttach
ViDoubleLinkNode2.Detach = Detach
ViDoubleLinkNode2.DetachEX = DetachEX

return ViDoubleLinkNode2