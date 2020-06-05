import { ViDebuger } from "../ViSystem/ViDebuger";
import { ViDelegater2 } from "../ViSystem/ViDelegate";
import { ViNetInterface } from "../ViSystem/ViNetInterface";
import { ViEntity } from "../ViGameCommon/Entity/ViEntity";
import { ViRPCLicence } from "./ViRPCLicence";
import { ViRPCACK } from "./ViRPCACK";
import { ViRPCResultDistributor } from "./Result/ViRPCResultDistributor";
import { ViOStream } from "../ViSystem/ViOStream";

export class ViRPCInvoker
{
	// public readonly PreMessageCallback = new ViDelegater2<ViEntity, number>();
	// public readonly AftMessageCallback = new ViDelegater2<ViEntity, number>();
	//
	public get OS(): ViOStream { return this._net.OS; }
	public get ACK(): ViRPCACK
	{
		if (this._ACK == null)
		{
			this._ACK = new ViRPCACK();
		}
		//
		return this._ACK;
	}
	public get ResultDistributor(): ViRPCResultDistributor { return this._resultDistributor; }
	public get Active(): boolean { return this._net != null; }
	//
	public Start(net: ViNetInterface, resultDistributor: ViRPCResultDistributor, licence: ViRPCLicence): void
	{
		this._net = net;
		this._resultDistributor = resultDistributor;
		this._licence = licence;
	}
	//
	public End(): void
	{
		if (this._ACK != null)
		{
			this._ACK.End();
			this._ACK = null;
		}
		this._resultDistributor = null;
		this._net = null;
	}
	//
	public SendMessage(): void
	{
		let net = this._net;
		if (!this._licence.Error && net != null)
		{
			net.SendStream();
		}
		else
		{
			ViDebuger.Warning("RPCInvoker._net == null || RPCInvoker._licence.Error");
		}
	}
	//
	public ResetSendStream(): void
	{
		let net = this._net;
		if (net != null)
		{
			net.ResetSendStream();
			this.OS.AppendUInt8(this._licence.Create());
		}
		else
		{
			ViDebuger.Warning("RPCInvoker._net == null");
		}
	}
	//
	public PreMessage(entity: ViEntity, funcID: number): void
	{
		//this.PreMessageCallback.Invoke(entity, funcID);
	}
	//
	public AftMessage(entity: ViEntity, funcID: number): void
	{
		//this.AftMessageCallback.Invoke(entity, funcID);
	}
	//
	private _ACK: ViRPCACK = null;
	private _net: ViNetInterface;
	private _resultDistributor: ViRPCResultDistributor;
	private _licence: ViRPCLicence;
}
