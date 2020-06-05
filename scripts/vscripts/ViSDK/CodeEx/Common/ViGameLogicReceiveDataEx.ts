import { ViSerialiable, ViSerialiableEx, ViSerialiableExMember, ViSerialiableExArray, ViList, ViSet, ViDictionary, ViMemoryAllocator } from "../../ViSystem/ViSystemType";
import { ViDebuger } from "../../ViSystem/ViDebuger";
import { ViForeignKey } from "../../ViGameCommon/SealedData/ViForeignKey";
import { ViEntity } from "../../ViGameCommon/Entity/ViEntity";
import { ViReceiveDataNode, ViReceiveDataNodeEx, ViReceiveDataNodeExArray } from "../../ViDataEx/ViReceiveDataNode";
import { ViReceiveDataInt8, ViReceiveDataUInt8, ViReceiveDataInt16, ViReceiveDataUInt16, ViReceiveDataInt32, ViReceiveDataUInt32, ViReceiveDataInt64, ViReceiveDataUInt64, ViReceiveDataFloat, ViReceiveDataDouble, ViReceiveDataString } from "../../ViDataEx/ViReceiveDataSimple";
import { ViReceiveDataVector3 } from "../../ViDataEx/ViReceiveDataVector3";
import { ViReceiveDataForeignKey } from "../../ViDataEx/ViReceiveDataForeignKey";
import { ViNormalDataPtr, ViReceiveDataPtr } from "../../ViDataEx/ViReceiveDataPtr";
import { AuraCasterProperty } from "./ViGameLogicNormalDataEx";
export class ReceiveDataAuraCasterProperty extends ViReceiveDataNodeEx
{
	public static readonly CacheAllocator = new ViMemoryAllocator<ReceiveDataAuraCasterProperty>(ReceiveDataAuraCasterProperty, "ReceiveDataAuraCasterProperty");
	public static readonly TYPE_SIZE: number = 1;
	public readonly Value = new ViReceiveDataUInt32();
	//
	public GetSize(): number { return ReceiveDataAuraCasterProperty.TYPE_SIZE; }
	public RegisterAsChild(channelMask: number, parent: ViReceiveDataNode, childList: ViList<ViReceiveDataNode>): void
	{
		this._RegisterAsChild(channelMask, parent);
		this.Value.RegisterAsChild(channelMask, this, childList);
	}
}

import { AuraCasterPtrProperty } from "./ViGameLogicNormalDataEx";
export class ReceiveDataAuraCasterPtrProperty extends ViReceiveDataNodeEx
{
	public static readonly CacheAllocator = new ViMemoryAllocator<ReceiveDataAuraCasterPtrProperty>(ReceiveDataAuraCasterPtrProperty, "ReceiveDataAuraCasterPtrProperty");
	public static readonly TYPE_SIZE: number = 1;
	public readonly Value = new ViReceiveDataPtr<AuraCasterProperty>(AuraCasterProperty);
	//
	public GetSize(): number { return ReceiveDataAuraCasterPtrProperty.TYPE_SIZE; }
	public RegisterAsChild(channelMask: number, parent: ViReceiveDataNode, childList: ViList<ViReceiveDataNode>): void
	{
		this._RegisterAsChild(channelMask, parent);
		this.Value.RegisterAsChild(channelMask, this, childList);
	}
}

import { VisualAuraProperty } from "./ViGameLogicNormalDataEx";
export class ReceiveDataVisualAuraProperty extends ViReceiveDataNodeEx
{
	public static readonly CacheAllocator = new ViMemoryAllocator<ReceiveDataVisualAuraProperty>(ReceiveDataVisualAuraProperty, "ReceiveDataVisualAuraProperty");
	public static readonly TYPE_SIZE: number = 4;
	public readonly Effect = new ViReceiveDataUInt32();
	public readonly StartTime = new ViReceiveDataInt32();
	public readonly EndTime = new ViReceiveDataInt32();
	public readonly Caster = new ReceiveDataAuraCasterPtrProperty();
	//
	public GetSize(): number { return ReceiveDataVisualAuraProperty.TYPE_SIZE; }
	public RegisterAsChild(channelMask: number, parent: ViReceiveDataNode, childList: ViList<ViReceiveDataNode>): void
	{
		this._RegisterAsChild(channelMask, parent);
		let T = this;
		let CM = channelMask;
		let CL = childList;
		T.Effect.RegisterAsChild(CM, T, CL);
		T.StartTime.RegisterAsChild(CM, T, CL);
		T.EndTime.RegisterAsChild(CM, T, CL);
		T.Caster.RegisterAsChild(CM, T, CL);
	}
}

