import { Int32, ViString } from "../../ViSystem/ViSystemType";
import { ViEnum32, BoolValue, ViEnumDynamic32 } from "../../ViSystem/ViEnum";
import { ViMaskDynamic32 } from "../../ViSystem/ViMask";
import { ViSealedDB, ViSealedData, ViEmptySealedData } from "../../ViGameCommon/SealedData/ViSealedData";
import { ViForeignKey } from "../../ViGameCommon/SealedData/ViForeignKey";
import { ViFixArrayStruct, ViForeignKeyFixArrayStruct, ViFixArrayElement, ViMiscString, ViMiscInt32 } from "../../ViGameCommon/SealedData/ViSealedDataEx";
import { PathFileResStruct, ViVector3Struct } from "../../ViGameShare/ViGameStruct";
import { ViGroundType, ViAuraLookAtType, ViSpellRangleLayer, ViVisualAreaType, ViTravelEndExpressDirection, ViVisualAutoScale } from "./ViVisualDefine";
import { ViIStream } from "../../ViSystem/ViIStream";

//--------------------------------------------------------------------------------------------------------------------------------------------------------------
export class ViCameraShakeStruct_Spring
{
	readonly Range = new Int32();
	readonly SpirngRate = new Int32();
	readonly SpeedFriction = new Int32();
	readonly TimeScale = new Int32();
	readonly SpringCount = new Int32();
	//
	ReadFrom(stream: ViIStream): void
	{
		this.Range.ReadFrom(stream);
		this.SpirngRate.ReadFrom(stream);
		this.SpeedFriction.ReadFrom(stream);
		this.TimeScale.ReadFrom(stream);
		this.SpringCount.ReadFrom(stream);
	}
}

export class ViCameraShakeStruct_Random
{
	readonly Duration = new Int32();
	readonly Intensity = new Int32();
	readonly Range = new Int32();
	//
	ReadFrom(stream: ViIStream): void
	{
		this.Duration.ReadFrom(stream);
		this.Intensity.ReadFrom(stream);
		this.Range.ReadFrom(stream);
	}
}

export class ViCameraShakeStruct extends ViSealedData
{
	static readonly TABLE = new ViSealedDB(ViCameraShakeStruct, "ViCameraShakeStruct", true, true);
	//
	readonly Probability = new Int32();
	readonly LookAtScale = new Int32();
	readonly Reserve2 = new Int32();
	readonly Spring = new ViCameraShakeStruct_Spring();
	readonly Random = new ViCameraShakeStruct_Random();
	//
	Ready(stream: ViIStream): void
	{
		this.Probability.ReadFrom(stream);
		this.LookAtScale.ReadFrom(stream);
		this.Reserve2.ReadFrom(stream);
		this.Spring.ReadFrom(stream);
		this.Random.ReadFrom(stream);
	}
}

export class ViCameraShakeInstanceStruct implements ViFixArrayElement
{
	readonly DelayTime = new Int32();
	readonly Shake = new ViForeignKey<ViCameraShakeStruct>();
	readonly Broadcast = new ViEnum32<BoolValue>();
	readonly Reserve_0 = new Int32();
	readonly Reserve_1 = new Int32();
	readonly Reserve_2 = new Int32();
	//
	ReadFrom(stream: ViIStream): void
	{
		this.DelayTime.ReadFrom(stream);
		this.Shake.ReadFrom(stream);
		this.Broadcast.ReadFrom(stream);
		this.Reserve_0.ReadFrom(stream);
		this.Reserve_1.ReadFrom(stream);
		this.Reserve_2.ReadFrom(stream);
	}
}

export class ViTrailStruct extends ViSealedData
{
	static readonly TABLE = new ViSealedDB(ViTrailStruct, "ViTrailStruct", true, true);
	//
	readonly Offset = new ViVector3Struct();
	readonly StartWidth = new Int32();
	readonly EndWidth = new Int32();
	readonly Distance = new Int32();
	readonly Res = new ViForeignKey<PathFileResStruct>();
	readonly MiscValues = new ViFixArrayStruct<ViMiscInt32>(5, ViMiscInt32);
	//
	Ready(stream: ViIStream): void
	{
		this.Offset.ReadFrom(stream);
		this.StartWidth.ReadFrom(stream);
		this.EndWidth.ReadFrom(stream);
		this.Distance.ReadFrom(stream);
		this.Res.ReadFrom(stream);
		this.MiscValues.ReadFrom(stream);
	}
}

export class ViAnimStruct implements ViFixArrayElement
{
	get NotEmpty(): boolean { return this.Res.NotEmpty; }
	//
	readonly Scale = new Int32();
	readonly Res = new ViString();
	//
	ReadFrom(stream: ViIStream): void
	{
		this.Scale.ReadFrom(stream);
		this.Res.ReadFrom(stream);
	}
}

export class ViAttachExpressStruct implements ViFixArrayElement
{
	get NotEmpty(): boolean { return this.Res.NotEmpty; }
	//
	readonly DelayTime = new Int32();
	readonly Duration = new Int32();
	readonly FadeTime = new Int32();
	readonly FadeType = new ViEnumDynamic32();
	readonly Scale = new Int32();
	readonly AutoScale = new ViEnum32<ViVisualAutoScale>();
	readonly Reserve_0 = new ViString();
	readonly Res = new ViForeignKey<PathFileResStruct>();
	readonly AttachPos = new ViMaskDynamic32();
	readonly AttachMask = new ViMaskDynamic32();
	readonly NotBroadcast = new ViEnum32<BoolValue>();
	//
	ReadFrom(stream: ViIStream): void
	{
		this.DelayTime.ReadFrom(stream);
		this.Duration.ReadFrom(stream);
		this.FadeTime.ReadFrom(stream);
		this.FadeType.ReadFrom(stream);
		this.Scale.ReadFrom(stream);
		this.AutoScale.ReadFrom(stream);
		this.Reserve_0.ReadFrom(stream);
		this.Res.ReadFrom(stream);
		this.AttachPos.ReadFrom(stream);
		this.AttachMask.ReadFrom(stream);
		this.NotBroadcast.ReadFrom(stream);
	}
}

export class ViLinkExpressStruct
{
	get NotEmpty(): boolean { return this.Res.NotEmpty; }
	//
	readonly Scale = new Int32();
	readonly Res = new ViForeignKey<PathFileResStruct>();
	readonly FromPos = new ViEnumDynamic32();
	readonly ToPos = new ViEnumDynamic32();
	//
	ReadFrom(stream: ViIStream): void
	{
		this.Scale.ReadFrom(stream);
		this.Res.ReadFrom(stream);
		this.FromPos.ReadFrom(stream);
		this.ToPos.ReadFrom(stream);
	}
}

export class ViTravelExpressStruct extends ViSealedData
{
	static readonly TABLE = new ViSealedDB(ViTravelExpressStruct, "ViTravelExpressStruct", true, true);
	//
	readonly SrcPos = new ViEnumDynamic32();
	readonly DestPos = new ViEnumDynamic32();
	readonly Height = new Int32();
	readonly Gravity = new Int32();
	readonly Res = new ViForeignKey<PathFileResStruct>();
	readonly ResBatch = new ViEnum32<BoolValue>();
	readonly ResTrail = new ViForeignKey<ViTrailStruct>();
	readonly ReserveTime = new Int32();
	readonly ReserveRes = new ViForeignKey<PathFileResStruct>();
	readonly ReserveDirection = new ViEnum32<ViTravelEndExpressDirection>();
	readonly HitCameraShake = new ViForeignKey<ViCameraShakeStruct>();
	readonly Reserve_0 = new Int32();
	readonly Reserve_1 = new Int32();
	readonly Reserve_2 = new Int32();
	readonly Reserve_3 = new Int32();
	readonly Reserve_4 = new Int32();
	//
	Ready(stream: ViIStream): void
	{
		this.SrcPos.ReadFrom(stream);
		this.DestPos.ReadFrom(stream);
		this.Height.ReadFrom(stream);
		this.Gravity.ReadFrom(stream);
		this.Res.ReadFrom(stream);
		this.ResBatch.ReadFrom(stream);
		this.ResTrail.ReadFrom(stream);
		this.ReserveTime.ReadFrom(stream);
		this.ReserveRes.ReadFrom(stream);
		this.ReserveDirection.ReadFrom(stream);
		this.HitCameraShake.ReadFrom(stream);
		this.Reserve_0.ReadFrom(stream);
		this.Reserve_1.ReadFrom(stream);
		this.Reserve_2.ReadFrom(stream);
		this.Reserve_3.ReadFrom(stream);
		this.Reserve_4.ReadFrom(stream);
	}
}

export class ViSoundStruct implements ViFixArrayElement
{
	get NotEmpty(): boolean { return this.Res.NotEmpty; }
	//
	readonly DelayTime = new Int32();
	readonly Duration = new Int32();
	readonly Res = new ViForeignKey<PathFileResStruct>();
	readonly Broadcast = new ViEnum32<BoolValue>();
	readonly Desc = new ViString();
	readonly Volume = new Int32();
	//
	ReadFrom(stream: ViIStream): void
	{
		this.DelayTime.ReadFrom(stream);
		this.Duration.ReadFrom(stream);
		this.Res.ReadFrom(stream);
		this.Broadcast.ReadFrom(stream);
		this.Desc.ReadFrom(stream);
		this.Volume.ReadFrom(stream);
	}
}

export class ViAvatarDurationVisualStruct extends ViSealedData
{
	static readonly TABLE = new ViSealedDB(ViAvatarDurationVisualStruct, "ViAvatarDurationVisualStruct", true, true);
	//
	readonly Weight = new Int32();
	readonly Type = new ViEnumDynamic32();
	readonly Duration = new Int32();
	readonly HitVisual = new ViForeignKey<ViVisualHitEffectStruct>();
	readonly MiscInt = new ViFixArrayStruct<ViMiscInt32>(10, ViMiscInt32);
	readonly MiscString = new ViFixArrayStruct<ViMiscString>(10, ViMiscString);
	//
	Ready(stream: ViIStream): void
	{
		this.Weight.ReadFrom(stream);
		this.Type.ReadFrom(stream);
		this.Duration.ReadFrom(stream);
		this.HitVisual.ReadFrom(stream);
		this.MiscInt.ReadFrom(stream);
		this.MiscString.ReadFrom(stream);
	}
}

export class ViSpellSelectorAnimationEvent implements ViFixArrayElement
{
	readonly DelayTime = new Int32();
	readonly MinRangeDurationTime = new Int32();
	readonly MaxRangeDurationTime = new Int32();
	readonly MinRangle = new Int32();
	readonly MaxRangle = new Int32();
	//
	ReadFrom(stream: ViIStream): void
	{
		this.DelayTime.ReadFrom(stream);
		this.MinRangeDurationTime.ReadFrom(stream);
		this.MaxRangeDurationTime.ReadFrom(stream);
		this.MinRangle.ReadFrom(stream);
		this.MaxRangle.ReadFrom(stream);
	}
}

export class ViVisualAreaStruct implements ViFixArrayElement
{
	readonly Type = new ViEnum32<ViVisualAreaType>();
	readonly MinRange = new Int32();
	readonly MaxRange = new Int32();;
	readonly PathRes = new ViForeignKey<PathFileResStruct>();
	//
	ReadFrom(stream: ViIStream): void
	{
		this.Type.ReadFrom(stream);
		this.MinRange.ReadFrom(stream);
		this.MaxRange.ReadFrom(stream);
		this.PathRes.ReadFrom(stream);
	}
}

export class ViVisualSpellSelectorStruct_Rangle implements ViFixArrayElement
{
	readonly LayerNum = new ViEnum32<ViSpellRangleLayer>();
	readonly Layer0RangePerc = new Int32();
	readonly Layer1RangePerc = new Int32();
	readonly Layer2RangePerc = new Int32();
	//
	ReadFrom(stream: ViIStream): void
	{
		this.LayerNum.ReadFrom(stream);
		this.Layer0RangePerc.ReadFrom(stream);
		this.Layer1RangePerc.ReadFrom(stream);
		this.Layer2RangePerc.ReadFrom(stream);
	}
}

export class ViVisualSpellSelectorStruct extends ViSealedData
{
	static readonly TABLE = new ViSealedDB(ViVisualSpellSelectorStruct, "ViVisualSpellSelectorStruct", true, true);
	//
	readonly CasterEffectRange = new ViVisualAreaStruct();
	readonly Range = new ViVisualSpellSelectorStruct_Rangle();
	readonly AnimationEvents = new ViFixArrayStruct<ViSpellSelectorAnimationEvent>(5, ViSpellSelectorAnimationEvent);
	readonly AttackTipsDelayTime = new Int32();
	readonly AttackTipsDuration = new Int32();
	//
	Ready(stream: ViIStream): void
	{
		this.CasterEffectRange.ReadFrom(stream);
		this.Range.ReadFrom(stream);
		this.AnimationEvents.ReadFrom(stream);
		this.AttackTipsDelayTime.ReadFrom(stream);
		this.AttackTipsDuration.ReadFrom(stream);
	}
}

export class ViVisualAuraStruct extends ViSealedData
{
	static readonly TABLE = new ViSealedDB(ViVisualAuraStruct, "ViVisualAuraStruct", true, true);
	//
	readonly AnimStart = new ViAnimStruct();
	readonly AnimLoop = new ViAnimStruct();
	readonly AnimEnd = new ViAnimStruct();
	readonly Description = new ViString();
	readonly Icon = new ViString();
	readonly Height = new Int32();
	readonly CasterHeight = new ViEnum32<BoolValue>();
	readonly Priority = new Int32();
	readonly Ground = new ViEnum32<ViGroundType>();
	readonly EnemyHide = new ViEnum32<BoolValue>();
	readonly LookAtCaster = new ViEnum32<ViAuraLookAtType>();
	readonly CasterAnim = new ViString();
	readonly SpellSelector = new ViForeignKey<ViVisualSpellSelectorStruct>();
	readonly ProgressBar = new ViForeignKey<ViEmptySealedData>();
	readonly Express = new ViFixArrayStruct<ViAttachExpressStruct>(3, ViAttachExpressStruct);
	readonly EmergeShake = new ViCameraShakeInstanceStruct();
	readonly VanishVisual = new ViAttachExpressStruct();
	readonly VanishShake = new ViCameraShakeInstanceStruct();
	readonly LinkExpress = new ViFixArrayStruct<ViLinkExpressStruct>(5, ViLinkExpressStruct);
	readonly Sound = new ViFixArrayStruct<ViSoundStruct>(2, ViSoundStruct);
	readonly DurationVisual = new ViForeignKeyFixArrayStruct<ViAvatarDurationVisualStruct>(3);
	readonly FlyBatch = new ViForeignKey<PathFileResStruct>();
	readonly FlyTrail = new ViForeignKey<ViTrailStruct>();
	//
	Ready(stream: ViIStream): void
	{
		this.AnimStart.ReadFrom(stream);
		this.AnimLoop.ReadFrom(stream);
		this.AnimEnd.ReadFrom(stream);
		this.Description.ReadFrom(stream);
		this.Icon.ReadFrom(stream);
		this.Height.ReadFrom(stream);
		this.CasterHeight.ReadFrom(stream);
		this.Priority.ReadFrom(stream);
		this.Ground.ReadFrom(stream);
		this.EnemyHide.ReadFrom(stream);
		this.LookAtCaster.ReadFrom(stream);
		this.CasterAnim.ReadFrom(stream);
		this.SpellSelector.ReadFrom(stream);
		this.ProgressBar.ReadFrom(stream);
		this.Express.ReadFrom(stream);
		this.EmergeShake.ReadFrom(stream);
		this.VanishVisual.ReadFrom(stream);
		this.VanishShake.ReadFrom(stream);
		this.LinkExpress.ReadFrom(stream);
		this.Sound.ReadFrom(stream);
		this.DurationVisual.ReadFrom(stream);
		this.FlyBatch.ReadFrom(stream);
		this.FlyTrail.ReadFrom(stream);
	}
}

export class ViVisualHitEffectStruct extends ViSealedData
{
	static readonly TABLE = new ViSealedDB(ViVisualHitEffectStruct, "ViVisualHitEffectStruct", true, true);
	//
	readonly Height = new Int32();
	readonly CasterHeight = new ViEnum32<BoolValue>();
	readonly Anims = new ViFixArrayStruct<ViAnimStruct>(3, ViAnimStruct);
	readonly Express = new ViFixArrayStruct<ViAttachExpressStruct>(5, ViAttachExpressStruct);
	readonly Sound = new ViFixArrayStruct<ViSoundStruct>(2, ViSoundStruct);
	readonly CameraShake = new ViCameraShakeInstanceStruct();
	readonly SpellSelector = new ViForeignKey<ViVisualSpellSelectorStruct>();
	//
	Ready(stream: ViIStream): void
	{
		this.Height.ReadFrom(stream);
		this.CasterHeight.ReadFrom(stream);
		this.Anims.ReadFrom(stream);
		this.Express.ReadFrom(stream);
		this.Sound.ReadFrom(stream);
		this.CameraShake.ReadFrom(stream);
		this.SpellSelector.ReadFrom(stream);
	}
}

export class ViVisualDriveStruct extends ViSealedData
{
	static readonly TABLE = new ViSealedDB(ViVisualDriveStruct, "ViVisualDriveStruct", true, true);
	//
	readonly Anim = new ViAnimStruct();
	readonly AuraVisual = new ViForeignKey<ViVisualAuraStruct>();
	readonly HiteffectVisual = new ViForeignKey<ViVisualHitEffectStruct>();;
	readonly Reserve0 = new Int32();
	readonly Reserve1 = new Int32();
	readonly Reserve2 = new Int32();
	readonly Reserve3 = new Int32();
	readonly Reserve4 = new Int32();
	readonly Reserve5 = new Int32();
	//
	Ready(stream: ViIStream): void
	{
		this.Anim.ReadFrom(stream);
		this.AuraVisual.ReadFrom(stream);
		this.HiteffectVisual.ReadFrom(stream);
		this.Reserve0.ReadFrom(stream);
		this.Reserve1.ReadFrom(stream);
		this.Reserve2.ReadFrom(stream);
		this.Reserve3.ReadFrom(stream);
		this.Reserve4.ReadFrom(stream);
		this.Reserve5.ReadFrom(stream);
	}
}
