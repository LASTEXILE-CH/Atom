import { ViSerialiable } from "../ViSystem/ViSystemType";

export class ViActiveValue<T>
{
	public get Active(): boolean { return this._active; }
	//
	public constructor(value?: T)
	{
		if (value != undefined)
		{
			this._value = value;
			this._active = true;
		}
	}
	//
	public Set(value: T): void
	{
		this._value = value;
		this._active = true;
	}
	//
	public Clear(): void
	{
		this._active = false;
	}
	//
	public GetValue(): T | undefined
	{
		if (this._active)
		{
			return this._value;
		}
		else
		{
			return undefined;
		}
	}
	//
	public Value(defautValue: T): T 
	{
		if (this._active)
		{
			return this._value;
		}
		else
		{
			return defautValue;
		}
	}
	//
	private _active: boolean = false;
	private _value: T;
}

export class ViActiveValueEx<T extends ViSerialiable>
{
	public get Active(): boolean { return this._active; }
	public get Value(): T { return this._value; }
	//
	public constructor(alloc: { new(): T; })
	{
		this._value = new alloc();
		this._active = false;
	}
	//
	public Set(value: T): void
	{
		this._value.CopyFrom(value);
		this._active = true;
	}
	//
	public Clear(): void
	{
		this._active = false;
	}
	//
	public ValueEx(defautValue: T): T 
	{
		if (this._active)
		{
			return this._value;
		}
		else
		{
			return defautValue;
		}
	}
	//
	private _active: boolean = false;
	private readonly _value: T;
}