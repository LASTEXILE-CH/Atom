local Player = BaseClass("Player", Entity)

local function Init()

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

Player.clientController = nil

Player.__init = Init
Player.OnEnterGameMode = OnEnterGameMode
Player.OnClientStart = OnClientStart
Player.GetClient = GetClient

return Player