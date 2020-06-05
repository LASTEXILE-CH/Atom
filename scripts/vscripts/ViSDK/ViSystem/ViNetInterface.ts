import { ViOStream } from "./ViOStream";

export interface ViNetInterface
{
    OS: ViOStream;
    ResetSendStream(): void;
    SendStream(): void;
}