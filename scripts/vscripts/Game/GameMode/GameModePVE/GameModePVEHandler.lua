local GameModePVEHandler = BaseClass("GameModePVEHandler")

local function InitGameMode(self)
    print("InitGameMode ".."GameModePVEHandler")
end

local function OnThink(self)
    print("OnThink ".."GameModePVEHandler")
    return 1
end

local function EndGame(self)
	print("EndGame ".."GameModePVEHandler")
end

local function OnPlayerEnter(self, player)
	print("OnPlayerEnter ".."GameModePVEHandler")
end

local function OnPlayerExit(self, player)
	print("OnPlayerExit ".."GameModePVEHandler")
end

local function OnHeroEnter(self, hero)
	print("OnHeroEnter ".."GameModePVEHandler")
end

local function OnHeroExit(self, hero)
	print("OnHeroExit ".."GameModePVEHandler")
end

GameModePVEHandler.InitGameMode = InitGameMode
GameModePVEHandler.EndGame = EndGame
GameModePVEHandler.OnThink = OnThink

GameModePVEHandler.OnPlayerEnter = OnPlayerEnter
GameModePVEHandler.OnPlayerExit = OnPlayerExit
GameModePVEHandler.OnHeroEnter = OnHeroEnter
GameModePVEHandler.OnHeroExit = OnHeroExit

return GameModePVEHandler