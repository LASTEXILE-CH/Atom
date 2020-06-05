import { ViSealedData, ViSealedDB } from "../ViGameCommon/SealedData/ViSealedData";
import { ViForeignKey } from "../ViGameCommon/SealedData/ViForeignKey";
import { ViEntity } from "../ViGameCommon/Entity/ViEntity";
import { ViReceiveDataNode } from "./ViReceiveDataNode";
import { ViIStream } from "../ViSystem/ViIStream";

export class ViReceiveDataForeignKey<TSealedData extends ViSealedData> extends ViReceiveDataNode
{
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
            this._pData = table.GetData(this._value, includeZero);
        }
        return this._pData;
    }
    //
    public Start(stream: ViIStream, entity: ViEntity): void
    {
        this.ClearData();
        this._value = stream.ReadUInt32();
    }
    //
    public OnUpdate(stream: ViIStream, entity: ViEntity): void
    {
        this.ClearData();
        this._value = stream.ReadUInt32();
        this.OnUpdateInvoke();
    }
    //
    public End(entity: ViEntity): void
    {
        this.ClearData();
    }
    //
    public CopyTo(value: ViForeignKey<TSealedData>): void
    {
        this.ClearData();
        value.Set(this._value);
    }
    //
    public CopyFrom(value: ViForeignKey<TSealedData>): void
    {
        this.ClearData();
        this._value = value.Value;
    }
    //
    private ClearData(): void
    {
        this._value = 0;
        this._dData = null;
        this._pData = null;
    }
    //
    private _value: number = 0;
    private _dData: TSealedData = null;
    private _pData: TSealedData = null;
}
