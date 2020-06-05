import { ViAssisstant } from "../ViSystem/ViSystemConfig";
import { ViList } from "../ViSystem/ViSystemType";
import { ViStringSerializer } from "../ViSystem/ViSerializer";
import { ViDoubleLinkNode, ViDoubleLink } from "./ViDoubleLink";
import { ViStringHashMap } from "./ViHashMap";
import { ViIStream } from "../ViSystem/ViIStream";
import { ViDelegateRT1, ViDelegate2, ViDelegateAssisstant } from "../ViSystem/ViDelegate";

export class ViConstValueList<T>
{
    public Value: T;
    public Inited: boolean;
    public readonly List = new ViDoubleLink<T>();
}

export class ViConstValueManager<T>
{
    public SetCapacity(size: number): void
    {
        this._list.SetSlotSize(size);
    }
    //
    public AddValue(name: string, value: T): void
    {
        let valueList = this._list.Get(name);
        if (valueList != undefined)
        {
            valueList.Value = value;
            valueList.Inited = true;
            valueList.List.SetValue(value);
        }
        else
        {
            valueList = new ViConstValueList<T>();
            valueList.Value = value;
            valueList.Inited = true;
            valueList.List.SetValue(value);
            this._list.Add(name, valueList);
        }
    }
    //
    public Attach(name: string, node: ViDoubleLinkNode<T>): void 
    {
        let valueList = this._list.Get(name);
        if (valueList != undefined)
        {
            if (valueList.Inited)
            {
                node.Data = valueList.Value;
            }
            valueList.List.PushBack(node);
        }
        else
        {
            valueList = new ViConstValueList<T>();
            valueList.List.PushBack(node);
            this._list.Add(name, valueList);
        }
    }
    //
    public PrintValue(name: string): T | undefined
    {
        let valueList = this._list.Get(name);
        if (valueList != undefined)
        {
            if (valueList.Inited)
            {
                return valueList.Value;
            }
            else
            {
                return undefined;
            }
        }
        else
        {
            return undefined;
        }
    }
    //
    private readonly _list = new ViStringHashMap<ViConstValueList<T>>();
}

//+-----------------------------------------------------------------------------------------------------------------------------------------------
export class ViConstFloat
{
    public static get ValueList(): ViConstValueManager<number>
    {
        return ViConstFloat._valueList;
    }
    public get Value(): number
    {
        return this._node.Data;
    }
    public constructor(name: string, value: number)
    {
        this._node.Data = value;
        ViConstFloat._valueList.Attach(name, this._node);
    }
    //
    private readonly _node = new ViDoubleLinkNode<number>();
    private static readonly _valueList = new ViConstValueManager<number>();
}

export class ViConstInt
{
    public static readonly ValueList = new ViConstValueManager<number>();
    //
    public get Value(): number
    {
        return this._node.Data;
    }
    public constructor(name: string, value: number)
    {
        this._node.Data = value;
        ViConstInt.ValueList.Attach(name, this._node);
    }
    //
    private readonly _node = new ViDoubleLinkNode<number>();
}

export class ViConstString
{
    public static readonly ValueList = new ViConstValueManager<string>();
    //
    public get Value(): string
    {
        return this._node.Data;
    }
    public constructor(name: string, value: string)
    {
        this._node.Data = value;
        ViConstString.ValueList.Attach(name, this._node);
    }
    //
    private readonly _node = new ViDoubleLinkNode<string>();
}

export class ViConstBoolean
{
    public static readonly ValueList = new ViConstValueManager<boolean>();
    //
    public get Value(): boolean
    {
        return this._node.Data;
    }
    public constructor(name: string, value: boolean)
    {
        this._node.Data = value;
        ViConstBoolean.ValueList.Attach(name, this._node);
    }
    //
    private readonly _node = new ViDoubleLinkNode<boolean>();
}

export class ViConstFloatList
{
    public static readonly ValueList = new ViConstValueManager<Array<number>>();
    //
    public get Value(): Array<number>
    {
        return this._node.Data;
    }
    public constructor(name: string, value: Array<number>)
    {
        this._node.Data = value;
        ViConstFloatList.ValueList.Attach(name, this._node);
    }
    //
    private readonly _node = new ViDoubleLinkNode<Array<number>>();
}

export class ViConstIntList
{
    public static readonly ValueList = new ViConstValueManager<Array<number>>();
    //
    public get Value(): Array<number>
    {
        return this._node.Data;
    }
    public constructor(name: string, value: Array<number>)
    {
        this._node.Data = value;
        ViConstIntList.ValueList.Attach(name, this._node);
    }
    //
    private readonly _node = new ViDoubleLinkNode<Array<number>>();
}

export class ViConstStringList
{
    public static readonly ValueList = new ViConstValueManager<Array<string>>();
    //
    public get Value(): Array<string>
    {
        return this._node.Data;
    }
    public constructor(name: string, value: Array<string>)
    {
        this._node.Data = value;
        ViConstStringList.ValueList.Attach(name, this._node);
    }
    //
    private readonly _node = new ViDoubleLinkNode<Array<string>>();
}

export class ViConstBooleanList
{
    public static readonly ValueList = new ViConstValueManager<Array<boolean>>();
    //
    public get Value(): Array<boolean>
    {
        return this._node.Data;
    }
    public constructor(name: string, value: Array<boolean>)
    {
        this._node.Data = value;
        ViConstBooleanList.ValueList.Attach(name, this._node);
    }
    //
    private readonly _node = new ViDoubleLinkNode<Array<boolean>>();
}

//+-----------------------------------------------------------------------------------------------------------------------------------------------
export class ViConstReader
{
    static Read<T>(valueManager: ViConstValueManager<T>, func: ViDelegateRT1<T, string>, stream: ViIStream, callback: ViDelegate2<string, T>): void
    {
        let count = stream.ReadPackedSize();
        let ReadString = stream.ReadString.bind(stream);
        let AddValue = valueManager.AddValue.bind(valueManager);
        let Invoke2 = ViDelegateAssisstant.Invoke2;
        for (let iter = 0; iter < count; ++iter)
        {
            let name = ReadString();
            let value = func(ReadString());
            AddValue(name, value);
            Invoke2(null, callback, name, value);
        }
    }
    static ReadList<T>(valueManager: ViConstValueManager<Array<T>>, func: ViDelegateRT1<T, string>, stream: ViIStream, callback: ViDelegate2<string, ViList<T>>): void
    {
        let count = stream.ReadPackedSize();
        let ReadString = stream.ReadString.bind(stream);
        let AddValue = valueManager.AddValue.bind(valueManager);
        let Invoke2 = ViDelegateAssisstant.Invoke2;
        let ReadFromList = ViStringSerializer.ReadFromList;
        for (let iter = 0; iter < count; ++iter)
        {
            let name = ReadString();
            let valueStr = new ViList<string>();
            ReadFromList(valueStr, stream);
            let value = new ViList<T>(valueStr.Count);
            for (let iter2 = 0, count2 = valueStr.Count; iter2 < count2; ++iter2)
            {
                value.Push(func(valueStr.Get(iter2)));
            }
            AddValue(name, value.Values);
            Invoke2(null, callback, name, value);
        }
    }
}
// class Test_ConstValue
// {
//     public static Test(): void
//     {
//         let floatValue: ViConstFloat = new ViConstFloat("Float", 0.1);
//         let intValue: ViConstIntList = new ViConstIntList("IntList", [1, 2, 3]);
//         ViConstIntList.ValueList.AddValue("IntList", [1, 2, 3, 4]);
//     }
// }