import { ViStringHashMap } from "../ViStruct/ViHashMap";
import { ViDelegate0, ViDelegateAssisstant } from "../ViSystem/ViDelegate";

export class ViWorkFlowEvent
{
	public get Count(): number { return this._waitList.Count; }
	//
	public Wait(key: string, callback: ViDelegate0): void
	{
		this._waitList.Add(key, callback);
	}
	//
	public Erase(key: string): void
	{
		this._waitList.Del(key);
	}
	//
	public Complete(key: string): void
	{
		let oldSize = this._waitList.Count;
		let func = this._waitList.Del(key);
		if (this._waitList.Count == oldSize)
		{
			return;
		}
		//
		if (this._listener != null && func != null)
		{
			ViDelegateAssisstant.Invoke0(this._listener, func);
		}
		if (this._waitList.Count == 0)
		{
			ViDelegateAssisstant.Invoke0(this._listener, this._callback);
		}
	}
	//
	public Reset(listener: any, callback: ViDelegate0): void
	{
		this._waitList.Clear(true);
		//
		this._listener = listener;
		this._callback = callback;
	}
	//
	public Clear(): void
	{
		this._waitList.Clear(true);
		this._listener = null;
		this._callback = null;
	}
	//
	private _listener: any;
	private _callback: ViDelegate0;
	private readonly _waitList = new ViStringHashMap<ViDelegate0>();
}