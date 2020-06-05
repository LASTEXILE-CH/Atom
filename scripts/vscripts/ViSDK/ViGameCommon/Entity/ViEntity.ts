import { ViList, ViString } from "../../ViSystem/ViSystemType";
import { NumberUI64 } from "../../ViSystem/ViNumber64";
import { ViStringIStream } from "../../ViSystem/ViStringIStream";

export interface ViEntity
{
    ID(): NumberUI64;
    PackID(): number;
    Type(): number;
    Name(): string;
    IsLocal(): boolean;
    Active(): boolean;
    //
    Enable(ID: NumberUI64, PackID: number, asLocal: boolean): void;
    PreStart(): void;
    Start(): void;
    AftStart(): void;
    Tick(fDeltaTime: number): void;
    ClearCallback(): void;
    PreEnd(): void;
    End(): void;
    AftEnd(): void;
    SetActive(value: boolean): void;
}
