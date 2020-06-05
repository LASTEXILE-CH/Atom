import { ViDictionary } from "../ViSystem/ViSystemType";
import { ViDelegater2 } from "../ViSystem/ViDelegate";

export class ViMultiScale
{
	public readonly UpdatedExec = new ViDelegater2<number, number>();
	//
	public get Value(): number { return this._value; }
	public get DefaultValue(): number { return this._defaultValue; }
	public set DefaultValue(value: number) { this._defaultValue = value; this.OnUpdate(); }
	//
	public Add(name: string, value: number): void
	{
		this._scaleModList.Set(name, value);
		this.OnUpdate();
	}
	//
	public Del(name: string): void
	{
		if (this._scaleModList.Remove(name))
		{
			this.OnUpdate();
		}
	}
	//
	public Update(name: string, value: number): void
	{
		if(this._scaleModList.Contain(name))
		{
			this._scaleModList.Set(name, value);
			this.OnUpdate();
		}
	}
	//
	private OnUpdate(): void
	{
		let oldValue = this._value;
		//
		this._value = this.DefaultValue;
		for (let iter = 0, list = this._scaleModList.Values, count = list.length; iter < count; ++iter)
		{
			let iterValue = list[iter];
			this._value += iterValue;
		}
		//
		if (this._value != oldValue)
		{
			this.UpdatedExec.Invoke(oldValue, this._value);
		}
	}
	//
	private _value = 1.0;
	private _defaultValue = 1.0;
	private readonly _scaleModList = new ViDictionary<string, number>();
}