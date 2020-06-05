import { ViSerialiable, ViSerialiableEx, ViSerialiableExMember, ViSerialiableExArray, ViList, ViSet, ViDictionary, Int8, UInt8, Int16, UInt16, Int32, UInt32, Int64, UInt64, float, double, ViString } from "../../ViSystem/ViSystemType";
import { ViDebuger, ViLogLevel } from "../../ViSystem/ViDebuger";
import { NumberUI64, NumberI64 } from "../../ViSystem/ViNumber64";
import { ViDelegater0, ViDelegaterRT2, ViDelegaterRT3 } from "../../ViSystem/ViDelegate";
import { ViStringIStream } from "../../ViSystem/ViStringIStream";
import { ViVector3 } from "../../ViMath/ViVector3";
import { ViEntity } from "../../ViGameCommon/Entity/ViEntity";
import { ViEntityAssisstant } from "../../ViGameCommon/Entity/ViEntityAssisstant";
import { ViEntityManager } from "../../ViGameCommon/Entity/ViEntityManager";
import { ViEntityCommandInvoker, ViEmptyEntityCommandInvoker, ViTEntityCommandInvoker } from "../../ViGameCommon/Entity/ViEntityCommandInvoker";
import { ViRPCSide } from "../../ViRPC/ViRPCDefine";
import { ViRPCExecer, ViRPCMessage } from "../../ViRPC/ViRPCExecer";
import { ViRPCEntity } from "../../ViRPC/ViRPCEntity";
import { ViRPCResultExecer } from "../../ViRPC/Result/ViRPCResultExecer";
import { ViRPCCallback } from "../../ViRPC/Callback/ViRPCCallback";
import { SC } from "../Common/ViGameLogicShortCode";
import { VisualAuraProperty } from "../Common/ViGameLogicNormalDataEx";
import { ViGameUnit } from "../../Game/Entity/ViGameUnit";
import { ViGameUnitClientMethod } from "../Common/ViGameUnitMethodEnum";
import { ViGameUnitServerMethod } from "../Common/ViGameUnitMethodEnum";
export class ViGameUnitCommandInvoker
{
	public static Instance = new ViEmptyEntityCommandInvoker();
	public static Start(): void
	{
		ViEntityCommandInvoker.Register(new ViDelegaterRT3(ViGameUnitCommandInvoker, ViGameUnitCommandInvoker.Exec));
	}
	public static TExec(entity: ViRPCEntity, name: string, paramList: ViList<string>): boolean
	{
		return ViGameUnitCommandInvoker.Instance.Exec(entity, name, paramList);
	}
	public static Exec(entity: ViEntity, name: string, paramList: ViList<string>): boolean
	{
		let deriveEntity: ViGameUnit = entity instanceof ViGameUnit ? entity as ViGameUnit : null;
		if (deriveEntity == null) { return false; };
		return ViGameUnitCommandInvoker.TExec(deriveEntity, name, paramList);
	}
}
