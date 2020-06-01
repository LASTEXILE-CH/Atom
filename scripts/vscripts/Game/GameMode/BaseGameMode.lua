local BaseGameMode = BaseClass("BaseGameMode", Singleton)

local function InitGameMode(self)
	print("InitGameMode ".."BaseGameMode")
end

local function OnThink(self)
	print("OnThink ".."BaseGameMode")
	return 1
end

local function EndGame(self)
	print("EndGame ".."BaseGameMode")
end

BaseGameMode.__init = InitGameMode
BaseGameMode.__delete = EndGame
BaseGameMode.OnThink = OnThink

return BaseGameMode