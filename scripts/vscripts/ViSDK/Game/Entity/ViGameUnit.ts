import { NumberUI64 } from "../../ViSystem/ViNumber64";
import { ViGameUnitReceiveProperty } from "../../CodeEx/Common/ViGameUnitProperty";
import { ViEntityAssisstant } from "../../ViGameCommon/Entity/ViEntityAssisstant";
import { ViRPCEntity } from "../../ViRPC/ViRPCEntity";
import { ViRPCInvoker } from "../../ViRPC/ViRPCInvoker";
import { ViIStream } from "../../ViSystem/ViIStream";

export class ViGameUnit implements ViRPCEntity
{
    public get Property(): ViGameUnitReceiveProperty
    {
        return this._property;
    }
    //
    public ID(): NumberUI64
    {
        return this._ID;
    }
    public PackID(): number
    {
        return this._packedID;
    }
    public Type(): number
    {
        return ViEntityAssisstant.Type(this._ID);
    }
    public Name(): string
    {
        return this._name;
    }
    public IsLocal(): boolean
    {
        return this._local;
    }
    public Active(): boolean
    {
        return this._active;
    }
    public RPC(): ViRPCInvoker
    {
        return this._RPC;
    }
    //
    public Enable(ID: NumberUI64, packedID: number, asLocal: boolean): void 
    {
        this._ID.CopyFrom(ID);
        this._packedID = packedID;
        this._local = asLocal;
    }
    public PreStart(): void
    {

    }
    public Start(): void
    {

    }
    public AftStart(): void
    {

    }
    public Tick(fDeltaTime: number): void
    {

    }
    public ClearCallback(): void
    {

    }
    public PreEnd(): void
    {

    }
    public End(): void
    {

    }
    public AftEnd(): void
    {

    }
    public SetActive(value: boolean): void
    {
        this._active = value;
    }
    //
    public StartProperty(channelMask: number, stream: ViIStream): void
    {
        this._property.StartProperty(channelMask, stream, this);
    }
    public EndProperty(): void
    {
        this._property.EndProperty(this);
    }
    public ClearProperty(): void
    {

    }
    public OnPropertyUpdateStart(channel: number): void
    {

    }
    public OnPropertyUpdateEnd(channel: number): void
    {

    }
    public OnPropertyUpdate(channel: number, stream: ViIStream): void
    {
        this._property.OnPropertyUpdate(stream, this);
    }
    //
    public CreateHandler(): void
    {

    }
    public ClearHandler(): void
    {

    }
    //
    protected constructor(property: ViGameUnitReceiveProperty)
    {
        this._property = property;
    }
    //
    private _ID = new NumberUI64(0, 0);
    private _packedID = 0;
    private _name = "";
    private _active = false;
    private _local = false;
    private _RPC = new ViRPCInvoker();
    private _property: ViGameUnitReceiveProperty;
}
