import { ViConst } from "./ViSystemConfig";
import { ViList } from "./ViSystemType";
import { NumberI64, NumberUI64 } from "./ViNumber64";

export class Number64Assistant
{
	public static StrToNumberI64(str: string, to: NumberI64): boolean
	{
		if (str.length === 0)
		{
			to.Set(0, 0);
			return true;
		}
		if (str === "NaN" || str === "Infinity" || str === "+Infinity" || str === "-Infinity")
		{
			to.Set(0, 0);
			return true;
		}
		let subStrs = new ViList<string>();
		let result = Number64Assistant._SpliteNumberI64Str(str, subStrs);
		if (!result || subStrs.Count != 2)
		{
			return false;
		}
		let sign = str.indexOf('-');
		let hightStr = subStrs.Get(0);
		let lowStr = subStrs.Get(1);
		let numHigh = parseInt(hightStr, 16);
		let numLow = parseInt(lowStr, 16);
		let complementValueHigh = numHigh
		let complementValueLow = numLow;
		if (sign == 0)
		{
			let noValuetLow = ~numLow;
			complementValueHigh = ~numHigh;
			complementValueLow = noValuetLow + 1;
			if (noValuetLow == ViConst.MAX_UINT32)
			{
				complementValueHigh = complementValueHigh + 1;
			}
		}
		to.Set(complementValueHigh, complementValueLow);
		return true;
	}
	//
	public static StrToNumberUI64(str: string, to: NumberUI64): boolean
	{
		if (str.length === 0)
		{
			to.Set(0, 0);
			return true;
		}
		if (str === "NaN" || str === "Infinity" || str === "+Infinity" || str === "-Infinity")
		{
			to.Set(0, 0);
			return true;
		}
		let subStrs = new ViList<string>();
		let result = Number64Assistant._SpliteNumberI64Str(str, subStrs);
		if (!result || subStrs.Count != 2)
		{
			return false;
		}
		let sign = str.indexOf('-');
		let hightStr = subStrs.Get(0);
		let lowStr = subStrs.Get(1);
		let numHigh = parseInt(hightStr, 16);
		let numLow = parseInt(lowStr, 16);
		let complementValueHigh = numHigh
		let complementValueLow = numLow;
		if (sign == 0)
		{
			let noValuetLow = ~numLow;
			complementValueHigh = ~numHigh;
			complementValueLow = noValuetLow + 1;
			if (noValuetLow == ViConst.MAX_UINT32)
			{
				complementValueHigh = complementValueHigh + 1;
			}
		}
		to.Set(complementValueHigh >>> 0, complementValueLow >>> 0);
		return true;
	}
	//
	static _SpliteNumberI64Str(str: string, list: ViList<string>): boolean
	{
		let hightStr = "";
		let lowStr = "";
		let p = str.indexOf('-');
		if (p > 0)
		{
			return false;
		}
		else if (p === 0)
		{
			str = str.substring(1);
		}
		if (str.length > 8)
		{
			hightStr = str.substr(0, str.length - 8);
			lowStr = str.substr(str.length - 8, 8);
		}
		else
		{
			hightStr = "0";
			lowStr = str;
		}
		list.Push(hightStr);
		list.Push(lowStr);
		return true;
	}
	//
	public static Int32ToViNumberI64(from: number, to: NumberI64): void
	{
		from |= 0;
		if (from < 0)
		{
			to.Set(from, -1);
		}
		else
		{
			to.Set(from, 0);
		}
	}
	//
	public static NumberToNumberI64(from: number, to: NumberI64): void
	{
		let value0 = Math.floor(from);
		if (value0 < -ViConst.TWO_PWR_63_DBL)
		{
			to.Set(0x80000000, 0);
		}
		else if (value0 + 1 >= ViConst.TWO_PWR_63_DBL)
		{
			to.Set(0x7FFFFFFF, 0xFFFFFFFF);
		}
		else if (from < 0)
		{
			Number64Assistant.NumberToNumberI64(-value0, to);
			Number64Assistant.Negagte(to);
		}
		else
		{
			to.Set((from % (ViConst.MAX_UINT32)) | 0, (from / ViConst.TWO_PWR_32_DBL) | 0);
		}
	}
	//
	public static Not(value: NumberI64): void
	{
		let high = ~value.High;
		let low = ~value.Low;
		value.Set(high, low);
	}
	//
	public static Negagte(value: NumberI64): void
	{
		if (value.EqualRaw(0x80000000, 0))
		{
			return;
		}
		else
		{
			Number64Assistant.Not(value);
			value.Add(0, 1);
		}
	}
	//
	private static readonly CACHE_Mod_Value = new NumberI64(0, 0);
	public static Mod(value: NumberI64, iDeltaValue: number): void
	{
		Number64Assistant.CACHE_Mod_Value.Set(0, 0);
		Number64Assistant.NumberToNumberI64(iDeltaValue, Number64Assistant.CACHE_Mod_Value);
		value.Add(Number64Assistant.CACHE_Mod_Value.High, Number64Assistant.CACHE_Mod_Value.Low);
	}
}