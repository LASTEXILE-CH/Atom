import { ViList } from "./ViSystemType";

export class ViStringBuilder
{
    public constructor(value?: string)
    {
        if (value != undefined && value != null)
        {
            this._length = value.length;
            this._value = value;
            this._elementList.Push(value);
        }
    }
    //
    public get Empty(): boolean { return this._length <= 0; }
    public get NotEmpty(): boolean { return this._length > 0; }
    public get Length(): number { return this._length; }
    public get Value(): string
    {
        if (this._value == null)
        {
            this._value = this._elementList.TrimValues().join("");
        }
        return this._value;
    }
    //
    public Print(split: string): string
    {
        return this._elementList.TrimValues().join(split);
    }
    //
    public SetCapacity(value: number): void
    {
        this._elementList.SetCapacity(value);
    }
    //
    public Append(value: string): ViStringBuilder
    {
        this._length += value.length;
        this._elementList.Push(value);
        this._value = null;
        return this;
    }
    //
    public AppendEx(value: any): ViStringBuilder
    {
        if (value != undefined && value != null)
        {
            return this.Append(value.toString());
        }
        else
        {
            return this;
        }
    }
    //
    public Clear(): void
    {
        this._length = 0;
        this._value = null;
        this._elementList.Clear();
    }
    //
    private _length: number = 0;
    private _value: string = null;
    private _elementList = new ViList<string>();
}