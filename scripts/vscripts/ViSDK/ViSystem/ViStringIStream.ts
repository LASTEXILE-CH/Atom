import { ViAssisstant } from "./ViSystemConfig";
import { ViList } from "./ViSystemType";
import { NumberUI64, NumberI64 } from "./ViNumber64";
import { Number64Assistant } from "./ViNumber64Assistant";

export class ViStringIStream
{
    public get RemainLength() { return this._buffer.Count - this._offset; }
    public get Error(): boolean { return this._error; }
    //
    public Init(buffer: ViList<string>): void
    {
        this._buffer = buffer;
        this._offset = 0;
        this._error = false;
    }
    //
    public ReWind(): void
    {
        this._offset = 0;
        this._error = false;
    }
    //
    public ReadInt8(): number
    {
        let value = 0;
        if (this._offset >= this._buffer.Count)
        {
            this._SetError();
            return value;
        }
        let str = this._buffer.Get(this._offset++);
        try
        {
            value = ViAssisstant.Str2Int(str);
            value = ViAssisstant.Int8Near(value);
        }
        catch (err) 
        {
            value = 0;
            this._SetError();
        }
        return value;
    }
    //
    public ReadUInt8(): number
    {
        let value = 0;
        if (this._offset >= this._buffer.Count)
        {
            this._SetError();
            return value;
        }
        let str = this._buffer.Get(this._offset++);
        try
        {
            value = ViAssisstant.Str2Int(str);
            value = ViAssisstant.UInt8Near(value);
        }
        catch (err) 
        {
            value = 0;
            this._SetError();
        }
        return value;
    }
    //
    public ReadInt16(): number
    {
        let value = 0;
        if (this._offset >= this._buffer.Count)
        {
            this._SetError();
            return value;
        }
        let str = this._buffer.Get(this._offset++);
        try
        {
            value = ViAssisstant.Str2Int(str);
            value = ViAssisstant.Int16Near(value);
        }
        catch (err) 
        {
            value = 0;
            this._SetError();
        }
        return value;
    }
    //
    public ReadUInt16(): number
    {
        let value = 0;
        if (this._offset >= this._buffer.Count)
        {
            this._SetError();
            return value;
        }
        let str = this._buffer.Get(this._offset++);
        try
        {
            value = ViAssisstant.Str2Int(str);
            value = ViAssisstant.UInt16Near(value);
        }
        catch (err) 
        {
            value = 0;
            this._SetError();
        }
        return value;
    }
    //
    public ReadInt32(): number
    {
        let value = 0;
        if (this._offset >= this._buffer.Count)
        {
            this._SetError();
            return value;
        }
        let str = this._buffer.Get(this._offset++);
        try
        {
            value = ViAssisstant.Str2Int(str);
            value = ViAssisstant.Int32Near(value);
        }
        catch (err) 
        {
            value = 0;
            this._SetError();
        }
        return value;
    }
    //
    public ReadUInt32(): number
    {
        let value = 0;
        if (this._offset >= this._buffer.Count)
        {
            this._SetError();
            return value;
        }
        let str = this._buffer.Get(this._offset++);
        try
        {
            value = ViAssisstant.Str2Int(str);
            value = ViAssisstant.UInt32Near(value);
        }
        catch (err) 
        {
            value = 0;
            this._SetError();
        }
        return value;
    }
    //
    public ReadInt64(value: NumberI64): boolean
    {
        if (this._offset >= this._buffer.Count)
        {
            this._SetError();
            return false;
        }
        let str = this._buffer.Get(this._offset++);
        try
        {
            return Number64Assistant.StrToNumberI64(str, value)
        }
        catch (err) 
        {
            value.Set(0, 0);
            this._SetError();
            return false;
        }
    }
    //
    public ReadUInt64(value: NumberUI64): boolean
    {
        if (this._offset >= this._buffer.Count)
        {
            return false
        }
        let str = this._buffer.Get(this._offset++);
        try
        {
            return Number64Assistant.StrToNumberUI64(str, value)
        }
        catch (err) 
        {
            value.Set(0, 0);
            this._SetError();
            return false;
        }
    }
    //
    public ReadFloat32(): number
    {
        let value = 0;
        if (this._offset >= this._buffer.Count)
        {
            this._SetError();
            return value;
        }
        let str = this._buffer.Get(this._offset++);
        try
        {
            value = ViAssisstant.Str2Float(str);
        }
        catch (err) 
        {
            value = 0;
            this._SetError();
        }
        return value;
    }
    //
    public ReadFloat64(): number
    {
        let value = 0;
        if (this._offset >= this._buffer.Count)
        {
            this._SetError();
            return value;
        }
        let str = this._buffer.Get(this._offset++);
        try
        {
            value = ViAssisstant.Str2Float(str);
        }
        catch (err) 
        {
            value = 0;
            this._SetError();
        }
        return value;
    }
    //
    public ReadString(): string
    {
        let value = "";
        if (this._offset >= this._buffer.Count)
        {
            this._SetError();
            return value;
        }
        value = this._buffer.Get(this._offset++);
        return value;
    }
    //
    public ReadInt8List(list: ViList<number>): boolean
    {
        let size = this.ReadInt32();
        for (let iter = 0; iter < size; ++iter)
        {
            let value = this.ReadInt8();
            if (this._error)
            {
                return false;
            }
            list.Push(value);
        }
        return true;
    }
    //
    public ReadUInt8List(list: ViList<number>): boolean
    {
        let size = this.ReadInt32();
        for (let iter = 0; iter < size; ++iter)
        {
            let value = this.ReadUInt8();
            if (this._error)
            {
                return false;
            }
            list.Push(value);
        }
        return true;
    }
    //
    public ReadInt16List(list: ViList<number>): boolean
    {
        let size = this.ReadInt32();
        for (let iter = 0; iter < size; ++iter)
        {
            let value = this.ReadInt16();
            if (this._error)
            {
                return false;
            }
            list.Push(value);
        }
        return true;
    }
    //
    public ReadUInt16List(list: ViList<number>): boolean
    {
        let size = this.ReadInt32();
        for (let iter = 0; iter < size; ++iter)
        {
            let value = this.ReadUInt16();
            if (this._error)
            {
                return false;
            }
            list.Push(value);
        }
        return true;
    }
    //
    public ReadInt32List(list: ViList<number>): boolean
    {
        let size = this.ReadInt32();
        for (let iter = 0; iter < size; ++iter)
        {
            let value = this.ReadInt32();
            if (this._error)
            {
                return false;
            }
            list.Push(value);
        }
        return true;
    }
    //
    public ReadUInt32List(list: ViList<number>): boolean
    {
        let size = this.ReadInt32();
        for (let iter = 0; iter < size; ++iter)
        {
            let value = this.ReadUInt32();
            if (this._error)
            {
                return false;
            }
            list.Push(value);
        }
        return true;
    }
    //
    public ReadInt64List(list: ViList<NumberI64>): boolean
    {
        let size = this.ReadInt32();
        for (let iter = 0; iter < size; ++iter)
        {
            let value = new NumberI64(0, 0);
            if (!this.ReadInt64(value))
            {
                return false;
            }
            list.Push(value);
        }
        return true;
    }
    //
    public ReadUInt64List(list: ViList<NumberUI64>): boolean
    {
        let size = this.ReadInt32();
        for (let iter = 0; iter < size; ++iter)
        {
            let value = new NumberUI64(0, 0);
            if (this._error)
            {
                return false;
            }
            list.Push(value);
        }
        return true;
    }
    //
    public ReadFloat32List(list: ViList<number>): boolean
    {
        let size = this.ReadInt32();
        for (let iter = 0; iter < size; ++iter)
        {
            let value = this.ReadFloat32();
            if (this._error)
            {
                return false;
            }
            list.Push(value);
        }
        return true;
    }
    //
    public ReadFloat64List(list: ViList<number>): boolean
    {
        let size = this.ReadInt32();
        for (let iter = 0; iter < size; ++iter)
        {
            let value = this.ReadFloat64();
            if (this._error)
            {
                return false;
            }
            list.Push(value);
        }
        return true;
    }
    //
    public ReadStringList(list: ViList<string>): boolean
    {
        let size = this.ReadInt32();
        for (let iter = 0; iter < size; ++iter)
        {
            let value = this.ReadString();
            if (this._error)
            {
                return false;
            }
            list.Push(value);
        }
        return true;
    }
    //
    private _SetError(): void
    {
        this._error = true;
    }
    //
    private _buffer: ViList<string>;
    private _offset: number;
    private _error: boolean = false;
}