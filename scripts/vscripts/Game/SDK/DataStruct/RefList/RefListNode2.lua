local RefListNode2 = BaseClass("RefListNode2")

local function RefListNode2Ctor(self, data)
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

RefListNode2.__init = RefListNode2Ctor

RefListNode2.IsAttach = IsAttach
RefListNode2.IsAttachList = IsAttachList
RefListNode2.Detach = Detach

return RefListNode2
