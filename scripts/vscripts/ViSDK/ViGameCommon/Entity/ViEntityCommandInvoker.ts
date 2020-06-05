import { ViList } from "../../ViSystem/ViSystemType";
import { ViDelegaterRT3, ViDelegaterRT2 } from "../../ViSystem/ViDelegate";
import { ViStringHashMap } from "../../ViStruct/ViHashMap";
import { ViEntity } from "./ViEntity";

export class ViEntityCommandInvoker
{
    public static Register(dele: ViDelegaterRT3<boolean, ViEntity, string, ViList<string>>): void
    {
        ViEntityCommandInvoker._execFuncList.Push(dele);
    }
    //
    public static Exec(entity: ViEntity, name: string, paramList: ViList<string>): boolean
    {
        for (let iter = 0, array = ViEntityCommandInvoker._execFuncList.Values, count = ViEntityCommandInvoker._execFuncList.Count; iter < count; ++iter)
        {
            if (array[iter].Invoke(entity, name, paramList) == true)
            {
                return true;
            }
        }
        return false;
    }
    //
    private static readonly _execFuncList = new ViList<ViDelegaterRT3<boolean, ViEntity, string, ViList<string>>>();
}

export class ViTEntityCommandInvoker<TEntity extends ViEntity>
{
    public Exec(entity: TEntity, name: string, paramList: ViList<string>): boolean
    {
        let lowName = name.toLowerCase();
        let list = this._execFuncList.Get(lowName);
        if (list == undefined)
        {
            return false;
        }
        for (let iter = 0, count = list.Count; iter < count; ++iter)
        {
            let iterExec = list.Get(iter);
            if (iterExec.Invoke(entity, paramList) == true)
            {
                return true;
            }
        }
        return false;
    }
    //
    public AddFunc(name: string, dele: ViDelegaterRT2<boolean, TEntity, ViList<string>>): void
    {
        let lowName = name.toLowerCase();
        let list = this._execFuncList.Get(lowName);
        if (list == undefined)
        {
            list = new ViList<ViDelegaterRT2<boolean, TEntity, ViList<string>>>();
            this._execFuncList.Add(lowName, list);
        }
        list.Push(dele);
    }
    //
    private readonly _execFuncList = new ViStringHashMap<ViList<ViDelegaterRT2<boolean, TEntity, ViList<string>>>>();
}

export class ViEmptyEntityCommandInvoker
{
    public Exec(entity: ViEntity, name: string, paramList: ViList<string>): boolean
    {
        return false;
    }
    //
    public AddFunc(name: string, dele: ViDelegaterRT2<boolean, ViEntity, ViList<string>>): void
    {

    }
}