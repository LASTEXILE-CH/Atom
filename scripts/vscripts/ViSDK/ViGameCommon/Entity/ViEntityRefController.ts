import { ViString, ViList } from "../../ViSystem/ViSystemType";
import { ViDoubleLink, ViDoubleLinkNode } from "../../ViStruct/ViDoubleLink";
import { ViStringHashMapEx } from "../../ViStruct/ViHashMapEx";
import { ViEntity } from "./ViEntity";

export class ViEntityRefController
{
	public IsAttach(name: ViString): boolean
	{
		return this._list.Contain(name);
	}
	//
	public Attach<TEntity extends ViEntity>(name: ViString, list: ViDoubleLink<TEntity>): void
	{
		if (this._entity == null)
		{
			return;
		}
		if (this._list.Contain(name))
		{
			return;
		}
		let node = new ViDoubleLinkNode<TEntity>(this._entity as TEntity);
		list.PushBack(node);
		this._list.Add(name, node);
	}
	//
	public Detach(name: ViString): void
	{
		let node = this._list.Del(name);
		if (node != null)
		{
			node.DetachEx(null);
		}
	}
	//
	private static readonly CACHE_DetachAll_List = new ViList<ViDoubleLinkNode<any>>();
	public DetachAll(): void
	{
		if(this._list.Empty)
		{
			return;
		}
		//
		let list = ViEntityRefController.CACHE_DetachAll_List;
		this._list.CopyTo(list);
		this._list.Clear(true);
		for (let iter = 0, count = list.Count; iter < count; ++iter)
		{
			let iterNode = list.Get(iter);
			iterNode.DetachEx(null);
		}
		list.Clear();
	}
	//
	public Active(entity: ViEntity): void
	{
		this._entity = entity;
	}
	//
	public Deactive(): void
	{
		this._entity = null;
		this.DetachAll();
	}
	//
	private _entity: ViEntity = null;
	private readonly _list = new ViStringHashMapEx<ViDoubleLinkNode<any>>();
}