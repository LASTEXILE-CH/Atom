require("Game/Common/BaseClass")
require("Game/Common/ConstClass")
require("Game/Common/DataClass")
require("Game/Common/LuaUtil")
require("Game/Common/StringUtil")
require("Game/Common/TableUtil")
require("Game/Common/Messenger")
require("Game/SDK/Net/RPC/RPCDefine")


_G.Singleton = require("Game/SDK/Singleton")
_G.Debug = require("Game/SDK/Debug/Debug")

_G.ResourceManager = require("Game/Resource/ResourceManager")
_G.GameApplication = require("Game/GameApplication")

_G.BaseGameMode = require("Game/GameMode/BaseGameMode")
_G.GameModeRecord = require("Game/GameMode/GameModeRecord")

_G.ClientController = require("Game/Client/ClientController")
_G.ClientManager = require("Game/Client/ClientManager")

--DataStruct
_G.LinkList = require("Game/SDK/DataStruct/LinkList")
_G.Dictionary = require("Game/SDK/DataStruct/Dictionary")
_G.List = require("Game/SDK/DataStruct/List")
_G.Delegate = require("Game/SDK/DataStruct/Event/Delegate")
_G.PriorityValue = require("Game/SDK/DataStruct/PriorityValue")
_G.PriorityNode = require("Game/SDK/DataStruct/PriorityNode")

--DoubleLink
_G.DoubleLinkNode1 = require("Game/SDK/DataStruct/DoubleLink/DoubleLinkNode1")
_G.DoubleLink1 = require("Game/SDK/DataStruct/DoubleLink/DoubleLink1")
_G.DoubleLinkNode2 = require("Game/SDK/DataStruct/DoubleLink/DoubleLinkNode2")
_G.DoubleLink2 = require("Game/SDK/DataStruct/DoubleLink/DoubleLink2")

--RefList
_G.RefListNode1 = require("Game/SDK/DataStruct/RefList/RefListNode1")
_G.RefList1 = require("/Game/SDK/DataStruct/RefList/RefList1")
_G.RefListNode2 = require("Game/SDK/DataStruct/RefList/RefListNode2")
_G.RefList2 = require("Game/SDK/DataStruct/RefList/RefList2")

--Entity
_G.Entity = require("Game/Entity/Entity")
_G.Hero = require("Game/Entity/Hero")
_G.Player = require("Game/Entity/Player")
_G.HeroController = require("Game/Entity/HeroController")

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


--DataConfig
_G.DataVisual = require("Game/DataConfig/DataVisual")