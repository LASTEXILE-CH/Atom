local GameModePVPHandler = BaseClass("GameModePVPHandler")

local function InitGameMode(self)
    print("InitGameMode ".."GameModePVPHandler")
end

local function OnThink(self)
    print("OnThink ".."GameModePVPHandler")
    return 1
end

local function EndGame(self)
	print("EndGame ".."GameModePVPHandler")
end

GameModePVPHandler.InitGameMode = InitGameMode
GameModePVPHandler.EndGame = EndGame
GameModePVPHandler.OnThink = OnThink

return GameModePVPHandler