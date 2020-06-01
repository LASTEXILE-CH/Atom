local GameModePVPHandler_CRDota = BaseClass("GameModePVPHandler_CRDota", GameModePVPHandler)
local base = GameModePVPHandler_CRDota.super

local function InitGameMode(self)
    base:InitGameMode()
    print("InitGameMode ".."GameModePVPHandler_CRDota")
    GameRules:SetCustomGameTeamMaxPlayers( DOTA_TEAM_GOODGUYS, 0 )
	GameRules:SetCustomGameTeamMaxPlayers( DOTA_TEAM_BADGUYS, 0 )
    GameRules:SetCustomGameTeamMaxPlayers( DOTA_TEAM_CUSTOM_1, 1 )
    GameRules:SetCustomGameTeamMaxPlayers( DOTA_TEAM_CUSTOM_2, 1 )
    SetTeamCustomHealthbarColor(DOTA_TEAM_CUSTOM_1, 128,255,128)
    SetTeamCustomHealthbarColor(DOTA_TEAM_CUSTOM_2, 128,255,128)
    
    ListenToGameEvent("player_connect_full", Dynamic_Wrap(GameModePVPHandler_CRDota,"OnPlayerConnectFull" ),self)
    ListenToGameEvent("player_disconnect", Dynamic_Wrap(GameModePVPHandler_CRDota, "OnPlayerDisconnect"), self)
    ListenToGameEvent("player_reconnected", Dynamic_Wrap(GameModePVPHandler_CRDota, "OnPlayerReconnected"), self)
    ListenToGameEvent("player_chat",Dynamic_Wrap(GameModePVPHandler_CRDota,"OnPlayerChat"),self)
    ListenToGameEvent("dota_player_pick_hero",Dynamic_Wrap(GameModePVPHandler_CRDota,"OnPlayerPickHero"),self)
    ListenToGameEvent("entity_killed", Dynamic_Wrap(GameModePVPHandler_CRDota, "OnEntityKilled"), self)
    ListenToGameEvent("dota_player_gained_level", Dynamic_Wrap(GameModePVPHandler_CRDota,"OnPlayerGainedLevel"), self)
end

local function OnThink(self)
    base:OnThink()
    print("OnThink ".."GameModePVPHandler_CRDota")
    return 1
end

local function EndGame(self)
    base:EndGame()
	print("EndGame ".."GameModePVPHandler_CRDota")
end

--Event
--PlayerID: PlayerResource:GetSteamID() | PlayerResource:GetPlayerName()
--userid
--index : EntIndexToHScript()
local function OnPlayerConnectFull(self, eventInfo)
    print("OnPlayerConnectFull")
    print("PlayerResource:GetPlayerName()"..PlayerResource:GetPlayerName(eventInfo.PlayerID))
end

local function OnPlayerDisconnect(self, eventInfo)
    print("OnPlayerDisconnect")
end

--player_reconnected
--PlayerID ( short )
local function OnPlayerReconnected(self, eventInfo)
    print("OnPlayerReconnected")
end

--player_chat: a public player chat
--teamonly ( bool ): true if team only chat
--userid( short ): chatting player
--text( string ): chat text
local function OnPlayerChat(self, eventInfo)
    print("OnPlayerChat:"..tostring(eventInfo.userid))
    print("OnPlayerChat:"..tostring(eventInfo.text))
end

--dota_player_pick_hero
--player ( short )
--heroindex ( short )
--hero ( string )
local function OnPlayerPickHero(self, eventInfo)
    print("OnPlayerPickHero")
    print(eventInfo.hero)
end

--entity_killed
--entindex_killed( long )
--entindex_attacker ( long )
--entindex_inflictor ( long )
--damagebits ( long )
local function OnEntityKilled(self, eventInfo)
    print("OnEntityKilled")
end

--dota_player_gained_level
--player ( short )
--level ( short )
local function OnPlayerGainedLevel(self, eventInfo)
    print("OnPlayerGainedLevel")
end

GameModePVPHandler_CRDota.EndGame = EndGame
GameModePVPHandler_CRDota.InitGameMode = InitGameMode
GameModePVPHandler_CRDota.OnThink = OnThink

--event
GameModePVPHandler_CRDota.OnPlayerConnectFull = OnPlayerConnectFull
GameModePVPHandler_CRDota.OnPlayerChat = OnPlayerChat
GameModePVPHandler_CRDota.OnPlayerPickHero = OnPlayerPickHero
GameModePVPHandler_CRDota.OnEntityKilled = OnEntityKilled
GameModePVPHandler_CRDota.OnPlayerGainedLevel = OnPlayerGainedLevel

return GameModePVPHandler_CRDota