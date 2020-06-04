local Debug = BaseClass("Debug", Singleton)

local function Assert()
    --assert(_class[class_type] == nil, "Aready defined class : ", classname)
end

Debug.Assert = Assert

return Debug