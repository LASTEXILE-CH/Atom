require("Game/Common/BaseClass")
require("Game/Common/ConstClass")
require("Game/Common/DataClass")

_G.Singleton = require("Game/SDK/Singleton")
_G.ResourceManager = require("Game/Resource/ResourceManager")
_G.BaseGameMode = require("Game/GameMode/BaseGameMode")
_G.GameApplication = require("Game/GameApplication")
_G.Debug = require("Game/SDK/Debug/Debug")

--PVE
_G.GameModePVE = require("Game/GameMode/GameModePVE/GameModePVE")
_G.GameModePVPHandlerCreator = require("Game/GameMode/GameModePVP/GameModePVPHandlerCreator")
--PVE Hnadler
_G.GameModePVEHandler = require("Game/GameMode/GameModePVE/GameModePVEHandler")
--具体的 PVEHandler
_G.GameModePVEHandler_Demo = require("Game/GameMode/GameModePVE/Handler/GameModePVEHandler_Demo")

--PVP
_G.GameModePVP = require("Game/GameMode/GameModePVP/GameModePVP")
_G.GameModePVEHandlerCreator = require("Game/GameMode/GameModePVE/GameModePVEHandlerCreator")
--PVP Hnadler
_G.GameModePVPHandler = require("Game/GameMode/GameModePVP/GameModePVPHandler")
--具体的 PVPHandler
_G.GameModePVPHandler_CRDota = require("Game/GameMode/GameModePVP/Handler/GameModePVPHandler_CRDota")