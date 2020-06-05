import { ViList } from "../../ViSystem/ViSystemType";
import { ViDebuger } from "../../ViSystem/ViDebuger";
import { ViEntityManager } from "./ViEntityManager";
import { ViEntity } from "./ViEntity";
import { ViOStream } from "../../ViSystem/ViOStream";
import { ViIStream } from "../../ViSystem/ViIStream";

export class ViEntitySerialize
{
    public static EntityNameger: ViEntityManager;
    public static Append(stream: ViOStream, value: ViEntity): void
    {
        stream.AppendUInt24(value.PackID());
    }
    public static AppendT<TEntity extends ViEntity>(stream: ViOStream, value: TEntity): void
    {
        if (value != null)
        {
            stream.AppendUInt24(value.PackID());
        }
        else
        {
            stream.AppendUInt24(0);
        }
    }
    public static AppendTList<TEntity extends ViEntity>(stream: ViOStream, list: ViList<TEntity>): void
    {
        stream.AppendPackedSize(list.Count);
        let Append = ViEntitySerialize.Append;
        for (let iter = 0, count = list.Count; iter < count; ++iter)
        {
            let value = list.Get(iter);
            Append(stream, value);
        }
    }
    public static Read(stream: ViIStream): ViEntity
    {
        let packID = stream.ReadUInt24();
        return ViEntitySerialize.EntityNameger.GetPackEntity(packID);
    }
    public static ReadT<TEntity extends ViEntity>(stream: ViIStream): TEntity
    {
        let packID = stream.ReadUInt24();
        return ViEntitySerialize.EntityNameger.GetPackEntity(packID) as TEntity;
    }
    public static ReadTList<TEntity extends ViEntity>(stream: ViIStream, list: ViList<TEntity>): void
    {
        let size = stream.ReadPackedSize();
        if (size > stream.RemainLength)
        {
            ViDebuger.Warning("Read List<TEntity>.size Error");
            return;
        }
        let Push = list.Push.bind(list)
        let ReadT = ViEntitySerialize.ReadT;
        for (let iter = 0; iter < size; ++iter)
        {
            Push(ReadT<TEntity>(stream));
        }
    }
}
