import { Int8, UInt8, Int16, UInt16, Int32, UInt32, Int64, UInt64, float, double, ViString } from "../ViSystem/ViSystemType";
import { NumberI64, NumberUI64 } from "../ViSystem/ViNumber64";
import { ViEntity } from "../ViGameCommon/Entity/ViEntity";
import { ViReceiveDataNode } from "./ViReceiveDataNode";
import { ViIStream } from "../ViSystem/ViIStream";

export class ViReceiveDataInt8 extends ViReceiveDataNode
{
	public get Value(): number { return this._value; }
	public Equal(value: number): boolean
	{
		return this._value == value;
	}
	public NotEqual(value: number): boolean
	{
		return this._value == value;
	}
	public CopyTo(value: Int8): void
	{
		value.Value = this._value;
	}
	public CopyFrom(value: Int8): void
	{
		this._value = value.Value;
		this._valueStr = null;
	}
	public toString(): string
	{
		if (this._valueStr == null)
		{
			this._valueStr = this._value.toString();
		}
		return this._valueStr;
	}
	//
	public Start(stream: ViIStream, entity: ViEntity): void
	{
		this._value = stream.ReadInt8();
		this._valueStr = null;
	}
	public OnUpdate(stream: ViIStream, entity: ViEntity): void
	{
		this._value = stream.ReadInt8();
		this._valueStr = null;
		this.OnUpdateInvoke();
	}
	public End(entity: ViEntity): void
	{
		this._valueStr = null;
	}
	//
	private _value: number;
	private _valueStr: string = null;
}

export class ViReceiveDataUInt8 extends ViReceiveDataNode
{
	public get Value(): number { return this._value; }
	public Equal(value: number): boolean
	{
		return this._value == value;
	}
	public NotEqual(value: number): boolean
	{
		return this._value == value;
	}
	public CopyTo(value: UInt8): void
	{
		value.Value = this._value;
	}
	public CopyFrom(value: UInt8): void
	{
		this._value = value.Value;
		this._valueStr = null;
	}
	public toString(): string
	{
		if (this._valueStr == null)
		{
			this._valueStr = this._value.toString();
		}
		return this._valueStr;
	}
	//
	public Start(stream: ViIStream, entity: ViEntity): void
	{
		this._value = stream.ReadUInt8();
		this._valueStr = null;
	}
	public OnUpdate(stream: ViIStream, entity: ViEntity): void
	{
		this._value = stream.ReadUInt8();
		this._valueStr = null;
		this.OnUpdateInvoke();
	}
	public End(entity: ViEntity): void
	{
		this._valueStr = null;
	}
	//
	private _value: number;
	private _valueStr: string = null;
}

export class ViReceiveDataInt16 extends ViReceiveDataNode
{
	public get Value(): number { return this._value; }
	public Equal(value: number): boolean
	{
		return this._value == value;
	}
	public NotEqual(value: number): boolean
	{
		return this._value == value;
	}
	public CopyTo(value: Int16): void
	{
		value.Value = this._value;
	}
	public CopyFrom(value: Int16): void
	{
		this._value = value.Value;
		this._valueStr = null;
	}
	public toString(): string
	{
		if (this._valueStr == null)
		{
			this._valueStr = this._value.toString();
		}
		return this._valueStr;
	}
	//
	public Start(stream: ViIStream, entity: ViEntity): void
	{
		this._value = stream.ReadInt16();
		this._valueStr = null;
	}
	public OnUpdate(stream: ViIStream, entity: ViEntity): void
	{
		this._value = stream.ReadInt16();
		this._valueStr = null;
		this.OnUpdateInvoke();
	}
	public End(entity: ViEntity): void
	{
		this._valueStr = null;
	}
	//
	private _value: number;
	private _valueStr: string = null;
}

export class ViReceiveDataUInt16 extends ViReceiveDataNode
{
	public get Value(): number { return this._value; }
	public Equal(value: number): boolean
	{
		return this._value == value;
	}
	public NotEqual(value: number): boolean
	{
		return this._value == value;
	}
	public CopyTo(value: UInt16): void
	{
		value.Value = this._value;
	}
	public CopyFrom(value: UInt16): void
	{
		this._value = value.Value;
		this._valueStr = null;
	}
	public toString(): string
	{
		if (this._valueStr == null)
		{
			this._valueStr = this._value.toString();
		}
		return this._valueStr;
	}
	//
	public Start(stream: ViIStream, entity: ViEntity): void
	{
		this._value = stream.ReadUInt16();
		this._valueStr = null;
	}
	public OnUpdate(stream: ViIStream, entity: ViEntity): void
	{
		this._value = stream.ReadUInt16();
		this._valueStr = null;
		this.OnUpdateInvoke();
	}
	public End(entity: ViEntity): void
	{
		this._valueStr = null;
	}
	//
	private _value: number;
	private _valueStr: string = null;
}

export class ViReceiveDataInt32 extends ViReceiveDataNode
{
	public get Value(): number { return this._value; }
	public Equal(value: number): boolean
	{
		return this._value == value;
	}
	public NotEqual(value: number): boolean
	{
		return this._value == value;
	}
	public CopyTo(value: Int32): void
	{
		value.Value = this._value;
	}
	public CopyFrom(value: Int32): void
	{
		this._value = value.Value;
		this._valueStr = null;
	}
	public toString(): string
	{
		if (this._valueStr == null)
		{
			this._valueStr = this._value.toString();
		}
		return this._valueStr;
	}
	//
	public Start(stream: ViIStream, entity: ViEntity): void
	{
		this._value = stream.ReadInt32();
		this._valueStr = null;
	}
	public OnUpdate(stream: ViIStream, entity: ViEntity): void
	{
		this._value = stream.ReadInt32();
		this._valueStr = null;
		this.OnUpdateInvoke();
	}
	public End(entity: ViEntity): void
	{
		this._valueStr = null;
	}
	//
	private _value: number;
	private _valueStr: string = null;
}

export class ViReceiveDataUInt32 extends ViReceiveDataNode
{
	public get Value(): number { return this._value; }
	public Equal(value: number): boolean
	{
		return this._value == value;
	}
	public NotEqual(value: number): boolean
	{
		return this._value == value;
	}
	public CopyTo(value: UInt32): void
	{
		value.Value = this._value;
	}
	public CopyFrom(value: UInt32): void
	{
		this._value = value.Value;
		this._valueStr = null;
	}
	public toString(): string
	{
		if (this._valueStr == null)
		{
			this._valueStr = this._value.toString();
		}
		return this._valueStr;
	}
	//
	public Start(stream: ViIStream, entity: ViEntity): void
	{
		this._value = stream.ReadUInt32();
		this._valueStr = null;
	}
	public OnUpdate(stream: ViIStream, entity: ViEntity): void
	{
		this._value = stream.ReadUInt32();
		this._valueStr = null;
		this.OnUpdateInvoke();
	}
	public End(entity: ViEntity): void
	{
		this._valueStr = null;
	}
	//
	private _value: number;
	private _valueStr: string = null;
}

export class ViReceiveDataInt64 extends ViReceiveDataNode
{
	public readonly Value = new NumberI64(0, 0);
	//
	public Equal(value: NumberI64): boolean
	{
		return this.Value.Equal(value);
	}
	public NotEqual(value: NumberI64): boolean
	{
		return this.Value.NotEqual(value);
	}
	public CopyTo(value: Int64): void
	{
		value.Value.CopyFrom(this.Value);
	}
	public CopyFrom(value: Int64): void
	{
		this.Value.CopyFrom(value.Value);
	}
	public toString(): string
	{
		return this.Value.toString();
	}
	//
	public Start(stream: ViIStream, entity: ViEntity): void
	{
		stream.ReadInt64(this.Value);
	}
	public OnUpdate(stream: ViIStream, entity: ViEntity): void
	{
		stream.ReadInt64(this.Value);
		this.OnUpdateInvoke();
	}
	public End(entity: ViEntity): void
	{

	}
}

export class ViReceiveDataUInt64 extends ViReceiveDataNode
{
	public readonly Value = new NumberUI64(0, 0);
	//
	public Equal(value: NumberUI64): boolean
	{
		return this.Value.Equal(value);
	}
	public NotEqual(value: NumberUI64): boolean
	{
		return this.Value.NotEqual(value);
	}
	public CopyTo(value: UInt64): void
	{
		value.Value.CopyFrom(this.Value);
	}
	public CopyFrom(value: UInt64): void
	{
		this.Value.CopyFrom(value.Value);
	}
	public toString(): string
	{
		return this.Value.toString();
	}
	//
	public Start(stream: ViIStream, entity: ViEntity): void
	{
		stream.ReadUInt64(this.Value);
	}
	public OnUpdate(stream: ViIStream, entity: ViEntity): void
	{
		stream.ReadUInt64(this.Value);
		this.OnUpdateInvoke();
	}
	public End(entity: ViEntity): void
	{

	}
}

export class ViReceiveDataFloat extends ViReceiveDataNode
{
	public get Value(): number { return this._value; }
	public Equal(value: number): boolean
	{
		return this._value == value;
	}
	public NotEqual(value: number): boolean
	{
		return this._value == value;
	}
	public CopyTo(value: float): void
	{
		value.Value = this._value;
	}
	public CopyFrom(value: float): void
	{
		this._value = value.Value;
		this._valueStr = null;
	}
	public toString(): string
	{
		if (this._valueStr == null)
		{
			this._valueStr = this._value.toString();
		}
		return this._valueStr;
	}
	//
	public Start(stream: ViIStream, entity: ViEntity): void
	{
		this._value = stream.ReadFloat32();
		this._valueStr = null;
	}
	public OnUpdate(stream: ViIStream, entity: ViEntity): void
	{
		this._value = stream.ReadFloat32();
		this._valueStr = null;
		this.OnUpdateInvoke();
	}
	public End(entity: ViEntity): void
	{
		this._valueStr = null;
	}
	//
	private _value: number;
	private _valueStr: string = null;
}

export class ViReceiveDataDouble extends ViReceiveDataNode
{
	public get Value(): number { return this._value; }
	public Equal(value: number): boolean
	{
		return this._value == value;
	}
	public NotEqual(value: number): boolean
	{
		return this._value == value;
	}
	public CopyTo(value: double): void
	{
		value.Value = this._value;
	}
	public CopyFrom(value: double): void
	{
		this._value = value.Value;
		this._valueStr = null;
	}
	public toString(): string
	{
		if (this._valueStr == null)
		{
			this._valueStr = this._value.toString();
		}
		return this._valueStr;
	}
	//
	public Start(stream: ViIStream, entity: ViEntity): void
	{
		this._value = stream.ReadFloat64();
		this._valueStr = null;
	}
	public OnUpdate(stream: ViIStream, entity: ViEntity): void
	{
		this._value = stream.ReadFloat64();
		this._valueStr = null;
		this.OnUpdateInvoke();
	}
	public End(entity: ViEntity): void
	{
		this._valueStr = null;
	}
	//
	private _value: number;
	private _valueStr: string = null;
}

export class ViReceiveDataString extends ViReceiveDataNode
{
	public get Value(): string { return this._value; }
	public Equal(value: string): boolean
	{
		return this._value == value;
	}
	public NotEqual(value: string): boolean
	{
		return this._value == value;
	}
	public CopyTo(value: ViString): void
	{
		value.Value = this._value;
	}
	public CopyFrom(value: ViString): void
	{
		this._value = value.Value;
	}
	public toString(): string
	{
		return this._value;
	}
	//
	public Start(stream: ViIStream, entity: ViEntity): void
	{
		this._value = stream.ReadString();
	}
	public OnUpdate(stream: ViIStream, entity: ViEntity): void
	{
		this._value = stream.ReadString();
		this.OnUpdateInvoke();
	}
	public End(entity: ViEntity): void
	{

	}
	//
	private _value: string;
}



