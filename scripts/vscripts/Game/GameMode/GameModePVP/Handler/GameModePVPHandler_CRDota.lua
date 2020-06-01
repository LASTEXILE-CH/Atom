local GameModePVPHandler_CRDota = BaseClass("GameModePVPHandler_CRDota", GameModePVPHandler)
local base = GameModePVPHandler_CRDota.super

local function InitGameMode(self)
    base:InitGameMode()
    print("InitGameMode ".."GameModePVPHandler_CRDota")
    GameRules:SetCustomGameTeamMaxPlayers(DOTA_TEAM_GOODGUYS, 0)
	GameRules:SetCustomGameTeamMaxPlayers(DOTA_TEAM_BADGUYS, 0)
    GameRules:SetCustomGameTeamMaxPlayers(DOTA_TEAM_CUSTOM_1, 1)
    GameRules:SetCustomGameTeamMaxPlayers(DOTA_TEAM_CUSTOM_2, 1)
    SetTeamCustomHealthbarColor(DOTA_TEAM_CUSTOM_1, 128,255,128)
    SetTeamCustomHealthbarColor(DOTA_TEAM_CUSTOM_2, 128,255,128)
    
    ListenToGameEvent("player_connect_full", Dynamic_Wrap(GameModePVPHandler_CRDota,"OnPlayerConnectFull" ),self)
    ListenToGameEvent('player_connect', Dynamic_Wrap(GameModePVPHandler_CRDota, 'OnPlayerConnect'), self)
    ListenToGameEvent("player_disconnect", Dynamic_Wrap(GameModePVPHandler_CRDota, "OnPlayerDisconnect"), self)
    ListenToGameEvent("player_reconnected", Dynamic_Wrap(GameModePVPHandler_CRDota, "OnPlayerReconnected"), self)
    ListenToGameEvent("player_chat",Dynamic_Wrap(GameModePVPHandler_CRDota,"OnPlayerChat"),self)
    ListenToGameEvent("dota_player_pick_hero",Dynamic_Wrap(GameModePVPHandler_CRDota,"OnPlayerPickHero"),self)
    ListenToGameEvent("entity_killed", Dynamic_Wrap(GameModePVPHandler_CRDota, "OnEntityKilled"), self)
    ListenToGameEvent("dota_player_gained_level", Dynamic_Wrap(GameModePVPHandler_CRDota,"OnPlayerGainedLevel"), self)
    --ListenToGameEvent( "npc_spawned", Dynamic_Wrap(GameModePVPHandler_CRDota, "OnNPCSpawned"), self)
    --ListenToGameEvent( "game_rules_state_change", Dynamic_Wrap(GameModePVPHandler_CRDota, 'OnGameRulesStateChange'), self)
    --ListenToGameEvent( "dota_team_kill_credit", Dynamic_Wrap(GameModePVPHandler_CRDota, 'OnTeamKillCredit' ), self)
    --ListenToGameEvent( "dota_item_picked_up", Dynamic_Wrap(GameModePVPHandler_CRDota, "OnItemPickUp"), self)
	--ListenToGameEvent( "dota_npc_goal_reached", Dynamic_Wrap(GameModePVPHandler_CRDota, "OnNpcGoalReached"), self)

    GameRules:SetHeroSelectionTime(10.0)
    GameRules:SetPreGameTime(5.0)
    GameRules:SetPostGameTime(10.0)
    GameRules:SetStrategyTime(0.0)
    GameRules:SetShowcaseTime(0.0)
    --GameRules:SetHideKillMessageHeaders(true)
    --GameRules:SetUseUniversalShopMode(true)
    
    GameRules:GetGameModeEntity():SetPauseEnabled(false)
    GameRules:GetGameModeEntity():SetFogOfWarDisabled(true)
    GameRules:GetGameModeEntity():SetUnseenFogOfWarEnabled(true)

    GameRules:GetGameModeEntity():SetBuybackEnabled(false)
    --GameRules:SetCustomVictoryMessageDuration(10)

    -- GameRules:GetGameModeEntity():SetRuneEnabled(DOTA_RUNE_DOUBLEDAMAGE , true) --Double Damage
	-- GameRules:GetGameModeEntity():SetRuneEnabled(DOTA_RUNE_HASTE, true) --Haste
	-- GameRules:GetGameModeEntity():SetRuneEnabled(DOTA_RUNE_ILLUSION, true) --Illusion
	-- GameRules:GetGameModeEntity():SetRuneEnabled(DOTA_RUNE_INVISIBILITY, true) --Invis
	-- GameRules:GetGameModeEntity():SetRuneEnabled(DOTA_RUNE_REGENERATION, false) --Regen
	-- GameRules:GetGameModeEntity():SetRuneEnabled(DOTA_RUNE_ARCANE, true) --Arcane
	-- GameRules:GetGameModeEntity():SetRuneEnabled(DOTA_RUNE_BOUNTY, false) --Bounty
	-- GameRules:GetGameModeEntity():SetLoseGoldOnDeath(false)
	-- GameRules:GetGameModeEntity():SetFountainPercentageHealthRegen(0)
	-- GameRules:GetGameModeEntity():SetFountainPercentageManaRegen(0)
    -- GameRules:GetGameModeEntity():SetFountainConstantManaRegen(0)
    
    GameRules:GetGameModeEntity():SetDamageFilter(Dynamic_Wrap(GameModePVPHandler_CRDota, "OnDamageFilter"), self)
    GameRules:GetGameModeEntity():SetHealingFilter(Dynamic_Wrap(GameModePVPHandler_CRDota, "OnHealingFilter"), self)
    GameRules:GetGameModeEntity():SetExecuteOrderFilter(Dynamic_Wrap(GameModePVPHandler_CRDota, "OnExecuteOrderFilter"), GameModePVPHandler_CRDota )

    --GameRules:GetGameModeEntity():SetUseCustomHeroLevels(true)
	--GameRules:GetGameModeEntity():SetCustomHeroMaxLevel(16)
    -- GameRules:GetGameModeEntity():SetCustomXPRequiredToReachNextLevel(
	-- 	{
	-- 		[1] = 0,
	-- 		[2] = 1,
	-- 		[3] = 2,
	-- 		[4] = 4,
	-- 		[5] = 8,
	-- 		[6] = 16,
	-- 		[7] = 32,
	-- 		[8] = 56,--+32
	-- 		[9] = 88,--+40
	-- 		[10] = 128,--+48
	-- 		[11] = 176,--+56
	-- 		[12] = 232,--+64
	-- 		[13] = 296,--+72
	-- 		[14] = 368,--+80
	-- 		[15] = 448,--+88
	-- 		[16] = 536,
    -- 	}
    
    --Custom Data
    GameRules:GetGameModeEntity().PlayerIDToSteamID = {}
    GameRules:GetGameModeEntity().SteamID2PlayerID = {}
    GameRules:GetGameModeEntity().Steamid2Name = {}
    GameRules:GetGameModeEntity().UserIDToPlayer = {}
end

local function OnThink(self)
    base:OnThink()
    --print("OnThink ".."GameModePVPHandler_CRDota")
    return 1
end

local function EndGame(self)
    base:EndGame()
	print("EndGame ".."GameModePVPHandler_CRDota")
end

--Event
--player_connect_full
--PlayerID: PlayerResource:GetSteamID() | PlayerResource:GetPlayerName()
--userid
--index : EntIndexToHScript()
local function OnPlayerConnectFull(self, eventInfo)
    print("OnPlayerConnectFull")
    print("PlayerResource:GetPlayerName()"..PlayerResource:GetPlayerName(eventInfo.PlayerID))
    print("PlayerResource:GetSteamID()".. tostring(PlayerResource:GetSteamID(eventInfo.PlayerID)))
end

--player_connect
local function OnPlayerConnect(self, eventInfo)
    print("OnPlayerConnect")
end

--player_disconnect
--PlayerID
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
    if IsServer() == true then

    end
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

--entindex_target_const
--heal
local function OnHealingFilter(self, eventInfo)
    print("OnHealingFilter")
    return true
end

--entindex_attacker_const
--entindex_victim_const
--damagetype_const
local function OnDamageFilter(self, eventInfo)
    print("OnDamageFilter")
    return true
end

local function ExecuteOrderFilter(self, eventInfo)
    print("ExecuteOrderFilter")
	return true
end

GameModePVPHandler_CRDota.EndGame = EndGame
GameModePVPHandler_CRDota.InitGameMode = InitGameMode
GameModePVPHandler_CRDota.OnThink = OnThink

--event
GameModePVPHandler_CRDota.OnPlayerConnectFull = OnPlayerConnectFull
GameModePVPHandler_CRDota.OnPlayerConnect = OnPlayerConnect
GameModePVPHandler_CRDota.OnPlayerDisconnect = OnPlayerDisconnect
GameModePVPHandler_CRDota.OnPlayerReconnected = OnPlayerReconnected
GameModePVPHandler_CRDota.OnPlayerChat = OnPlayerChat
GameModePVPHandler_CRDota.OnPlayerPickHero = OnPlayerPickHero
GameModePVPHandler_CRDota.OnEntityKilled = OnEntityKilled
GameModePVPHandler_CRDota.OnPlayerGainedLevel = OnPlayerGainedLevel

GameModePVPHandler_CRDota.OnDamageFilter = OnDamageFilter
GameModePVPHandler_CRDota.OnHealingFilter = OnHealingFilter
GameModePVPHandler_CRDota.ExecuteOrderFilter = ExecuteOrderFilter

return GameModePVPHandler_CRDota