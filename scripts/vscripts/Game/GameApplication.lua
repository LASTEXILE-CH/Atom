local GameApplication = BaseClass("GameApplication", Singleton)


local function Preload(self, context)
    ResourceManager:GetInstance():Preload(context)
end

local function RegisterGameMode(self)
    --PVE
    GameModePVPHandlerCreator:GetInstance():Register("GameModePVEHandler_Demo", GameModePVEHandler_Demo.New())
    --PVP
    GameModePVPHandlerCreator:GetInstance():Register("GameModePVPHandler_CRDota", GameModePVPHandler_CRDota.New())
end

local function Start(self)
    --
    self:RegisterGameMode()
    --
    local accumulate = NumberI64.New(0, 0) --累计时间
    local time1970 = NumberI64.New(0, 0)   --1970开始
    ViTimerInstance.Start(accumulate, time1970, 1, 1000, 1000)
    ViRealTimerInstance.Start(1, 1000, 1000)
    --
    GameRules.GameMode = GameModePVP.New()
    --
    ClientManager:GetInstance():Start()
    --Lister Event
    ListenToGameEvent("player_connect_full", Dynamic_Wrap(GameApplication,"OnPlayerConnectFull" ),self)
    ListenToGameEvent('player_connect', Dynamic_Wrap(GameApplication, 'OnPlayerConnect'), self)
    ListenToGameEvent("player_disconnect", Dynamic_Wrap(GameApplication, "OnPlayerDisconnect"), self)
    ListenToGameEvent("player_reconnected", Dynamic_Wrap(GameApplication, "OnPlayerReconnected"), self)
    ListenToGameEvent("player_chat",Dynamic_Wrap(GameApplication,"OnPlayerChat"),self)
    ListenToGameEvent("dota_player_pick_hero",Dynamic_Wrap(GameApplication,"OnPlayerPickHero"),self)
    --
    self:OnGameStart()
end

local function Update(self, deltaTime)
    --
    ViRealTimerInstance.Update(deltaTime)
    ViTimerInstance.Update(deltaTime)
    ViLodTickNode.Update(deltaTime)
    ViTickNode.Update(deltaTime)
    --
    ViAsynDelegateInterface.Update()
    --
	return deltaTime
end

local function End(self)
    GameRules.GameMode:EndGame()
    ClientManager:GetInstance():End()
end

local function OnGameStart(self)
    
end

--userid 每次断线重连 都会自增, Name和PlayerID和index是唯一的
local function OnPlayerConnectFull(self, eventInfo)
    print("OnPlayerConnectFull")
    local clientData = {}
    clientData.RpcMessageType = RPCMessage.PLAYER_CONNECT_FULL
    eventInfo.GobalID = eventInfo.PlayerID
    clientData.eventInfo = eventInfo
    ClientManager:GetInstance():OnReveive(clientData)
end

local function OnPlayerConnect(self, eventInfo)
    print("OnPlayerConnect")
    -- for key, value in pairs(eventInfo) do
    --     print(key)
    --     print(value)
    -- end
    local clientData = {}
    clientData.RpcMessageType = RPCMessage.PLAYER_CONNECT
    eventInfo.GobalID = eventInfo.userid
    clientData.eventInfo = eventInfo
    ClientManager:GetInstance():OnReveive(clientData)
end

local function OnPlayerDisconnect(self, eventInfo)
    print("OnPlayerDisconnect")
    -- for key, value in pairs(eventInfo) do
    --     print(key)
    --     print(value)
    -- end
    local clientData = {}
    clientData.RpcMessageType = RPCMessage.PLAYER_DISCONNECT
    eventInfo.GobalID = eventInfo.PlayerID
    clientData.eventInfo = eventInfo
    ClientManager:GetInstance():OnReveive(clientData)
end

local function OnPlayerReconnected(self, eventInfo)
    print("OnPlayerReconnected")
    -- for key, value in pairs(eventInfo) do
    --     print(key)
    --     print(value)
    -- end
    local clientData = {}
    clientData.RpcMessageType = RPCMessage.PLAYER_RECONNECTED
    eventInfo.GobalID = eventInfo.PlayerID
    clientData.eventInfo = eventInfo
    ClientManager:GetInstance():OnReveive(clientData)
end

local function OnPlayerChat(self, eventInfo)
    -- print("OnPlayerChat")
    -- for key, value in pairs(eventInfo) do
    --     print(key)
    --     print(value)
    -- end
    local clientData = {}
    clientData.RpcMessageType = RPCMessage.ENTITY_MESSAGE
    clientData.EntityMessage = RPCEntityMessage.PLAYER_CHAT
    eventInfo.GobalID = eventInfo.playerid
    clientData.eventInfo = eventInfo
    ClientManager:GetInstance():OnReveive(clientData)
end

local function OnPlayerPickHero(self, eventInfo)
    -- print("OnPlayerPickHero")
    -- for key, value in pairs(eventInfo) do
    --     print(key)
    --     print(value)
    -- end
    local clientData = {}
    clientData.RpcMessageType = RPCMessage.ENTITY_MESSAGE
    clientData.EntityMessage = RPCEntityMessage.PLAYER_PICKHERO
    eventInfo.GobalID = eventInfo.player - 1 --https://guild.gamer.com.tw/wiki.php?sn=10935&n=%E8%AB%87%E8%A9%B1%E7%AA%97
    clientData.eventInfo = eventInfo
    ClientManager:GetInstance():OnReveive(clientData)
end

GameApplication.Preload = Preload
GameApplication.RegisterGameMode = RegisterGameMode
GameApplication.Start = Start
GameApplication.Update = Update
GameApplication.End = End
GameApplication.OnGameStart = OnGameStart
--Event
GameApplication.OnPlayerConnectFull = OnPlayerConnectFull
GameApplication.OnPlayerConnect = OnPlayerConnect
GameApplication.OnPlayerDisconnect = OnPlayerDisconnect
GameApplication.OnPlayerReconnected = OnPlayerReconnected
GameApplication.OnPlayerChat = OnPlayerChat
GameApplication.OnPlayerPickHero = OnPlayerPickHero

return GameApplication