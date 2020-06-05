import { ViList, ViSet, ViSerialiable, ViDictionary, ViFixArray } from "./ViSystemType";
import { NumberI64, NumberUI64 } from "./ViNumber64";
import { ViStringBuilder } from "./ViStringBuilder";
import { ViStringIStream } from "./ViStringIStream";
import { ViOStream } from "./ViOStream";
import { ViIStream } from "./ViIStream";

export class ViSerializer
{
    public static Print<TValue extends ViSerialiable>(value: TValue, stream: ViStringBuilder): void
    {
        value.Print(stream);
    }
    //
    public static PrintList<TValue extends ViSerialiable>(list: ViList<TValue>, stream: ViStringBuilder): void
    {
        let count = list.Count;
        let valueList = list.Values;
        stream.Append("([").Append(count.toString()).Append("]");
        for (let iter = 0; iter < count; ++iter)
        {
            if (iter != 0)
            {
                stream.Append(",");
            }
            valueList[iter].Print(stream);
        }
        stream.Append(")");
    }
    //
    public static PrintSet<TKey extends ViSerialiable>(list: ViSet<TKey>, stream: ViStringBuilder): void
    {
        let count = list.Count;
        let keyList = list.Keys;
        stream.Append("([").Append(count.toString()).Append("]");
        for (let iter = 0; iter < count; ++iter)
        {
            if (iter != 0)
            {
                stream.Append(",");
            }
            keyList[iter].Print(stream);
        }
        stream.Append(")");
    }
    //
    public static PrintDictionary<TKey extends ViSerialiable, TValue extends ViSerialiable>(list: ViDictionary<TKey, TValue>, stream: ViStringBuilder): void
    {
        let count = list.Count;
        let keyList = list.Keys;
        let valueList = list.Values;
        stream.Append("([").Append(count.toString()).Append("]");
        for (let iter = 0; iter < count; ++iter)
        {
            if (iter != 0)
            {
                stream.Append(",");
            }
            stream.Append("<")
            keyList[iter].Print(stream);
            stream.Append(",");
            valueList[iter].Print(stream);
            stream.Append(">")
        }
        stream.Append(")");
    }
    //
    public static PrintTo<TValue extends ViSerialiable>(value: TValue, stream: ViOStream): void
    {
        value.PrintTo(stream);
    }
    //
    public static PrintToList<TValue extends ViSerialiable>(list: ViList<TValue>, stream: ViOStream): void
    {
        let count = list.Count;
        let valueList = list.Values;
        stream.AppendPackedSize(count);
        for (let iter = 0; iter < count; ++iter)
        {
            valueList[iter].PrintTo(stream);
        }
    }
    //
    public static PrintToSet<TKey extends ViSerialiable>(list: ViSet<TKey>, stream: ViOStream): void
    {
        let count = list.Count;
        let keyList = list.Keys;
        stream.AppendPackedSize(count);
        for (let iter = 0; iter < count; ++iter)
        {
            keyList[iter].PrintTo(stream);
        }
    }
    //
    public static PrintToDictionary<TKey extends ViSerialiable, TValue extends ViSerialiable>(list: ViDictionary<TKey, TValue>, stream: ViOStream): void
    {
        let count = list.Count;
        let keyList = list.Keys;
        let valueList = list.Values;
        stream.AppendPackedSize(count);
        for (let iter = 0; iter < count; ++iter)
        {
            keyList[iter].PrintTo(stream);
            valueList[iter].PrintTo(stream);
        }
    }
    //
    public static ReadFrom<TValue extends ViSerialiable>(value: TValue, stream: ViIStream): void
    {
        value.ReadFrom(stream);
    }
    //
    public static ReadFromList<TValue extends ViSerialiable>(list: ViList<TValue>, alloc: { new(): TValue; }, stream: ViIStream): void
    {
        list.Clear();
        let count = stream.ReadPackedSize();
        if (stream.Error)
        {
            return;
        }
        //
        list.SetCapacity(count);
        let Push = list.Push.bind(list);
        for (let iter = 0; iter < count; ++iter)
        {
            let iterValue = new alloc();
            iterValue.ReadFrom(stream);
            Push(iterValue);
        }
    }
    //
    public static ReadFromSet<TKey extends ViSerialiable>(list: ViSet<TKey>, alloc: { new(): TKey; }, stream: ViIStream): void
    {
        list.Clear();
        let count = stream.ReadPackedSize();
        if (stream.Error)
        {
            return;
        }
        //
        list.SetCapacity(count);
        let Add = list.Add.bind(list);
        for (let iter = 0; iter < count; ++iter)
        {
            let iterKey = new alloc();
            iterKey.ReadFrom(stream);
            Add(iterKey);
        }
    }
    //
    public static ReadFromDictionary<TKey extends ViSerialiable, TValue extends ViSerialiable>(list: ViDictionary<TKey, TValue>, allocKey: { new(): TKey; }, allocValue: { new(): TValue; }, stream: ViIStream): void
    {
        list.Clear();
        let count = stream.ReadPackedSize();
        if (stream.Error)
        {
            return;
        }
        //
        list.SetCapacity(count);
        let Set = list.Set.bind(list);
        for (let iter = 0; iter < count; ++iter)
        {
            let iterKey = new allocKey();
            let iterValue = new allocValue();
            iterKey.ReadFrom(stream);
            iterValue.ReadFrom(stream);
            Set(iterKey, iterValue);
        }
    }
    //
    public static ReadFromFixArray<TValue extends ViSerialiable>(list: ViFixArray<TValue>, stream: ViIStream): void
    {
        for (let iter = 0, count = list.Size; iter < count; ++iter)
        {
            let iterValue = list.Get(iter);
            iterValue.ReadFrom(stream);
        }
    }
    //
    public static ReadFromString<TValue extends ViSerialiable>(value: TValue, stream: ViStringIStream): void
    {
        value.ReadFromString(stream);
    }
    //
    public static ReadFromStringList<TValue extends ViSerialiable>(list: ViList<TValue>, alloc: { new(): TValue; }, stream: ViStringIStream): void
    {
        list.Clear();
        let count = stream.ReadInt32();
        if (stream.Error)
        {
            return;
        }
        //
        list.SetCapacity(count);
        for (let iter = 0; iter < count; ++iter)
        {
            let iterValue = new alloc();
            iterValue.ReadFromString(stream);
            list.Push(iterValue);
        }
    }
    //
    public static ReadFromStringSet<TKey extends ViSerialiable>(list: ViSet<TKey>, alloc: { new(): TKey; }, stream: ViStringIStream): void
    {
        list.Clear();
        let count = stream.ReadInt32();
        if (stream.Error)
        {
            return;
        }
        //
        list.SetCapacity(count);
        for (let iter = 0; iter < count; ++iter)
        {
            let iterKey = new alloc();
            iterKey.ReadFromString(stream);
            list.Add(iterKey);
        }
    }
    //
    public static ReadFromStringDictionary<TKey extends ViSerialiable, TValue extends ViSerialiable>(list: ViDictionary<TKey, TValue>, allocKey: { new(): TKey; }, allocValue: { new(): TValue; }, stream: ViStringIStream): void
    {
        list.Clear();
        let count = stream.ReadInt32();
        if (stream.Error)
        {
            return;
        }
        //
        list.SetCapacity(count);
        for (let iter = 0; iter < count; ++iter)
        {
            let iterKey = new allocKey();
            let iterValue = new allocValue();
            iterKey.ReadFromString(stream);
            iterValue.ReadFromString(stream);
            list.Set(iterKey, iterValue);
        }
    }
    //
    public static ReadFromStringFixArray<TValue extends ViSerialiable>(list: ViFixArray<TValue>, stream: ViStringIStream): void
    {
        for (let iter = 0, count = list.Size; iter < count; ++iter)
        {
            let iterValue = list.Get(iter);
            iterValue.ReadFromString(stream);
        }
    }
    //
    public static CopyFrom<TValue extends ViSerialiable>(from: TValue, to: TValue): void
    {
        to.CopyFrom(from);
    }
    //
    public static CopyFromList<TValue extends ViSerialiable>(from: ViList<TValue>, to: ViList<TValue>, alloc: { new(): TValue; }): void
    {
        to.Clear();
        to.SetCapacity(from.Count);
        let valueList = from.Values;
        for (let iter = 0, count = from.Count; iter < count; ++iter)
        {
            let iterValue = new alloc();
            iterValue.CopyFrom(valueList[iter]);
            to.Push(iterValue);
        }
    }
    //
    public static CopyFromSet<TKey extends ViSerialiable>(from: ViSet<TKey>, to: ViSet<TKey>, alloc: { new(): TKey; }): void
    {
        to.Clear();
        to.SetCapacity(from.Count);
        let keyList = from.Keys;
        for (let iter = 0, count = from.Count; iter < count; ++iter)
        {
            let iterKey = new alloc();
            iterKey.CopyFrom(keyList[iter]);
            to.Add(iterKey);
        }
    }
    //
    public static CopyFromDictionary<TKey extends ViSerialiable, TValue extends ViSerialiable>(from: ViDictionary<TKey, TValue>, to: ViDictionary<TKey, TValue>, allocKey: { new(): TKey; }, allocValue: { new(): TValue; }): void
    {
        to.Clear();
        to.SetCapacity(from.Count);
        let keyList = from.Keys;
        let valueList = from.Values;
        for (let iter = 0, count = from.Count; iter < count; ++iter)
        {
            let iterKey = new allocKey();
            iterKey.CopyFrom(keyList[iter]);
            let iterValue = new allocValue();
            iterValue.CopyFrom(valueList[iter]);
            to.Set(iterKey, iterValue);
        }
    }
}

export class ViNumberSerializer
{
    public static Print(value: number, stream: ViStringBuilder): void
    {
        stream.Append(value.toString());
    }
    //
    public static PrintList(list: ViList<number>, stream: ViStringBuilder): void
    {
        let count = list.Count;
        let valueList = list.Values;
        stream.Append("([").Append(count.toString()).Append("]");
        for (let iter = 0; iter < count; ++iter)
        {
            if (iter != 0)
            {
                stream.Append(",");
            }
            stream.Append(valueList[iter].toString());
        }
        stream.Append(")");
    }
    //
    public static PrintSet(list: ViSet<number>, stream: ViStringBuilder): void
    {
        let count = list.Count;
        let keyList = list.Keys;
        stream.Append("([").Append(count.toString()).Append("]");
        for (let iter = 0; iter < count; ++iter)
        {
            if (iter != 0)
            {
                stream.Append(",");
            }
            stream.Append(keyList[iter].toString());
        }
        stream.Append(")");
    }
    //
    public static ReadFromListAsUInt8(list: ViList<number>, stream: ViIStream): void
    {
        list.Clear();
        let count = stream.ReadPackedSize();
        if (stream.Error)
        {
            return;
        }
        //
        list.SetCapacity(count);
        let Push = list.Push.bind(list);
        let Read = stream.ReadUInt8.bind(stream);
        for (let iter = 0; iter < count; ++iter)
        {
            Push(Read());
        }
    }
    //
    public static ReadFromListAsInt8(list: ViList<number>, stream: ViIStream): void
    {
        list.Clear();
        let count = stream.ReadPackedSize();
        if (stream.Error)
        {
            return;
        }
        //
        list.SetCapacity(count);
        let Push = list.Push.bind(list);
        let Read = stream.ReadInt8.bind(stream);
        for (let iter = 0; iter < count; ++iter)
        {
            Push(Read());
        }
    }
    //
    public static ReadFromListAsUInt16(list: ViList<number>, stream: ViIStream): void
    {
        list.Clear();
        let count = stream.ReadPackedSize();
        if (stream.Error)
        {
            return;
        }
        //
        list.SetCapacity(count);
        let Push = list.Push.bind(list);
        let Read = stream.ReadUInt16.bind(stream);
        for (let iter = 0; iter < count; ++iter)
        {
            Push(Read());
        }
    }
    //
    public static ReadFromListAsInt16(list: ViList<number>, stream: ViIStream): void
    {
        list.Clear();
        let count = stream.ReadPackedSize();
        if (stream.Error)
        {
            return;
        }
        //
        list.SetCapacity(count);
        let Push = list.Push.bind(list);
        let Read = stream.ReadInt16.bind(stream);
        for (let iter = 0; iter < count; ++iter)
        {
            Push(Read());
        }
    }
    //
    public static ReadFromListAsUInt24(list: ViList<number>, stream: ViIStream): void
    {
        list.Clear();
        let count = stream.ReadPackedSize();
        if (stream.Error)
        {
            return;
        }
        //
        list.SetCapacity(count);
        let Push = list.Push.bind(list);
        let Read = stream.ReadUInt24.bind(stream);
        for (let iter = 0; iter < count; ++iter)
        {
            Push(Read());
        }
    }
    //
    public static ReadFromListAsUInt24Ex(list: Array<number>, stream: ViIStream): number
    {
        let count = stream.ReadPackedSize();
        if (stream.Error)
        {
            return 0;
        }
        //
        let Read = stream.ReadUInt24.bind(stream);
        for (let iter = 0; iter < count; ++iter)
        {
            list[iter] = Read();
        }
        //
        return count;
    }
    //
    public static ReadFromListAsUInt32(list: ViList<number>, stream: ViIStream): void
    {
        list.Clear();
        let count = stream.ReadPackedSize();
        if (stream.Error)
        {
            return;
        }
        //
        list.SetCapacity(count);
        let Push = list.Push.bind(list);
        let Read = stream.ReadUInt32.bind(stream);
        for (let iter = 0; iter < count; ++iter)
        {
            Push(Read());
        }
    }
    //
    public static ReadFromListAsInt32(list: ViList<number>, stream: ViIStream): void
    {
        list.Clear();
        let count = stream.ReadPackedSize();
        if (stream.Error)
        {
            return;
        }
        //
        list.SetCapacity(count);
        let Push = list.Push.bind(list);
        let Read = stream.ReadInt32.bind(stream);
        for (let iter = 0; iter < count; ++iter)
        {
            Push(Read());
        }
    }
    //
    public static ReadFromListAsUInt64Ex(list: Array<NumberUI64>, stream: ViIStream): number
    {
        let count = stream.ReadPackedSize();
        if (stream.Error)
        {
            return 0;
		}
		//
		for (let iter = 0; iter < count; ++iter)
		{
			let iterValue = list[iter];
			stream.ReadUInt64(iterValue);
		}
		//
		return count;
	}
    //
    public static ReadFromListAsInt64Ex(list: Array<NumberI64>, stream: ViIStream): number
    {
        let count = stream.ReadPackedSize();
        if (stream.Error)
        {
            return 0;
        }
        //
        for (let iter = 0; iter < count; ++iter)
        {
			let iterValue = list[iter];
			stream.ReadInt64(iterValue);
        }
        //
        return count;
    }
    //
    public static ReadFromListAsFloat32(list: ViList<number>, stream: ViIStream): void
    {
        list.Clear();
        let count = stream.ReadPackedSize();
        if (stream.Error)
        {
            return;
        }
        //
        list.SetCapacity(count);
        let Push = list.Push.bind(list);
        let Read = stream.ReadFloat32.bind(stream);
        for (let iter = 0; iter < count; ++iter)
        {
            Push(Read());
        }
    }
    //
    public static ReadFromListAsFloat64(list: ViList<number>, stream: ViIStream): void
    {
        list.Clear();
        let count = stream.ReadPackedSize();
        if (stream.Error)
        {
            return;
        }
        //
        list.SetCapacity(count);
        let Push = list.Push.bind(list);
        let Read = stream.ReadFloat64.bind(stream);
        for (let iter = 0; iter < count; ++iter)
        {
            Push(Read());
        }
    }
}

export class ViStringSerializer
{
    public static Print(value: string, stream: ViStringBuilder): void
    {
        stream.Append(value);
    }
    //
    public static PrintList(list: ViList<string>, stream: ViStringBuilder): void
    {
        let count = list.Count;
        let valueList = list.Values;
        stream.Append("([").Append(count.toString()).Append("]");
        for (let iter = 0; iter < count; ++iter)
        {
            if (iter != 0)
            {
                stream.Append(",");
            }
            stream.Append(valueList[iter]);
        }
        stream.Append(")");
    }
    // //
    // public static PrintSet(list: ViSet<string>, stream: ViStringBuilder): void
    // {
    //     let count = list.Count;
    //     let keyList = list.Keys;
    //     stream.Append("([").Append(count.toString()).Append("]");
    //     for (let iter = 0; iter < count; ++iter)
    //     {
    //         if (iter != 0)
    //         {
    //             stream.Append(",");
    //         }
    //         stream.Append(keyList[iter]);
    //     }
    //     stream.Append(")");
    // }
    //
    public static ReadFromList(list: ViList<string>, stream: ViIStream): void
    {
        list.Clear();
        let count = stream.ReadPackedSize();
        if (stream.Error)
        {
            return;
        }
        //
        list.SetCapacity(count);
        let Push = list.Push.bind(list);
        let Read = stream.ReadString.bind(stream);
        for (let iter = 0; iter < count; ++iter)
        {
            Push(Read());
        }
    }
    //
    public static PrintToList(list: ViList<string>, stream: ViOStream): void
    {
        let count = list.Count;
        stream.AppendPackedSize(count);
        let Append = stream.AppendString.bind(stream);
        for (let iter = 0; iter < count; ++iter)
        {
            Append(list.Get(iter));
        }
    }
}

// class Demo_Serialize
// {
//     public static Test(): void
//     {
//         let list: ViDictionary<Int16, Int32> = new ViDictionary<Int16, Int32>();
//         list.Set(new Int16(0), new Int32(100));
//         list.Set(new Int16(1), new Int32(101));
//         list.Set(new Int16(2), new Int32(102));
//         let oStream: ViOStream = new ViOStream();
//         ViSerializer.PrintToDictionary(list, oStream);
//         list.Clear();
//         let iStream: ViIStream = new ViIStream();
//         iStream.Init(oStream.Cache, 0, oStream.Length);
//         ViSerializer.ReadFromDictionary(list, Int16, Int32, iStream);
//         let log: ViStringBuilder = new ViStringBuilder();
//         ViSerializer.PrintDictionary(list, log);
//         console.log(log.Value);
//     }
// }

