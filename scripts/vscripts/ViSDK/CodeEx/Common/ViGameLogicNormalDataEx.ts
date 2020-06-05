import { ViSerialiable, ViSerialiableEx, ViSerialiableExMember, ViSerialiableExArray, ViList, ViSet, ViDictionary, Int8, UInt8, Int16, UInt16, Int32, UInt32, Int64, UInt64, float, double, ViString } from "../../ViSystem/ViSystemType";
import { ViDebuger } from "../../ViSystem/ViDebuger";
import { ViVector3 } from "../../ViMath/ViVector3";
import { ViForeignKey } from "../../ViGameCommon/SealedData/ViForeignKey";
import { ViNormalDataPtr } from "../../ViDataEx/ViReceiveDataPtr";
import { SC } from "./ViGameLogicShortCode";
export class AuraCasterProperty extends ViSerialiableEx
{
	public static S_ChildList = new ViList<ViSerialiableExMember>();
	public ChildList(): ViList<ViSerialiableExMember>{ return AuraCasterProperty.S_ChildList; }
	public static GameStart(): void
	{
		SC.AM(AuraCasterProperty.S_ChildList, AuraCasterProperty._0);
	}
	private static _0(obj: ViSerialiableEx): ViSerialiable
	{
		return (obj as AuraCasterProperty).Value;
	}
	public readonly Value = new UInt32();
}
export class AuraCasterPtrProperty extends ViSerialiableEx
{
	public static S_ChildList = new ViList<ViSerialiableExMember>();
	public ChildList(): ViList<ViSerialiableExMember>{ return AuraCasterPtrProperty.S_ChildList; }
	public static GameStart(): void
	{
		SC.AM(AuraCasterPtrProperty.S_ChildList, AuraCasterPtrProperty._0);
	}
	private static _0(obj: ViSerialiableEx): ViSerialiable
	{
		return (obj as AuraCasterPtrProperty).Value;
	}
	public readonly Value = new ViNormalDataPtr<AuraCasterProperty>(AuraCasterProperty);
}
export class VisualAuraProperty extends ViSerialiableEx
{
	public static S_ChildList = new ViList<ViSerialiableExMember>();
	public ChildList(): ViList<ViSerialiableExMember>{ return VisualAuraProperty.S_ChildList; }
	public static GameStart(): void
	{
		let T = VisualAuraProperty;
		let C = T.S_ChildList;
		let A = SC.AM;
		A(C, T._0);
		A(C, T._1);
		A(C, T._2);
		A(C, T._3);
	}
	private static _0(obj: ViSerialiableEx): ViSerialiable
	{
		return (obj as VisualAuraProperty).Effect;
	}
	private static _1(obj: ViSerialiableEx): ViSerialiable
	{
		return (obj as VisualAuraProperty).StartTime;
	}
	private static _2(obj: ViSerialiableEx): ViSerialiable
	{
		return (obj as VisualAuraProperty).EndTime;
	}
	private static _3(obj: ViSerialiableEx): ViSerialiable
	{
		return (obj as VisualAuraProperty).Caster;
	}
	public readonly Effect = new UInt32();
	public readonly StartTime = new Int32();
	public readonly EndTime = new Int32();
	public readonly Caster = new AuraCasterPtrProperty();
}
