import { ViAssisstant, ViConst } from "./ViSystemConfig";
import { ViString } from "./ViSystemType";
import { Number64Assistant } from "./ViNumber64Assistant";
import { NumberI64, NumberUI64 } from "./ViNumber64";

export class ViOStream
{
	public get Buffer(): Buffer { return this._buffer; }
	public get Length(): number { return this._current; }
	//
	constructor(initialSize?: number)
	{
		if (initialSize != undefined)
		{
			this._buffer = new Buffer(initialSize);
		}
		else
		{
			this._buffer = new Buffer(256);
		}
	}
	//
	public Reset(): void
	{
		this._current = 0;
	}
	//
	public AppendInt8(value: number): void
	{
		this._memCache[0] = value;
		this.Append(this._memCache, 0, 1);
	}
	//
	public AppendUInt8(value: number): void
	{
		this.EnsureBuffer(1);
		this._buffer[this._current++] = value;
	}
	//
	public AppendInt16(value: number): void
	{
		let _memCache = this._memCache;
		//
		_memCache[0] = value;
		_memCache[1] = (value >> 8);
		this.Append(_memCache, 0, 2);
	}
	//
	public AppendUInt16(value: number): void
	{
		let _memCache = this._memCache;
		//
		_memCache[0] = value;
		_memCache[1] = (value >> 8);
		this.Append(_memCache, 0, 2);
	}
	//
	public AppendUInt24(value: number): void
	{
		let _memCache = this._memCache;
		//
		_memCache[0] = value;
		_memCache[1] = (value >> 8);
		_memCache[2] = (value >> 16);
		this.Append(_memCache, 0, 3);
	}
	//
	public AppendInt32(value: number): void
	{
		let _memCache = this._memCache;
		//
		_memCache[0] = value;
		_memCache[1] = (value >> 8);
		_memCache[2] = (value >> 16);
		_memCache[3] = (value >> 24);
		this.Append(_memCache, 0, 4);
	}
	//
	public AppendUInt32(value: number): void
	{
		let _memCache = this._memCache;
		//
		_memCache[0] = value;
		_memCache[1] = (value >> 8);
		_memCache[2] = (value >> 16);
		_memCache[3] = (value >> 24);
		this.Append(_memCache, 0, 4);
	}
	//
	public AppendInt64(value: NumberI64): void
	{
		let _memCache = this._memCache;
		//
		let low = value.Low;
		let high = value.High;
		_memCache[0] = low;
		_memCache[1] = (low >> 8);
		_memCache[2] = (low >> 16);
		_memCache[3] = (low >> 24);
		_memCache[4] = high;
		_memCache[5] = (high >> 8);
		_memCache[6] = (high >> 16);
		_memCache[7] = (high >> 24);
		this.Append(_memCache, 0, 8);
	}
	//
	public AppendUInt64(value: NumberUI64): void
	{
		let _memCache = this._memCache;
		//
		let low = value.Low;
		let high = value.High;
		_memCache[0] = low;
		_memCache[1] = (low >> 8);
		_memCache[2] = (low >> 16);
		_memCache[3] = (low >> 24);
		_memCache[4] = high;
		_memCache[5] = (high >> 8);
		_memCache[6] = (high >> 16);
		_memCache[7] = (high >> 24);
		this.Append(_memCache, 0, 8);
	}
	//
	public AppendFloat32(value: number): void
	{
		let localValue = Math.floor(value * 100 + 0.5);
		if (ViConst.MIN_INT16 < localValue && localValue < ViConst.MAX_INT16)
		{
			this.AppendInt16(localValue);
		}
		else
		{
			this.AppendInt16(ViConst.MAX_INT16);
			this.AppendInt32(localValue);
		}
	}
	//
	private static readonly CACHE_AppendFloat64_Double = new NumberI64(0, 0);
	public AppendFloat64(value: number): void
	{
		let double = ViOStream.CACHE_AppendFloat64_Double;
		let localValue = value * 1000000 + 0.5;
		Number64Assistant.NumberToNumberI64(localValue, double);
		this.AppendInt32(double.Low);
		this.AppendInt32(double.High);
	}
	//
	public AppendPackedSize(value: number): void
	{
		if (value < 255)
		{
			this.AppendUInt8(value);
		}
		else
		{
			this.AppendUInt8(255);
			this.AppendUInt32(value);
		}
	}
	//
	public AppendString(value: string): void
	{
		if (value == null)
		{
			value = ViString.Empty;
		}
		this.AppendPackedSize(value.length);
		let size = value.length * 2;
		this.EnsureBuffer(size);
		let current = this._current;
		let charCodeAt = value.charCodeAt.bind(value);
		for (let iter = 0, _buffer = this._buffer, count = value.length; iter < count; ++iter)
		{
			let iterChar = charCodeAt(iter);
			_buffer[current++] = iterChar;
			_buffer[current++] = (iterChar >> 8);
		}
		this._current = current;
	}
	//
	public Append(value: Buffer, offset: number, count: number): void
	{
		if (count > 0)
		{
			this.EnsureBuffer(count);
			value.copy(this._buffer, this._current, offset, offset + count);
			this._current += count;
		}
	}
	//
	public AppendStream(stream: ViOStream): void
	{
		let len = stream.Length;
		this.AppendPackedSize(len);
		this.Append(stream._buffer, 0, stream._current);
	}
	//
	private EnsureBuffer(count: number): void
	{
		if (count > (this._buffer.length - this._current))
		{
			let oldLen = this._buffer.length;
			let newLen = ViAssisstant.Max(oldLen * 2, oldLen + count);
			let newBuffer = new Buffer(newLen);
			newBuffer.set(this._buffer, 0);
			this._buffer = newBuffer;
		}
	}
	//
	private readonly _memCache = new Buffer(8);
	private _buffer: Buffer;
	private _current: number = 0;
}
