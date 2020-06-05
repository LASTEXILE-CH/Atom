import { ViVector3 } from "../ViMath/ViVector3";
import { ViEntity } from "../ViGameCommon/Entity/ViEntity";
import { ViReceiveDataNode } from "./ViReceiveDataNode";
import { ViIStream } from "../ViSystem/ViIStream";

export class ViReceiveDataVector3 extends ViReceiveDataNode
{
    public readonly Value = new ViVector3();
    //
    public Equal(value: ViVector3): boolean
    {
        return this.Value == value;
    }
    public NotEqual(value: ViVector3): boolean
    {
        return this.Value == value;
    }
    public CopyTo(value: ViVector3): void
    {
        value.CopyFrom(this.Value);
    }
    public CopyFrom(value: ViVector3): void
    {
        this.Value.CopyFrom(value);
    }
    //
    public Start(stream: ViIStream, entity: ViEntity): void
    {
        this.Value.ReadFrom(stream);
    }
    public OnUpdate(stream: ViIStream, entity: ViEntity): void
    {
        this.Value.ReadFrom(stream);
        this.OnUpdateInvoke();
    }
    public End(entity: ViEntity): void
    {

    }
}