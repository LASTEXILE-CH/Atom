import { ViDoubleLink, ViDoubleLinkNode } from "../../ViStruct/ViDoubleLink";

export class ViExpressInterface
{
	private static readonly CACHE_UpdateAll_ExecList = new ViDoubleLink<ViExpressInterface>();
	public static UpdateAll(deltaTime: number): void
	{
		let _updateExpressList = ViExpressInterface._updateExpressList;
		if (_updateExpressList.Empty)
		{
			return;
		}
		//
		let CACHE_UpdateAll_ExecList = ViExpressInterface.CACHE_UpdateAll_ExecList;
		while (_updateExpressList.NotEmpty)
		{
			let iterNode = _updateExpressList.GetHead();
			CACHE_UpdateAll_ExecList.PushBack(iterNode);
			//
			iterNode.Data.Update(deltaTime);
		}
		_updateExpressList.PushListBack(CACHE_UpdateAll_ExecList);
	}
	//
	public static ClearAll(): void
	{
		let _updateExpressList = ViExpressInterface._updateExpressList;
		while (_updateExpressList.NotEmpty)
		{
			let iterNode = _updateExpressList.GetHead();
			//
			iterNode.Data.End();
		}
		//
		let _noUpdateExpressList = ViExpressInterface._noUpdateExpressList;
		while (_noUpdateExpressList.NotEmpty)
		{
			let iterNode = _noUpdateExpressList.GetHead();
			//
			iterNode.Data.End();
		}
	}
	//
	private static readonly _updateExpressList = new ViDoubleLink<ViExpressInterface>();
	private static readonly _noUpdateExpressList = new ViDoubleLink<ViExpressInterface>();
	//
	public get Active(): boolean { return this._active; }
	//
	public constructor()
	{
		ViExpressInterface._noUpdateExpressList.PushBackEx(this._updateAttachNode, this);
	}
	//
	public Update(deltaTime: number): void
	{

	}
	//
	public End(): void
	{
		this._updateAttachNode.DetachEx(null);
		this._ownAttachNode.DetachEx(null);
	}
	//
	public OnVisibleUpdate(value: boolean): void
	{
		this._active = value;
	}
	//
	public AttachUpdate(): void
	{
		ViExpressInterface._updateExpressList.PushBackEx(this._updateAttachNode, this);
	}
	public OwnedTo(list: ViDoubleLink<ViExpressInterface>): void
	{
		list.PushBackEx(this._ownAttachNode, this);
	}
	//
	private _active: boolean = true;
	private readonly _updateAttachNode = new ViDoubleLinkNode<ViExpressInterface>();
	private readonly _ownAttachNode = new ViDoubleLinkNode<ViExpressInterface>();
}

export class ViExpressOwnList
{
	public End(): void
	{
		let _expressList = this._expressList;
		while (_expressList.NotEmpty)
		{
			let iterNode = _expressList.GetHead();
			iterNode.Data.End();
		}
	}
	//
	public Add(express: ViExpressInterface): void
	{
		express.OwnedTo(this._expressList);
	}
	//
	public OnVisibleUpdate(value: boolean): void
	{
		for (let list = this._expressList, iter = list.GetHead(); !list.IsEnd(iter); iter = list.Next(iter))
		{
			let iterExpress = iter.Data;
			iterExpress.OnVisibleUpdate(value);
		}
	}
	//
	private readonly _expressList = new ViDoubleLink<ViExpressInterface>();
}

// public class ViDurationExpressController<TExpress>
// 	where TExpress : ViExpressInterface, new()
// {
// 	public TExpress Express { get { return _express; } }
// 	public void SetDuration(float duration)
// 	{
// 		ViTimerInstance.SetTime(_endTimeNode, duration, this.OnEndTime);
// 	}
// 	public void End()
// 	{
// 		_express.End();
// 		_endTimeNode.Detach();
// 	}
// 	//
// 	void OnEndTime(ViTimeNodeInterface node)
// 	{
// 		End();
// 	}
// 	ViTimeNode1 _endTimeNode = new ViTimeNode1();
// 	//
// 	TExpress _express = new TExpress();
// }