import { ViEntity } from "../ViGameCommon/Entity/ViEntity";
import { ViDebuger } from "../ViSystem/ViDebuger";
import { ViDelegater0 } from "../ViSystem/ViDelegate";
import { ViRPCSide } from "./ViRPCDefine";
import { ViRPCInvoker } from "./ViRPCInvoker";

export interface ViRPCEntity extends ViEntity
{
	RPC(): ViRPCInvoker;
}

export class ViRPCEntityAssisstant
{
	public static GetInvokerRPC(entity: ViRPCEntity, funcID: number): ViRPCInvoker
	{
		let RPC = entity.RPC();
		if (!RPC.Active)
		{
			return null;
		}
		if (RPC.ACK.Has(funcID))
		{
			ViDebuger.Note("Sorry, the Net is busy, please waiting for a moment!");
			return null;
		}
		//
		return RPC;
	}
	//
	public static IsNotReady(entity: ViRPCEntity, funcID: number, ack: boolean): boolean
	{
		if (entity == null)
		{
			return true;
		}
		let RPC = entity.RPC();
		if (!RPC.Active)
		{
			return true;
		}
		if (ack && RPC.ACK.Has(funcID))
		{
			ViDebuger.Note("RPC.Invoke(" + funcID + ") Bussy!");
			return true;
		}
		//
		return false;
	}
	//
	public static PreMessage(entity: ViRPCEntity, funcID: number, receiverSide: ViRPCSide, ack: boolean, callback?: ViDelegater0): void
	{
		let RPC = entity.RPC();
		let OS = RPC.OS;
		if (ack)
		{
			RPC.ACK.Add(funcID, callback);
		}
		RPC.PreMessage(entity, funcID);
		RPC.ResetSendStream();
		OS.AppendUInt8(receiverSide);
		OS.AppendUInt16(funcID);
		OS.AppendUInt64(entity.ID());
	}
	//
	public static AftMessage(entity: ViRPCEntity, funcID: number): void
	{
		let RPC = entity.RPC();
		RPC.SendMessage();
		RPC.AftMessage(entity, funcID);
	}
}