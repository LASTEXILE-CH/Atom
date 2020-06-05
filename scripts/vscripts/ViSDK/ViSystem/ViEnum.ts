import { ViIStream } from "./ViIStream";

export class ViEnum32<T>
{
	public get Value(): T { return this._value as any; }
	public Set(value: T): void
	{
		this._value = value as any;
	}
	public Equals(value: T): boolean
	{
		return this._value == (value as any as number);
	}
    public toString(): string
    {
        return this._value.toString();
    }
    public ReadFrom(stream: ViIStream): void
    {
        this._value = stream.ReadUInt32();
    }
	private _value: number = 0;
}

export class ViEnumDynamic32
{
	public get Value(): number { return this._value; }
	public Set(value: number): void
	{
		this._value = value;
	}
    public toString(): string
    {
        return this._value.toString();
    }
    public ReadFrom(stream: ViIStream): void
    {
        this._value = stream.ReadUInt32();
    }
	private _value: number = 0;
}

export enum BoolValue
{
	FALSE,
	TRUE,
}
