import { ViDelegater0 } from "../ViSystem/ViDelegate";
import { NumberDictionaryEx } from "../../Struct/NumberDictionaryEx";

export class ViRPCACK
{
    public Add(funcID: number, callback: ViDelegater0): void
    {
        let list = this._list;
        if (!list.Contain(funcID))
        {
            list.Add(funcID, callback);
        }
    }
    //
    public Ack(funcID: number): void
    {
        let callback = this._list.Del(funcID);
        if (callback != null)
        {
            callback.Invoke();
        }
    }
    //
    public Has(funcID: number): boolean
    {
        return this._list.Contain(funcID);
    }
    //
    public End(): void
    {
        this._list.Clear();
    }
    //
    private readonly _list = new NumberDictionaryEx<ViDelegater0>(7);
}
