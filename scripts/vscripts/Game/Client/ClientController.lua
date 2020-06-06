local ClientController = BaseClass("ClientController")

local function ClientControllerCtor(self)
    self.Player = nil
end

local function End(self)
    print("ClientController:End")
end

local function OnConnect(self, playerProperty)
    print("ClientController:OnConnect")
    local player = Player.New()
    if player ~= nil then
        local playerID = playerProperty.PlayerID
        player.SteamID = PlayerResource:GetSteamID(playerID)
        player.SteamAccountID = PlayerResource:GetSteamAccountID(playerID)
        player.SteamName = PlayerResource:GetPlayerName(playerID)
        player.ID = playerID
        player.Index = playerProperty.index
        player.Splitscreenplayer = playerProperty.splitscreenplayer
        player.UserID = playerProperty.userid
        self:StartPlayer(player)
    end
end

local function StartPlayer(self, player)
    print("ClientController:CreatePlayer")
    player:OnClientStart(self)
    self.Player = player
end

local function GetPlayer(self)
     return self.Player
end

local function OnDisconnect(self)
    print("ClientController:OnDisconnect")
    if self.Player ~= nil then
        
    end
end

local function OnReconnected(self)
    print("ClientController:OnReconnected")
    if self.Player ~= nil then

    end
end

local function OnReveive(self, clientData)
    if clientData.EntityMessage == RPCEntityMessage.PLAYER_CHAT then
        self:OnPlayerChat(clientData.eventInfo)
    elseif clientData.EntityMessage == RPCEntityMessage.PLAYER_PICKHERO then
        self:OnPlayerPickHero(clientData.eventInfo)
    else
       
    end
end

--player_chat: a public player chat
--teamonly ( bool ): true if team only chat
--userid( short ): chatting player
--text( string ): chat text
local function OnPlayerChat(self, eventInfo)
    print("ClientController:OnPlayerChat")
end

--dota_player_pick_hero
--player ( short )
--heroindex ( short )
--hero ( string )
local function OnPlayerPickHero(self, eventInfo)
    print("ClientController:OnPlayerPickHero")
    local player = self.Player
    if player ~= nil then
        player:OnEnterGameMode(GameRules.GameMode)
    end
end

ClientController.__init = ClientControllerCtor
ClientController.End = End
ClientController.OnConnect = OnConnect
ClientController.OnDisconnect = OnDisconnect
ClientController.OnReconnected = OnReconnected
ClientController.OnReveive = OnReveive
ClientController.GetPlayer = GetPlayer
ClientController.StartPlayer = StartPlayer

ClientController.OnPlayerChat = OnPlayerChat
ClientController.OnPlayerPickHero = OnPlayerPickHero

return ClientController