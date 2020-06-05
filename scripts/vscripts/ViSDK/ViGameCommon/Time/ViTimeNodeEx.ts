import { ViAssisstant } from "../../ViSystem/ViSystemConfig";
import { ViDelegate1, ViDelegateAssisstant } from "../../ViSystem/ViDelegate";
import { ViTimeNodeInterface, ViTimer } from "./ViTimer";

export class ViTimeNode1<TListener> extends ViTimeNodeInterface
{
	public get Delegate(): ViDelegate1<ViTimeNodeInterface>
	{
		return this._delegate;
	}
	//
	public Detach(): void
	{
		this._listener = null;
		this._delegate = null;
		this._time = 0;
		this.AttachNode.Detach();
	}
	//
	public SetDelegate(listener: TListener, dele: ViDelegate1<ViTimeNodeInterface>): void
	{
		this._listener = listener;
		this._delegate = dele;
	}
	//
	_Exce(timer: ViTimer): void
	{
		let listener = this._listener;
		let dele = this._delegate;
		this._listener = null;
		this._delegate = null;
		this._time = 0;
		ViDelegateAssisstant.Invoke1(listener, dele, this);
	}
	//
	private _listener: TListener;
	private _delegate: ViDelegate1<ViTimeNodeInterface> = null;
}

//+-------------------------------------------------------------------------------------------------------------------------------------------------------------
export class ViTimeNode4<TListener> extends ViTimeNodeInterface
{
	public get TickDelegate(): ViDelegate1<ViTimeNodeInterface> 
	{
		return this._delegate;
	}
	//
	public get Span(): number
	{
		return this._span;
	}
	//
	public Start(timer: ViTimer, span: number, listener: TListener, callback: ViDelegate1<ViTimeNodeInterface>): void
	{
		this._listener = listener;
		this._delegate = callback;
		this._span = span;
		this.SetTime(timer.Time + ViAssisstant.Int32Near(this._span * 100));
		timer.Add(this);
	}
	//
	public Detach(): void
	{
		this._listener = null;
		this._delegate = null;
		this._span = 0;
		this.AttachNode.Detach();
	}
	//
	_Exce(timer: ViTimer): void
	{
		this.SetTime(timer.Time + ViAssisstant.Int32Near(this._span * 100));
		timer.Add(this);
		//
		ViDelegateAssisstant.Invoke1(this._listener, this._delegate, this);
	}
	//
	private _span: number;
	private _listener: TListener;
	private _delegate: ViDelegate1<ViTimeNodeInterface> = null;
}

// class Demo_Node
// {
// 	public Func(node: ViTimeNodeInterface)
// 	{

// 	}

// 	public Node = new ViTimeNode1();
// }

// class Demo_TimeNode
// {
// 	public static Test()
// 	{
// 		let lister = new Demo_Node();
// 		let timer = new ViTimer();
// 		timer.Start(0, 10, 10, 10);
// 		lister.Node.SetTime(10);
// 		lister.Node.SetDelegate(lister, lister.Func);
// 		timer.Add(lister.Node);
// 		timer.Update(9);
// 		timer.Update(11);
// 		timer.Update(20);
// 		lister.Node.Detach();
// 		timer.End();
// 	}
// }