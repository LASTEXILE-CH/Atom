local ViRefListNode1 = BaseClass("ViRefListNode1")

local function ViRefListNode1Ctor(self)
    self._pre = nil
    self._next = nil
    self._list = nil
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

ViRefListNode1.__init = ViRefListNode1Ctor

ViRefListNode1.IsAttach = IsAttach
ViRefListNode1.IsAttachList = IsAttachList
ViRefListNode1.Detach = Detach

return ViRefListNode1