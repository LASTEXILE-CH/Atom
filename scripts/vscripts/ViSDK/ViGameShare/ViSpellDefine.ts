import { ViUnitSocietyMask } from "./ViGameDefine";
import { ViMask } from "../ViSystem/ViMask";

export class ConstValue
{
	public static readonly SELF_SCALE = 0X01;
	public static readonly ROUND_SCALE = 0X1000;
}

export enum ViSpellSelectRalationMask
{

	SELF_MASK = 0XFFF,
	ROUND_MASK = 0XFFF000,

	THIS_SELF = ViUnitSocietyMask.SELF * ConstValue.SELF_SCALE,
	THIS_FRIEND = ViUnitSocietyMask.FRIEND * ConstValue.SELF_SCALE,
	THIS_ENEMY = ViUnitSocietyMask.ENEMY * ConstValue.SELF_SCALE,
	THIS_NEUTRAL = ViUnitSocietyMask.NEUTRAL * ConstValue.SELF_SCALE,
	THIS_TEAM = ViUnitSocietyMask.TEAM * ConstValue.SELF_SCALE,

	ROUND_SELF = ViUnitSocietyMask.SELF * ConstValue.ROUND_SCALE,
	ROUND_FRIEND = ViUnitSocietyMask.FRIEND * ConstValue.ROUND_SCALE,
	ROUND_ENEMY = ViUnitSocietyMask.ENEMY * ConstValue.ROUND_SCALE,
	ROUND_NEUTRAL = ViUnitSocietyMask.NEUTRAL * ConstValue.ROUND_SCALE,
	ROUND_TEAM = ViUnitSocietyMask.TEAM * ConstValue.ROUND_SCALE,

	POS = ViUnitSocietyMask.GROUND,

}
export class GetSpellSelectRelationMask
{
	public static SelfMask(mask: number)
	{
		return ViMask.Value(mask, ViSpellSelectRalationMask.SELF_MASK);
	}
	public static RoundMask(mask: number)
	{
		return ViMask.Value(mask, ViSpellSelectRalationMask.SELF_MASK) >> 12;
	}
}

export enum ViEffectSign
{
	NONE,
	GOOD,
	BAD,
}

export enum ViEffectCreateType
{
	CASTED = 0,
	AUTO = 3,
}

export enum ViAuraDurationOverlap
{
	RESET,
	ADD,
	CLOSE_OLD,
	NONE,
}

export enum ViSpellActionType
{
	NONE_ACTION,
	ACTION,
}



export enum ViHitEffectTemplate
{
	NONE,
	BASE,//! 基本
	DISPEL_AURA_BYTYPE,//! 净化_AURA
	DISPEL_AURA_BYSIGN,//! 净化_AURA
	TRANSIT_ATTR,//!! 传递属性
	TRANSPORT_TARGET,
	CHARGE_TARGET,
	RADIATE,
	AREA,
	SUP,
}

//+---------------------------------------------------------------------------------------
export enum ViAuraTemplate
{
	NONE,
	BASE,
	VALUE_MOD,
	VALUE_TICK,
	VALUE_INHERIT,
	VALUE_MAPPING,
	RADIATE,
	AREA,
	SUP,
}

//+-----------------------------------------------------------------------------
export enum ViSpellTravelType
{
	NONE,
	SPELL_TARGET,
	SUP,
}

export enum ViSpellLogType
{
	LOG,
	NONE,
}