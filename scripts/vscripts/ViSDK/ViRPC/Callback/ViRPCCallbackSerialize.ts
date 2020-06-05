import { ViSerialiable } from "../../ViSystem/ViSystemType";
import { ViRPCCallback } from "./ViRPCCallback";
import { ViIStream } from "../../ViSystem/ViIStream";
import { ViOStream } from "../../ViSystem/ViOStream";

export class ViRPCCallbackSerialize
{
	public static Read<TValue extends ViSerialiable>(stream: ViIStream, value: ViRPCCallback<TValue>): boolean
	{
		stream.ReadUInt64(value.ID);
		return !stream.Error;
	}
	//
	public static Append<TValue extends ViSerialiable>(stream: ViOStream, value: ViRPCCallback<TValue>): void
	{
		stream.AppendUInt64(value.ID);
	}
}
