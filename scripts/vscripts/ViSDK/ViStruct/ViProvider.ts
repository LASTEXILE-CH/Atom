export interface ViProvider<T>
{
    Value(): T;
}

export class ViSimpleProvider<T> implements ViProvider<T>
{
    public constructor(value: T)
    {
        this._value = value;
    }
    public Value(): T
    {
        return this._value;
    }
    public SetValue(value: T)
    {
        this._value = value;
    }
    //
    private _value: T;
}

export class ViPtrProvider<T>
{
    public get Value(): T { return this._value; }
    public constructor(value?: T)
    {
        if (value != undefined)
        {
            this.Set(value);
        }
    }
    public Clear(): void
    {
        this._value = null;
    }
    public Set(obj: T): void
    {
        this._value = obj;
    }
    private _value: T = null;
}

export class ViPtrProviderAssisstant
{
    public static Value<T>(ptr: ViPtrProvider<T>): T
    {
        if (ptr == null)
        {
            return null;
        }
        else
        {
            return ptr.Value
        }
    }
}
