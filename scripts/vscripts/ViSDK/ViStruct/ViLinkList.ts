import { ViMemoryAllocator, ViList } from "../ViSystem/ViSystemType";
import { ViStringBuilder } from "../ViSystem/ViStringBuilder";
import { ViDelegateRT2 } from "../ViSystem/ViDelegate";
import { ViDoubleLinkNode, ViDoubleLink } from "./ViDoubleLink";

export class ViLinkList<T>
{
	public static ClearCache(): void
	{
		ViLinkList.NodeAllocator.Clear(null);
	}
	//
	private static readonly NodeAllocator = new ViMemoryAllocator<ViDoubleLinkNode<any>>(ViDoubleLinkNode, "ViDoubleLinkNode", "LinkList");
	//
	public get Count(): number { return this._count; }
	public get Empty(): boolean { return this._count <= 0; }
	public get NotEmpty(): boolean { return this._count > 0; }
	public GetHead(): ViDoubleLinkNode<T> { return this._list.GetHead(); }
	public IsEnd(node: ViDoubleLinkNode<T>): boolean { return this._list.IsEnd(node); }
	public Next(node: ViDoubleLinkNode<T>): ViDoubleLinkNode<T> { return this._list.Next(node); }
	//
	public GetHeadData(): T | undefined
	{
		if (this._list.NotEmpty)
		{
			return this._list.GetHead().Data;
		}
		else
		{
			return undefined;
		}
	}
	//
	public GetTailData(): T | undefined
	{
		if (this._list.NotEmpty)
		{
			return this._list.GetTail().Data;
		}
		else
		{
			return undefined;
		}
	}
	//
	public Contain(value: T): boolean
	{
		let _list = this._list;
		for (let iter = _list.GetHead(); !_list.IsEnd(iter); iter = _list.Next(iter))
		{
			let iterValue = iter.Data;
			if (iterValue == value)
			{
				return true;
			}
		}
		//
		return false;
	}
	//
	public PushBack(value: T): void
	{
		let node = ViLinkList.NodeAllocator.Alloc();
		node.Data = value;
		this._list.PushBack(node);
		++this._count;
	}
	//
	public PushFront(value: T): void
	{
		let node = ViLinkList.NodeAllocator.Alloc();
		node.Data = value;
		this._list.PushFront(node);
		++this._count;
	}
	//
	public PushAfter(where: ViDoubleLinkNode<T>, value: T): void
	{
		let node = ViLinkList.NodeAllocator.Alloc();
		node.Data = value;
		this._list.PushAfter(where, node);
		++this._count;
	}
	//
	public PushBefore(where: ViDoubleLinkNode<T>, value: T): void
	{
		let node = ViLinkList.NodeAllocator.Alloc();
		node.Data = value;
		this._list.PushBefore(where, node);
		++this._count;
	}
	//
	public PopFront(): T | undefined
	{
		if (this._list.NotEmpty)
		{
			--this._count;
			let node = this._list.GetHead();
			let value = node.Data;
			node.DetachEx(null);
			ViLinkList.NodeAllocator.Free(node);
			return value;
		}
		else
		{
			return undefined;
		}
	}
	//
	public PopBack(): T | undefined
	{
		if (this._list.NotEmpty)
		{
			--this._count;
			let node = this._list.GetTail();
			let value = node.Data;
			node.DetachEx(null);
			ViLinkList.NodeAllocator.Free(node);
			return value;
		}
		else
		{
			return undefined;
		}
	}
	//
	public EraseValue(value: T, first: boolean): void
	{
		let _list = this._list;
		for (let iter = _list.GetHead(); !_list.IsEnd(iter);)
		{
			let iterValue = iter.Data;
			if (iterValue == value)
			{
				let iterNode = iter;
				iter = _list.Next(iter);
				iterNode.DetachEx(null);
				ViLinkList.NodeAllocator.Free(iterNode);
				if (first)
				{
					break;
				}
			}
			else
			{
				iter = _list.Next(iter);
			}
		}
	}
	//
	public EraseList(list: ViList<ViDoubleLinkNode<T>>): void
	{
		let NodeAllocator = ViLinkList.NodeAllocator;
		for (let iter = 0, count = list.Count; iter < count; ++iter)
		{
			let iterNode = list.Get(iter);
			iterNode.DetachEx(null);
			NodeAllocator.Free(iterNode);
		}
		list.Clear();
		//
		this._count = this._list.GetCount();
	}
	//
	public Clear(): void
	{
		let _list = this._list;
		let NodeAllocator = ViLinkList.NodeAllocator;
		while (_list.NotEmpty)
		{
			let iterNode = _list.GetHead();
			iterNode.DetachEx(null);
			NodeAllocator.Free(iterNode);
		}
		//
		this._count = 0;
	}
	//
	public CopyTo(list: ViList<T>): void
	{
		let _list = this._list;
		for (let iter = _list.GetHead(); !_list.IsEnd(iter); iter = _list.Next(iter))
		{
			list.Push(iter.Data);
		}
	}
	//
	public Print(str: ViStringBuilder, split: string): void
	{
		str.Append("Count:").AppendEx(this._count);
		let _list = this._list;
		for (let iter = _list.GetHead(); !_list.IsEnd(iter); iter = _list.Next(iter))
		{
			str.Append(split).AppendEx(iter.Data);
		}
	}
	//
	private _count: number = 0;
	private readonly _list = new ViDoubleLink<T>();
}

export class ViLinkListEx<T>
{
	public static ClearCache(): void
	{
		ViLinkListEx.NodeAllocator.Clear(null);
	}
	//
	private static readonly NodeAllocator = new ViMemoryAllocator<ViDoubleLinkNode<any>>(ViDoubleLinkNode, "ViDoubleLinkNode", "LinkListEx");
	//
	public get Count(): number { return this._count; }
	public IsEmpty(): boolean { return this._count <= 0; }
	public IsNotEmpty(): boolean { return this._count > 0; }
	public GetHead(): ViDoubleLinkNode<T> { return this._list.GetHead(); }
	public IsEnd(node: ViDoubleLinkNode<T>): boolean { return this._list.IsEnd(node); }
	public Next(node: ViDoubleLinkNode<T>): ViDoubleLinkNode<T> { return this._list.Next(node); }
	//
	public GetHeadData(): T
	{
		if (this._list.NotEmpty)
		{
			return this._list.GetHead().Data;
		}
		else
		{
			return null;
		}
	}
	//
	public GetTailData(): T
	{
		if (this._list.NotEmpty)
		{
			return this._list.GetTail().Data;
		}
		else
		{
			return null;
		}
	}
	//
	public Contain(value: T, equals: ViDelegateRT2<boolean, T, T>): boolean
	{
		let _list = this._list;
		for (let iter = _list.GetHead(); !_list.IsEnd(iter); iter = _list.Next(iter))
		{
			let iterValue = iter.Data;
			if (equals(value, iterValue))
			{
				return true;
			}
		}
		//
		return false;
	}
	//
	public PushBack(value: T, allocator: ViMemoryAllocator<T>, copyValue: ViDelegateRT2<void, T, T>): void
	{
		let node = ViLinkListEx.NodeAllocator.Alloc();
		let newValue = allocator.Alloc();
		copyValue(value, newValue);
		node.Data = newValue;
		this._list.PushBack(node);
		++this._count;
	}
	//
	public PushFront(value: T, allocator: ViMemoryAllocator<T>, copyValue: ViDelegateRT2<void, T, T>): void
	{
		let node = ViLinkListEx.NodeAllocator.Alloc();
		let newValue = allocator.Alloc();
		copyValue(value, newValue);
		node.Data = newValue;
		this._list.PushFront(node);
		++this._count;
	}
	//
	public PushAfter(where: ViDoubleLinkNode<T>, value: T, allocator: ViMemoryAllocator<T>, copyValue: ViDelegateRT2<void, T, T>): void
	{
		let node = ViLinkListEx.NodeAllocator.Alloc();
		let newValue = allocator.Alloc();
		copyValue(value, newValue);
		node.Data = newValue;
		this._list.PushAfter(where, node);
		++this._count;
	}
	//
	public PushBefore(where: ViDoubleLinkNode<T>, value: T, allocator: ViMemoryAllocator<T>, copyValue: ViDelegateRT2<void, T, T>): void
	{
		let node = ViLinkListEx.NodeAllocator.Alloc();
		let newValue = allocator.Alloc();
		copyValue(value, newValue);
		node.Data = newValue;
		this._list.PushBefore(where, node);
		++this._count;
	}
	//
	public PopFront(allocator: ViMemoryAllocator<T>): boolean
	{
		if (this._list.NotEmpty)
		{
			--this._count;
			let node = this._list.GetHead();
			let value = node.Data;
			node.DetachEx(null);
			ViLinkListEx.NodeAllocator.Free(node);
			allocator.Free(value);
			return true;
		}
		else
		{
			return false;
		}
	}
	//
	public PopBack(allocator: ViMemoryAllocator<T>): boolean
	{
		if (this._list.NotEmpty)
		{
			--this._count;
			let node = this._list.GetTail();
			let value = node.Data;
			node.DetachEx(null);
			ViLinkListEx.NodeAllocator.Free(node);
			allocator.Free(value);
			return true;
		}
		else
		{
			return false;
		}
	}
	//
	public EraseValue(value: T, allocator: ViMemoryAllocator<T>, equals: ViDelegateRT2<boolean, T, T>, first: boolean): void
	{
		let _list = this._list;
		for (let iter = _list.GetHead(); !_list.IsEnd(iter);)
		{
			let iterValue = iter.Data;
			if (equals(value, iterValue))
			{
				let iterNode = iter;
				iter = _list.Next(iter);
				let iterValue = iterNode.Data;
				iterNode.DetachEx(null);
				ViLinkListEx.NodeAllocator.Free(iterNode);
				allocator.Free(iterValue);
				if (first)
				{
					break;
				}
			}
			else
			{
				iter = _list.Next(iter);
			}
		}
	}
	//
	public EraseList(list: ViList<ViDoubleLinkNode<T>>, allocator: ViMemoryAllocator<T>): void
	{
		let NodeAllocator = ViLinkListEx.NodeAllocator;
		for (let iter = 0, count = list.Count; iter < count; ++iter)
		{
			let iterNode = list.Get(iter);
			let iterValue = iterNode.Data;
			iterNode.DetachEx(null);
			NodeAllocator.Free(iterNode);
			allocator.Free(iterValue);
		}
		list.Clear();
		//
		this._count = this._list.GetCount();
	}
	//
	public Clear(allocator: ViMemoryAllocator<T>): void
	{
		let _list = this._list;
		let NodeAllocator = ViLinkListEx.NodeAllocator;
		while (_list.NotEmpty)
		{
			let iterNode = _list.GetHead();
			let iterValue = iterNode.Data;
			iterNode.DetachEx(null);
			NodeAllocator.Free(iterNode);
			allocator.Free(iterValue);
		}
		//
		this._count = 0;
	}
	//
	public CopyTo(list: ViList<T>): void
	{
		let _list = this._list;
		for (let iter = _list.GetHead(); !_list.IsEnd(iter); iter = _list.Next(iter))
		{
			list.Push(iter.Data);
		}
	}
	//
	public Print(str: ViStringBuilder, split: string): void
	{
		str.Append("Count:").AppendEx(this._count);
		let _list = this._list;
		for (let iter = _list.GetHead(); !_list.IsEnd(iter); iter = _list.Next(iter))
		{
			str.Append(split).AppendEx(iter.Data);
		}
	}
	//
	private _count: number = 0;
	private readonly _list = new ViDoubleLink<T>();
}

class Demo_LinkList
{
	public static Test(): void
	{
		let list = new ViLinkList<string>();
		for (let iter = list.GetHead(); !list.IsEnd(iter); iter = list.Next(iter))
		{
			let iterValue = iter.Data;
			if (iterValue)
			{

			}
		}
	}
}