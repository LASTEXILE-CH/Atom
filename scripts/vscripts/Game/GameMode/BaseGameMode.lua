local BaseGameMode = BaseClass("BaseGameMode")

local function InitGameMode(self)
	print("InitGameMode ".."BaseGameMode")
end

local function OnThink(self, deltaTime)
	--print("OnThink ".."BaseGameMode")
	return deltaTime
end

local function EndGame(self)
	print("EndGame ".."BaseGameMode")
end

local function OnPlayerEnter(self, player)
	print("OnPlayerEnter ".."BaseGameMode")

end

local function OnPlayerExit(self, player)
	print("OnPlayerExit ".."BaseGameMode")
end

local function OnHeroEnter(self, hero)
	print("OnHeroEnter ".."BaseGameMode")
end

local function OnHeroExit(self, hero)
	print("OnHeroExit ".."BaseGameMode")
end

BaseGameMode.__init = InitGameMode
BaseGameMode.__delete = EndGame
BaseGameMode.OnThink = OnThink

BaseGameMode.OnPlayerEnter = OnPlayerEnter
BaseGameMode.OnPlayerExit = OnPlayerExit
BaseGameMode.OnHeroEnter = OnHeroEnter
BaseGameMode.OnHeroExit = OnHeroExit

return BaseGameMode