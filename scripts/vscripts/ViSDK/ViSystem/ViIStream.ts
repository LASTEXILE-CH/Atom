import { ViConst } from "./ViSystemConfig";
import { ViDebuger } from "./ViDebuger";
import { ViBitConverter } from "./ViBitConverter";
import { NumberI64, NumberUI64 } from "./ViNumber64";

let LittleEndian = true;

export class ViIStream
{
	public get Buffer(): Uint8Array { return this._buffer; }
	public get RemainLength(): number { return this._end - this._current; }
	public get Error(): boolean { return this._error; }
	//
	public Init(buffer: Uint8Array, start: number, len: number): void
	{
		this._buffer = buffer;
		this._view = new DataView(buffer.buffer);
		this._start = start;
		this._current = start;
		this._end = start + len;
		this._error = false;
	}
	//
	public Clear(): void
	{
		this._buffer = null;
		this._view = null;
		this._start = 0;
		this._current = 0;
		this._end = 0;
		this._error = false;
	}
	//
	public ReWind(): void
	{
		this._current = this._start;
		this._error = false;
	}
	//
	public SetEnd(): void
	{
		this._current = this._end;
	}
	//
	public ReadInt8(): number
	{
		let current = this._current;
		if (current + 1 <= this._end)
		{
			this._current = current + 1;
			return this._view.getInt8(current);
		}
		else
		{
			ViDebuger.Warning("Read Fail I8");
			this.SetError();
			return 0;
		}
	}
	//
	public ReadUInt8(): number
	{
		let current = this._current;
		if (current + 1 <= this._end)
		{
			this._current = current + 1;
			return this._view.getUint8(current);
		}
		else
		{
			ViDebuger.Warning("Read Fail U8");
			this.SetError();
			return 0;
		}
	}
	//
	public ReadInt16(): number
	{
		let current = this._current;
		if (current + 2 <= this._end)
		{
			this._current = current + 2;
			return this._view.getInt16(current, LittleEndian);
		}
		else
		{
			ViDebuger.Warning("Read Fail I16");
			this.SetError();
			return 0;
		}
	}
	//
	public ReadUInt16(): number
	{
		let current = this._current;
		if (current + 2 <= this._end)
		{
			this._current = current + 2;
			return this._view.getUint16(current, LittleEndian);
		}
		else
		{
			ViDebuger.Warning("Read Fail U16");
			this.SetError();
			return 0;
		}
	}
	//
	public ReadUInt24(): number
	{
		let current = this._current;
		if (current + 3 <= this._end)
		{
			this._current = current + 3;
			return this._view.getUint8(current) + this._view.getUint16(current + 1, LittleEndian) << 8;
		}
		else
		{
			ViDebuger.Warning("Read Fail U24");
			this.SetError();
			return 0;
		}
	}
	//
	public ReadInt32(): number
	{
		let current = this._current;
		if (current + 4 <= this._end)
		{
			this._current = current + 4;
			return this._view.getInt32(current, LittleEndian);
		}
		else
		{
			ViDebuger.Warning("Read Fail I32");
			this.SetError();
			return 0;
		}
	}
	//
	public ReadUInt32(): number
	{
		let current = this._current;
		if (current + 4 <= this._end)
		{
			this._current = current + 4;
			return this._view.getUint32(current, LittleEndian);
		}
		else
		{
			ViDebuger.Warning("Read Fail U32");
			this.SetError();
			return 0;
		}
	}
	//
	public ReadFloat32(): number
	{
		let value = this.ReadInt16();
		if (value != ViConst.MAX_INT16)
		{
			return value * 0.01;
		}
		else
		{
			value = this.ReadInt32();
			return value * 0.01;
		}
	}
	//
	public ReadFloat64(): number
	{
		let current = this._current;
		if (current + 8 <= this._end)
		{
			this._current = current + 8;
			let valueLow = this._view.getUint32(current, LittleEndian);
			let valueHigh = this._view.getInt32(current + 4, LittleEndian);
			return (valueHigh * ViConst.MAX_UINT32 + valueLow) * 0.000001;
		}
		else
		{
			ViDebuger.Warning("Read Fail F64");
			this.SetError();
			return 0;
		}
	}
	//
	public ReadInt64(value: NumberI64): boolean
	{
		let current = this._current;
		if (current + 8 <= this._end)
		{
			this._current = current + 8;
			let valueLow = this._view.getUint32(current, LittleEndian);
			let valueHigh = this._view.getInt32(current + 4, LittleEndian);
			value.Set(valueHigh, valueLow);
			return true;
		}
		else
		{
			ViDebuger.Warning("Read Fail I64");
			this.SetError();
			value.Set(0, 0);
			return false;
		}
	}
	//
	public ReadUInt64(value: NumberUI64): boolean
	{
		let current = this._current;
		if (current + 8 <= this._end)
		{
			this._current = current + 8;
			let valueLow = this._view.getUint32(current, LittleEndian);
			let valueHigh = this._view.getUint32(current + 4, LittleEndian);
			value.Set(valueHigh, valueLow);
			return true;
		}
		else
		{
			ViDebuger.Warning("Read Fail U64");
			this.SetError();
			value.Set(0, 0);
			return false;
		}
	}
	//
	public ReadPackedSize(): number
	{
		let current = this._current;
		if (current + 1 <= this._end)
		{
			let value = this._view.getUint8(current);
			this._current = current + 1;
			if (value < 255)
			{
				return value;
			}
			else
			{
				current = this._current;
				if (current + 4 <= this._end)
				{
					this._current = current + 4;
					return this._view.getUint32(current, LittleEndian);
				}
				else
				{
					ViDebuger.Warning("Read Fail PackedUInt");
					this.SetError();
					return 0;
				}
			}
		}
		else
		{
			ViDebuger.Warning("Read Fail PackedUInt");
			this.SetError();
			return 0;
		}
	}
	//
	public ReadString(): string
	{
		let len = this.ReadPackedSize();
		if (this.Error)
		{
			ViDebuger.Warning("Read Fail string");
			return "";
		}
		let size = len * 2;
		let current = this._current;
		if (size > (this._end - current))
		{
			ViDebuger.Warning("Read string.size Error");
			this.SetError();
			return "";
		}
		this._current = current + size;
		let value = ViBitConverter.ToString(this._buffer, current, size);
		return value;
	}
	//
	public ReadLowCaseString(): string
	{
		let len = this.ReadPackedSize();
		if (this.Error)
		{
			ViDebuger.Warning("Read Fail string");
			return "";
		}
		let size = len * 2;
		let current = this._current;
		if (size > (this._end - current))
		{
			ViDebuger.Warning("Read string.size Error");
			this.SetError();
			return "";
		}
		this._current = current + size;
		let value = ViBitConverter.ToLowCaseString(this._buffer, current, size);
		return value;
	}
	//
	public ReadUpCaseString(): string
	{
		let len = this.ReadPackedSize();
		if (this.Error)
		{
			ViDebuger.Warning("Read Fail string");
			return "";
		}
		let size = len * 2;
		let current = this._current;
		if (size > (this._end - current))
		{
			ViDebuger.Warning("Read string.size Error");
			this.SetError();
			return "";
		}
		this._current = current + size;
		let value = ViBitConverter.ToUpCaseString(this._buffer, current, size);
		return value;
	}
	//
	public SkipString(): void
	{
		let len = this.ReadPackedSize();
		if (this.Error)
		{
			ViDebuger.Warning("Read Fail string");
			return;
		}
		let size = len * 2;
		if (size > (this._end - this._current))
		{
			ViDebuger.Warning("Read string.size Error");
			this.SetError();
			return;
		}
		this._current += size;
	}
	//
	public ReadStream(value: ViIStream, copy: boolean): boolean
	{
		let len = this.ReadPackedSize();
		if (this.Error)
		{
			ViDebuger.Warning("Read Stream Error");
			return false;
		}
		let current = this._current;
		if (len > (this._end - current))
		{
			ViDebuger.Warning("Read Stream.size Error");
			this.SetError();
			return false;
		}
		this._current = current + len;
		if (copy)
		{
			let dstBuffer = new Uint8Array(len);
			dstBuffer.set(this._buffer.subarray(current, current + len));
			value.Init(dstBuffer, 0, len);
		}
		else
		{
			value.Init(this._buffer, current, len);
		}
		return true;
	}
	//
	private SetError(): void
	{
		this._error = true;
		this._current = this._end;
	}
	//
	private _buffer: Uint8Array = null;
	private _view: DataView = null;
	//
	private _start = 0;
	private _current = 0;
	private _end = 0;
	private _error = false;
}