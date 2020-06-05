import { ViList, ViLoopVector } from "../ViSystem/ViSystemType";
import { ViDebuger } from "../ViSystem/ViDebuger";

export class ViRPCLicence
{
    public get Error(): boolean { return this._error; }
    public get NotEmpty(): boolean { return this._licenceList.Count > 0; }
    public get ReserveCount(): number { return this._licenceList.Count; }
    //
    public Create(): number
    {
        let licenceList = this._licenceList;
        if (licenceList.Count > 0)
        {
            let licence = licenceList.Pop();
            //ViDebuger.CritOK("ViRPCLicence.Create(ReserveCount: " + licenceList.Count + "): " + licence);
            return licence;
        }
        else
        {
            ViDebuger.Warning("ViRPCLicence.Create Fail");
            this._error = true;
            return 0;
        }
    }
    //
    public Add(list: ViList<number>): void
    {
        //ViDebuger.CritOK("ViRPCLicence.Add(" + list.toString() + ")");
        //
        let licenceList = this._licenceList;
        let newSize = licenceList.Count + list.Count;
        if (newSize > licenceList.Size)
        {
            licenceList.Resize(newSize, 0);
        }
        licenceList.PushEx(list);
        this._error = false;
    }
    //
    public Clear(): void
    {
        this._licenceList.Clear(true);
    }
    //
    private _error = false;
    private readonly _licenceList = new ViLoopVector<number>();
}
