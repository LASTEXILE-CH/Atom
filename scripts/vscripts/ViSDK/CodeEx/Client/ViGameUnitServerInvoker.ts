import { ViSerialiable, ViSerialiableEx, ViSerialiableExMember, ViSerialiableExArray, ViList, ViSet, ViDictionary, Int8, UInt8, Int16, UInt16, Int32, UInt32, Int64, UInt64, float, double, ViString } from "../../ViSystem/ViSystemType";
import { ViDebuger, ViLogLevel } from "../../ViSystem/ViDebuger";
import { ViDelegater0, ViDelegaterRT2, ViDelegaterRT3 } from "../../ViSystem/ViDelegate";
import { ViIStream } from "../../ViSystem/ViIStream";
import { NumberUI64, NumberI64 } from "../../ViSystem/ViNumber64";
import { ViDoubleLinkNode } from "../../ViStruct/ViDoubleLink";
import { ViVector3 } from "../../ViMath/ViVector3";
import { ViForeignKey } from "../../ViGameCommon/SealedData/ViForeignKey";
import { ViEntity } from "../../ViGameCommon/Entity/ViEntity";
import { ViEntityAssisstant } from "../../ViGameCommon/Entity/ViEntityAssisstant";
import { ViEntityManager } from "../../ViGameCommon/Entity/ViEntityManager";
import { ViRPCSide } from "../../ViRPC/ViRPCDefine";
import { ViRPCExecer, ViRPCMessage } from "../../ViRPC/ViRPCExecer";
import { ViRPCEntity } from "../../ViRPC/ViRPCEntity";
import { ViRPCResultExecer } from "../../ViRPC/Result/ViRPCResultExecer";
import { ViRPCCallback } from "../../ViRPC/Callback/ViRPCCallback";
import { SC } from "../Common/ViGameLogicShortCode";
import { VisualAuraProperty } from "../Common/ViGameLogicNormalDataEx";
import { ViGameUnit } from "../../Game/Entity/ViGameUnit";
import { ViGameUnitServerMethod } from "../Common/ViGameUnitMethodEnum";
export class ViGameUnitServerInvoker
{
}
