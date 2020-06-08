local ViEntityRefController = BaseClass("ViEntityRefController")

local function ViEntityRefControllerCtor(self)
    self._list = ViDictionary.New("string", "ViRefListNode2")
    self.Entity = nil
end

local function ViEntityRefControllerDele(self)
    self:DetachAll()
end

local function IsAttach(self, name)
    local _, value = self._list:Find(name)
    if value == nil then
        return false
    else
        local node = value
        return node:IsAttach()
    end
end

local function Detach(self, name)
    local _, value = self._list:Find(name)
    if value == nil then
        return false
    else
        local node = value
        if node:IsAttach() then
            node:Detach()
            return true
        else
            return false
        end
    end
end

local function DetachAll(self, name)
    while true do
        local it = self._list:Iter()
        if it ~= nil then
            local key = it()
            local value = dic[key]
            value:Detach()
        else
            break
        end
    end
end

local function Active(self, entity)
    self.Entity = entity
end

local function Deactive(self)
    self:DetachAll()
    self.Entity = nil
end

local function Attach(self, name, list)
    if self.Entity == nil then
        return false
    end
    local _, value = self._list:Find(name)
    if value == nil then
        local node = ViRefListNode2.New()
        self._list:Add(name, node)
        list:Push(node)
        return true
    else
        local node = value
        if not node:IsAttachList(list) then
            list:Push(node)
            return true
        else
            return false
        end
    end
end

local function IsAttachList(self, name, list)
    local _, value = self._list:Find(name)
    if value == nil then
        return false
    else
        local node = value
        return node:IsAttachList(list)
    end
end

local function DetachList(self, name, list)
    local _, value = self._list:Find(name)
    if value == nil then
        return false
    else
        local node = value
        if node:IsAttachList(list) then
            node:Detach()
            return true
        else
            if node:IsAttach() then
                print("DetachList")
            end
            return false
        end
    end
end

ViEntityRefController.__init = ViEntityRefControllerCtor
ViEntityRefController.__delete = ViEntityRefControllerDele

ViEntityRefController.IsAttach = IsAttach
ViEntityRefController.Detach = Detach
ViEntityRefController.DetachAll = DetachAll
ViEntityRefController.Active = Active
ViEntityRefController.Deactive = Deactive
ViEntityRefController.Attach = Attach
ViEntityRefController.IsAttachList = IsAttachList
ViEntityRefController.DetachList = DetachList

return ViEntityRefController