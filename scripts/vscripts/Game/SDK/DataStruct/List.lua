local List = BaseClass("List")
 
local function Add(self, item)
    table.insert(self, item)
end
 
local function Clear(self)
    local count = self:Count()
    for i=count,1,-1 do
        table.remove(self)
    end
end
 
local function Contains(self, item)
    local count = self:Count()
    for i=1,count do
        if self[i] == item then
            return true
        end
    end
    return false
end
 
local function Count(self)
    return table.getn(self)
end
 
local function Get(self, iter)
    return self[iter] 
end

local function Find(self, predicate)
    if (predicate == nil or type(predicate) ~= 'function') then
        print('predicate is invalid!')
        return
    end
    local count = self:Count()
    for i=1,count do
        if predicate(self[i]) then 
            return self[i] 
        end
    end
    return nil
end
 
local function ForEach(self, action)
    if (action == nil or type(action) ~= 'function') then
        print('action is invalid!')
        return
    end
    local count = self:Count()
    for i=1,count do
        action(self[i])
    end
end
 
local function IndexOf(self, item)
    local count = self:Count()
    for i=1,count do
        if self[i] == item then
            return i
        end
    end
    return 0
end
 
local function LastIndexOf(self, item)
    local count = self:Count()
    for i=count,1,-1 do
        if self[i] == item then
            return i
        end
    end
    return 0
end
 
local function Insert(self, index, item)
    table.insert(self, index, item)
end
 
local function Remove(self, item)
    local idx = self:LastIndexOf(item)
    if (idx > 0) then
        table.remove(self, idx)
        self:Remove(item)
    end
end
 
local function RemoveAt(self, index)
    table.remove(self, index)
end
 
local function Sort(self, comparison)
    if (comparison ~= nil and type(comparison) ~= 'function') then
        print('comparison is invalid')
        return
    end
    if func == nil then
        table.sort(self)
    else
        table.sort(self, func)
    end
end



List.Add = Add
List.Clear = Clear
List.Contains = Contains
List.Count = Count
List.Get = Get
List.Find = Find
List.ForEach = ForEach
List.IndexOf = IndexOf
List.LastIndexOf = LastIndexOf
List.Insert = Insert
List.Remove = Remove
List.Sort = Sort

return List