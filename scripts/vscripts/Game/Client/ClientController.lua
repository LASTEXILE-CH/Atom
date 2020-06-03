local ClientController = BaseClass("ClientController")

local function Init(self)
    self.Account = nil
end

local function End(self)
    print("ClientController:End")
end

local function OnConnect(self, property)
    print("ClientController:OnConnect")
    local account = Account.New()
    if account ~= nil then
        print("ClientController:CreateAccount")
        local playerID = property.PlayerID
        account.SteamID = PlayerResource:GetSteamID(playerID)
        account.SteamAccountID = PlayerResource:GetSteamAccountID(playerID)
        account.SteamName = PlayerResource:GetPlayerName(playerID)
        account:CreatePlayer(property)
        self.Account = account
    end
end

--- GetAccount 获得Steam账号
local function GetAccount(self)
     return self.Account
end

local function OnDisconnect(self)
    print("ClientController:OnDisconnect")
    if self.Account ~= nil then

    end
end

local function OnReconnected(self)
    print("ClientController:OnReconnected")
    if self.Account ~= nil then

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
    if self.Account ~= nil then
        local player = self.Account:GetPlayer()
        if player ~= nil then
            player:OnEnterGameMode(GameRules.GameMode)
        end
    end
end

ClientController.__init = Init
ClientController.End = End
ClientController.OnConnect = OnConnect
ClientController.OnDisconnect = OnDisconnect
ClientController.OnReconnected = OnReconnected
ClientController.OnReveive = OnReveive
ClientController.GetAccount = GetAccount

ClientController.OnPlayerChat = OnPlayerChat
ClientController.OnPlayerPickHero = OnPlayerPickHero

return ClientController