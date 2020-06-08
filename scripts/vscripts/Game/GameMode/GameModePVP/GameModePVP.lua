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

local function _OnTick0(self, deltaTime)
    base:_OnTick0(deltaTime)
    if self.Handler ~= nil then
        self.Handler:_OnTick0(deltaTime)
    end
end

local function _OnTick1(self, deltaTime)
    base:_OnTick1(deltaTime)
    if self.Handler ~= nil then
        self.Handler:_OnTick1(deltaTime)
    end
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
GameModePVP._OnTick0 = _OnTick0
GameModePVP._OnTick1 = _OnTick1

GameModePVP.OnPlayerEnter = OnPlayerEnter
GameModePVP.OnPlayerExit = OnPlayerExit
GameModePVP.OnHeroEnter = OnHeroEnter
GameModePVP.OnHeroExit = OnHeroExit

return GameModePVP