import { ViSerialiable } from "../../ViSystem/ViSystemType";
import { ViStringBuilder } from "../../ViSystem/ViStringBuilder";
import { ViStringIStream } from "../../ViSystem/ViStringIStream";
import { ViSealedDB, ViSealedData } from "./ViSealedData";
import { ViOStream } from "../../ViSystem/ViOStream";
import { ViIStream } from "../../ViSystem/ViIStream";

export class ViForeignKey<TSealedData extends ViSealedData> implements ViSerialiable
{
	constructor(value?: number)
	{
		if (value != undefined)
		{
			this._value = value;
		}
	}
	//
	public get Value(): number
	{
		return this._value;
	}
	public get Empty(): boolean
	{
		return this._value == 0;
	}
	public get NotEmpty(): boolean
	{
		return this._value != 0;
	}
	//
	public Print(stream: ViStringBuilder): void
	{
		stream.Append(this._value.toString());
	}
	public PrintTo(stream: ViOStream): void
	{
		stream.AppendUInt32(this._value);
	}
	public ReadFrom(stream: ViIStream): void
	{
		this._value = stream.ReadUInt32();
		this._dData = null;
		this._pData = null;
	}
	public ReadFromString(stream: ViStringIStream): void
	{
		this._value = stream.ReadUInt32();
		this._dData = null;
		this._pData = null;
	}
	public CopyFrom(other: ViForeignKey<TSealedData>): void
	{
		this._value = other._value;
		this._dData = other._dData;
		this._pData = other._pData;
	}
	//
	public Data(table: ViSealedDB<TSealedData>): TSealedData
	{
		if (this._dData == null)
		{
			this._dData = table.Data(this._value);
		}
		return this._dData;
	}
	public GetData(table: ViSealedDB<TSealedData>, includeZero: boolean): TSealedData
	{
		if (this._pData == null)
		{
			if (includeZero || this._value != 0)
			{
				this._pData = table.GetData(this._value, includeZero);
			}
		}
		return this._pData;
	}
	public GetOffsetData(table: ViSealedDB<TSealedData>, offset: number): TSealedData
	{
		if (this._value != 0)
		{
			return table.GetData(this._value + offset, false);
		}
		else
		{
			return null;
		}
	}
	//
	public Set(value: number): void
	{
		this._value = value;
		this._dData = null;
		this._pData = null;
	}
	//
	private _value = 0;
	private _dData: TSealedData = null;
	private _pData: TSealedData = null;
}
