local GameModePVEHandler_Demo = BaseClass("GameModePVEHandler_Demo", GameModePVEHandler)
local base = GameModePVEHandler_Demo.super

local function InitGameMode(self)
    base:InitGameMode()
    print("InitGameMode ".."GameModePVEHandler_Demo")
end

local function OnThink(self, deltaTime)
    base:OnThink(deltaTime)
    print("OnThink ".."GameModePVEHandler_Demo")
    return deltaTime
end

local function EndGame(self)
    base:EndGame()
	print("EndGame ".."GameModePVEHandler_Demo")
end

local function OnPlayerEnter(self, player)
    base:OnPlayerEnter(player)
	print("OnPlayerEnter ".."GameModePVEHandler_Demo")
end

local function OnPlayerExit(self, player)
    base:OnPlayerExit(player)
	print("OnPlayerExit ".."GameModePVEHandler_Demo")
end

local function OnHeroEnter(self, hero)
    base:OnHeroEnter(player)
	print("OnHeroEnter ".."GameModePVEHandler_Demo")
end

local function OnHeroExit(self, hero)
    base:OnHeroExit(player)
	print("OnHeroExit ".."GameModePVEHandler_Demo")
end

GameModePVEHandler_Demo.EndGame = EndGame
GameModePVEHandler_Demo.InitGameMode = InitGameMode
GameModePVEHandler_Demo.OnThink = OnThink

GameModePVEHandler_Demo.OnPlayerEnter = OnPlayerEnter
GameModePVEHandler_Demo.OnPlayerExit = OnPlayerExit
GameModePVEHandler_Demo.OnHeroEnter = OnHeroEnter
GameModePVEHandler_Demo.OnHeroExit = OnHeroExit

return GameModePVEHandler_Demo