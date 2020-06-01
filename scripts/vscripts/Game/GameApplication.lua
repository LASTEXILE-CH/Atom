local GameApplication = BaseClass("GameApplication", Singleton)


local function Preload(self, context)
    ResourceManager:GetInstance():Preload(context)
end

local function RegisterGameMode(self)
    --PVP
    GameModePVPHandlerCreator:GetInstance():Register("GameModePVPHandler_CRDota", GameModePVPHandler_CRDota.New())
    --PVE
    GameModePVEHandlerCreator:GetInstance():Register("GameModePVEHandler_Demo", GameModePVEHandler_Demo.New())
end

local function Start(self)
    self:RegisterGameMode()
end

local function InitGameMode()
    GameRules.GameMode = GameModePVP.New()
    GameRules:GetGameModeEntity():SetThink("OnThink", self, "GlobalThink", 2)
end

--变为Local的话 dota2的事件会监听不到，有可能dota2是全局_G上去找这个函数的，而不是当前_Env上去找
function OnThink()
    GameRules.GameMode:OnThink()
	return 1
end

local function End(self)
    GameRules.GameMode:EndGame()
end

GameApplication.Preload = Preload
GameApplication.RegisterGameMode = RegisterGameMode
GameApplication.Start = Start
GameApplication.InitGameMode = InitGameMode
GameApplication.Update = Update
GameApplication.End = End

return GameApplication