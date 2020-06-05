import { NumberUI64 } from "./ViNumber64";
import { ViIStream } from "./ViIStream";

export class ViMask
{
	public static HasAny(value: number, mask: number): boolean
	{
		return ((value & mask) != 0);
	}
	public static HasAll(value: number, mask: number): boolean
	{
		return ((value & mask) == mask);
	}
	public static Add(value: number, mask: number): number
	{
		return value |= mask;
	}
	public static Del(value: number, mask: number): number
	{
		return value & ~mask;
	}
	public static Value(value: number, mask: number): number
	{
		return (value & mask);
	}
	public static Enter(oldValue: number, newValue: number, mask: number): boolean
	{
		return ((oldValue & mask) == 0) && ((newValue & mask) != 0);//(ViMask.HasAny(oldValue, mask) == false) && (ViMask.HasAny(newValue, mask) == true);
	}
	public static Exit(oldValue: number, newValue: number, mask: number): boolean
	{
		return ((oldValue & mask) != 0) && ((newValue & mask) == 0);//(ViMask.HasAny(oldValue, mask) == true) && (ViMask.HasAny(newValue, mask) == false);
	}
	public static Mask(value: number): number
	{
		return 1 << value;
	}
}

export class ViMask32<T>
{
	public get Value(): number { return this._value; }
	public Set(value: number): void
	{
		this._value = value;
	}
	public HasAny(mask: number): boolean
	{
		return (this._value & mask) != 0;
	}
	public HasAll(mask: number): boolean
	{
		return (this._value & mask) != mask;
	}
	public Add(mask: number)
	{
		this._value = (this._value |= mask);
	}
	public Del(mask: number)
	{
		this._value = (this._value & ~mask);
	}
	public toString(): string
	{
		return this._value.toString();
	}
	public ReadFrom(stream: ViIStream): void
	{
		this._value = stream.ReadUInt32();
	}
	//
	private _value = 0;
}

export class ViMaskDynamic32
{
	public get Value(): number { return this._value; }
	public Set(value: number): void
	{
		this._value = value;
	}
	public HasAny(mask: number): boolean
	{
		return (this._value & mask) != 0;
	}
	public HasAll(mask: number): boolean
	{
		return (this._value & mask) != mask;
	}
	public Add(mask: number)
	{
		this._value = (this._value |= mask);
	}
	public Del(mask: number)
	{
		this._value = (this._value & ~mask);
	}
	public toString(): string
	{
		return this._value.toString();
	}
	public ReadFrom(stream: ViIStream): void
	{
		this._value = stream.ReadUInt32();
	}
	//
	private _value = 0;
}

export class ViMask64<T>
{
	public ReadFrom(stream: ViIStream): void
	{
		stream.ReadUInt64(this._value);
	}
	//
	private readonly _value = new NumberUI64(0, 0);
}

export class ViMaskDynamic64
{
	public ReadFrom(stream: ViIStream): void
	{
		stream.ReadUInt64(this._value);
	}
	//
	private readonly _value = new NumberUI64(0, 0);
}