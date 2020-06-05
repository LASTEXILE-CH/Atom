import { ViSerialiable } from "../ViSystem/ViSystemType";
import { ViDebuger } from "../ViSystem/ViDebuger";
import { ViStringIStream } from "../ViSystem/ViStringIStream";
import { ViStringBuilder } from "../ViSystem/ViStringBuilder";
import { ViEntity } from "../ViGameCommon/Entity/ViEntity";
import { ViReceiveDataNode, ViDataArrayOperator } from "./ViReceiveDataNode";
import { ViIStream } from "../ViSystem/ViIStream";
import { ViOStream } from "../ViSystem/ViOStream";

export class ViNormalDataPtr<TProto extends ViSerialiable> implements ViSerialiable
{
    public static readonly END_SLOT: number = 0XFFFF;
    public static readonly EMPTY_TAG: number = 0;
    public static readonly UN_EMPTY_TAG: number = 255;
    //
    public constructor(valueAlloc: { new(): TProto; })
    {
        this._valueCreator = valueAlloc;
    }
    //
    public get Value(): TProto { return this._value; }
    public get Empty(): boolean { return this._value == null; }
    public get NotEmpty(): boolean { return this._value != null; }
    //
    public ReadFrom(stream: ViIStream): void
    {
        let tag = stream.ReadUInt8();
        if (tag == ViReceiveDataPtr.UN_EMPTY_TAG)
        {
            this._value = new this._valueCreator();
            this._value.ReadFrom(stream);
        }
        else
        {
            this._value = null;
        }
    }
    //
    public ReadFromString(stream: ViStringIStream): void
    {
        ViDebuger.Warning("NormalDataPtr.ReadFromString is empty");
        // let tag: number = stream.ReadUInt8();
        // if (tag == ViReceiveDataPtr.UN_EMPTY_TAG)
        // {
        //     this._data = new this.ContentCreator();
        //     this._data.ReadFrom(stream);
        // }
        // else
        // {
        //     this._data = null;
        // }
    }
    //
    public PrintTo(stream: ViOStream): void
    {
        if (this._value != null)
        {
            stream.AppendUInt8(ViNormalDataPtr.UN_EMPTY_TAG);
            this._value.PrintTo(stream);
        }
        else
        {
            stream.AppendUInt8(ViNormalDataPtr.EMPTY_TAG);
        }
    }
    //
    public Print(stream: ViStringBuilder): void
    {
        if (this.NotEmpty)
        {
            this._value.Print(stream);
        }
        else
        {
            stream.Append("EMPTY");
        }
    }
    //
    public CopyFrom(other: ViNormalDataPtr<TProto>): void
    {
        this.Set(other._value);
    }
    //
    public Set(value: TProto): void
    {
        if (value != null)
        {
            if (this._value == null)
            {
                this._value = new this._valueCreator();
            }
            this._value.CopyFrom(value);
        }
        else
        {
            this._value = null;
        }
    }
    //
    private _value: TProto;
    private _valueCreator: { new(): TProto; };
}


export class ViReceiveDataPtr<TProto extends ViSerialiable> extends ViReceiveDataNode
{
    public static readonly END_SLOT: number = 0XFFFF;
    public static readonly EMPTY_TAG: number = 0;
    public static readonly UN_EMPTY_TAG: number = 255;
    //
    public get Value(): TProto { return this._value; }
    public get NotEmpty(): boolean { return this._value != null; }
    //
    public CopyTo(other: ViNormalDataPtr<TProto>): void
    {
        other.Set(this._value);
    }
    public CopyFrom(other: ViNormalDataPtr<TProto>): void
    {
        if (other.Value != null)
        {
            if (this._value == null)
            {
                this._value = new this._valueCreator();
            }
            this._value.CopyFrom(other.Value);
        }
        else
        {
            this._value = null;
        }
    }
    //
    public constructor(valueAlloc: { new(): TProto; })
    {
        super();
        //
        this._valueCreator = valueAlloc;
    }
    //
    public Start(stream: ViIStream, entity: ViEntity): void 
    {
        let tag = stream.ReadUInt8();
        if (tag == ViReceiveDataPtr.UN_EMPTY_TAG)
        {
            this._value = new this._valueCreator();
            this._value.ReadFrom(stream);
        }
        else
        {
            this._value = null;
        }
    }
    //
    public OnUpdate(stream: ViIStream, entity: ViEntity): void
    {
        let op: ViDataArrayOperator = stream.ReadUInt8();
        switch (op)
        {
            case ViDataArrayOperator.INSERT:
                {
                    this._value = new this._valueCreator();
                    this._value.ReadFrom(stream);
                    this.OnUpdateInvoke();
                }
                break;
            case ViDataArrayOperator.MOD:
                {
                    this._value.ReadFrom(stream);
                    this.OnUpdateInvoke();
                }
                break;
            case ViDataArrayOperator.CLEAR:
                {
                    this._value = null;
                    this.OnUpdateInvoke();
                }
                break;
            default:
                break;
        }
    }
    //
    public End(entity: ViEntity): void
    {
        this._value = null;
        this.DetachAllCallback();
    }
    //
    public Clear(): void
    {
        ViDebuger.AssertWarning(this._value == null);
        //
        this._valueCreator = null;
        //
        this.DetachAllCallback();
        //
        super.Clear();
    }
    //
    private _value: TProto;
    private _valueCreator: { new(): TProto; };
}