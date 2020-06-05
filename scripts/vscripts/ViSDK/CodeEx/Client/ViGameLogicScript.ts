import { ViEntityCreator } from "../../ViRPC/ViRPCExecer";
import { AuraCasterProperty, AuraCasterPtrProperty, VisualAuraProperty } from "../Common/ViGameLogicNormalDataEx";
import { ViGameUnitCommandInvoker } from "./ViGameUnitCommandInvoker"; 
import { ViGameUnitClientExecer } from "./ViGameUnitClientExecer"; 
import{ ViGameLogicEntityType } from "../Common/ViGameLogicEntityType";
export class ViGameLogicScript
{
	public static Start(): void
	{
		AuraCasterProperty.GameStart();
		AuraCasterPtrProperty.GameStart();
		VisualAuraProperty.GameStart();
		//
		//
	}
	
	public static StartCommand(): void
	{
		ViGameUnitCommandInvoker.Start();
	}
	
	public static End(): void
	{
		
	}
}
