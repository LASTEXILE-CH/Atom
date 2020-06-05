import { ViEnumDynamic32, ViEnum32 } from "../ViSystem/ViEnum";
import { ViValueRange } from "./ViGameStruct";
import { Int32 } from "../ViSystem/ViSystemType";
import { ViIStream } from "../ViSystem/ViIStream";
import { ViFixArrayElement } from "../ViGameCommon/SealedData/ViSealedDataEx";
import { ViAreaType } from "./ViGameDefine";

export class ViUnitValueRange
{
	public IsEmpty(): boolean { return (this.type.Value == 0); }
	public type = new ViEnumDynamic32();
    public value = new ViValueRange();
    //
    ReadFrom(stream: ViIStream): void
	{
		this.type.ReadFrom(stream);
        this.value.ReadFrom(stream);
	}
}

export class ViUnitRefValue implements ViFixArrayElement
{
	public IsEmpty(): boolean { return (this.type.Value == 0 || this.scale10000.Value == 0); }
	public Scale(): number { return this.scale10000.Value * 0.0001; }
	public type = new ViEnumDynamic32();
    public scale10000 = new Int32();
    //
    ReadFrom(stream: ViIStream): void
	{
		this.type.ReadFrom(stream);
        this.scale10000.ReadFrom(stream);
	}
}

export class ViUnitValue
{
	public IsEmpty(): boolean { return (this.type.Value == 0); }
	public type = new ViEnumDynamic32();
    public value = new Int32();
    //
    ReadFrom(stream: ViIStream): void
	{
		this.type.ReadFrom(stream);
        this.value.ReadFrom(stream);
	}
}

export class ViAreaStruct
{
	public type = new ViEnum32<ViAreaType>();								// 范围类型
	public minRange= new Int32();						// 最小距离(圆)最小半径:米(矩形)横:米(扇形)弧度
    public maxRange= new Int32();						// 最大距离(圆)最大半径:米(矩形)竖:米(扇形)半径
    //
    ReadFrom(stream: ViIStream): void
	{
		this.type.ReadFrom(stream);
        this.minRange.ReadFrom(stream);
        this.maxRange.ReadFrom(stream);
	}
}