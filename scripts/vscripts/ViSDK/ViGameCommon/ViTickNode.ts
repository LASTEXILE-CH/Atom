import { ViDoubleLink, ViDoubleLinkNode } from "../ViStruct/ViDoubleLink";
import { ViDelegate1, ViDelegater1 } from "../ViSystem/ViDelegate";
import { ViTimeNodeInterface } from "./Time/ViTimer";

export class ViTickNode
{
	private static readonly CACHE_Update_ExecList = new ViDoubleLink<ViTickNode>();
	public static Update(deltaTime: number): void
	{
		let _list = ViTickNode._list;
		if (_list.Empty)
		{
			return;
		}
		//
		let CACHE_Update_ExecList = ViTickNode.CACHE_Update_ExecList;
		while (_list.NotEmpty)
		{
			let iterNode = _list.GetHead();
			CACHE_Update_ExecList.PushBack(iterNode);
			let iterCallback = iterNode.Data;
			iterCallback.Invoke(deltaTime);
		}
		//
		_list.PushListBack(CACHE_Update_ExecList);
	}
	//
	public static Clear(): void
	{
		ViTickNode.CACHE_Update_ExecList.Clear();
		ViTickNode._list.Clear();
	}
	//
	private static readonly _list = new ViDoubleLink<ViTickNode>();
	//
	//+-------------------------------------------------------------------------------------------------------------------------------------------------------------
	public Attach(listener: any, func: ViDelegate1<number>): void
	{
		this._callback.Set(listener, func);
		ViTickNode._list.PushBackEx(this._node, this);
	}
	//
	public Detach(): void
	{
		this._callback.Clear();
		this._node.DetachEx(null);
	}
	//
	public IsAttach(): boolean
	{
		return this._node.IsAttach();
	}
	//
	public Invoke(deltaTime: number)
	{
		this._callback.Invoke(deltaTime);
	}
	//
	private readonly _node = new ViDoubleLinkNode<ViTickNode>();
	private readonly _callback = new ViDelegater1();
}