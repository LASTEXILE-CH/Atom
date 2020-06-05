import { ViSerialiable } from "../../ViSystem/ViSystemType";
import { NumberUI64 } from "../../ViSystem/ViNumber64";
import { ViDebuger } from "../../ViSystem/ViDebuger";
import { ViDoubleLink } from "../../ViStruct/ViDoubleLink";
import { ViRPCResultExecerInterface, ViRPCResultExecer } from "./ViRPCResultExecer";
import { ViIStream } from "../../ViSystem/ViIStream";

export class ViRPCResultDistributor
{
	public Hook<TResult extends ViSerialiable>(execer: ViRPCResultExecer<TResult>): NumberUI64
	{
		this._IDMaker.Mod(0, 1);
		execer.Attach(this._IDMaker, this._execerList);
		return this._IDMaker;
	}
	//
	public Clear(): void
	{
		let _execerList = this._execerList;
		while(_execerList.NotEmpty)
		{
			_execerList.GetHead().Data.End();
		}
		//
		ViDebuger.AssertWarning(_execerList.Empty, "RPCResultDistributor.Clear");
	}
	//
	public OnResult(ID: NumberUI64, stream: ViIStream): void
	{
		let _execerList = this._execerList;
		for (let iter = _execerList.GetHead(); !_execerList.IsEnd(iter); iter = _execerList.Next(iter))
		{
			let iterExecer = iter.Data;
			if (iterExecer.ID.Equal(ID))
			{
				iterExecer.OnResult(stream);
				return;
			}
		}
		//
		ViDebuger.Note("RPCResultDistributor: RPC Result is discarded");
	}
	//
	public OnException(ID: NumberUI64): void
	{
		let _execerList = this._execerList;
		for (let iter = _execerList.GetHead(); !_execerList.IsEnd(iter); iter = _execerList.Next(iter))
		{
			let iterExecer = iter.Data;
			if (iterExecer.ID.Equal(ID))
			{
				iterExecer.OnException();
				return;
			}
		}
		//
		ViDebuger.Note("RPCResultDistributor: RPC Result is discarded");
	}
	//
	private readonly _execerList = new ViDoubleLink<ViRPCResultExecerInterface>();
	private readonly _IDMaker = new NumberUI64(0, 0);;
}