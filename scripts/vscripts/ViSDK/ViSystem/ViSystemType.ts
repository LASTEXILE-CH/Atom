import { ViAssisstant } from "./ViSystemConfig";
import { ViStringIStream } from "./ViStringIStream";
import { ViStringBuilder } from "./ViStringBuilder";
import { NumberI64, NumberUI64 } from "./ViNumber64";
import { ViDelegateRT2, ViDelegateRT1 } from "./ViDelegate";
import { ViIStream } from "./ViIStream";
import { ViOStream } from "./ViOStream";

export class ViPair<TFirst, TSecond>
{
    public constructor(first?: TFirst, second?: TSecond)
    {
        this.First = first;
        this.Second = second;
    }
    First: TFirst;
    Second: TSecond;
}

export class ViDictionary<TKey, TValue>
{
    public EqualsFunc: ViDelegateRT2<boolean, TKey, TKey>;
    public KeyIdentificate: ViDelegateRT1<number | string, TKey>;
    public constructor(equals?: ViDelegateRT2<boolean, TKey, TKey>, keyIdentificate?: ViDelegateRT1<number | string, TKey>)
    {
        this.EqualsFunc = equals;
        this.KeyIdentificate = keyIdentificate;
    }
    //
    public readonly Keys = new Array<TKey>();
    public readonly Values = new Array<TValue>();
    public get Count(): number { return this.Keys.length; }
    //
    public SetCapacity(size: number): void
    {

    }
    //
    public Set(key: TKey, value: TValue): void
    {
        let offset = this.IndexOf(key);
        if (offset < this.Count)
        {
            this.Values[offset] = value;
        }
        else
        {
            this.Keys.push(key);
            this.Values.push(value);
        }
    }
    //
    public Get(key: TKey): TValue | undefined
    {
        let offset = this.IndexOf(key);
        if (offset < this.Count)
        {
            return this.Values[offset];
        }
        else
        {
            return undefined;
        }
    }
    //
    public GetEx(key: TKey, defaultValue: TValue): TValue
    {
        let offset = this.IndexOf(key);
        if (offset < this.Count)
        {
            return this.Values[offset];
        }
        else
        {
            return defaultValue;
        }
    }
    //
    public Contain(key: TKey): boolean
    {
        return this.IndexOf(key) < this.Count;
    }
    //
    public Remove(key: TKey): boolean
    {
        let offset = this.IndexOf(key);
        if (offset < this.Count)
        {
            this.Keys.splice(offset, 1);
            this.Values.splice(offset, 1);
            return true;
        }
        else
        {
            return false;
        }
    }
    //
    public RemoveList(keyList: ViList<TKey>): void
    {
        let Remove = this.Remove.bind(this);
        for (let iter = 0, list = keyList.Values, count = keyList.Count; iter < count; ++iter)
        {
            Remove(list[iter]);
        }
    }
    //
    public GetAsRaw(key: number | string): TValue | undefined
    {
        let offset = this.IndexOfAsRaw(key, this.KeyIdentificate);
        if (offset < this.Count)
        {
            return this.Values[offset];
        }
        else
        {
            return undefined;
        }
    }
    //
    public ContainAsRaw(key: number | string): boolean
    {
        return this.IndexOfAsRaw(key, this.KeyIdentificate) < this.Count;
    }
    //
    public RemoveAsRaw(key: number | string): boolean
    {
        let offset = this.IndexOfAsRaw(key, this.KeyIdentificate);
        if (offset < this.Count)
        {
            this.Keys.splice(offset, 1);
            this.Values.splice(offset, 1);
            return true;
        }
        else
        {
            return false;
        }
    }
    //
    public Clear(): void
    {
        this.Keys.splice(0, this.Keys.length);
        this.Values.splice(0, this.Values.length);
    }
    //
    public toString(): string
    {
        let strBuilder = new ViStringBuilder();
        let keyList = this.Keys;
        let valueList = this.Values;
        let count = keyList.length;
        strBuilder.Append("([").Append(count.toString()).Append("]");
        for (let iter = 0; iter < count; ++iter)
        {
            if (iter != 0)
            {
                strBuilder.Append(",");
            }
            strBuilder.Append("<")
            strBuilder.Append(keyList[iter].toString());
            strBuilder.Append(",");
            strBuilder.Append(valueList[iter].toString());
            strBuilder.Append(">")
        }
        strBuilder.Append(")");
        return strBuilder.Value;
    }
    //
    private IndexOf(key: TKey): number
    {
        let keys = this.Keys;
        let count = keys.length;
        if (this.EqualsFunc != null)
        {
            let EqualsFunc = this.EqualsFunc.bind(this);
            for (let iter = 0; iter < count; ++iter)
            {
                if (EqualsFunc(key, keys[iter]))
                {
                    return iter;
                }
            }
        }
        else
        {
            for (let iter = 0; iter < count; ++iter)
            {
                if (key == keys[iter])
                {
                    return iter;
                }
            }
        }
        //
        return count;
    }
    //
    private IndexOfAsRaw(key: number | string, keyValue: ViDelegateRT1<number | string, TKey>): number
    {
        let keys = this.Keys;
        let count = keys.length;
        for (let iter = 0; iter < count; ++iter)
        {
            let iterKey = keys[iter];
            if (key == keyValue(iterKey))
            {
                return iter;
            }
        }
        //
        return count;
    }
}

export class ViSet<TKey>
{
    public EqualsFunc: ViDelegateRT2<boolean, TKey, TKey>;
    public KeyIdentificate: ViDelegateRT1<number | string, TKey>;
    public constructor(equals?: ViDelegateRT2<boolean, TKey, TKey>, keyIdentificate?: ViDelegateRT1<number | string, TKey>)
    {
        this.EqualsFunc = equals;
        this.KeyIdentificate = keyIdentificate;
    }
    //
    public get Count(): number { return this.Keys.length; }
    public readonly Keys = new Array<TKey>();
    //
    public SetCapacity(size: number): void
    {

    }
    //
    public Add(key: TKey): void
    {
        let offset = this.IndexOf(key);
        if (offset >= this.Count)
        {
            this.Keys.push(key);
        }
    }
    //
    public Contain(key: TKey): boolean
    {
        return this.IndexOf(key) < this.Count;
    }
    //
    public Remove(key: TKey): boolean
    {
        let offset = this.IndexOf(key);
        if (offset < this.Count)
        {
            this.Keys.splice(offset, 1);
            return true;
        }
        else
        {
            return false;
        }
    }
    //
    public ContainAsRaw(key: number | string): boolean
    {
        return this.IndexOfAsRaw(key, this.KeyIdentificate) < this.Count;
    }
    //
    public RemoveAsRaw(key: number | string): boolean
    {
        let offset = this.IndexOfAsRaw(key, this.KeyIdentificate);
        if (offset < this.Count)
        {
            this.Keys.splice(offset, 1);
            return true;
        }
        else
        {
            return false;
        }
    }
    //
    public Clear(): void
    {
        this.Keys.splice(0, this.Keys.length);
    }
    //
    public toString(): string
    {
        let strBuilder = new ViStringBuilder();
        let keyList = this.Keys;
        let count = keyList.length;
        strBuilder.Append("([").Append(count.toString()).Append("]");
        for (let iter = 0; iter < count; ++iter)
        {
            if (iter != 0)
            {
                strBuilder.Append(",");
            }
            strBuilder.Append(keyList[iter].toString());
        }
        strBuilder.Append(")");
        return strBuilder.Value;
    }
    //
    private IndexOf(key: TKey): number
    {
        let keys = this.Keys;
        let count = keys.length;
        if (this.EqualsFunc != null)
        {
            let EqualsFunc = this.EqualsFunc.bind(this);
            for (let iter = 0; iter < count; ++iter)
            {
                if (EqualsFunc(key, keys[iter]))
                {
                    return iter;
                }
            }
        }
        else
        {
            for (let iter = 0; iter < count; ++iter)
            {
                if (key == keys[iter])
                {
                    return iter;
                }
            }
        }
        return count;
    }
    //
    private IndexOfAsRaw(key: number | string, keyValue: ViDelegateRT1<number | string, TKey>): number
    {
        let keys = this.Keys;
        let count = keys.length;
        for (let iter = 0; iter < count; ++iter)
        {
            if (key == keyValue(keys[iter]))
            {
                return iter;
            }
        }
        //
        return count;
    }
}

export class ViList<TValue>
{
    public get Values(): Array<TValue> { return this._array; }
    public get Count(): number { return this._count; }
    public get Empty(): boolean { return this._count <= 0; }
    public get NotEmpty(): boolean { return this._count > 0; }
    //
    constructor(capacity?: number)
    {
        if (capacity == undefined)
        {
            capacity = 8;
        }
        //
        this._array = new Array<TValue>(capacity);
    }
    //
    public TrimValues(): Array<TValue>
    {
        if (this._count == this._array.length)
        {
            return this._array;
        }
        else
        {
            return this._array.slice(0, this._count);
        }
    }
    //
    public Pop(): TValue | undefined
    {
        let count = this._count;
        if (count > 0)
        {
            --count;
            let array = this._array;
            let value = array[count];
            array[count] = undefined;
            this._count = count;
            return value;
        }
        else
        {
            return undefined;
        }
    }
    //
    public SetCapacity(value: number): void
    {
        if (value <= this._array.length)
        {
            return;
        }
        //
        let oldArray = this._array;
        let newArray = new Array<TValue>(value);
        for (let iter = 0, count = this._count; iter < count; ++iter)
        {
            newArray[iter] = oldArray[iter];
        }
        this._array = newArray;
    }
    //
    public Push(value: TValue): void
    {
        let array = this._array;
        if (this._count >= array.length)
        {
            this.SetCapacity(array.length * 2);
            array = this._array;
        }
        //
        array[this._count] = value;
        ++this._count;
    }
    //
    public PushEx(count: number, value?: TValue): void
    {
        let array = this._array;
        let newCount = this._count + count;
        if (newCount > array.length)
        {
            this.SetCapacity(ViAssisstant.Max(array.length * 2, newCount));
            array = this._array;
        }
        //
        if (value != undefined)
        {
            for (let iter = this._count; iter < newCount; ++iter)
            {
                array[iter] = value;
            }
        }
        //
        this._count = newCount;
    }
    //
    public PushExx(valueList: ViList<TValue>): void
    {
        let toArray = this._array;
        let newCount = this._count + valueList.Count;
        if (newCount > toArray.length)
        {
            this.SetCapacity(ViAssisstant.Max(toArray.length * 2, newCount));
            toArray = this._array;
        }
        //
        let fromArray = valueList._array;
        for (let iterFrom = 0, iterTo = this._count; iterTo < newCount; ++iterFrom, ++iterTo)
        {
            toArray[iterTo] = fromArray[iterFrom];
        }
        //
        this._count = newCount;
    }
    //
    public PushExxx(valueList: Array<TValue>, start: number, count: number): void
    {
        if (count <= 0)
        {
            return;
        }
        //
        let toArray = this._array;
        let newCount = this._count + count;
        if (newCount > toArray.length)
        {
            this.SetCapacity(ViAssisstant.Max(toArray.length * 2, newCount));
            toArray = this._array;
        }
        //
        for (let iterFrom = start, iterTo = this._count; iterTo < newCount; ++iterFrom, ++iterTo)
        {
            toArray[iterTo] = valueList[iterFrom];
        }
        //
        this._count = newCount;
    }
    //
    public Remove(index: number): TValue | undefined
    {
        if (index < this._count)
        {
            let array = this._array;
            let value = array[index];
            array.splice(index, 1);
            --this._count;
            return value;
        }
        else
        {
            return undefined;
        }
    }
    //
    public RemoveRange(index: number, count: number): void
    {
        if (index < this._count)
        {
            count = ViAssisstant.Min(this._count - index, count);
            if (count > 0)
            {
                this._array.splice(index, count);
                this._count -= count;
            }
        }
    }
    //
    public RemoveValue(value: TValue): number
    {
        let count = 0;
        for (let iter = this._count - 1, array = this._array; iter >= 0; --iter)
        {
            if (array[iter] == value)
            {
                ++count;
                array.splice(iter, 1);
            }
        }
        this._count -= count;
        return count;
    }
    //
    public Insert(index: number, value: TValue): void
    {
        if (index <= this._count)
        {
            this._array.splice(index, 0, value);
            ++this._count;
        }
    }
    //
    public InsertList(index: number, valueList: ViList<TValue>): void
    {
        let Insert = this.Insert.bind(this);
        for (let iter = 0, array = valueList._array, count = valueList.Count; iter < count; ++iter)
        {
            Insert(index + iter, array[iter]);
        }
    }
    //
    public Get(index: number): TValue | undefined
    {
        if (index < this._count)
        {
            return this._array[index];
        }
        else
        {
            return undefined;
        }
    }
    //
    public Set(index: number, value: TValue): void
    {
        if (index < this._count)
        {
            this._array[index] = value;
        }
    }
    //
    public SetValues(start: number, count: number, value: TValue, resize: boolean): void
    {
        let array = this._array;
        let end = start + count;
        if (resize)
        {
            if (end > array.length)
            {
                this.SetCapacity(ViAssisstant.Max(array.length * 2, end));
                array = this._array;
            }
        }
        else
        {
            end = ViAssisstant.Min(end, this._count);
        }
        //
        for (let iter = start; iter < end; ++iter)
        {
            array[iter] = value;
        }
        //
        this._count = end;
    }
    //
    public Clear(): void
    {
        for (let iter = 0; iter < this._count; ++iter)
        {
            this._array[iter] = undefined;
        }
        this._count = 0;
    }
    //
    public toString(): string
    {
        let strBuilder = new ViStringBuilder();
        let count = this.Count;
        let array = this._array;
        strBuilder.Append("([").Append(count.toString()).Append("]");
        for (let iter = 0; iter < count; ++iter)
        {
            if (iter != 0)
            {
                strBuilder.Append(",");
            }
            strBuilder.Append(array[iter].toString());
        }
        strBuilder.Append(")");
        return strBuilder.Value;
    }
    //
    private _count = 0;
    private _array: Array<TValue> = null;
}

export class ViFixArray<TValue>
{
    public constructor(size: number, value: TValue)
    {
        let array = new Array<TValue>(size);
        for (let iter = 0; iter < size; ++iter)
        {
            array[iter] = value;
        }
        //
        this._array = array;
    }
    //
    public get Size(): number
    {
        return this._array.length;
    }
    //
    public Get(index: number): TValue | undefined
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
    public Set(index: number, value: TValue): void
    {
        let array = this._array;
        if (index < array.length)
        {
            array[index] = value;
        }
    }
    //
    private readonly _array: Array<TValue> = null;
}

export class ViLoopVector<TValue>
{
    public get Start(): number { return this._start; }
    public get Count(): number { return this._count; }
    public get Size(): number { return this._array.length; }
    public get Full(): boolean { return this._count >= this._array.length; }
    //
    public Resize(size: number, emptyValue: TValue): void
    {
        let newCount = ViAssisstant.Min(this._count, size);
        let deltaCount = this._count - newCount;
        let oldArray = this._array;
        let newArray = new Array<TValue>(size);
        this._CopyTo(oldArray, this._start + deltaCount, newCount, newArray);
        for (let iter = newCount; iter < newArray.length; ++iter)
        {
            newArray[iter] = emptyValue;
        }
        this._start = 0;
        this._count = newCount;
        this._array = newArray;
    }
    //
    public Get(idx: number): TValue | undefined
    {
        let array = this._array;
        if (array.length > 0 && idx < this._count)
        {
            let uiOffset = (this._start + idx) % array.length;
            return array[uiOffset];
        }
        else
        {
            return undefined;
        }
    }
    //
    public Update(idx: number, value: TValue): void
    {
        let array = this._array;
        if (array.length > 0 && idx < this._count)
        {
            let uiOffset = (this._start + idx) % array.length;
            array[uiOffset] = value;
        }
    }
    //
    public GetFront(): TValue | undefined
    {
        let array = this._array;
        if (array.length > 0 && this._count > 0)
        {
            return array[this._start];
        }
        else
        {
            return undefined;
        }
    }
    //
    public GetBack(): TValue | undefined
    {
        let array = this._array;
        if (array.length > 0 && this._count > 0)
        {
            let index = (this._start + this._count - 1) % array.length;
            return array[index];
        }
        else
        {
            return undefined;
        }
    }
    //
    public Pop(): TValue | undefined
    {
        if (this._count > 0)
        {
            let value = this._array[this._start];
            //
            this._start = this.NextIdx(this._start);
            --this._count;
            return value;
        }
        else
        {
            return undefined;
        }
    }
    //
    public Push(value: TValue): void
    {
        let array = this._array;
        let size = array.length;
        if (size > 0)
        {
            let end = (this._start + this._count) % size;
            array[end] = value;
            //
            if (this._count >= size)
            {
                this._start = this.NextIdx(this._start);
            }
            else
            {
                ++this._count;
            }
        }
    }
    //
    public PushEx(valueList: ViList<TValue>): void
    {
        let array = this._array;
        let size = array.length;
        if (size <= 0)
        {
            return;
        }
        //
        let count = this._count;
        let start = this._start;
        for (let iter = 0, list = valueList.Values, len = valueList.Count; iter < len; ++iter)
        {
            let iterEnd = (start + count) % size;
            array[iterEnd] = list[iter];
            //
            if (count >= size)
            {
                ++start;
                if (start >= size)
                {
                    start = 0;
                }
            }
            else
            {
                ++count;
            }
        }
        //
        this._count = count;
        this._start = start;
    }
    //
    public Clear(destroySize: boolean): void
    {
        this._start = 0;
        this._count = 0;
        if (destroySize)
        {
            this._array.splice(0, this._array.length);
        }
    }
    //
    private NextIdx(idx: number): number
    {
        ++idx;
        if (idx >= this._array.length)
        {
            idx = 0;
        }
        return idx;
    }
    //
    private _CopyTo(fromList: Array<TValue>, start: number, count: number, toList: Array<TValue>): void
    {
        let size = fromList.length;
        let end = start + count;
        let end0 = ViAssisstant.Min(end, size);
        let iterTo = 0;
        for (let iter = start; iter < end0; ++iter)
        {
            toList[iterTo] = fromList[iter];
            ++iterTo;
        }
        //
        if (end > size)
        {
            let end1 = end - size;
            for (let iter = 0; iter < end1; ++iter)
            {
                toList[iterTo] = fromList[iter];
                ++iterTo;
            }
        }
    }
    //
    private _start: number = 0;
    private _count: number = 0;
    private _array = new Array<TValue>();
}

export class ViMemoryAllocator<T>
{
    public static readonly GlobalList = new ViList<ViMemoryAllocator<any>>();
    //
    constructor(alloc: { new(): T; }, type: string, name?: string, reset?: { (obj: T): void })
    {
        this._alloc = alloc;
        this._type = type;
        if (name != undefined)
        {
            this._name = name;
        }
        if (reset != undefined)
        {
            this._reset = reset;
        }
        //
        ViMemoryAllocator.GlobalList.Push(this);
    }
    public get Type(): string { return this._type; }
    public get Name(): string { return this._name; }
    public get List(): ViList<T> { return this._freeList; }
    public get UsedCount(): number { return this._usedCount; }
    public get FreeCount(): number { return this._freeList.Count; }
    public get AllocFunc(): { new(): T; } { return this._alloc; }
    public Alloc(): T 
    {
        ++this._usedCount;
        let freeList = this._freeList;
        if (freeList.Count > 0)
        {
            let obj = freeList.Pop();
            if (this._reset != null)
            {
                this._reset.bind(undefined)(obj);
            }
            return obj;
        }
        else
        {
            return new this._alloc();
        }
    }
    //
    public Free(obj: T): void
    {
        // if (this._freeList.Contain(obj))
        // {
        //     return;
        // }
        //
        --this._usedCount;
        this._freeList.Push(obj);
    }
    //
    public FreeArray(array: Array<T>, clear: boolean): void
    {
        let Push = this._freeList.Push.bind(this._freeList);
        for (let iter = 0, count = array.length; iter < count; ++iter)
        {
            Push(array[iter]);
        }
        this._usedCount -= array.length;
        if (clear)
        {
            array.splice(0, array.length);
        }
    }
    //
    public FreeList(list: ViList<T>, clear: boolean): void
    {
        let Push = this._freeList.Push.bind(this._freeList);
        for (let iter = 0, array = list.Values, count = list.Count; iter < count; ++iter)
        {
            Push(array[iter]);
        }
        this._usedCount -= list.Count;
        if (clear)
        {
            list.Clear();
        }
    }
    //
    public Clear(func: { (obj: T): void }): void
    {
        if (func != null)
        {
            let Func = func.bind(null);
            for (let iter = 0, count = this._freeList.Count; iter < count; ++iter)
            {
                let iterObj = this._freeList.Get(iter);
                Func(iterObj);
                this._freeList.Set(iter, null);
            }
        }
        else
        {
            for (let iter = 0, count = this._freeList.Count; iter < count; ++iter)
            {
                this._freeList.Set(iter, null);
            }
        }
        this._freeList.Clear();
    }
    //
    private _alloc: { new(): T; };
    private _name: string = "";
    private _type: string = "";
    private _reset: { (obj: T): void } = null;
    private _usedCount: number = 0;
    private readonly _freeList = new ViList<T>();
}

export interface ViSerialiable
{
    PrintTo(stream: ViOStream): void;
    ReadFrom(stream: ViIStream): void;
    Print(stream: ViStringBuilder): void;
    ReadFromString(stream: ViStringIStream): void;
    CopyFrom(other: ViSerialiable): void;
}

export class Int8 implements ViSerialiable
{
    public static readonly CacheAllocator = new ViMemoryAllocator<Int8>(Int8, "Int8");
    public static Equals(left: UInt32, right: UInt32): boolean
    {
        return left.Value == right.Value;
    }
    public static KeyValue(value: Int8): number
    {
        return value.Value;
    }
    public static HashCode(value: Int8): number
    {
        return value.Value;
    }
    public constructor(value?: number)
    {
        if (value != undefined)
        {
            this.Value = ViAssisstant.Int8Near(value);
        }
    }
    public Print(stream: ViStringBuilder): void
    {
        stream.Append(this.Value.toString());
    }
    public PrintTo(stream: ViOStream): void
    {
        stream.AppendInt8(this.Value);
    }
    public ReadFrom(stream: ViIStream): void
    {
        this.Value = stream.ReadInt8();
    }
    public ReadFromString(stream: ViStringIStream): void
    {
        this.Value = stream.ReadInt8();
    }
    public CopyFrom(other: Int8): void
    {
        this.Value = other.Value;
    }
    public toString(): string
    {
        return this.Value.toString();
    }
    public Value: number = 0;
}

export class UInt8 implements ViSerialiable
{
    public static readonly CacheAllocator = new ViMemoryAllocator<UInt8>(UInt8, "UInt8");
    public static readonly Zero = new UInt8(0);
    //
    public static Equals(left: UInt32, right: UInt32): boolean
    {
        return left.Value == right.Value;
    }
    public static KeyValue(value: UInt8): number
    {
        return value.Value;
    }
    public static HashCode(value: UInt8): number
    {
        return value.Value;
    }
    public constructor(value?: number)
    {
        if (value != undefined)
        {
            this.Value = ViAssisstant.UInt8Near(value);
        }
    }
    public Print(stream: ViStringBuilder): void
    {
        stream.Append(this.Value.toString());
    }
    public PrintTo(stream: ViOStream): void
    {
        stream.AppendUInt8(this.Value);
    }
    public ReadFrom(stream: ViIStream): void
    {
        this.Value = stream.ReadUInt8();
    }
    public ReadFromString(stream: ViStringIStream): void
    {
        this.Value = stream.ReadUInt8();
    }
    public CopyFrom(other: UInt8): void
    {
        this.Value = other.Value;
    }
    public toString(): string
    {
        return this.Value.toString();
    }
    public Value: number = 0;
}

export class Int16 implements ViSerialiable
{
    public static readonly CacheAllocator = new ViMemoryAllocator<Int16>(Int16, "Int16");
    public static Equals(left: UInt32, right: UInt32): boolean
    {
        return left.Value == right.Value;
    }
    public static KeyValue(value: Int16): number
    {
        return value.Value;
    }
    public static HashCode(value: Int16): number
    {
        return value.Value;
    }
    public constructor(value?: number)
    {
        if (value != undefined)
        {
            this.Value = ViAssisstant.Int16Near(value);
        }
    }
    public Print(stream: ViStringBuilder): void
    {
        stream.Append(this.Value.toString());
    }
    public PrintTo(stream: ViOStream): void
    {
        stream.AppendInt16(this.Value);
    }
    public ReadFrom(stream: ViIStream): void
    {
        this.Value = stream.ReadInt16();
    }
    public ReadFromString(stream: ViStringIStream): void
    {
        this.Value = stream.ReadInt16();
    }
    public CopyFrom(other: Int16): void
    {
        this.Value = other.Value;
    }
    public toString(): string
    {
        return this.Value.toString();
    }
    public Value: number = 0;
}

export class UInt16 implements ViSerialiable
{
    public static readonly CacheAllocator = new ViMemoryAllocator<UInt16>(UInt16, "UInt16");
    public static Equals(left: UInt32, right: UInt32): boolean
    {
        return left.Value == right.Value;
    }
    public static KeyValue(value: UInt16): number
    {
        return value.Value;
    }
    public static HashCode(value: UInt16): number
    {
        return value.Value;
    }
    public constructor(value?: number)
    {
        if (value != undefined)
        {
            this.Value = ViAssisstant.UInt16Near(value);
        }
    }
    public Print(stream: ViStringBuilder): void
    {
        stream.Append(this.Value.toString());
    }
    public PrintTo(stream: ViOStream): void
    {
        stream.AppendUInt16(this.Value);
    }
    public ReadFrom(stream: ViIStream): void
    {
        this.Value = stream.ReadUInt16();
    }
    public ReadFromString(stream: ViStringIStream): void
    {
        this.Value = stream.ReadUInt16();
    }
    public CopyFrom(other: UInt16): void
    {
        this.Value = other.Value;
    }
    public toString(): string
    {
        return this.Value.toString();
    }
    public Value: number = 0;
}

export class Int32 implements ViSerialiable
{
    public static readonly CacheAllocator = new ViMemoryAllocator<Int32>(Int32, "Int32");
    public static readonly ZERO = new Int32(0);
    public static Equals(left: UInt32, right: UInt32): boolean
    {
        return left.Value == right.Value;
    }
    public static KeyValue(value: Int32): number
    {
        return value.Value;
    }
    public static HashCode(value: Int32): number
    {
        return value.Value;
    }
    public constructor(value?: number)
    {
        if (value != undefined)
        {
            this.Value = ViAssisstant.Int32Near(value);
        }
    }
    public Print(stream: ViStringBuilder): void
    {
        stream.Append(this.Value.toString());
    }
    public PrintTo(stream: ViOStream): void
    {
        stream.AppendInt32(this.Value);
    }
    public ReadFrom(stream: ViIStream): void
    {
        this.Value = stream.ReadInt32();
    }
    public ReadFromString(stream: ViStringIStream): void
    {
        this.Value = stream.ReadInt32();
    }
    public CopyFrom(other: Int32): void
    {
        this.Value = other.Value;
    }
    public toString(): string
    {
        return this.Value.toString();
    }
    public Value: number = 0;
}

export class UInt32 implements ViSerialiable
{
    public static readonly CacheAllocator = new ViMemoryAllocator<UInt32>(UInt32, "UInt32");
    public static readonly ZERO = new UInt32(0);
    public static Equals(left: UInt32, right: UInt32): boolean
    {
        return left.Value == right.Value;
    }
    public static KeyValue(value: UInt32): number
    {
        return value.Value;
    }
    public static HashCode(value: UInt32): number
    {
        return value.Value;
    }
    public constructor(value?: number)
    {
        if (value != undefined)
        {
            this.Value = ViAssisstant.UInt32Near(value);
        }
    }
    public Print(stream: ViStringBuilder): void
    {
        stream.Append(this.Value.toString());
    }
    public PrintTo(stream: ViOStream): void
    {
        stream.AppendUInt32(this.Value);
    }
    public ReadFrom(stream: ViIStream): void
    {
        this.Value = stream.ReadUInt32();
    }
    public ReadFromString(stream: ViStringIStream): void
    {
        this.Value = stream.ReadUInt32();
    }
    public CopyFrom(other: UInt32): void
    {
        this.Value = other.Value;
    }
    public toString(): string
    {
        return this.Value.toString();
    }
    public Value: number = 0;
}

export class Int64 implements ViSerialiable
{
    public static readonly CacheAllocator = new ViMemoryAllocator<Int64>(Int64, "Int64");
    public static Equals(left: Int64, right: Int64): boolean
    {
        return left.Value.Equal(right.Value);
    }
    public static KeyValue(value: Int64): string
    {
        return value.Value.ToString();
    }
    public static HashCode(value: Int64): number
    {
        return value.Value.Low + value.Value.High;
    }
    public constructor(value?: NumberI64)
    {
        if (value != null)
        {
            this.Value.CopyFrom(value);
        }
    }
    public Print(stream: ViStringBuilder): void
    {
        stream.Append(this.Value.ToString());
    }
    public PrintTo(stream: ViOStream): void
    {
		stream.AppendInt64(this.Value);
    }
    public ReadFrom(stream: ViIStream): void
    {
		stream.ReadInt64(this.Value);
    }
    public ReadFromString(stream: ViStringIStream): void
    {
        stream.ReadInt64(this.Value);
    }
    public CopyFrom(other: Int64): void
    {
        this.Value.Set(other.Value.High, other.Value.Low);
    }
    public CopyFromEx(other: NumberUI64): Int64
    {
        this.Value.Set(other.High, other.Low);
        return this;
    }
    public toString(): string
    {
        return this.Value.ToString();
    }
    public readonly Value = new NumberI64(0, 0);
}

export class UInt64 implements ViSerialiable
{
    public static readonly CacheAllocator = new ViMemoryAllocator<UInt64>(UInt64, "UInt64");
    public static Equals(left: UInt64, right: UInt64): boolean
    {
        return left.Value.Equal(right.Value);
    }
    public static KeyValue(value: UInt64): string
    {
        return value.Value.ToString();
    }
    public static HashCode(value: UInt64): number
    {
        return value.Value.Low + value.Value.High;
    }
    public constructor(value?: NumberUI64)
    {
        if (value != null)
        {
            this.Value.CopyFrom(value);
        }
    }
    public Print(stream: ViStringBuilder): void
    {
        stream.Append(this.Value.ToString());
    }
    public PrintTo(stream: ViOStream): void
    {
		stream.AppendUInt64(this.Value);
    }
    public ReadFrom(stream: ViIStream): void
    {
		stream.ReadUInt64(this.Value);
    }
    public ReadFromString(stream: ViStringIStream): void
    {
        stream.ReadUInt64(this.Value);
    }
    public CopyFrom(other: UInt64): void
    {
        this.Value.Set(other.Value.High, other.Value.Low);
    }
    public CopyFromEx(other: NumberUI64): UInt64
    {
        this.Value.Set(other.High, other.Low);
        return this;
    }
    public toString(): string
    {
        return this.Value.ToString();
    }
    public readonly Value = new NumberUI64(0, 0);
}

export class float implements ViSerialiable
{
    public static LARGE: number = 3.0e+38;
    public static readonly CacheAllocator = new ViMemoryAllocator<float>(float, "float");
    public static Equals(left: float, right: float): boolean
    {
        return left.Value == right.Value;
    }
    public static KeyValue(value: float): number
    {
        return value.Value;
    }
    public constructor(value?: number)
    {
        if (value)
        {
            this.Value = value;
        }
    }
    public Print(stream: ViStringBuilder): void
    {
        stream.Append(this.Value.toString());
    }
    public PrintTo(stream: ViOStream): void
    {
        stream.AppendFloat32(this.Value);
    }
    public ReadFrom(stream: ViIStream): void
    {
        this.Value = stream.ReadFloat32();
    }
    public ReadFromString(stream: ViStringIStream): void
    {
        this.Value = stream.ReadFloat32();
    }
    public CopyFrom(other: float): void
    {
        this.Value = other.Value;
    }
    public toString(): string
    {
        return this.Value.toString();
    }
    public Value: number = 0;
}

export class double implements ViSerialiable
{
    public static readonly CacheAllocator = new ViMemoryAllocator<double>(double, "double");
    public static Equals(left: double, right: double): boolean
    {
        return left.Value == right.Value;
    }
    public static KeyValue(value: double): number
    {
        return value.Value;
    }
    public constructor(value?: number)
    {
        if (value != undefined)
        {
            this.Value = value;
        }
    }
    public Print(stream: ViStringBuilder): void
    {
        stream.Append(this.Value.toString());
    }
    public PrintTo(stream: ViOStream): void
    {
        stream.AppendFloat64(this.Value);
    }
    public ReadFrom(stream: ViIStream): void
    {
        this.Value = stream.ReadFloat64();
    }
    public ReadFromString(stream: ViStringIStream): void
    {
        this.Value = stream.ReadFloat64();
    }
    public CopyFrom(other: double): void
    {
        this.Value = other.Value;
    }
    public toString(): string
    {
        return this.Value.toString();
    }
    public Value: number = 0;
}

export class ViString implements ViSerialiable
{
    public static readonly CacheAllocator = new ViMemoryAllocator<ViString>(ViString, "ViString");
    public static Equals(left: ViString, right: ViString): boolean
    {
        if (left != undefined && left != null && right != undefined && right != null)
        {
            return left.Value == right.Value;
        }
        else
        {
            return false;
        }
    }
    public static Equals2(left: string, right: string): boolean
    {
        if (left != undefined && left != null && right != undefined && right != null)
        {
            return left == right;
        }
        else
        {
            return false;
        }
    }
    public static EqualsIgnoreCase(left: string, right: string): boolean
    {
        if (left != undefined && left != null && right != undefined && right != null)
        {
            if (left.length == right.length)
            {
                let CharEqualIgnoreCase = ViString.CharEqualIgnoreCase;
                let leftCharCodeAt = left.charCodeAt.bind(left);
                let rightCharCodeAt = right.charCodeAt.bind(right);
                for (let iter = 0, len = left.length; iter < len; ++iter)
                {
                    if (!CharEqualIgnoreCase(leftCharCodeAt(iter), rightCharCodeAt(iter)))
                    {
                        return false;
                    }
                }
                //
                return true;
            }
            else
            {
                return false;
            }
        }
        else
        {
            return false;
        }
    }
    public static CharEqualIgnoreCase(left: number, right: number): boolean
    {
        // 65:A/90:Z/97:a/122:z/a-A=32
        if (left == right)
        {
            return true;
        }
        else if (left < right)
        {
            if (65 <= left && left <= 90)
            {
                return left + 32 == right;
            }
            else
            {
                return false;
            }
        }
        else
        {
            if (97 <= left && left <= 122)
            {
                return left - 32 == right;
            }
            else
            {
                return false;
            }
        }
    }
    public static StartWith(value: string, head: string): boolean
    {
        if (value == null || value == undefined)
        {
            return false;
        }
        if (value.length < head.length)
        {
            return false;
        }
        //
        let len = head.length;
        let valueCharCodeAt = value.charCodeAt.bind(value);
        let headCharCodeAt = head.charCodeAt.bind(head);
        for (let iter = 0; iter < len; ++iter)
        {
            if (valueCharCodeAt(iter) != headCharCodeAt(iter))
            {
                return false;
            }
        }
        return true;
    }
    public static StartWithIgnoreCase(value: string, head: string): boolean
    {
        if (value == null || value == undefined)
        {
            return false;
        }
        if (value.length < head.length)
        {
            return false;
        }
        //
        let len = head.length;
        for (let iter = 0; iter < len; ++iter)
        {
            let CharEqualIgnoreCase = ViString.CharEqualIgnoreCase;
            if (!CharEqualIgnoreCase(value.charCodeAt(iter), head.charCodeAt(iter)))
            {
                return false;
            }
        }
        return true;
    }
    public static KeyValue(value: ViString): string
    {
        return value.Value;
    }
    public static HashCode(value: ViString): number
    {
        return value.HashValue;
    }
    public static HashCodeEx(value: string): number
    {
        let code = 0;
        let charCodeAt = value.charCodeAt.bind(value);
        for (let iter = 0, len = value.length; iter < len; ++iter)
        {
            code += charCodeAt(iter);
        }
        return code;
    }
    public constructor(value?: string)
    {
        if (value != undefined && value != null)
        {
            this._value = value;
        }
    }
    public get Value(): string { return this._value; }
    public set Value(value: string)
    {
        this._value = value;
        this._hashValue = undefined;
    }
    public Print(stream: ViStringBuilder): void
    {
        stream.Append(this.Value);
    }
    public static readonly Empty = "";
    public static IsNullOrEmpty(str: string): boolean
    {
        return str == null || str.length <= 0;
    }
    public static NotNullAndEmpty(str: string): boolean
    {
        return str != null && str.length > 0;
    }
    public get Empty(): boolean { return this.Value == null || this.Value.length <= 0;; }
    public get NotEmpty(): boolean { return this.Value != null && this.Value.length > 0; }
    public PrintTo(stream: ViOStream): void
    {
        stream.AppendString(this.Value);
    }
    public ReadFrom(stream: ViIStream): void
    {
        this._value = stream.ReadString();
        this._hashValue = undefined;
    }
    public ReadFromString(stream: ViStringIStream): void
    {
        this._value = stream.ReadString();
        this._hashValue = undefined;
    }
    public CopyFrom(other: ViString)
    {
        this._value = other.Value;
        this._hashValue = other._hashValue;
    }
    public toString(): string
    {
        return this.Value;
    }
    public get HashValue(): number
    {
        if (this._hashValue == undefined)
        {
            this._hashValue = ViString.HashCodeEx(this.Value);
        }
        //
        return this._hashValue;
    }
    private _value: string = "";
    private _hashValue: number = undefined;
}

export class ViValueList<TValue extends ViSerialiable>
{
    public get Array(): Array<TValue> { return this._array; }
    public get Count(): number { return this._count; }
    public get Empty(): boolean { return this._count <= 0; }
    public get NotEmpty(): boolean { return this._count > 0; }
    //
    constructor()
    {
        this._array = new Array<TValue>(0);
    }
    //
    public SetCapacity(value: number, allocator: ViMemoryAllocator<TValue>): void
    {
        if (value <= this._array.length)
        {
            return;
        }
        //
        let oldArray = this._array;
        let newArray = new Array<TValue>(value);
        for (let iter = 0, count = oldArray.length; iter < count; ++iter)
        {
            newArray[iter] = oldArray[iter];
        }
        for (let iter = oldArray.length, count = newArray.length; iter < count; ++iter)
        {
            newArray[iter] = allocator.Alloc();;
        }
        this._array = newArray;
    }
    //
    public Push(value: TValue, allocator: ViMemoryAllocator<TValue>): void
    {
        let array = this._array;
        if (this._count >= array.length)
        {
            this.SetCapacity(array.length * 2, allocator);
            array = this._array;
        }
        //
        array[this._count].CopyFrom(value);
        ++this._count;
    }
    //
    public PushEx(valueList: ViList<TValue>, allocator: ViMemoryAllocator<TValue>): void
    {
        let toArray = this._array;
        let newCount = this._count + valueList.Count;
        if (newCount > toArray.length)
        {
            this.SetCapacity(ViAssisstant.Max(toArray.length * 2, newCount), allocator);
            toArray = this._array;
        }
        //
        let fromArray = valueList.Values;
        for (let iterFrom = 0, iterTo = this._count; iterTo < newCount; ++iterFrom, ++iterTo)
        {
            toArray[iterTo].CopyFrom(fromArray[iterFrom]);
        }
        //
        this._count = newCount;
    }
    //
    public PushExx(valueList: Array<TValue>, start: number, count: number, allocator: ViMemoryAllocator<TValue>): void
    {
        if (count <= 0)
        {
            return;
        }
        //
        let toArray = this._array;
        let newCount = this._count + count;
        if (newCount > toArray.length)
        {
            this.SetCapacity(ViAssisstant.Max(toArray.length * 2, newCount), allocator);
            toArray = this._array;
        }
        //
        for (let iterFrom = start, iterTo = this._count; iterTo < newCount; ++iterFrom, ++iterTo)
        {
            toArray[iterTo].CopyFrom(valueList[iterFrom]);
        }
        //
        this._count = newCount;
    }
    //
    public Get(index: number): TValue
    {
        if (index < this._count)
        {
            return this._array[index];
        }
        else
        {
            return null;
        }
    }
    //
    public Set(index: number, value: TValue): void
    {
        if (index < this._count)
        {
            this._array[index].CopyFrom(value);
        }
    }
    //
    public ReadFrom(stream: ViIStream, allocator: ViMemoryAllocator<TValue>): void
    {
        let count = stream.ReadPackedSize();
        if (stream.Error)
        {
            return;
        }
        //
        this.SetCapacity(count, allocator);
        this._count = count;
        let array = this._array;
        for (let iter = 0; iter < count; ++iter)
        {
            array[iter].ReadFrom(stream);
        }
    }
    //
    public ReadFromEx(stream: ViIStream, allocator: ViMemoryAllocator<TValue>, func: { (stream: ViIStream, value: TValue): void }): void
    {
        let count = stream.ReadPackedSize();
        if (stream.Error)
        {
            return;
        }
        //
        this.SetCapacity(count, allocator);
        this._count = count;
        let array = this._array;
        let Func = func.bind(null);
        for (let iter = 0; iter < count; ++iter)
        {
            Func(stream, array[iter])
        }
    }
    //
    public Clear(destroy: boolean, allocator: ViMemoryAllocator<TValue>): void
    {
        if (destroy)
        {
            let array = this._array;
            for (let count = array.length, iter = 0; iter < count; ++iter)
            {
                allocator.Free(array[iter]);
            }
            array.splice(0, array.length);
        }
        //
        this._count = 0;
    }
    //
    private _count = 0;
    private _array: Array<TValue> = null;
}

export class ViAssisstantEx
{
    public static GetURLValue(URL: string, name: string): string
    {
        if (ViString.IsNullOrEmpty(URL))
        {
            return ViString.Empty;
        }
        name = name + "=";
        let startIdx = URL.indexOf(name);
        if (startIdx == -1)
        {
            return ViString.Empty;
        }
        startIdx += name.length;
        let endIdx = URL.indexOf('&', startIdx);
        if (endIdx == -1)
        {
            endIdx = URL.length;
        }
        return URL.substring(startIdx, endIdx);
    }
    //
    public static GetURLValueAsInt(URL: string, name: string): number
    {
        return ViAssisstant.Str2Int(ViAssisstantEx.GetURLValue(URL, name));
    }
    //
    public static GetURLValueAsFloat(URL: string, name: string): number
    {
        return ViAssisstant.Str2Float(ViAssisstantEx.GetURLValue(URL, name));
    }
    //
    public static GetURLValueAsBool(URL: string, name: string): boolean
    {
        return ViAssisstant.Str2Bool(ViAssisstantEx.GetURLValue(URL, name));
    }
    //
    public static NewArray<T>(size: number, defaultValue: T): Array<T>
    {
        let array = new Array<T>(size);
        for (let iter = 0; iter < size; ++iter)
        {
            array[iter] = defaultValue;
        }
        return array;
    }
    //
    public static NewArrayEx<T>(size: number, alloc: { new(): T; }, defaultValue?: T): Array<T>
    {
        let array = new Array<T>(size);
        if (alloc != null)        
        {
            for (let iter = 0; iter < size; ++iter)
            {
                array[iter] = new alloc();
            }
        }
        else
        {
            for (let iter = 0; iter < size; ++iter)
            {
                array[iter] = defaultValue;
            }
        }
        return array;
    }
    //
    public static NewArrayEx1<T, TParam0>(size: number, alloc: { new(param0: TParam0): T; }, param0: TParam0): Array<T>
    {
        let array = new Array<T>(size);
        for (let iter = 0; iter < size; ++iter)
        {
            array[iter] = new alloc(param0);
        }
        return array;
    }
    //
    public static NewList<T>(size: number, alloc: { new(): T; }, defaultValue?: T): ViList<T>
    {
        let list = new ViList<T>();
        list.SetCapacity(size);
        if (alloc != null)        
        {
            for (let iter = 0; iter < size; ++iter)
            {
                list.Push(new alloc());
            }
        }
        else
        {
            for (let iter = 0; iter < size; ++iter)
            {
                list.Push(defaultValue);
            }
        }
        return list;
    }
    //
    public static NewLoopList<T>(size: number, defaultValue: T): ViLoopVector<T>
    {
        let list = new ViLoopVector<T>();
        list.Resize(size, defaultValue);
        return list;
    }
    //
    public static ClearArray<T>(array: Array<T>): void
    {
        if (array != null)
        {
            array.splice(0, array.length);
        }
    }
    //
    public static SetValue<T>(array: Array<T>, value: T): void
    {
        for (let iter = 0, count = array.length; iter < count; ++iter)
        {
            array[iter] = value;
        }
    }
    //
    public static CopyTo<T>(from: Array<T>, to: Array<T>, start: number, end: number): void
    {
        end = ViAssisstant.Min3(end, from.length, to.length);
        for (let iter = start; iter < end; ++iter)
        {
            to[iter] = from[iter];
        }
    }
}

export interface ViSerialiableExMember
{
    (This: ViSerialiableEx): ViSerialiable;
}

export class ViSerialiableEx implements ViSerialiable
{
    public ChildList(): ViList<ViSerialiableExMember> { return null; }
    //
    public static AddMember(childList: ViList<ViSerialiableExMember>, property: ViSerialiableExMember): void
    {
        childList.Push(property);
    }
    //
    public Print(stream: ViStringBuilder): void
    {
        let childList = this.ChildList();
        for (let iter = 0, array = childList.Values, count = childList.Count; iter < count; ++iter)
        {
            let iterProperty = array[iter];
            iterProperty(this).Print(stream);
        }
    }
    public PrintTo(stream: ViOStream): void
    {
        let childList = this.ChildList();
        for (let iter = 0, array = childList.Values, count = childList.Count; iter < count; ++iter)
        {
            let iterProperty = array[iter];
            iterProperty(this).PrintTo(stream);
        }
    }
    public ReadFrom(stream: ViIStream): void
    {
        let childList = this.ChildList();
        for (let iter = 0, array = childList.Values, count = childList.Count; iter < count; ++iter)
        {
            let iterProperty = array[iter];
            iterProperty(this).ReadFrom(stream);
        }
    }
    public ReadFromString(stream: ViStringIStream): void
    {
        let childList = this.ChildList();
        for (let iter = 0, array = childList.Values, count = childList.Count; iter < count; ++iter)
        {
            let iterProperty = array[iter];
            iterProperty(this).ReadFromString(stream);
        }
    }
    public CopyFrom(other: ViSerialiableEx): void
    {
        let childList = this.ChildList();
        for (let iter = 0, array = childList.Values, count = childList.Count; iter < count; ++iter)
        {
            let iterProperty = array[iter];
            iterProperty(this).CopyFrom(iterProperty(other));
        }
    }
}

export class ViSerialiableExArray<T> extends ViSerialiableEx
{
    public Get(idx: number): T
    {
        let property = this as any;
        if (idx >= property.Length)
        {
            return property.E0;
        }
        //
        let value: T = null;
        switch (idx) 
        {
            case 0: value = property.E0; break;
            case 1: value = property.E1; break;
            case 2: value = property.E2; break;
            case 3: value = property.E3; break;
            case 4: value = property.E4; break;
            case 5: value = property.E5; break;
            case 6: value = property.E6; break;
            case 7: value = property.E7; break;
            case 8: value = property.E8; break;
            case 9: value = property.E9; break;
            case 10: value = property.E10; break;
            case 11: value = property.E11; break;
            case 12: value = property.E12; break;
            case 13: value = property.E13; break;
            case 14: value = property.E14; break;
            case 15: value = property.E15; break;
            case 16: value = property.E16; break;
            case 17: value = property.E17; break;
            case 18: value = property.E18; break;
            case 19: value = property.E19; break;
            case 20: value = property.E20; break;
            case 21: value = property.E21; break;
            case 22: value = property.E22; break;
            case 23: value = property.E23; break;
            case 24: value = property.E24; break;
            case 25: value = property.E25; break;
            case 26: value = property.E26; break;
            case 27: value = property.E27; break;
            case 28: value = property.E28; break;
            case 29: value = property.E29; break;
            case 30: value = property.E30; break;
            case 31: value = property.E31; break;
            case 32: value = property.E32; break;
            case 33: value = property.E33; break;
            case 34: value = property.E34; break;
            case 35: value = property.E35; break;
            case 36: value = property.E36; break;
            case 37: value = property.E37; break;
            case 38: value = property.E38; break;
            case 39: value = property.E39; break;
            case 40: value = property.E40; break;
            case 41: value = property.E41; break;
            case 42: value = property.E42; break;
            case 43: value = property.E43; break;
            case 44: value = property.E44; break;
            case 45: value = property.E45; break;
            case 46: value = property.E46; break;
            case 47: value = property.E47; break;
            case 48: value = property.E48; break;
            case 49: value = property.E49; break;
            case 50: value = property.E50; break;
            case 51: value = property.E51; break;
            case 52: value = property.E52; break;
            case 53: value = property.E53; break;
            case 54: value = property.E54; break;
            case 55: value = property.E55; break;
            case 56: value = property.E56; break;
            case 57: value = property.E57; break;
            case 58: value = property.E58; break;
            case 59: value = property.E59; break;
            case 60: value = property.E60; break;
            case 61: value = property.E61; break;
            case 62: value = property.E62; break;
            case 63: value = property.E63; break;
            case 64: value = property.E64; break;
            case 65: value = property.E65; break;
            case 66: value = property.E66; break;
            case 67: value = property.E67; break;
            case 68: value = property.E68; break;
            case 69: value = property.E69; break;
            case 70: value = property.E70; break;
            case 71: value = property.E71; break;
            case 72: value = property.E72; break;
            case 73: value = property.E73; break;
            case 74: value = property.E74; break;
            case 75: value = property.E75; break;
            case 76: value = property.E76; break;
            case 77: value = property.E77; break;
            case 78: value = property.E78; break;
            case 79: value = property.E79; break;
            case 80: value = property.E80; break;
            case 81: value = property.E81; break;
            case 82: value = property.E82; break;
            case 83: value = property.E83; break;
            case 84: value = property.E84; break;
            case 85: value = property.E85; break;
            case 86: value = property.E86; break;
            case 87: value = property.E87; break;
            case 88: value = property.E88; break;
            case 89: value = property.E89; break;
            case 90: value = property.E90; break;
            case 91: value = property.E91; break;
            case 92: value = property.E92; break;
            case 93: value = property.E93; break;
            case 94: value = property.E94; break;
            case 95: value = property.E95; break;
            case 96: value = property.E96; break;
            case 97: value = property.E97; break;
            case 98: value = property.E98; break;
            case 99: value = property.E99; break;
            default: value = property.E0;
        }
        return value;
    }
}

// class Demo_SystemType
// {
//     public static Test(): void
//     {
//         let dict: ViDictionary<ViString, ViString> = new ViDictionary<ViString, ViString>();
//         dict.EqualsFunc = ViString.Equals;
//         dict.Set(new ViString("123"), new ViString("1"));
//         dict.Set(new ViString("234"), new ViString("2"));
//         dict.Set(new ViString("345"), new ViString("3"));
//         dict.Contain(new ViString("234"));
//         let stream: ViStringDictionaryStream = new ViStringDictionaryStream();
//         ViSerializer.PrintToStringDictDictionary(dict, "", stream);
//         let log = stream.Print("|", ", ");
//         ViDebuger.Record(log);
//     }
// }