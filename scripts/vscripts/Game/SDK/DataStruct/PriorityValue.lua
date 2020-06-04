local PriorityValue = BaseClass("PriorityValue")

local function PriorityValueCtor(self, value)
    print("PriorityValueCtor")
    self._value = value
    self._defaultValue = value
    self.DeleUpdated = Delegate.New()
    self._list = List.New()
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
    if not (oldValue ==  self._value) then
        if self.DeleUpdated ~= nil then
            self.DeleUpdated:Invoke(oldValue, self._value)
        end
    end
end

local function UpdateNotify(self)
    if self.DeleUpdated ~= nil then
        self.DeleUpdated:Invoke(self._value, self._value)
    end
end

local function CopyTo(self, list)
    for iter = 1, self._list:Count() do
        local iterNode = self._list:Get(iter)
        list:Add(iterNode)
    end
end

PriorityValue.DeleUpdated = nil
PriorityValue._value = nil
PriorityValue._defaultValue = nil

PriorityValue.__init = PriorityValueCtor

PriorityValue.GetValue = GetValue
PriorityValue.GetDefaultValue = GetDefaultValue
PriorityValue.SetDefaultValue = SetDefaultValue
PriorityValue.Count = Count
PriorityValue.Clear = Clear
PriorityValue.Add = Add
PriorityValue.Del = Del
PriorityValue.DelAll = DelAll
PriorityValue.Has = Has
PriorityValue.UpdateWeight = UpdateWeight
PriorityValue.Update = Update
PriorityValue.UpdateNotify = UpdateNotify
PriorityValue.CopyTo = CopyTo

return PriorityValue