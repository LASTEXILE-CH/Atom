local RefListNode1 = BaseClass("RefListNode1")

local function RefListNode1Ctor(self)

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

RefListNode1.__init = RefListNode1Ctor
RefListNode1._pre = nil
RefListNode1._next = nil
RefListNode1._list = nil

RefListNode1.IsAttach = IsAttach
RefListNode1.IsAttachList = IsAttachList
RefListNode1.Detach = Detach

return RefListNode1