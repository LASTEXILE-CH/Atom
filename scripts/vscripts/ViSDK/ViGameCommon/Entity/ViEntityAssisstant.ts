import { ViList } from "../../ViSystem/ViSystemType";
import { NumberUI64 } from "../../ViSystem/ViNumber64";
import { ViStringIStream } from "../../ViSystem/ViStringIStream";
import { ViEntity } from "./ViEntity";
import { ViEntityManager } from "./ViEntityManager";
import { ViIStream } from "../../ViSystem/ViIStream";
import { ViOStream } from "../../ViSystem/ViOStream";

export class ViEntityAssisstant
{
    public static EntityManager: ViEntityManager;
    //
    public static Type(ID: NumberUI64): number
    {
        return ID.High >> 24;
    }
    //
    public static ReadFrom<TEntity extends ViEntity>(stream: ViIStream): TEntity
    {
        let packID = stream.ReadUInt24();
        return ViEntityAssisstant.EntityManager.GetPackEntity(packID) as TEntity;
    }
    //
    public static ReadListFrom<TEntity extends ViEntity>(entityList: ViList<TEntity>, stream: ViIStream): void
    {
        let count = stream.ReadPackedSize();
        let GetPackEntity = ViEntityAssisstant.EntityManager.GetPackEntity.bind(ViEntityAssisstant.EntityManager);
        for (let iter = 0; iter < count; ++iter)
        {
            let iterPackID = stream.ReadUInt24();
            entityList.Push(GetPackEntity(iterPackID) as TEntity);
        }
    }
    //
    public static ReadFromString<TEntity extends ViEntity>(stream: ViStringIStream): TEntity
    {
        return null;
    }
    //
    public static PrintTo<TEntity extends ViEntity>(entity: TEntity, stream: ViOStream): void
    {
        if (entity != null)
        {
            stream.AppendUInt24(entity.PackID());
        }
        else
        {
            stream.AppendUInt24(0);
        }
        return null;
    }
    //
    public static PrintToString<TEntity extends ViEntity>(entity: TEntity, stream: ViOStream): void
    {
        return null;
    }
}