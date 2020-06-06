local Player = BaseClass("Player", Entity)

local function PlayerCtor(self)
    self.clientController = nil
end

local function OnEnterGameMode(self, gameMode)
    print("OnEnterGameMode")
    if gameMode ~= nil then
        gameMode:OnPlayerEnter(self)
    end
end

local function OnClientStart(self, clientController)
    self.clientController = clientController
end

local function GetClient(self)
    return self.clientController
end

Player.__init = PlayerCtor
Player.OnEnterGameMode = OnEnterGameMode
Player.OnClientStart = OnClientStart
Player.GetClient = GetClient

return Player