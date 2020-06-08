require("Game/Common/BaseClass")
require("Game/Common/ConstClass")
require("Game/Common/DataClass")
require("Game/Common/LuaUtil")
require("Game/Common/StringUtil")
require("Game/Common/TableUtil")
require("Game/Common/Messenger")
require("Game/ViSDK/ViNet/ViRPC/RPCDefine")

require("bit") --位运算库

_G.bxor = bit.bxor --按位异或 bit.bxor(val1, val2, ... valn)
_G.bor = bit.bor    --按位或 bit.bor(val1, val2, ... valn)
_G.bnot = bit.bnot --按位取反 bit.bnot(value)
_G.band = bit.band --按位与 bit.band(val1, val2, ... valn)
_G.rshift = bit.rshift --右移 bit.rshift(value, shift)
_G.lshift = bit.lshift --左移 bit.lshift(value, shift)
_G.arshift = bit.arshift --算术右移一个操作数  bit.arshift(value, shift)
_G.bswap = bit.bswap
_G.rol = bit.rol
_G.ror = bit.ror
_G.tobit = bit.tobit --将某一个位设置为1 bit.bit(position)
_G.tohex = bit.tohex

_G.GameKeyWord = require("Game/Common/GameKeyWord")

_G.ViConst = require("Game/ViSDK/ViSystem/ViConst")
_G.ViAssisstant = require("Game/ViSDK/ViSystem/ViAssisstant")
_G.ViProfiler = require("Game/ViSDK/ViSystem/ViProfiler")
_G.NumberI64 = require("Game/ViSDK/ViSystem/NumberI64")

_G.Singleton = require("Game/ViSDK/Singleton")

_G.ViDebuger = require("Game/ViSDK/ViDebug/ViDebuger")

_G.ResourceManager = require("Game/Resource/ResourceManager")
_G.GameApplication = require("Game/GameApplication")

_G.BaseGameMode = require("Game/GameMode/BaseGameMode")
_G.GameModeRecord = require("Game/GameMode/GameModeRecord")

_G.ClientController = require("Game/Client/ClientController")
_G.ClientManager = require("Game/Client/ClientManager")

--ViDataStruct
_G.ViLinkList = require("Game/ViSDK/ViDataStruct/ViLinkList")
_G.ViDictionary = require("Game/ViSDK/ViDataStruct/ViDictionary")
_G.ViList = require("Game/ViSDK/ViDataStruct/ViList")

--ViDelegate
_G.ViDelegate0 = require("Game/ViSDK/ViDataStruct/ViDelegate/ViDelegate0")
_G.ViDelegateRT0 = require("Game/ViSDK/ViDataStruct/ViDelegate/ViDelegateRT0")
_G.ViDelegate1 = require("Game/ViSDK/ViDataStruct/ViDelegate/ViDelegate1")
_G.ViDelegateRT1 = require("Game/ViSDK/ViDataStruct/ViDelegate/ViDelegateRT1")
_G.ViDelegate2 = require("Game/ViSDK/ViDataStruct/ViDelegate/ViDelegate2")
_G.ViDelegateRT2 = require("Game/ViSDK/ViDataStruct/ViDelegate/ViDelegateRT2")
_G.ViDelegate3 = require("Game/ViSDK/ViDataStruct/ViDelegate/ViDelegate3")
_G.ViDelegateRT3 = require("Game/ViSDK/ViDataStruct/ViDelegate/ViDelegateRT3")
_G.ViDelegate4 = require("Game/ViSDK/ViDataStruct/ViDelegate/ViDelegate4")
_G.ViDelegateRT4 = require("Game/ViSDK/ViDataStruct/ViDelegate/ViDelegateRT4")
_G.ViDelegate5 = require("Game/ViSDK/ViDataStruct/ViDelegate/ViDelegate5")
_G.ViDelegateRT5 = require("Game/ViSDK/ViDataStruct/ViDelegate/ViDelegateRT5")
_G.ViDelegateAssisstant = require("Game/ViSDK/ViDataStruct/ViDelegate/ViDelegateAssisstant")

_G.ViPriorityValue = require("Game/ViSDK/ViDataStruct/ViPriorityValue")
_G.ViPriorityNode = require("Game/ViSDK/ViDataStruct/ViPriorityNode")

--DoubleLink
_G.ViDoubleLinkNode1 = require("Game/ViSDK/ViDataStruct/ViDoubleLink/ViDoubleLinkNode1")
_G.ViDoubleLink1 = require("Game/ViSDK/ViDataStruct/ViDoubleLink/ViDoubleLink1")
_G.ViDoubleLinkNode2 = require("Game/ViSDK/ViDataStruct/ViDoubleLink/ViDoubleLinkNode2")
_G.ViDoubleLink2 = require("Game/ViSDK/ViDataStruct/ViDoubleLink/ViDoubleLink2")

_G.ViHashMap = require("Game/ViSDK/ViDataStruct/ViHashMap")

--RefList
_G.ViRefListNode1 = require("Game/ViSDK/ViDataStruct/ViRefList/ViRefListNode1")
_G.ViRefList1 = require("/Game/ViSDK/ViDataStruct/ViRefList/ViRefList1")
_G.ViRefListNode2 = require("Game/ViSDK/ViDataStruct/ViRefList/ViRefListNode2")
_G.ViRefList2 = require("Game/ViSDK/ViDataStruct/ViRefList/ViRefList2")


--ViTimer
_G.ViLodTickNode = require("Game/ViSDK/ViTime/ViLodTickNode")
_G.ViTickNode = require("Game/ViSDK/ViTime/ViTickNode")
_G.ViTimeNodeInterface = require("Game/ViSDK/ViTime/ViTimeNodeInterface")
_G.ViTimer = require("Game/ViSDK/ViTime/ViTimer")
_G.TimeRoll = require("Game/ViSDK/ViTime/TimeRoll")
_G.ViTimeNode1 = require("Game/ViSDK/ViTime/ViTimeNode1")
_G.ViTimeNode4 = require("Game/ViSDK/ViTime/ViTimeNode4")
_G.ViRealTimerInstance = require("Game/ViSDK/ViTime/ViRealTimerInstance")
_G.ViTimerInstance = require("Game/ViSDK/ViTime/ViTimerInstance")

--Event
_G.ViAsynDelegateInterface = require("Game/ViSDK/ViEvent/ViCallback")

_G.ViCallback0 = require("Game/ViSDK/ViEvent/ViCallback0/ViCallback0")
_G.ViAsynCallback0 = require("Game/ViSDK/ViEvent/ViCallback0/ViAsynCallback0")
_G.ViEvent0AsynList = require("Game/ViSDK/ViEvent/ViCallback0/ViEvent0AsynList")
_G.ViEvent0List = require("Game/ViSDK/ViEvent/ViCallback0/ViEvent0List")

_G.ViCallback1 = require("Game/ViSDK/ViEvent/ViCallback1/ViCallback1")
_G.ViAsynCallback1 = require("Game/ViSDK/ViEvent/ViCallback1/ViAsynCallback1")
_G.ViEvent1AsynList = require("Game/ViSDK/ViEvent/ViCallback1/ViEvent1AsynList")
_G.ViEvent1List = require("Game/ViSDK/ViEvent/ViCallback1/ViEvent1List")

_G.ViCallback2 = require("Game/ViSDK/ViEvent/ViCallback2/ViCallback2")
_G.ViAsynCallback2 = require("Game/ViSDK/ViEvent/ViCallback2/ViAsynCallback2")
_G.ViEvent2AsynList = require("Game/ViSDK/ViEvent/ViCallback2/ViEvent2AsynList")
_G.ViEvent2List = require("Game/ViSDK/ViEvent/ViCallback2/ViEvent2List")

_G.ViWorkFlowEvent = require("Game/ViSDK/ViDataStruct/ViWorkFlowEvent")
_G.ViWorkFlowEventNode = require("Game/ViSDK/ViDataStruct/ViWorkFlowEventNode")
_G.ViActiveValue = require("Game/ViSDK/ViDataStruct/ViActiveValue")

--Entity
_G.Entity = require("Game/Entity/Entity")
_G.Hero = require("Game/Entity/Hero/Hero")
_G.HeroController = require("Game/Entity/Hero/HeroController")
_G.Player = require("Game/Entity/Player/Player")
_G.FakePlayer = require("Game/Entity/Player/FakePlayer")
_G.ViEntityRefController = require("Game/ViSDK/ViEntity/ViEntityRefController")

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