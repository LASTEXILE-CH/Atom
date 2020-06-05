import { ViList } from "../../ViSystem/ViSystemType";
import { ViDebuger } from "../../ViSystem/ViDebuger";
import { ViSealedData, ViSealedDB } from "./ViSealedData";
import { ViOStream } from "../../ViSystem/ViOStream";
import { ViIStream } from "../../ViSystem/ViIStream";

export class ViSealedDataSerializer
{
    public static PrintTo<TSealedData extends ViSealedData>(stream: ViOStream, value: TSealedData): void
    {
        if (value != null)
        {
            stream.AppendUInt32(value.ID);
        }
        else
        {
            stream.AppendUInt32(0);
        }
    }
    //
    public static PrintToList<TSealedData extends ViSealedData>(stream: ViOStream, list: ViList<TSealedData>): void
    {
        let size = list.Count;
        stream.AppendPackedSize(size);
        for (let iter = 0, PrintTo = ViSealedDataSerializer.PrintTo; iter < size; ++iter)
        {
            PrintTo(stream, list[iter]);
        }
    }
    //
    public static ReadFrom<TSealedData extends ViSealedData>(stream: ViIStream, table: ViSealedDB<TSealedData>): TSealedData
    {
        let ID = stream.ReadUInt32();
        return table.Data(ID);
    }
    //
    public static ReadFromList<TSealedData extends ViSealedData>(stream: ViIStream, table: ViSealedDB<TSealedData>, list: ViList<TSealedData>): void
    {
        let size = stream.ReadPackedSize();
        if (size > stream.RemainLength)
        {
            ViDebuger.Warning("Read List<TSealedData>.size Error");
            return;
        }
        for (let iter = 0, ReadFrom = ViSealedDataSerializer.ReadFrom, Push = list.Push.bind(list); iter < size; ++iter)
        {
            Push(ReadFrom<TSealedData>(stream, table));
        }
    }
    //
}