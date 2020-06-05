import { ViConst } from "../ViSystem/ViSystemConfig";
import { ViList } from "../ViSystem/ViSystemType";
import { ViDelegater2 } from "../ViSystem/ViDelegate";

export class ViPriorityValueNode<T>
{
	public Name: string;
	public Weight: number;
	public Value: T;
}

export class ViPriorityValue<T>
{
	public readonly UpdatedExec = new ViDelegater2<T, T>();
	//
	public constructor(defaultValue: T)
	{
		this._defaultValue = defaultValue;
		this._value = defaultValue;
		this._weight = ViConst.MIN_INT32;
	}
	//
	public get Value(): T { return this._value; }
	public get DefaultValue(): T { return this._defaultValue; }
	public set DefaultValue(value: T)
	{
		if (this._defaultValue != value)
		{
			this._defaultValue = value;
			this.Update();
		}
	}
	public get Count(): number { return this._list.Count; }
	public get Weight(): number { return this._weight; }
	//
	public Clear(clearUpdatedExec: boolean): void
	{
		if (clearUpdatedExec)
		{
			this.UpdatedExec.Clear();
		}
		//
		this._list.Clear();
		this._value = this.DefaultValue;
		this._weight = ViConst.MIN_INT32;
	}
	//
	public Add(name: string, weight: number, value: T): boolean
	{
		let oldValue = this._value;
		for (let iter = 0, list = this._list.Values, count = this._list.Count; iter < count; ++iter)
		{
			let iterNode = list[iter];
			if (iterNode.Name == name)
			{
				if (iterNode.Value != value || iterNode.Weight != weight)
				{
					iterNode.Weight = weight;
					iterNode.Value = value;
					this.Update();
					return oldValue != this._value;
				}
				else
				{
					return false;
				}
			}
		}
		//
		let node = new ViPriorityValueNode<T>();
		node.Name = name;
		node.Weight = weight;
		node.Value = value;
		this._list.Push(node);
		//
		this.Update();
		//
		return oldValue != this._value;
	}
	//
	public Del(name: string): boolean
	{
		for (let iter = 0, list = this._list.Values, count = this._list.Count; iter < count; ++iter)
		{
			let iterNode = list[iter];
			if (iterNode.Name == name)
			{
				let oldValue = this._value;
				//
				this._list.Remove(iter);
				this.Update();
				//
				return oldValue != this._value;
			}
		}
		return false;
	}
	//
	public DelAll(): void
	{
		this._list.Clear();
		this.Update();
	}
	//
	public Has(name: string): boolean
	{
		for (let iter = 0, list = this._list.Values, count = this._list.Count; iter < count; ++iter)
		{
			let iterNode = list[iter];
			if (iterNode.Name == name)
			{
				return true;
			}
		}
		return false;
	}
	//
	public UpdateWeight(name: string, weight: number): boolean
	{
		for (let iter = 0, list = this._list.Values, count = this._list.Count; iter < count; ++iter)
		{
			let iterNode = list[iter];
			if (iterNode.Name == name)
			{
				iterNode.Weight = weight;
				this.Update();
				return true;
			}
		}
		return false;
	}
	//
	private Update(): void
	{
		let oldValue = this._value;
		this._value = this._defaultValue;
		this._weight = ViConst.MIN_INT32;
		for (let iter = 0, list = this._list.Values, count = this._list.Count; iter < count; ++iter)
		{
			let iterNode = list[iter];
			if (iterNode.Weight > this._weight)
			{
				this._value = iterNode.Value;
				this._weight = iterNode.Weight;
			}
		}
		//
		if (!(oldValue == this._value))
		{
			this.UpdatedExec.Invoke(oldValue, this._value);
		}
	}
	//
	public UpdateNotify(): void
	{
		this.UpdatedExec.Invoke(this._value, this._value);
	}
	//
	private _value: T;
	private _weight: number;
	private _defaultValue: T;
	private readonly _list = new ViList<ViPriorityValueNode<T>>();
}
