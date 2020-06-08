--ATOM
require("Game/Common/Global")

function Precache(context)
    GameApplication:GetInstance():Preload(context)
end

function Activate()
    GameApplication:GetInstance():Start()
    GameRules:GetGameModeEntity():SetThink("OnThink", self, "GlobalThink", 0)
end

local DeltaTime = 0.033
function OnThink()
    GameApplication:GetInstance():Update(DeltaTime)
    return DeltaTime
end