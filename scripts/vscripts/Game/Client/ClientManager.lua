local ClientManager = BaseClass("ClientManager", Singleton)

local function Init(self)
    self.ClientArray = {}
end

local function Start(self)
   
end

local function End(self)
    self.ClientArray = {}
end

local function OnReveive(self, clientData)
    if clientData.RpcMessageType == RPCMessage.PLAYER_CONNECT_FULL then
        self:OnPlayerConnectFull(clientData.eventInfo)
    elseif clientData.RpcMessageType == RPCMessage.PLAYER_CONNECT then
        self:OnPlayerConnect(clientData.eventInfo)
    elseif clientData.RpcMessageType == RPCMessage.PLAYER_DISCONNECT then
        self:OnPlayerDisconnect(clientData.eventInfo)
    elseif clientData.RpcMessageType == RPCMessage.PLAYER_RECONNECTED then
        self:OnPlayerReconnected(clientData.eventInfo)
    else
        self:OnEntityMessage(clientData)
    end
end

--Event
--player_connect_full
--PlayerID: PlayerResource:GetSteamID() | PlayerResource:GetPlayerName()
--userid
--index : EntIndexToHScript()
local function OnPlayerConnectFull(self, eventInfo)
    --print("OnPlayerConnectFull"..tostring(eventInfo.GobalID))
    if self.ClientArray[eventInfo.GobalID] == nil then
        local clientController = ClientController.New()
        clientController:OnConnect(eventInfo)
        self.ClientArray[eventInfo.GobalID] = clientController
    end
end

-- player_connect (作为主机的玩家客户端不会调用这个接口)
-- "name"		"string"	// player name
-- 	"index"		"byte"		// player slot (entity index-1)
-- 	"userid"	"short"		// user ID on server (unique on server)
-- 	"networkid" "string" // player network (i.e steam) id
-- 	"address"	"string"	// ip:port
local function OnPlayerConnect(self, eventInfo)
    --print("OnPlayerConnect"..tostring(eventInfo.GobalID))
    --print("PlayerResource:GobalID:".. tostring(eventInfo.GobalID))
    --print("PlayerResource:index:".. tostring(eventInfo.index))
end

--player_disconnect
--PlayerID
local function OnPlayerDisconnect(self, eventInfo)
    --print("OnPlayerDisconnect"..tostring(eventInfo.GobalID))
    local clientController = self.ClientArray[eventInfo.GobalID]
    if clientController ~= nil then
        clientController:OnDisconnect()
    end
end

--player_reconnected
--PlayerID ( short )
local function OnPlayerReconnected(self, eventInfo)
    --print("OnPlayerReconnected:"..tostring(eventInfo.GobalID))
    local clientController = self.ClientArray[eventInfo.GobalID]
    if clientController ~= nil then
        clientController:OnReconnected()
    end
end

local function OnEntityMessage(self, clientData)
    --print("OnEntityMessage"..tostring(clientData.eventInfo.GobalID))
    local clientController = self.ClientArray[clientData.eventInfo.GobalID]
    if clientController ~= nil then
        clientController:OnReveive(clientData)
    end
end

ClientManager.__init = Init
ClientManager.Start = Start
ClientManager.OnReveive = OnReveive
ClientManager.End = End
--Callback
ClientManager.OnPlayerConnectFull = OnPlayerConnectFull
ClientManager.OnPlayerConnect = OnPlayerConnect
ClientManager.OnPlayerDisconnect = OnPlayerDisconnect
ClientManager.OnPlayerReconnected = OnPlayerReconnected
ClientManager.OnPlayerPickHero = OnPlayerPickHero
ClientManager.OnEntityMessage = OnEntityMessage

return ClientManager