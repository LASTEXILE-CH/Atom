local GameModePVE = BaseClass("GameModePVE", BaseGameMode)
local base = GameModePVE.super

local function InitGameMode(self)
    print("InitGameMode ".."GameModePVE")
    --测试
    self.Handler = GameModePVEHandlerCreator:GetInstance():Get("GameModePVEHandler_Demo")
    if self.Handler ~= nil then
        self.Handler:InitGameMode()
    end
end

local function OnThink(self)
    base:OnThink()
    print("OnThink ".."GameModePVE")
    if self.Handler ~= nil then
        self.Handler:OnThink()
    end
    if GameRules:State_Get() == DOTA_GAMERULES_STATE_GAME_IN_PROGRESS then
        
	elseif GameRules:State_Get() >= DOTA_GAMERULES_STATE_POST_GAME then
		return nil
    end
    return 1
end

local function EndGame(self)
    base:EndGame()
    print("EndGame ".."GameModePVE")
    if self.Handler ~= nil then
        self.Handler:EndGame()
    end
end

GameModePVE.__init = InitGameMode
GameModePVE.__delete = EndGame
GameModePVE.OnThink = OnThink

return GameModePVE