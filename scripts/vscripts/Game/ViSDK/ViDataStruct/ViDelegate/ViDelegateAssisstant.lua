local ViDelegateAssisstant = BaseClass("ViDelegateAssisstant")

local function Clear(delegator)
    if delegator ~= nil then
        delegator:Clear()
    end
end

local function Invoke0(func)
    if func ~= nil then
        func:Invoke()
    end
end

local function InvokeRT0(func)
    if func ~= nil then
        return func:Invoke()
    end
end

local function Invoke1(func, param)
    if func ~= nil then
        func:Invoke(param)
    end
end

local function InvokeRT1(func, param)
    if func ~= nil then
        return func:Invoke(param)
    end
end

local function Invoke2(func, param0, param1)
    if func ~= nil then
        func:Invoke(param0, param1)
    end
end

local function InvokeRT2(func, param0, param1)
    if func ~= nil then
        return func:Invoke(param0, param1)
    end
end

local function Invoke3(func, param0, param1, param2)
    if func ~= nil then
        func:Invoke(param0, param1)
    end
end

local function InvokeRT3(func, param0, param1, param2)
    if func ~= nil then
        return func:Invoke(param0, param1, param2)
    end
end

local function Invoke4(func, param0, param1, param2, param3)
    if func ~= nil then
        func:Invoke(param0, param1, param2, param3)
    end
end

local function InvokeRT4(func, param0, param1, param2, param3)
    if func ~= nil then
        return func:Invoke(param0, param1, param2, param3)
    end
end

local function Invoke5(func, param0, param1, param2, param3, param4)
    if func ~= nil then
        func:Invoke(param0, param1, param2, param3, param4)
    end
end

local function InvokeRT5(func, param0, param1, param2, param3, param4)
    if func ~= nil then
        return func:Invoke(param0, param1, param2, param3, param4)
    end
end

ViDelegateAssisstant.Clear = Clear
ViDelegateAssisstant.Invoke0 = Invoke0
ViDelegateAssisstant.InvokeRT0 = InvokeRT0
ViDelegateAssisstant.Invoke1 = Invoke1
ViDelegateAssisstant.InvokeRT1 = InvokeRT1
ViDelegateAssisstant.Invoke2 = Invoke2
ViDelegateAssisstant.InvokeRT2 = InvokeRT2
ViDelegateAssisstant.Invoke3 = Invoke3
ViDelegateAssisstant.InvokeRT3 = InvokeRT3
ViDelegateAssisstant.Invoke4 = Invoke4
ViDelegateAssisstant.InvokeRT4 = InvokeRT4
ViDelegateAssisstant.Invoke5 = Invoke5
ViDelegateAssisstant.InvokeRT5 = InvokeRT5

return ViDelegateAssisstant