local ViRefListNode2 = BaseClass("ViRefListNode2")

local function ViRefListNode2Ctor(self, data)
    self._pre = nil
    self._next = nil
    self._list = nil
    self.Data = nil
end

local function IsAttach(self)
    return self._list ~= nil
end

local function IsAttachList(self, list)
    return self._list == list
end

local function Detach(self)
    if self._list ~= nil then
        self._list:_Detach(self)
        self._list = nil
    end
end

ViRefListNode2.__init = ViRefListNode2Ctor

ViRefListNode2.IsAttach = IsAttach
ViRefListNode2.IsAttachList = IsAttachList
ViRefListNode2.Detach = Detach

return ViRefListNode2
