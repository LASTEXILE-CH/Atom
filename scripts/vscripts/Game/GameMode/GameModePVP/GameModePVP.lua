local GameModePVP = BaseClass("GameModePVP", BaseGameMode)
local base = GameModePVP.super

local function InitGameMode(self)
    print("InitGameMode ".."GameModePVP")
    --测试
    self.Handler = GameModePVPHandlerCreator:GetInstance():Get("GameModePVPHandler_CRDota")
    if self.Handler ~= nil then
        self.Handler:InitGameMode()
    end
end

local function OnThink(self)
    base:OnThink()
    --print("OnThink ".."GameModePVP")
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
    print("EndGame ".."GameModePVP")
    if self.Handler ~= nil then
        self.Handler:EndGame()
    end
end

GameModePVP.__init = InitGameMode
GameModePVP.__delete = EndGame
GameModePVP.OnThink = OnThink

return GameModePVP