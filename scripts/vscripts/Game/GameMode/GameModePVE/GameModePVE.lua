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

local function OnThink(self, deltaTime)
    base:OnThink(deltaTime)
    print("OnThink ".."GameModePVE")
    if self.Handler ~= nil then
        self.Handler:OnThink(deltaTime)
    end
    return deltaTime
end

local function EndGame(self)
    base:EndGame()
    print("EndGame ".."GameModePVE")
    if self.Handler ~= nil then
        self.Handler:EndGame()
    end
end

local function OnPlayerEnter(self, player)
    base:OnPlayerEnter(player)
    print("OnPlayerEnter ".."GameModePVE")
    if self.Handler ~= nil then
        self.Handler:OnPlayerEnter(player)
    end
end

local function OnPlayerExit(self, player)
    base:OnPlayerExit(player)
    print("OnPlayerExit ".."GameModePVE")
    if self.Handler ~= nil then
        self.Handler:OnPlayerExit(player)
    end
end

local function OnHeroEnter(self, hero)
    base:OnHeroEnter(player)
    print("OnHeroEnter ".."GameModePVE")
    if self.Handler ~= nil then
        self.Handler:OnHeroEnter(hero)
    end
end

local function OnHeroExit(self, hero)
    base:OnHeroExit(player)
    print("OnHeroExit ".."GameModePVE")
    if self.Handler ~= nil then
        self.Handler:OnHeroExit(hero)
    end
end

GameModePVE.__init = InitGameMode
GameModePVE.__delete = EndGame
GameModePVE.OnThink = OnThink

GameModePVE.OnPlayerEnter = OnPlayerEnter
GameModePVE.OnPlayerExit = OnPlayerExit
GameModePVE.OnHeroEnter = OnHeroEnter
GameModePVE.OnHeroExit = OnHeroExit

return GameModePVE