local GameModePVEHandlerCreator = BaseClass("GameModePVEHandlerCreator", Singleton)

local function Init(self)
    self.FuncList = {}
end

local function Register(self, name, handler)
    self.FuncList[name] = handler
end

local function Get(self, name)
    return self.FuncList[name]
end

GameModePVEHandlerCreator.__init = Init
GameModePVEHandlerCreator.Register = Register
GameModePVEHandlerCreator.Get = Get

return GameModePVEHandlerCreator