local GameModePVPHandlerCreator = BaseClass("GameModePVPHandlerCreator", Singleton)

local function Init(self)
    self.FuncList = {}
end

local function Register(self, name, handler)
    self.FuncList[name] = handler
end

local function Get(self, name)
    return self.FuncList[name]
end

GameModePVPHandlerCreator.__init = Init
GameModePVPHandlerCreator.Register = Register
GameModePVPHandlerCreator.Get = Get

return GameModePVPHandlerCreator