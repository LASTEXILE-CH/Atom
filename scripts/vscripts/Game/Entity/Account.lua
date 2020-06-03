local Account = BaseClass("Account", Entity)

local function Init(self)
    self.Player = nil
end

local function CreatePlayer(self, playerProperty)
    local player = Player.New()
    if player ~= nil then
        print("ClientController:CreatePlayer")
        player.ID = playerProperty.PlayerID
        player.Index = playerProperty.index
        player.Splitscreenplayer = playerProperty.splitscreenplayer
        player.UserID = playerProperty.userid
        self.Player = player
    end
end

local function GetPlayer(self)
    return self.Player
end

Account.__init = Init
Account.CreatePlayer = CreatePlayer
Account.GetPlayer = GetPlayer

return Account