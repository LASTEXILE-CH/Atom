import { ViSerialiable, ViSerialiableEx, ViSerialiableExMember, ViSerialiableExArray, ViList, ViSet, ViDictionary, Int8, UInt8, Int16, UInt16, Int32, UInt32, Int64, UInt64, float, double, ViString } from "../../ViSystem/ViSystemType";
import { ViDebuger, ViLogLevel } from "../../ViSystem/ViDebuger";
import { ViDelegaterRT2, ViDelegaterRT3 } from "../../ViSystem/ViDelegate";
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
import { ViGameUnitClientMethod } from "../Common/ViGameUnitMethodEnum";
export abstract class ViGameUnitClientExecer implements ViRPCExecer
{
	public ID(): NumberUI64 { ViDebuger.AssertError(this._entity != null); return this._entity.ID(); }
	public PackID(): number { ViDebuger.AssertError(this._entity != null); return this._entity.PackID(); }
	public Entity(): ViRPCEntity { return this._entity; }
	protected SetEntity(entity: ViRPCEntity): void
	{
		this._entity = entity;
	}
	public AttachNode(): ViDoubleLinkNode<ViRPCExecer> { return null; }
	public End(entityManager: ViEntityManager): void { }
	public Start(ID : NumberUI64, PackID : number, asLocal : boolean, entityManager : ViEntityManager, channelMask : number, stream : ViIStream): void { }
	public OnPropertyUpdateStart(channel : number): void { }
	public OnPropertyUpdate(channel : number, stream : ViIStream): void { }
	public OnPropertyUpdateEnd(channel : number): void { }
	public CreateHandler(): void { }
	public ClearHandler(): void { }
	public OnMessage(funcID: number, stream: ViIStream): void
	{
		switch(funcID)
		{
			default:
				break;
		}
	}
	protected _entity: ViRPCEntity;
}
