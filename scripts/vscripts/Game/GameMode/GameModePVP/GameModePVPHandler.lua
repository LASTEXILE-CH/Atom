local GameModePVPHandler = BaseClass("GameModePVPHandler")

local function InitGameMode(self)
    print("InitGameMode ".."GameModePVPHandler")
end

local function OnThink(self, deltaTime)
    --print("OnThink ".."GameModePVPHandler")
    return deltaTime
end

local function EndGame(self)
	print("EndGame ".."GameModePVPHandler")
end

local function OnPlayerEnter(self, player)
	print("OnPlayerEnter ".."GameModePVPHandler")
end

local function OnPlayerExit(self, player)
	print("OnPlayerExit ".."GameModePVPHandler")
end

local function OnHeroEnter(self, hero)
	print("OnHeroEnter ".."GameModePVPHandler")
end

local function OnHeroExit(self, hero)
	print("OnHeroExit ".."GameModePVPHandler")
end

GameModePVPHandler.InitGameMode = InitGameMode
GameModePVPHandler.EndGame = EndGame
GameModePVPHandler.OnThink = OnThink

GameModePVPHandler.OnPlayerEnter = OnPlayerEnter
GameModePVPHandler.OnPlayerExit = OnPlayerExit
GameModePVPHandler.OnHeroEnter = OnHeroEnter
GameModePVPHandler.OnHeroExit = OnHeroExit

return GameModePVPHandler