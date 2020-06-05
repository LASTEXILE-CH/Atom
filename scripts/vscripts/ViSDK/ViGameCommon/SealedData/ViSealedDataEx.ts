import { ViSealedData, ViSealedDB } from "./ViSealedData";
import { ViForeignKey } from "./ViForeignKey";
import { ViIStream } from "../../ViSystem/ViIStream";

export interface ViFixArrayElement
{
	ReadFrom(stream: ViIStream): void;
}

export class ViFixArrayStruct<TStruct extends ViFixArrayElement>
{
	public constructor(size: number, alloc: { new(): TStruct; })
	{
		let array = new Array<TStruct>(size);
		for (let iter = 0; iter < size; ++iter)
		{
			array[iter] = new alloc();
		}
		this._array = array;
	}
	//
	public ReadFrom(stream: ViIStream): void
	{
		for (let iter = 0, array = this._array, count = this._array.length; iter < count; ++iter)
		{
			array[iter].ReadFrom(stream);
		}
	}
	//
	public get Size(): number
	{
		return this._array.length;
	}
	//
	public Get(index: number): TStruct | undefined
	{
		let array = this._array;
		if (index < array.length)
		{
			return array[index];
		}
		else
		{
			return undefined;
		}
	}
	//
	private readonly _array: Array<TStruct> = null;
}

export class ViFixArrayElementInt32 implements ViFixArrayElement
{
	public get Value(): number { return this._value; }
	//
	public ReadFrom(stream: ViIStream): void
	{
		this._value = stream.ReadInt32();
	}
	//
	private _value = 0;
}

export class ViFixArrayElementString implements ViFixArrayElement
{
	public get Value(): string { return this._value; }
	//
	public ReadFrom(stream: ViIStream): void
	{
		this._value = stream.ReadString();
	}
	//
	private _value = "";
}

export class ViMiscInt32 implements ViFixArrayElement
{
	public static Value(array: ViFixArrayStruct<ViMiscInt32>, name: string, defaultValue: number): number
	{
		for (let iter = 0, count = array.Size; iter < count; ++iter)
		{
			let iterValue = array.Get(iter);
			if (iterValue._name == name)
			{
				return iterValue._value;
			}
		}
		return defaultValue;
	}
	//
	public ReadFrom(stream: ViIStream): void
	{
		this._name = stream.ReadString();
		this._value = stream.ReadInt32();
	}
	//
	private _name = "";
	private _value = 0;
}

export class ViMiscString implements ViFixArrayElement
{
	public static Value(array: ViFixArrayStruct<ViMiscString>, name: string, defaultValue: string): string
	{
		for (let iter = 0, count = array.Size; iter < count; ++iter)
		{
			let iterValue = array.Get(iter);
			if (iterValue._name == name)
			{
				return iterValue._value;
			}
		}
		return defaultValue;
	}
	//
	public ReadFrom(stream: ViIStream): void
	{
		this._name = stream.ReadString();
		this._value = stream.ReadString();
	}
	//
	private _name = "";
	private _value = "";
}

export class ViForeignValueStruct<TSealedData extends ViSealedData> implements ViFixArrayElement
{
	public get Key(): number { return this._key; }
	public get Value(): number { return this._value; }
	public get Empty(): boolean { return this._key != 0 && this._value != 0; }
	public get NotEmpty(): boolean { return this._key != 0 && this._value != 0; }
	//
	public KeyData(table: ViSealedDB<TSealedData>): TSealedData
	{
		if (this._keyData == null)
		{
			this._keyData = table.Data(this._key);
		}
		return this._keyData;
	}
	//
	public GetKeyData(table: ViSealedDB<TSealedData>, includeZero: boolean): TSealedData
	{
		if (this._keyPData == null)
		{
			if (includeZero || this._key != 0)
			{
				this._keyPData = table.GetData(this._key, includeZero);
			}
		}
		return this._keyPData;
	}
	//
	public ReadFrom(stream: ViIStream): void
	{
		this._key = stream.ReadUInt32();
		this._keyData = null;
		this._keyPData = null;
		this._value = stream.ReadInt32();
	}
	//
	public Set(key: number, value: number): void
	{
		this._key = key;
		this._keyData = null;
		this._keyPData = null;
		this._value = value;
	}
	//
	private _key = 0;
	private _keyData: TSealedData = null;
	private _keyPData: TSealedData = null;
	private _value = 0;
}

export class ViForeignCountStruct<TSealedData extends ViSealedData> implements ViFixArrayElement
{
	public get Key(): number { return this._key; }
	public get Count(): number { return this._count; }
	public get Empty(): boolean { return this._key != 0 && this._count != 0; }
	public get NotEmpty(): boolean { return this._key != 0 && this._count != 0; }
	//
	public KeyData(table: ViSealedDB<TSealedData>): TSealedData
	{
		if (this._keyData == null)
		{
			this._keyData = table.Data(this._key);
		}
		return this._keyData;
	}
	//
	public GetKeyData(table: ViSealedDB<TSealedData>, includeZero: boolean): TSealedData
	{
		if (this._keyPData == null)
		{
			if (includeZero || this._key != 0)
			{
				this._keyPData = table.GetData(this._key, includeZero);
			}
		}
		return this._keyPData;
	}
	//
	public ReadFrom(stream: ViIStream): void
	{
		this._key = stream.ReadUInt32();
		this._keyData = null;
		this._keyPData = null;
		this._count = stream.ReadInt32();
	}
	//
	public Set(key: number, count: number): void
	{
		this._key = key;
		this._keyData = null;
		this._keyPData = null;
		this._count = count;
	}
	//
	private _key = 0;
	private _keyData: TSealedData = null;
	private _keyPData: TSealedData = null;
	private _count = 0;
}

export class ViForeignKeyFixArrayStruct<TSealedData extends ViSealedData>
{
	public constructor(size: number)
	{
		let array = new Array<ViForeignKey<TSealedData>>(size);
		for (let iter = 0; iter < size; ++iter)
		{
			array[iter] = new ViForeignKey<TSealedData>();
		}
		this._array = array;
	}
	//
	public ReadFrom(stream: ViIStream): void
	{
		let ReadUInt32 = stream.ReadUInt32.bind(stream);
		for (let iter = 0, array = this._array, count = array.length; iter < count; ++iter)
		{
			array[iter].Set(ReadUInt32());
		}
	}
	//
	public get Size(): number
	{
		return this._array.length;
	}
	//
	public get AllEmpty(): boolean
	{
		for (let iter = 0, array = this._array, count = array.length; iter < count; ++iter)
		{
			if (array[iter].NotEmpty)
			{
				return false;
			}
		}
		return true;
	}
	//
	public Value(index: number): number
	{
		let array = this._array;
		if (index < array.length)
		{
			return array[index].Value;
		}
		else
		{
			return 0;
		}
	}
	//
	public IsEmpty(index: number): boolean
	{
		let array = this._array;
		if (index < array.length)
		{
			return array[index].Empty;
		}
		else
		{
			return false;
		}
	}
	//
	public IsNotEmpty(index: number): boolean
	{
		let array = this._array;
		if (index < array.length)
		{
			return array[index].NotEmpty;
		}
		else
		{
			return false;
		}
	}
	//
	public Data(table: ViSealedDB<TSealedData>, index: number): TSealedData
	{
		let array = this._array;
		if (index < array.length)
		{
			return array[index].Data(table);
		}
		else
		{
			return null;
		}
	}
	//
	public GetData(table: ViSealedDB<TSealedData>, index: number, includeZero: boolean): TSealedData
	{
		let array = this._array;
		if (index < array.length)
		{
			return array[index].GetData(table, includeZero);
		}
		else
		{
			return null;
		}
	}
	//
	private readonly _array: Array<ViForeignKey<TSealedData>>;
}

export class ViForeignKeyValueFixArrayStruct<TSealedData extends ViSealedData>
{
	public constructor(size: number)
	{
		let array = new Array<ViForeignValueStruct<TSealedData>>(size);
		for (let iter = 0; iter < size; ++iter)
		{
			array[iter] = new ViForeignValueStruct<TSealedData>();
		}
		this._array = array;
	}
	//
	public ReadFrom(stream: ViIStream): void
	{
		let ReadUInt32 = stream.ReadUInt32.bind(stream);
		let ReadInt32 = stream.ReadInt32.bind(stream);
		for (let iter = 0, array = this._array, count = array.length; iter < count; ++iter)
		{
			array[iter].Set(ReadUInt32(), ReadInt32());
		}
	}
	//
	public get Size(): number
	{
		return this._array.length;
	}
	//
	public get AllEmpty(): boolean
	{
		for (let iter = 0, array = this._array, count = array.length; iter < count; ++iter)
		{
			if (array[iter].NotEmpty)
			{
				return false;
			}
		}
		return true;
	}
	//
	public Empty(index: number): boolean
	{
		let array = this._array;
		if (index < array.length)
		{
			return array[index].Empty;
		}
		else
		{
			return false;
		}
	}
	//
	public NotEmpty(index: number): boolean
	{
		let array = this._array;
		if (index < array.length)
		{
			return array[index].NotEmpty;
		}
		else
		{
			return false;
		}
	}
	//
	public KeyData(table: ViSealedDB<TSealedData>, index: number): TSealedData
	{
		let array = this._array;
		if (index < array.length)
		{
			return array[index].KeyData(table);
		}
		else
		{
			return null;
		}
	}
	//
	public GetKeyData(table: ViSealedDB<TSealedData>, index: number, includeZero: boolean): TSealedData
	{
		let array = this._array;
		if (index < array.length)
		{
			return array[index].GetKeyData(table, includeZero);
		}
		else
		{
			return null;
		}
	}
	//
	public Value(index: number): number
	{
		let array = this._array;
		if (index < array.length)
		{
			return array[index].Value;
		}
		else
		{
			return 0;
		}
	}
	//
	private readonly _array: Array<ViForeignValueStruct<TSealedData>>;
}

export class ViForeignKeyCountFixArrayStruct<TSealedData extends ViSealedData>
{
	public constructor(size: number)
	{
		let array = new Array<ViForeignCountStruct<TSealedData>>(size);
		for (let iter = 0; iter < size; ++iter)
		{
			array[iter] = new ViForeignCountStruct<TSealedData>();
		}
		this._array = array;
	}
	//
	public ReadFrom(stream: ViIStream): void
	{
		let ReadUInt32 = stream.ReadUInt32.bind(stream);
		let ReadInt32 = stream.ReadInt32.bind(stream);
		for (let iter = 0, array = this._array, count = array.length; iter < count; ++iter)
		{
			array[iter].Set(ReadUInt32(), ReadInt32());
		}
	}
	//
	public get Size(): number
	{
		return this._array.length;
	}
	//
	public get AllEmpty(): boolean
	{
		for (let iter = 0, array = this._array, count = array.length; iter < count; ++iter)
		{
			if (array[iter].NotEmpty)
			{
				return false;
			}
		}
		return true;
	}
	//
	public Empty(index: number): boolean
	{
		let array = this._array;
		if (index < array.length)
		{
			return array[index].Empty;
		}
		else
		{
			return false;
		}
	}
	//
	public NotEmpty(index: number): boolean
	{
		let array = this._array;
		if (index < array.length)
		{
			return array[index].NotEmpty;
		}
		else
		{
			return false;
		}
	}
	//
	public KeyData(table: ViSealedDB<TSealedData>, index: number): TSealedData
	{
		let array = this._array;
		if (index < array.length)
		{
			return array[index].KeyData(table);
		}
		else
		{
			return null;
		}
	}
	//
	public GetKeyData(table: ViSealedDB<TSealedData>, index: number, includeZero: boolean): TSealedData
	{
		let array = this._array;
		if (index < array.length)
		{
			return array[index].GetKeyData(table, includeZero);
		}
		else
		{
			return null;
		}
	}
	//
	public Count(index: number): number
	{
		let array = this._array;
		if (index < array.length)
		{
			return array[index].Count;
		}
		else
		{
			return 0;
		}
	}
	//
	private readonly _array: Array<ViForeignCountStruct<TSealedData>>;
}