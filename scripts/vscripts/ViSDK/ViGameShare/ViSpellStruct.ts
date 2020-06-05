import { ViString, Int32 } from "../ViSystem/ViSystemType";
import { ViSealedData, ViSealedDataTypeStruct, ViEmptySealedData, ViSealedDB } from "../ViGameCommon/SealedData/ViSealedData";
import { ViForeignKey } from "../ViGameCommon/SealedData/ViForeignKey";
import { ViValueMappingStruct, ViValueRange, ViStateConditionStruct, ViAttackForceStruct } from "./ViGameStruct";
import { ViFixArrayStruct, ViFixArrayElement, ViForeignKeyFixArrayStruct, ViMiscInt32 } from "../ViGameCommon/SealedData/ViSealedDataEx";
import { ViIStream } from "../ViSystem/ViIStream";
import { ViEnum32, BoolValue, ViEnumDynamic32 } from "../ViSystem/ViEnum";
import { ViMask32, ViMaskDynamic32 } from "../ViSystem/ViMask";
import { ViUnitSocietyMask } from "./ViGameDefine";
import { ViUnitValueRange, ViUnitRefValue, ViUnitValue, ViAreaStruct } from "./ViUnitStruct";
import { ViEffectSign, ViHitEffectTemplate, ViSpellSelectRalationMask, ViAuraDurationOverlap, ViSpellTravelType, ViSpellLogType } from "./ViSpellDefine";

export class ViSpellValueStruct
{
	public static readonly REF_VALUE_MAX = 5;
	public value = new ViUnitValueRange();
	public casterRefValue = new ViFixArrayStruct<ViUnitRefValue>(ViSpellValueStruct.REF_VALUE_MAX, ViUnitRefValue);
    public targetRefValue = new ViFixArrayStruct<ViUnitRefValue>(ViSpellValueStruct.REF_VALUE_MAX, ViUnitRefValue);
    //
    ReadFrom(stream: ViIStream): void
	{
		this.value.ReadFrom(stream);
        this.casterRefValue.ReadFrom(stream);
        this.targetRefValue.ReadFrom(stream);
	}
}
//
export class ViSpellCostStruct
{
	public value = new ViUnitValue();
    public refValue = new ViUnitRefValue();
    //
    ReadFrom(stream: ViIStream): void
	{
		this.value.ReadFrom(stream);
        this.refValue.ReadFrom(stream);
	}
}
//
export class ViSpellPointStruct extends ViEmptySealedData{}
//
export class ViSpellPointValueStruct
{
	public Point = new ViForeignKey<ViSpellPointStruct>();
    public ValueScale= new Int32();
    //
    ReadFrom(stream: ViIStream): void
	{
		this.Point.ReadFrom(stream);
        this.ValueScale.ReadFrom(stream);
	}
}
//
export class ViSpellPointMiscValueStruct implements ViFixArrayElement
{
	public _Name= new ViString();
	public Value= new Int32();
	public Point = new ViForeignKey<ViSpellPointStruct>();
    public ValueScale= new Int32();
    //
    ReadFrom(stream: ViIStream): void
	{
		this._Name.ReadFrom(stream);
        this.Value.ReadFrom(stream);
        this.Point.ReadFrom(stream);
        this.ValueScale.ReadFrom(stream);
	}
}
//
export class ViHitEffectStruct extends ViSealedData
{
	static readonly TABLE = new ViSealedDB(ViHitEffectStruct, "ViHitEffectStruct", true, true);
	//
	public static readonly MISC_VALUE_MAX = 5;
	public static readonly MISC_POINT_MAX = 3;
	//
	public get IsEmpty(): boolean { return this.template.Value == ViHitEffectTemplate.NONE; }
	public get IsArea(): boolean { return this.template.Value == ViHitEffectTemplate.AREA; }
	//
	public template = new ViEnumDynamic32();
	public Reserve_0= new Int32();
	public type = new ViForeignKey<ViSealedDataTypeStruct>();
	public ActiveState = new ViForeignKey<ViStateConditionStruct>();
	public effectSign = new ViEnum32<ViEffectSign>();
	public ScaleScript = new ViString();
	public delay= new Int32();
	public spreadSpeed= new Int32();
	public show = new ViEnum32<BoolValue>();
	public hitedPos = new ViEnum32<BoolValue>();
	public KillVisual = new ViForeignKey<ViEmptySealedData>();
	public Force = new ViForeignKey<ViAttackForceStruct>();
	public createProbabilityChannel= new Int32();
	public createProbability= new Int32();
	public createProbabilityPointValue = new ViSpellPointValueStruct();
	public NoUpGrade = new ViEnum32<BoolValue>();
	public X_spell = new ViForeignKey<ViSpellStruct>();
	public Reserve_1= new Int32();
	public Reserve_2= new Int32();
	public valueSet = new ViSpellValueStruct();
	public ValuePointValue = new ViSpellPointValueStruct();
	public miscValue = new ViFixArrayStruct<ViMiscInt32>(ViHitEffectStruct.MISC_VALUE_MAX, ViMiscInt32);
    public MiscPointValue = new ViFixArrayStruct<ViSpellPointMiscValueStruct>(ViHitEffectStruct.MISC_POINT_MAX, ViSpellPointMiscValueStruct);
    //
    Ready(stream: ViIStream): void
	{
		this.template.ReadFrom(stream);
		this.Reserve_0.ReadFrom(stream);
        this.type.ReadFrom(stream);
        this.ActiveState.ReadFrom(stream);
		this.effectSign.ReadFrom(stream);
        this.ScaleScript.ReadFrom(stream);
        this.delay.ReadFrom(stream);
        this.spreadSpeed.ReadFrom(stream);
        this.show.ReadFrom(stream);
        this.hitedPos.ReadFrom(stream);
		this.KillVisual.ReadFrom(stream);
        this.Force.ReadFrom(stream);
        this.createProbabilityChannel.ReadFrom(stream);
        this.createProbability.ReadFrom(stream);
        this.createProbabilityPointValue.ReadFrom(stream);
        this.NoUpGrade.ReadFrom(stream);
        this.X_spell.ReadFrom(stream);
		this.Reserve_1.ReadFrom(stream);
        this.Reserve_2.ReadFrom(stream);
        this.valueSet.ReadFrom(stream);
        this.ValuePointValue.ReadFrom(stream);
		this.miscValue.ReadFrom(stream);
        this.MiscPointValue.ReadFrom(stream);
	}
}
//
export class ViAuraTypeStruct extends ViEmptySealedData{}
//
export class ViAuraChannelStruct extends ViEmptySealedData{}
//
export class ViAuraLevelStruct extends ViEmptySealedData{}
//
export class CloseStruct
{
    public Type = new ViForeignKey<ViAuraTypeStruct>();
    public Channel = new ViForeignKey<ViAuraChannelStruct>();
    //
    ReadFrom(stream: ViIStream): void
	{
		this.Type.ReadFrom(stream);
        this.Channel.ReadFrom(stream);
	}
}
//
export class ViAuraStruct extends ViSealedData
{
	static readonly TABLE = new ViSealedDB(ViAuraStruct, "ViAuraStruct", true, true);
	//
	public static readonly DISPEL_MAX = 8;
	public static readonly VALUE_MAX = 5;
	public static readonly CONDITION_MAX = 3;
	public static readonly MISC_VALUE_MAX = 10;
	public static readonly MISC_POINT_MAX = 3;
	public template = new ViEnumDynamic32();
	public Reserve_0= new Int32();
	public Type = new ViForeignKey<ViAuraTypeStruct>();
	public Level = new ViForeignKey<ViAuraLevelStruct>();
	public ScriptAura = new ViString();
	public effectSign = new ViEnum32<ViEffectSign>();
	public DisAoI = new ViEnum32<BoolValue>();
	public ScaleScript= new ViString();
	public DurationScript= new ViString();
	public show = new ViEnum32<BoolValue>();
	public KillVisual = new ViForeignKey<ViEmptySealedData>();
	public EmptyExploreVisual = new ViForeignKey<ViEmptySealedData>();
	public Force = new ViForeignKey<ViAttackForceStruct>();
	///<创建>
	public createChannel= new Int32();
	public createProbability= new Int32();
	public createProbabilityPointValue = new ViSpellPointValueStruct();
	///<创建>
	public Close = new CloseStruct();
	public effectChannel = new ViForeignKey<ViAuraChannelStruct>();
	public effectChannelWeight= new Int32();
	public DispelType = new ViForeignKeyFixArrayStruct<ViAuraTypeStruct>(ViAuraStruct.DISPEL_MAX);
	public Reserve_1= new Int32();
	public MaxCount= new Int32();
	public maxAuraDurationOverlap = new ViEnum32<ViAuraDurationOverlap>();
	///<作用时间>
	public Reserve_2= new Int32();
	public delay= new Int32();
	public spreadSpeed= new Int32();
	public FlyDistance= new Int32();
	public FlyDistancePointValue = new ViSpellPointValueStruct();
	public FlySpeed= new Int32();
	public FlySpeedPointValue = new ViSpellPointValueStruct();
	public tickCount= new Int32();
	public amplitude= new Int32();
	public DurationPointValue = new ViSpellPointValueStruct();
	public IgnoreGround = new ViEnum32<BoolValue>();
	public NoUpGrade = new ViEnum32<BoolValue>();
	public X_spell = new ViForeignKey<ViSpellStruct>();
	public Reserve_3= new Int32();
	public Reserve_4= new Int32();
	///<结束条件>
	public createState = new ViForeignKey<ViStateConditionStruct>();
	///<作用条件>
	public activeCondition = new ViFixArrayStruct<ViUnitValueRange>(ViAuraStruct.CONDITION_MAX, ViUnitValueRange);
	public activeState = new ViForeignKey<ViStateConditionStruct>();
	///<结束条件>
	public endNotState = new ViForeignKey<ViStateConditionStruct>();
	public Reserve_5= new Int32();
	public ImmediateUpdateProperty = new ViEnum32<BoolValue>();
	public RecordCaster = new ViEnum32<BoolValue>();
	public actionStateMask = new ViMaskDynamic32();
	public auraStateMask = new ViMaskDynamic32();
	public RadiateEffect = new ViForeignKey<ViSpellEffectStruct>();
	public EndEffect = new ViForeignKey<ViSpellEffectStruct>();
	public valueSet = new ViFixArrayStruct<ViSpellValueStruct>(ViAuraStruct.VALUE_MAX, ViSpellValueStruct);
	public ValuePointValue = new ViSpellPointValueStruct();
	public miscValue = new ViFixArrayStruct<ViMiscInt32>(ViAuraStruct.MISC_VALUE_MAX, ViMiscInt32);
    public MiscPointValue = new ViFixArrayStruct<ViSpellPointMiscValueStruct>(ViAuraStruct.MISC_POINT_MAX, ViSpellPointMiscValueStruct);
    
    //
    Ready(stream: ViIStream): void
	{
		this.template.ReadFrom(stream);
		this.Reserve_0.ReadFrom(stream);
        this.Type.ReadFrom(stream);
        this.Level.ReadFrom(stream);
		this.ScriptAura.ReadFrom(stream);
        this.effectSign.ReadFrom(stream);
        this.DisAoI.ReadFrom(stream);
		this.ScaleScript.ReadFrom(stream);
        this.DurationScript.ReadFrom(stream);
        this.show.ReadFrom(stream);
        this.KillVisual.ReadFrom(stream);
        this.EmptyExploreVisual.ReadFrom(stream);
        this.Force.ReadFrom(stream);
		this.createChannel.ReadFrom(stream);
        this.createProbability.ReadFrom(stream);
        this.createProbabilityPointValue.ReadFrom(stream);
        this.Close.ReadFrom(stream);
        this.effectChannel.ReadFrom(stream);
        this.effectChannelWeight.ReadFrom(stream);
        this.DispelType.ReadFrom(stream);
		this.Reserve_1.ReadFrom(stream);
        this.MaxCount.ReadFrom(stream);
        this.maxAuraDurationOverlap.ReadFrom(stream);
        this.Reserve_2.ReadFrom(stream);
		this.delay.ReadFrom(stream);
        this.spreadSpeed.ReadFrom(stream);
        this.FlyDistance.ReadFrom(stream);
		this.FlyDistancePointValue.ReadFrom(stream);
        this.FlySpeed.ReadFrom(stream);
        this.FlySpeedPointValue.ReadFrom(stream);
		this.tickCount.ReadFrom(stream);
        this.amplitude.ReadFrom(stream);
        this.DurationPointValue.ReadFrom(stream);
        this.IgnoreGround.ReadFrom(stream);
        this.NoUpGrade.ReadFrom(stream);
        this.X_spell.ReadFrom(stream);
        this.Reserve_3.ReadFrom(stream);
        this.Reserve_4.ReadFrom(stream);
        this.createState.ReadFrom(stream);
		this.activeCondition.ReadFrom(stream);
        this.activeState.ReadFrom(stream);
        this.endNotState.ReadFrom(stream);
		this.Reserve_5.ReadFrom(stream);
        this.ImmediateUpdateProperty.ReadFrom(stream);
        this.RecordCaster.ReadFrom(stream);
        this.actionStateMask.ReadFrom(stream);
        this.auraStateMask.ReadFrom(stream);
        this.RadiateEffect.ReadFrom(stream);
        this.EndEffect.ReadFrom(stream);
        this.valueSet.ReadFrom(stream);
        this.ValuePointValue.ReadFrom(stream);
        this.miscValue.ReadFrom(stream);
        this.MiscPointValue.ReadFrom(stream);
	}
}
//
export class ViTargetSelectStruct
{
	public static readonly CONDITION_MAX = 3;
	public static readonly MISC_VALUE_MAX = 3;
	//
	public casterMask = new ViMask32<ViSpellSelectRalationMask>();
	public casterEffectRange = new ViAreaStruct();
	public targetMask = new ViMask32<ViSpellSelectRalationMask>();
	public targetEffectRange = new ViAreaStruct();
    public count= new Int32();
	public entityType = new ViForeignKey<ViSealedDataTypeStruct>();
	public NatureIgnoreMask = new ViMaskDynamic32();
	public PassBlock = new ViEnum32<BoolValue>();
	public condition = new ViFixArrayStruct<ViUnitValueRange>(ViTargetSelectStruct.CONDITION_MAX, ViUnitValueRange);
	public state = new ViForeignKey<ViStateConditionStruct>();
	public script = new ViString();
	public X_spell = new ViForeignKey<ViSpellStruct>();
	public X_selectorIdx= new Int32();
    public miscValue = new ViFixArrayStruct<ViMiscInt32>(ViTargetSelectStruct.MISC_VALUE_MAX, ViMiscInt32);
    //
    ReadFrom(stream: ViIStream): void
	{
		this.casterMask.ReadFrom(stream);
        this.casterEffectRange.ReadFrom(stream);
        this.targetMask.ReadFrom(stream);
        this.targetEffectRange.ReadFrom(stream);
        this.count.ReadFrom(stream);
        this.entityType.ReadFrom(stream);
        this.NatureIgnoreMask.ReadFrom(stream);
        this.PassBlock.ReadFrom(stream);
        this.condition.ReadFrom(stream);
        this.state.ReadFrom(stream);
        this.script.ReadFrom(stream);
        this.X_spell.ReadFrom(stream);
        this.X_selectorIdx.ReadFrom(stream);
        this.miscValue.ReadFrom(stream);
	}
}
//
export class HitEffectStruct implements ViFixArrayElement
{
    public Request = new ViForeignKey<ViAuraTypeStruct>();
    public NotRequest = new ViForeignKey<ViAuraTypeStruct>();
    public ReqPoint = new ViForeignKey<ViSpellPointStruct>();
    public ReqPointLevel = new ViValueRange();
    public Effect = new ViForeignKey<ViHitEffectStruct>();
    //
    ReadFrom(stream: ViIStream): void
	{
		this.Request.ReadFrom(stream);
        this.NotRequest.ReadFrom(stream);
        this.ReqPoint.ReadFrom(stream);
        this.ReqPointLevel.ReadFrom(stream);
        this.Effect.ReadFrom(stream);
	}
}
//
export class AuraStruct implements ViFixArrayElement
{
    public Request = new ViForeignKey<ViAuraTypeStruct>();
    public NotRequest = new ViForeignKey<ViAuraTypeStruct>();
    public ReqPoint = new ViForeignKey<ViSpellPointStruct>();
    public ReqPointLevel = new ViValueRange();
    public Effect = new ViForeignKey<ViAuraStruct>();
    //
    ReadFrom(stream: ViIStream): void
	{
		this.Request.ReadFrom(stream);
        this.NotRequest.ReadFrom(stream);
        this.ReqPoint.ReadFrom(stream);
        this.ReqPointLevel.ReadFrom(stream);
        this.Effect.ReadFrom(stream);
	}
}
//    
export class ViSpellEffectStruct extends ViSealedData
{
	static readonly TABLE = new ViSealedDB(ViSpellEffectStruct, "ViSpellEffectStruct", true, true);
	//
	public static readonly EFFECT_MAX = 8;
	//
	public Selector = new ViTargetSelectStruct();
	public Own = new ViEnum32<BoolValue>();
	public Reserve_0= new Int32();
	public X_HitEffectCount= new Int32();
	public HitEffectInfo = new ViFixArrayStruct<HitEffectStruct>(ViSpellEffectStruct.EFFECT_MAX, HitEffectStruct);
	public X_AuraCount= new Int32();;
    public AuraInfo = new ViFixArrayStruct<AuraStruct>(ViSpellEffectStruct.EFFECT_MAX, AuraStruct);
    //
	Ready(stream: ViIStream): void
	{
		this.Selector.ReadFrom(stream);
		this.Own.ReadFrom(stream);
        this.Reserve_0.ReadFrom(stream);
        this.X_HitEffectCount.ReadFrom(stream);
		this.HitEffectInfo.ReadFrom(stream);
        this.X_AuraCount.ReadFrom(stream);
        this.AuraInfo.ReadFrom(stream);
	}
}
//
export class ViSpellPriorityStruct extends ViEmptySealedData{}
//
export class ViSpellTravelStruct
{
	public type = new ViEnum32<ViSpellTravelType>();
	public speed= new Int32();
    public range= new Int32();//! 飞行范围
    //
    ReadFrom(stream: ViIStream): void
	{
        this.type.ReadFrom(stream);
        this.speed.ReadFrom(stream);
        this.range.ReadFrom(stream);
    }
}
//
export class ViSpellConditionStruct
{
	public Condition = new ViFixArrayStruct<ViUnitValueRange>(3, ViUnitValueRange);
    public State = new ViForeignKey<ViStateConditionStruct>();
    //
    ReadFrom(stream: ViIStream): void
	{
        this.Condition.ReadFrom(stream);
        this.State.ReadFrom(stream);
    }
}
//
export class AccumulateCountStruct
{
    public MaxCount = new Int32();
    public RecoverSpan = new Int32();
    //
    public Empty(): boolean
    {
        return this.MaxCount.Value <= 0;
    }
    //
    ReadFrom(stream: ViIStream): void
	{
        this.MaxCount.ReadFrom(stream);
        this.RecoverSpan.ReadFrom(stream);
    }
}
// 
export class ViSpellProcStruct
{
	public static readonly COST_MAX = 3;
	public static readonly MISC_VALUE_MAX = 20;
    //
	public ScriptFlow = new ViString();
	public Face = new ViEnum32<BoolValue>();
	public focusTargetMask = new ViMask32<ViUnitSocietyMask>();
	public focusNatureIgnoreMask = new ViMaskDynamic32();
	public ScriptFocus = new ViString();
	public addStateMask = new ViMaskDynamic32();
	public delStateMask = new ViMaskDynamic32();
	public cutDurationMask = new ViMaskDynamic32();
	public LogType = new ViEnum32<ViSpellLogType>();
	public ActionPriority = new ViForeignKey<ViSpellPriorityStruct>();
	public reserve_2 = new Int32();
	public reserve_3= new Int32();
	public disableCD= new Int32();
	public PreActionStateMask= new ViMaskDynamic32();
	public AftActionStateMask= new ViMaskDynamic32();
	public casterCondition = new ViSpellConditionStruct();
	public focusCondition = new ViSpellConditionStruct();
	public GlobalCD = new ViEnum32<BoolValue>();
	public coolChannel= new Int32();
	public coolDuration= new Int32();
	public CoolDurationPointValue = new ViSpellPointValueStruct();
	public AccumulateCount = new AccumulateCountStruct();
	public prepareTime= new Int32();
	public castTime= new Int32();
	public castCnt= new Int32();
	public castEndTime= new Int32();
	public actCoolTime= new Int32();
	public Range = new ViValueRange();
	public Travel = new ViSpellTravelStruct();
	public cost = new ViFixArrayStruct<ViSpellCostStruct>(ViSpellProcStruct.COST_MAX, ViSpellCostStruct);
    public miscValue = new ViFixArrayStruct<ViMiscInt32>(ViSpellProcStruct.MISC_VALUE_MAX, ViMiscInt32);
    //
    ReadFrom(stream: ViIStream): void
	{
		this.ScriptFlow.ReadFrom(stream);
        this.Face.ReadFrom(stream);
        this.focusTargetMask.ReadFrom(stream);
        this.focusNatureIgnoreMask.ReadFrom(stream);
        this.ScriptFocus.ReadFrom(stream);
        this.addStateMask.ReadFrom(stream);
        this.delStateMask.ReadFrom(stream);
        this.cutDurationMask.ReadFrom(stream);
        this.LogType.ReadFrom(stream);
        this.ActionPriority.ReadFrom(stream);
        this.reserve_2.ReadFrom(stream);
        this.reserve_3.ReadFrom(stream);
        this.disableCD.ReadFrom(stream);
        this.PreActionStateMask.ReadFrom(stream);
        this.AftActionStateMask.ReadFrom(stream);
        this.casterCondition.ReadFrom(stream);
        this.focusCondition.ReadFrom(stream);
        this.GlobalCD.ReadFrom(stream);
        this.coolChannel.ReadFrom(stream);
        this.coolDuration.ReadFrom(stream);
        this.CoolDurationPointValue.ReadFrom(stream);
        this.AccumulateCount.ReadFrom(stream);
        this.prepareTime.ReadFrom(stream);
        this.castTime.ReadFrom(stream);
        this.castCnt.ReadFrom(stream);
        this.castEndTime.ReadFrom(stream);
        this.actCoolTime.ReadFrom(stream);
        this.Range.ReadFrom(stream);
        this.Travel.ReadFrom(stream);
        this.cost.ReadFrom(stream);
        this.miscValue.ReadFrom(stream);
	}
}
//
export class ScruptEventStruct implements ViFixArrayElement
{
    public Script = new ViString();
    public Time = new Int32();
    //
    ReadFrom(stream: ViIStream): void
	{
		this.Script.ReadFrom(stream);
		this.Time.ReadFrom(stream);
	}
}
//
export class ViAIEventStruct extends ViEmptySealedData{}
//
export class ViSpellStruct extends ViSealedData
{
	static readonly TABLE = new ViSealedDB(ViSpellStruct, "ViSpellStruct", true, true);
	//
	public static readonly EFFECT_MAX = 12;
	//
	public Type = new ViForeignKey<ViSealedDataTypeStruct>();
	public LevelValueMapping = new ViForeignKey<ViValueMappingStruct>();
	public proc = new ViSpellProcStruct();
	public ScripttEventStructs = new ViFixArrayStruct<ScruptEventStruct>(8, ScruptEventStruct);
	public AIEvent = new ViForeignKeyFixArrayStruct<ViAIEventStruct>(4);
	public effect = new ViForeignKeyFixArrayStruct<ViSpellEffectStruct>(ViSpellStruct.EFFECT_MAX);
	public ScriptHitEffect = new ViForeignKeyFixArrayStruct<ViHitEffectStruct>(8);
    public ScriptAura = new ViForeignKeyFixArrayStruct<ViAuraStruct>(8);
    //
	Ready(stream: ViIStream): void
	{
		this.Type.ReadFrom(stream);
		this.LevelValueMapping.ReadFrom(stream);
        this.proc.ReadFrom(stream);
		this.ScripttEventStructs.ReadFrom(stream);
		this.AIEvent.ReadFrom(stream);
		this.effect.ReadFrom(stream);
        this.ScriptHitEffect.ReadFrom(stream);
        this.ScriptAura.ReadFrom(stream);
	}
}