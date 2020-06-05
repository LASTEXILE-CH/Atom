import { ViSerialiable } from "../../ViSystem/ViSystemType";
import { NumberUI64 } from "../../ViSystem/ViNumber64";
import { ViDebuger } from "../../ViSystem/ViDebuger";
import { ViStringBuilder } from "../../ViSystem/ViStringBuilder";
import { ViStringIStream } from "../../ViSystem/ViStringIStream";
import { ViRPCSide } from "../ViRPCDefine";
import { ViRPCEntity } from "../ViRPCEntity";
import { ViRPCMessage } from "../ViRPCExecer";
import { ViOStream } from "../../ViSystem/ViOStream";
import { ViIStream } from "../../ViSystem/ViIStream";

export class ViRPCCallback<TValue extends ViSerialiable> implements ViSerialiable
{
    public readonly ID = new NumberUI64(0, 0);
    public get Active(): boolean { return this.ID.NotEqualRaw(0, 0); }
    //
    public constructor(ID?: NumberUI64)
    {
        if (ID != null)
        {
            this.ID.CopyFrom(ID);
        }
    }
    //
	private static readonly CACHE_Exception_Stream = new ViOStream(16);
    public Exception(entity: ViRPCEntity, receiverSide: ViRPCSide): void
    {
        if (this.ID.EqualRaw(0, 0))
        {
            ViDebuger.Warning("RPCCallback: Exception Invalid");
            return;
        }
        let RPC = entity.RPC();
        if (!RPC.Active)
        {
            return;
        }
        //
        let localStream = ViRPCCallback.CACHE_Exception_Stream;
        localStream.Reset();
        let OS = RPC.OS;
        RPC.ResetSendStream();
        OS.AppendUInt8(receiverSide);
        OS.AppendUInt16(ViRPCMessage.EXEC_EXCEPTION);
		localStream.AppendUInt64(this.ID);
        OS.AppendStream(localStream);
        RPC.SendMessage();
        this.ID.Set(0, 0);
    }
    //
	private static readonly CACHE_Invoke_Stream = new ViOStream(16);
    public Invoke(entity: ViRPCEntity, receiverSide: ViRPCSide, value: TValue): void
    {
        if (this.ID.EqualRaw(0, 0))
        {
            ViDebuger.Warning("RPCCallback: Invoke Invalid");
            return;
        }
        let RPC = entity.RPC();
        if (!RPC.Active)
        {
            return;
        }
        //
        let localStream = ViRPCCallback.CACHE_Invoke_Stream;
        localStream.Reset();
        let OS = RPC.OS;
        RPC.ResetSendStream();
        OS.AppendUInt8(receiverSide);
        OS.AppendUInt16(ViRPCMessage.EXEC_RESULT);
		localStream.AppendUInt64(this.ID);
        value.PrintTo(localStream);
        OS.AppendStream(localStream);
        RPC.SendMessage();
        this.ID.Set(0, 0);
    }
    //
    public PrintTo(stream: ViOStream): void 
    {
		stream.AppendUInt64(this.ID);
    }
    public ReadFrom(stream: ViIStream): void 
    {
		stream.ReadUInt64(this.ID);
    }
    public Print(stream: ViStringBuilder): void { }
    public ReadFromString(stream: ViStringIStream): void { }
    public CopyFrom(other: ViRPCCallback<TValue>): void
    {
        this.ID.CopyFrom(other.ID);
    }
    public toString(): string
    {
        return "RPCCallback[" + this.ID.toString() + "]";
    }
}
