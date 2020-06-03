local Player = BaseClass("Player", Entity)

local function OnEnterGameMode(self, gameMode)
    print("OnEnterGameMode")
    if gameMode ~= nil then
        gameMode:OnPlayerEnter(self)
    end
end

Player.OnEnterGameMode = OnEnterGameMode

return Player