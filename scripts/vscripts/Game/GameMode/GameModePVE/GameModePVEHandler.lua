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

GameModePVEHandler.InitGameMode = InitGameMode
GameModePVEHandler.EndGame = EndGame
GameModePVEHandler.OnThink = OnThink

return GameModePVEHandler