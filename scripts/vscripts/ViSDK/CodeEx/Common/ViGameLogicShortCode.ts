import { ViSerializer } from "../../ViSystem/ViSerializer";
import { ViRPCEntityAssisstant } from "../../ViRPC/ViRPCEntity";
import { ViSerialiableEx } from "../../ViSystem/ViSystemType";

export class SC//ShortCode
{
	public static readonly RStrL = ViSerializer.ReadFromStringList;
	public static readonly RStrD = ViSerializer.ReadFromStringDictionary;
	public static readonly RStrS = ViSerializer.ReadFromStringSet;
	public static readonly RStr = ViSerializer.ReadFromString;
	public static readonly RL = ViSerializer.ReadFromList;
	public static readonly RD = ViSerializer.ReadFromDictionary;
	public static readonly RS = ViSerializer.ReadFromSet;
	public static readonly R = ViSerializer.ReadFrom;
	public static readonly PTL = ViSerializer.PrintToList;
	public static readonly PTD = ViSerializer.PrintToDictionary;
	public static readonly PTS = ViSerializer.PrintToSet;
	public static readonly PT = ViSerializer.PrintTo;
	public static readonly RPCPM = ViRPCEntityAssisstant.PreMessage;
	public static readonly RPCAM = ViRPCEntityAssisstant.AftMessage;
	public static readonly RPCNR = ViRPCEntityAssisstant.IsNotReady;
	public static readonly AM = ViSerialiableEx.AddMember;
}
