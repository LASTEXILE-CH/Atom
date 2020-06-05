import { ViAssisstant } from "../ViSystem/ViSystemConfig";
import { Int32, Int64, ViString } from "../ViSystem/ViSystemType";
import { ViEnum32 } from "../ViSystem/ViEnum";
import { ViMaskDynamic32 } from "../ViSystem/ViMask";
import { ViMathDefine } from "../ViMath/ViMathDefine";
import { ViVector3 } from "../ViMath/ViVector3";
import { ViFixArrayElement, ViFixArrayElementString, ViFixArrayStruct } from "../ViGameCommon/SealedData/ViSealedDataEx";
import { ViTickCount } from "../ViGameCommon/Time/ViTimerInstance";
import { ViSealedData, ViSealedDB } from "../ViGameCommon/SealedData/ViSealedData";
import { ViAccumulateTimeType, ViStartTimeType, ViValueMappingType } from "./ViGameDefine";
import { ViIStream } from "../ViSystem/ViIStream";

export class PathFileResStruct extends ViSealedData
{
	static readonly TABLE = new ViSealedDB(PathFileResStruct, "PathFileResStruct", true, true);
	//
	get Path(): ScriptStaticString { return this._path; }
	get File(): ScriptStaticString { return this._file; }
	//
	Ready(stream: ViIStream): void
	{
		this._path = ScriptStaticString.New(stream.ReadLowCaseString());
		this._file = ScriptStaticString.New(stream.ReadLowCaseString());
		//
		stream.SetEnd();
	}
	//
	private _path: ScriptStaticString;
	private _file: ScriptStaticString;
}

export class ViValueRange
{
	public Inf: number;
	public Sup: number;
	//	
	public ReadFrom(stream: ViIStream): void
	{
		this.Inf = stream.ReadInt32();
		this.Sup = stream.ReadInt32();
	}
	//
	public In(value: number): boolean
	{
		return ViAssisstant.InRange(value, this.Inf, this.Sup);
	}
	public NotIn(value: number): boolean
	{
		return !ViAssisstant.InRange(value, this.Inf, this.Sup);
	}
}

export class ViDurationStruct
{
	public GetValue(): number
	{
		return ViTickCount.DAY * this.Day.Value + ViTickCount.HOUR * this.Hour.Value + ViTickCount.MINUTE * this.Minute.Value + ViTickCount.SECOND * this.Second.Value;
	}
	//
	readonly Day = new Int32();
	readonly Hour = new Int32();
	readonly Minute = new Int32();
	readonly Second = new Int32();
	readonly Value = new Int64();
	//
	public ReadFrom(stream: ViIStream): void
	{
		this.Day.ReadFrom(stream);
		this.Hour.ReadFrom(stream);
		this.Minute.ReadFrom(stream);
		this.Second.ReadFrom(stream);
		this.Value.ReadFrom(stream);
	}
}

export class ViActiveDurationStruct
{
	readonly Start = new ViEnum32<ViStartTimeType>();
	readonly StartYear = new Int32();
	readonly StartMonth = new Int32();
	readonly StartYearMonthValue = new Int64();
	readonly StartTime = new ViDurationStruct();
	readonly Accumulate = new ViEnum32<ViAccumulateTimeType>();
	readonly Duration = new ViDurationStruct();
	//	
	public ReadFrom(stream: ViIStream): void
	{
		this.Start.ReadFrom(stream);
		this.StartYear.ReadFrom(stream);
		this.StartMonth.ReadFrom(stream);
		this.StartYearMonthValue.ReadFrom(stream);
		this.StartTime.ReadFrom(stream);
		this.Accumulate.ReadFrom(stream);
		this.Duration.ReadFrom(stream);
	}
}

export class ViVector3Struct implements ViFixArrayElement
{
	readonly Value = new ViVector3();
	//
	public ReadFrom(stream: ViIStream): void
	{
		this.Value.x = stream.ReadInt32() * 0.01;
		this.Value.y = stream.ReadInt32() * 0.01;
		this.Value.z = stream.ReadInt32() * 0.01;
	}
}

export class ViStateConditionStruct extends ViSealedData 
{
	static readonly TABLE = new ViSealedDB(ViStateConditionStruct, "ViStateConditionStruct", true, true);
	//
	readonly reqAuraState = new ViMaskDynamic32();
	readonly notAuraState = new ViMaskDynamic32();
	readonly reqActionState = new ViMaskDynamic32();
	readonly notActionState = new ViMaskDynamic32();
	readonly reqSpaceState = new ViMaskDynamic32();
	readonly notSpaceState = new ViMaskDynamic32();
	//
	Ready(stream: ViIStream): void
	{
		this.reqAuraState.ReadFrom(stream);
		this.notAuraState.ReadFrom(stream);
		this.reqActionState.ReadFrom(stream);
		this.notActionState.ReadFrom(stream);
		this.reqSpaceState.ReadFrom(stream);
		this.notSpaceState.ReadFrom(stream);
	}
}

class ViValueMappingStruct_Node implements ViFixArrayElement
{
	readonly X = new Int32();
	readonly Y = new Int32();
	//
	public ReadFrom(stream: ViIStream): void
	{
		this.X.ReadFrom(stream);
		this.Y.ReadFrom(stream);
	}
}

export class ViValueMappingStruct extends ViSealedData
{
	static readonly TABLE = new ViSealedDB(ViValueMappingStruct, "ViValueMappingStruct", true, true);
	//
	readonly Type = new ViEnum32<ViValueMappingType>();
	readonly ScalePowerX = new Int32();
	readonly ScalePowerY = new Int32();
	readonly Count = new Int32();
	readonly Value = new ViFixArrayStruct<ViValueMappingStruct_Node>(20, ViValueMappingStruct_Node);
	//
	Ready(stream: ViIStream): void
	{
		this.Type.ReadFrom(stream);
		this.ScalePowerX.ReadFrom(stream);
		this.ScalePowerY.ReadFrom(stream);
		this.Count.ReadFrom(stream);
		this.Value.ReadFrom(stream);
	}
	//
	Get(x: number): number
	{
		let fScaleX = ViMathDefine.Pow(10, this.ScalePowerX.Value);
		let fScaleY = ViMathDefine.Pow(10, this.ScalePowerY.Value);
		let iX = ViAssisstant.IntSup(x / fScaleX);
		let kFronNode = this.Value.Get(0);
		let iXInf = kFronNode.X.Value;
		let iYInf = kFronNode.Y.Value;
		if (iX <= iXInf)
		{
			return iYInf * fScaleY;
		}
		//
		for (let iter = 1; iter < this.Count.Value; ++iter)
		{
			let iterNode = this.Value.Get(iter);
			if (iX > iterNode.X.Value)
			{
				iXInf = iterNode.X.Value;
				iYInf = iterNode.Y.Value;
			}
			else if (iX == iterNode.X.Value)
			{
				return iterNode.Y.Value * fScaleY;
			}
			else
			{
				if (this.Type.Value == ViValueMappingType.LINE)
				{
					let iterXSpan = iterNode.X.Value - iXInf;
					let iterYSpan = iterNode.Y.Value - iYInf;
					let iterProgress = (x / fScaleX - iXInf) / iterXSpan;
					return (iYInf + iterYSpan * iterProgress) * fScaleY;
				}
				else
				{
					return iYInf * fScaleY;
				}
			}
		}
		//
		return iYInf * fScaleY;
	}
}

export class ViAttackForceStruct extends ViSealedData
{
	static readonly TABLE = new ViSealedDB(ViAttackForceStruct, "ViAttackForceStruct", true, true);
	//
	readonly PowerH = new Int32();
	readonly PowerV = new Int32();
	readonly Height = new Int32();
	readonly Color = new ViString();
	readonly ExploreScale = new Int32();
	//
	Ready(stream: ViIStream): void
	{
		this.PowerH.ReadFrom(stream);
		this.PowerV.ReadFrom(stream);
		this.Height.ReadFrom(stream);
		this.Color.ReadFrom(stream);
		this.ExploreScale.ReadFrom(stream);
	}
}