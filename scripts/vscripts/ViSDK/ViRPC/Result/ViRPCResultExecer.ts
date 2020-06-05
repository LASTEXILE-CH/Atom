import { ViSerialiable } from "../../ViSystem/ViSystemType";
import { ViStringBuilder } from "../../ViSystem/ViStringBuilder";
import { ViStringIStream } from "../../ViSystem/ViStringIStream";
import { NumberUI64 } from "../../ViSystem/ViNumber64";
import { ViDelegate2, ViDelegateAssisstant } from "../../ViSystem/ViDelegate";
import { ViDoubleLink, ViDoubleLinkNode } from "../../ViStruct/ViDoubleLink";
import { ViOStream } from "../../ViSystem/ViOStream";
import { ViIStream } from "../../ViSystem/ViIStream";

export abstract class ViRPCResultExecerInterface implements ViSerialiable
{
	public readonly ID = new NumberUI64(0, 0);
	public get Active(): boolean { return this._attachNode.IsAttach(); }
	//
	public Attach(ID: NumberUI64, list: ViDoubleLink<ViRPCResultExecerInterface>): void
	{
		this.ID.CopyFrom(ID);
		list.PushBackEx(this._attachNode, this);
	}
	//
	public End(): void 
	{
		this._attachNode.DetachEx(null);
	}
	//
	public Print(stream: ViStringBuilder): void
	{

	}
	public PrintTo(stream: ViOStream): void
	{
		stream.AppendUInt64(this.ID);
	}
	public ReadFrom(stream: ViIStream): void
	{
		stream.ReadUInt64(this.ID);
	}
	public ReadFromString(stream: ViStringIStream): void
	{

	}
	public CopyFrom(other: ViRPCResultExecerInterface): void
	{

	}
	//
	public abstract OnResult(stream: ViIStream): void;
	public abstract OnException(): void;
	//
	private readonly _attachNode = new ViDoubleLinkNode<ViRPCResultExecerInterface>();
}

export abstract class ViRPCResultExecer<TResult extends ViSerialiable> extends ViRPCResultExecerInterface
{
	public constructor(alloc: { new(): TResult; })
	{
		super();
		//
		this._result = new alloc();
	}
	public OnResult(stream: ViIStream): void
	{
		this._result.ReadFrom(stream);
		this.Result(false, this._result);
	}
	public OnException(): void
	{
		this.Result(true, null);
	}
	protected Result(exception: boolean, result: TResult): void
	{

	}
	private _result: TResult;
}

export class ViTRPCResultExecer<TListener, TResult extends ViSerialiable> extends ViRPCResultExecer<TResult>
{
	public constructor(alloc: { new(): TResult; })
	{
		super(alloc);
	}
	//
	public End(): void
	{
		super.End();
		this._listener = null;
		this._func = null;
	}
	//
	public SetListener(listener: TListener, func: ViDelegate2<boolean, TResult>): void
	{
		this._listener = listener;
		this._func = func;
	}
	//
	protected Result(exception: boolean, result: TResult): void
	{
		super.End();
		//
		let listener = this._listener;
		let func = this._func;
		this._listener = null;
		this._func = null;
		ViDelegateAssisstant.Invoke2(listener, func, exception, result);
	}
	//
	private _listener: TListener;
	private _func: ViDelegate2<boolean, TResult>;
}