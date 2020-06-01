local GameModePVEHandler_Demo = BaseClass("GameModePVEHandler_Demo", GameModePVEHandler)
local base = GameModePVEHandler_Demo.super

local function InitGameMode(self)
    base:InitGameMode()
    print("InitGameMode ".."GameModePVEHandler_Demo")
end

local function OnThink(self)
    base:OnThink()
    print("OnThink ".."GameModePVEHandler_Demo")
    return 1
end

local function EndGame(self)
    base:EndGame()
	print("EndGame ".."GameModePVEHandler_Demo")
end

GameModePVEHandler_Demo.EndGame = EndGame
GameModePVEHandler_Demo.InitGameMode = InitGameMode
GameModePVEHandler_Demo.OnThink = OnThink

return GameModePVEHandler_Demo