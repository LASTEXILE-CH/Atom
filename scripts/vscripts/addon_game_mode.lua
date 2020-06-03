--ATOM
require("Game/Common/Global")

function Precache(context)
  GameApplication:GetInstance():Preload(context)
end

function Activate()
	GameApplication:GetInstance():Start()
  GameApplication:GetInstance():InitGameMode()
end