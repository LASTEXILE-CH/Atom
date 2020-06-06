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

local function OnThink(self, deltaTime)
    base:OnThink(deltaTime)
    --print("OnThink ".."GameModePVP")
    if self.Handler ~= nil then
        self.Handler:OnThink(deltaTime)
    end
    return deltaTime
end

local function EndGame(self)
    print("EndGame ".."GameModePVP")
    if self.Handler ~= nil then
        self.Handler:EndGame()
    end
    base:EndGame()
end

local function OnPlayerEnter(self, player)
    base:OnPlayerEnter(player)
    print("OnPlayerEnter ".."GameModePVP")
    if self.Handler ~= nil then
        self.Handler:OnPlayerEnter(player)
    end
end

local function OnPlayerExit(self, player)
    base:OnPlayerExit(player)
    print("OnPlayerExit ".."GameModePVP")
    if self.Handler ~= nil then
        self.Handler:OnPlayerExit(player)
    end
end

local function OnHeroEnter(self, hero)
    base:OnHeroEnter(player)
    print("OnHeroEnter ".."GameModePVP")
    if self.Handler ~= nil then
        self.Handler:OnHeroEnter(hero)
    end
end

local function OnHeroExit(self, hero)
    base:OnHeroExit(player)
    print("OnHeroExit ".."GameModePVP")
    if self.Handler ~= nil then
        self.Handler:OnHeroExit(hero)
    end
end

GameModePVP.__init = InitGameMode
GameModePVP.__delete = EndGame
GameModePVP.OnThink = OnThink

GameModePVP.OnPlayerEnter = OnPlayerEnter
GameModePVP.OnPlayerExit = OnPlayerExit
GameModePVP.OnHeroEnter = OnHeroEnter
GameModePVP.OnHeroExit = OnHeroExit

return GameModePVP