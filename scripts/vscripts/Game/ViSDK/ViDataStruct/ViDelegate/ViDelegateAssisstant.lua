local ViDelegateAssisstant = BaseClass("ViDelegateAssisstant")

local function Clear(delegator)
    if delegator ~= nil then
        delegator:Clear()
    end
end

local function Invoke0(listener, func)
    if listener ~= nil and func ~= nil then
        func(listener)
    end
end

local function InvokeRT0(listener, func)
    if listener ~= nil and func ~= nil then
        return func(listener)
    end
end

local function Invoke1(listener, func, param)
    if listener ~= nil and func ~= nil then
        func(listener, param)
    end
end

local function InvokeRT1(listener, func, param)
    if listener ~= nil and func ~= nil then
        return func(listener, param)
    end
end

local function Invoke2(listener, func, param0, param1)
    if listener ~= nil and func ~= nil then
        func(listener, param0, param1)
    end
end

local function InvokeRT2(listener, func, param0, param1)
    if listener ~= nil and func ~= nil then
        return func(listener, param0, param1)
    end
end

local function Invoke3(listener, func, param0, param1, param2)
    if listener ~= nil and func ~= nil then
        func(listener, param0, param1)
    end
end

local function InvokeRT3(listener, func, param0, param1, param2)
    if listener ~= nil and func ~= nil then
        return func(listener, param0, param1, param2)
    end
end

local function Invoke4(listener, func, param0, param1, param2, param3)
    if listener ~= nil and func ~= nil then
        func(listener, param0, param1, param2, param3)
    end
end

local function InvokeRT4(listener, func, param0, param1, param2, param3)
    if listener ~= nil and func ~= nil then
        return func(listener, param0, param1, param2, param3)
    end
end

local function Invoke5(listener, func, param0, param1, param2, param3, param4)
    if listener ~= nil and func ~= nil then
        func(listener, param0, param1, param2, param3, param4)
    end
end

local function InvokeRT5(listener, func, param0, param1, param2, param3, param4)
    if listener ~= nil and func ~= nil then
        return func(listener, param0, param1, param2, param3, param4)
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