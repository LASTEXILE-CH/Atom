
export class ViDoubleLinkNode<T>
{
	constructor(data?: T)
	{
		if (data)
		{
			this.Data = data;
		}
		else
		{
			this.Data = null;
		}
	}
	public IsAttach(): boolean
	{
		return (this._pre != null);
	}
	public Detach(): void
	{
		if (this._pre != null)
		{
			let pre = this._pre;
			let next = this._next;
			pre._next = next;
			next._pre = pre;
			this._pre = null;
			this._next = null;
		}
	}
	public DetachEx(emptyData: T): void
	{
		if (this._pre != null)
		{
			let pre = this._pre;
			let next = this._next;
			pre._next = next;
			next._pre = pre;
			this._pre = null;
			this._next = null;
		}
		//
		this.Data = emptyData;
	}
	public Data: T;
	//
	_pre: ViDoubleLinkNode<T>;
	_next: ViDoubleLinkNode<T>;
}

export class ViDoubleLink<T>
{
	constructor()
	{
		this._Init();
	}
	//+-----------------------------------------------------------------------------------------------------------------------------
	public Next(node: ViDoubleLinkNode<T>): ViDoubleLinkNode<T>
	{
		//ViDebuger.AssertError(node != null && node._next != null);
		return node._next;
	}
	public Pre(node: ViDoubleLinkNode<T>): ViDoubleLinkNode<T>
	{
		//ViDebuger.AssertError(node != null && node._pre != null);
		return node._pre;
	}
	//
	public PushAfter(before: ViDoubleLinkNode<T>, node: ViDoubleLinkNode<T>): void
	{
		node.Detach();
		ViDoubleLink._PushAfter(before, node);
	}
	public PushBefore(after: ViDoubleLinkNode<T>, node: ViDoubleLinkNode<T>): void
	{
		node.Detach();
		ViDoubleLink._PushBefore(after, node);
	}
	public PushListAfter(before: ViDoubleLinkNode<T>, list: ViDoubleLink<T>): void
	{
		if (before.IsAttach() == false)
		{
			return;
		}
		if (list.Empty)
		{
			return;
		}
		ViDoubleLink._PushListAfter(before, list);
	}
	public PushListBefore(after: ViDoubleLinkNode<T>, list: ViDoubleLink<T>): void
	{
		if (after.IsAttach() == false)
		{
			return;
		}
		if (list.Empty)
		{
			return;
		}
		ViDoubleLink._PushListBefore(after, list);
	}

	//+-----------------------------------------------------------------------------------------------------------------------------
	public get Empty(): boolean
	{
		let root = this._root;
		return root._next == root;
	}
	public get NotEmpty(): boolean
	{
		let root = this._root;
		return root._next != root;
	}
	public GetCount(): number
	{
		let count = 0;
		let root = this._root;
		let next = root._next;
		while (next != root)
		{
			++count;
			next = next._next;
		}
		return count;
	}
	public Contain(node: ViDoubleLinkNode<T>): boolean
	{
		if (!node.IsAttach())
		{
			return false;
		}
		let root = this._root;
		let next = root._next;
		while (next != root)
		{
			if (next == node)
			{
				return true;
			}
			next = next._next;
		}
		return false;
	}
	public IsEnd(node: ViDoubleLinkNode<T>): boolean
	{
		return node == this._root;
	}
	public GetHead(): ViDoubleLinkNode<T>
	{
		return this._root._next;
	}
	public GetTail(): ViDoubleLinkNode<T>
	{
		return this._root._pre;
	}
	//
	public PushBack(node: ViDoubleLinkNode<T>): void 
	{
		node.Detach();
		ViDoubleLink._PushBefore(this._root, node);
	}
	public PushBackEx(node: ViDoubleLinkNode<T>, data: T): void 
	{
		node.Detach();
		node.Data = data;
		ViDoubleLink._PushBefore(this._root, node);
	}
	public PushFront(node: ViDoubleLinkNode<T>): void 
	{
		node.Detach();
		ViDoubleLink._PushAfter(this._root, node);
	}
	public PushFrontEx(node: ViDoubleLinkNode<T>, data: T): void 
	{
		node.Detach();
		node.Data = data;
		ViDoubleLink._PushAfter(this._root, node);
	}
	public PushListBack(list: ViDoubleLink<T>): void 
	{
		ViDoubleLink._PushListBefore(this._root, list);
	}
	public PushListFront(list: ViDoubleLink<T>): void 
	{
		ViDoubleLink._PushListAfter(this._root, list);
	}
	public SetValue(value: T): void
	{
		let root = this._root;
		let next = root._next;
		while (next != root)
		{
			next.Data = value;
			next = next._next;
		}
	}
	public Clear(): void
	{
		let root = this._root;
		let next = root._next;
		while (next != root)
		{
			let current = next;
			next = next._next;
			current._pre = null;
			current._next = null;
		}
		this._Init();
	}
	public ClearAndClearContent(): void
	{
		let root = this._root;
		let next = root._next;
		while (next != root)
		{
			let current = next;
			next = next._next;
			current._pre = null;
			current._next = null;
			current.Data = null;
		}
		this._Init();
	}
	//+-----------------------------------------------------------------------------------------------------------------------------
	private static _PushAfter(before: ViDoubleLinkNode<any>, node: ViDoubleLinkNode<any>): void
	{
		let next = before._next;
		//ViDebuger.AssertError(next != null);
		let _Link = ViDoubleLink._Link;
		_Link(before, node);
		_Link(node, next);
	}
	private static _PushBefore(after: ViDoubleLinkNode<any>, node: ViDoubleLinkNode<any>): void
	{
		let pre = after._pre;
		//ViDebuger.AssertError(pre != null);
		let _Link = ViDoubleLink._Link;
		_Link(pre, node);
		_Link(node, after);
	}
	private static _PushListAfter(before: ViDoubleLinkNode<any>, list: ViDoubleLink<any>): void
	{
		if (list.Empty)
		{
			return;
		}
		let first = list._root._next;
		let back = list._root._pre;
		let next = before._next;
		let _Link = ViDoubleLink._Link;
		_Link(before, first);
		_Link(back, next);
		list._Init();
	}
	private static _PushListBefore(after: ViDoubleLinkNode<any>, list: ViDoubleLink<any>): void
	{
		if (list.Empty)
		{
			return;
		}
		let first = list._root._next;
		let back = list._root._pre;
		let pre = after._pre;
		let _Link = ViDoubleLink._Link;
		_Link(pre, first);
		_Link(back, after);
		list._Init();
	}
	private static _Link(pre: ViDoubleLinkNode<any>, next: ViDoubleLinkNode<any>): void
	{
		pre._next = next;
		next._pre = pre;
	}
	private _Init(): void
	{
		ViDoubleLink._Link(this._root, this._root);
	}
	//+-----------------------------------------------------------------------------------------------------------------------------
	private readonly _root = new ViDoubleLinkNode<T>();
}

class Demo_ViDoubleLink
{
	public static Test(): void
	{
		let list = new ViDoubleLink<number>();
		let node1 = new ViDoubleLinkNode<number>();
		node1.Data = 1;
		let node2 = new ViDoubleLinkNode<number>(3);
		list.PushBack(node1);
		list.PushBack(node2);
		//
		let ExecList = new ViDoubleLink<number>();
		while (list.NotEmpty)
		{
			let iterNode = list.GetHead();
			ExecList.PushBack(iterNode);
			//
			//let value = iterNode.Data;
		}
		list.PushListBack(ExecList);
		//
		for (let iter = list.GetHead(); !list.IsEnd(iter);)
		{
			//let value = iter.Data;
			iter = list.Next(iter);
			//
		}
		//
		for (let iter = list.GetHead(); !list.IsEnd(iter); iter = list.Next(iter))
		{
			//let value = iter.Data;
		}
		//
		for (let iter = list.GetTail(); !list.IsEnd(iter);)
		{
			//let value = iter.Data;
			iter = list.Pre(iter);
			//
		}
		//
		for (let iter = list.GetTail(); !list.IsEnd(iter); iter = list.Pre(iter))
		{
			//let value = iter.Data;
			//
		}
	}
}