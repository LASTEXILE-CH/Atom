import { ViSerialiable, ViSerialiableEx, ViSerialiableExMember, ViSerialiableExArray, ViList, ViSet, ViDictionary, Int8, UInt8, Int16, UInt16, Int32, UInt32, Int64, UInt64, float, double, ViString } from "../../ViSystem/ViSystemType";
import { ViIStream } from "../../ViSystem/ViIStream";
import { ViVector3 } from "../../ViMath/ViVector3";
import { ViForeignKey } from "../../ViGameCommon/SealedData/ViForeignKey";
import { ViReceiveProperty } from "../../ViDataEx/ViReceiveProperty";
import { ViReceiveDataInt8, ViReceiveDataUInt8, ViReceiveDataInt16, ViReceiveDataUInt16, ViReceiveDataInt32, ViReceiveDataUInt32, ViReceiveDataInt64, ViReceiveDataUInt64, ViReceiveDataFloat, ViReceiveDataDouble, ViReceiveDataString } from "../../ViDataEx/ViReceiveDataSimple";
import { ViReceiveDataVector3 } from "../../ViDataEx/ViReceiveDataVector3";
import { ViReceiveDataForeignKey } from "../../ViDataEx/ViReceiveDataForeignKey";
import { ViNormalDataPtr, ViReceiveDataPtr } from "../../ViDataEx/ViReceiveDataPtr";
import { ViReceiveDataEmptyNode, ViReceiveDataEmptyContainer } from "../../ViDataEx/ViReceiveDataNode";
import { ViReceiveDataArray } from "../../ViDataEx/ViReceiveDataArray";
import { ViReceiveDataDictionary } from "../../ViDataEx/ViReceiveDataDictionary";
import { ViReceiveDataSet } from "../../ViDataEx/ViReceiveDataSet";
import { SC } from "./ViGameLogicShortCode";
import { ViGameLogicChannel, ViGameLogicChannelMask } from "./ViGameLogicConfig";
import { VisualAuraProperty } from "./ViGameLogicNormalDataEx";
import { ReceiveDataVisualAuraProperty } from "./ViGameLogicReceiveDataEx";
export class ViGameUnitReceiveProperty extends ViReceiveProperty
{
	public static readonly TYPE_SIZE: number = 6;
	public static readonly INDEX_PROPERTY_COUNT: number = 0;
	//
	public readonly ActionStateMask = new ViReceiveDataUInt32();//ALL_CLIENT
 	public readonly AuraStateMask = new ViReceiveDataUInt32();//OWN_CLIENT
 	public readonly SpaceStateMask = new ViReceiveDataUInt32();//OWN_CLIENT
 	public readonly VisualAuraPropertyList = new ViReceiveDataArray<ReceiveDataVisualAuraProperty, VisualAuraProperty>(ReceiveDataVisualAuraProperty.CacheAllocator);//ALL_CLIENT
 	private readonly LogicAuraPropertyList = new ViReceiveDataEmptyContainer();//
 	private readonly DisSpellList = new ViReceiveDataEmptyContainer();//
 	//
	//
	public constructor()
	{
		super();
		let THIS = this;
		let childList = this.ChildList;
		let localChannelMask = ViGameLogicChannelMask;
		THIS.SetChildCapacity(ViGameUnitReceiveProperty.TYPE_SIZE);
		THIS.ActionStateMask.RegisterAsChild(localChannelMask.ALL_CLIENT, null, childList);
		THIS.AuraStateMask.RegisterAsChild(localChannelMask.OWN_CLIENT, null, childList);
		THIS.SpaceStateMask.RegisterAsChild(localChannelMask.OWN_CLIENT, null, childList);
		THIS.VisualAuraPropertyList.RegisterAsChild(localChannelMask.ALL_CLIENT, null, childList);
		THIS.LogicAuraPropertyList.RegisterAsChild(0, null, childList);
		THIS.DisSpellList.RegisterAsChild(0, null, childList);
		//
		THIS.SetIndexPropertyCapacity(ViGameUnitReceiveProperty.INDEX_PROPERTY_COUNT);
	}
}
