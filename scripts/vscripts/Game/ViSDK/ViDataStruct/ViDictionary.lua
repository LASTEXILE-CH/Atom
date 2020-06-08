local ViDictionary = BaseClass("ViDictionary")
 
local function New(self, tk, tv)
    local o = {keyType = tk, valueType = tv}
    setmetatable(o, self)
    o.keyList = {}
    return o
end
 
local function Add(self, key, value)
    if self[key] == nil then
        self[key] = value
        table.insert(self.keyList, key)
    else
        self[key] = value
    end
end
 
local function Clear(self)
    local count = self:Count()
    for i=count,1,-1 do
        self[self.keyList[i]] = nil
        table.remove(self.keyList)
    end
end
 
local function ContainsKey(self, key)
    local count = self:Count()
    for i=1,count do
        if self.keyList[i] == key then
            return true
        end
    end
    return false
end
 
local function ContainsValue(self, value)
    local count = self:Count()
    for i=1,count do
        if self[self.keyList[i]] == value then
            return true
        end
    end
    return false
end
 
local function Count(self)
    return table.getn(self.keyList)
end
 
local function Iter(self)
    local i = 0
    local n = self:Count()
    return function ()
        i = i + 1
        if i <= n then
            return self.keyList[i]
        end
        return nil
    end
end
 
local function Remove(self, key)
    if self:ContainsKey(key) then
        local count = self:Count()
        for i=1,count do
            if self.keyList[i] == key then
                table.remove(self.keyList, i)
                break
            end
        end
        self[key] = nil
    end
end
 
local function Find(self, key)
    local count = self:Count()
    for i=1,count do
        if self.keyList[i] == key then
            return key, self[i]
        end
    end
    return key, nil
end

local function KeyType(self)
    return self.keyType
end
 
local function ValueType(self)
    return self.valueType
end

return ViDictionary

--Demo
-- local dic = ViDictionary:New('string', 'string')
-- dic:Add('BeiJing', '010')
-- dic:Add('ShangHai', '021')

-- while true do
--     local it = dic:Iter()
--     if it ~= nil then
--         local key = it()
--         local value = dic[key]
--         print('key: ' .. tostring(key) .. ' value: ' .. tostring(value))
--     else
--         break
--     end
-- end

-- local dic = ViDictionary:New('string', 'string')
-- dic:Add('BeiJing', '010')
-- dic:Add('ShangHai', '021')
 
-- while true do
--     local it = dic:Iter()
--     if it ~= nil then
--         local key = it()
--         local value = dic[key]
--         print('key: ' .. tostring(key) .. ' value: ' .. tostring(value))
--     else
--         break
--     end
-- end