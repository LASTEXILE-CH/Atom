local GameModePVPHandler = BaseClass("GameModePVPHandler")

local function InitGameMode(self)
    print("InitGameMode ".."GameModePVPHandler")
end

local function _OnTick0(self, deltaTime)

end

local function _OnTick1(self, deltaTime)

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
GameModePVPHandler._OnTick0 = _OnTick0
GameModePVPHandler._OnTick1 = _OnTick1

GameModePVPHandler.OnPlayerEnter = OnPlayerEnter
GameModePVPHandler.OnPlayerExit = OnPlayerExit
GameModePVPHandler.OnHeroEnter = OnHeroEnter
GameModePVPHandler.OnHeroExit = OnHeroExit

return GameModePVPHandler