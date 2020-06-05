local ViPriorityValue = BaseClass("ViPriorityValue")

local function ViPriorityValueCtor(self, value)
    print("ViPriorityValueCtor")
    self._value = value
    self._defaultValue = value
    self.DeleUpdated = ViDelegate2.New()
    self._list = ViList.New()
end

local function GetValue(self)
    return self._value
end

local function GetDefaultValue(self)
    return self._defaultValue
end

local function SetDefaultValue(self, value)
    self._defaultValue = value
    self:Update()
end

function Count(self)
    return self._list:Count()
end

local function Clear(self)
    self._list:Clear()
    self._value = self._defaultValue
end

local function Add(self, name, weight, value)
    for iter = 1, self._list:Count() do
        local iterNode = self._list:Get(iter)
        if iterNode.Name == name then
            iterNode.Weight = weight
            iterNode.Value = value
            self:Update()
            return
        end
    end
    local node = PriorityNode.New()
    node.Name = name
    node.Weight = weight
    node.Value = value
    self._list:Add(node)
    self:Update()
end

local function Del(self, name)
    for iter = 1, self._list:Count() do
        local iterNode = self._list:Get(iter)
        if iterNode.Name == name then
            self._list:RemoveAt(iter)
            self:Update()
            return true
        end
    end
    return false
end

local function DelAll(self, name)
    self._list:Clear()
    self:Update()
end

local function Has(self, name)
    for iter = 1, self._list:Count() do
        local iterNode = self._list:Get(iter)
        if iterNode.Name == name then
            return true
        end
    end
    return false
end

local function UpdateWeight(self, name, weight)
    for iter = 1, self._list:Count() do
        local iterNode = self._list:Get(iter)
        if iterNode.Name == name then
            iterNode.Weight = weight
            self:Update()
            return true
        end
    end
    return false
end

local function Update(self)
    local oldValue = self._value
    self._value = self._defaultValue
    local maxWeight = -9999999
    for iter = 1, self._list:Count() do
        local iterNode = self._list:Get(iter)
        if iterNode.Weight > maxWeight then
            self._value = iterNode.Value
            maxWeight = iterNode.Weight
        end
    end
    if not (oldValue == self._value) then
        ViDelegateAssisstant.Invoke2(self.DeleUpdated, oldValue, self._value)
    end
end

local function UpdateNotify(self)
    ViDelegateAssisstant.Invoke2(self.DeleUpdated, self._value, self._value)
end

local function CopyTo(self, list)
    for iter = 1, self._list:Count() do
        local iterNode = self._list:Get(iter)
        list:Add(iterNode)
    end
end

ViPriorityValue.__init = ViPriorityValueCtor

ViPriorityValue.GetValue = GetValue
ViPriorityValue.GetDefaultValue = GetDefaultValue
ViPriorityValue.SetDefaultValue = SetDefaultValue
ViPriorityValue.Count = Count
ViPriorityValue.Clear = Clear
ViPriorityValue.Add = Add
ViPriorityValue.Del = Del
ViPriorityValue.DelAll = DelAll
ViPriorityValue.Has = Has
ViPriorityValue.UpdateWeight = UpdateWeight
ViPriorityValue.Update = Update
ViPriorityValue.UpdateNotify = UpdateNotify
ViPriorityValue.CopyTo = CopyTo

return ViPriorityValue