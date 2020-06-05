import { NumberI64, NumberUI64 } from "./ViNumber64";

export class ViBitConverter
{
	public static ToString(value: Uint8Array, startIndex: number, length: number): string
	{
		let array = ViBitConverter._stringArray;
		let len16 = length / 2;
		if (len16 > array.byteLength)
		{
			let newSize = Math.max(array.byteLength * 2, len16);
			array = new Uint16Array(newSize);
			ViBitConverter._stringArray = array;
		}
		for (let iter8 = startIndex, iter16 = 0; iter16 < len16;)
		{
			array[iter16] = value[iter8] + (value[iter8 + 1] << 8);
			iter8 += 2;
			iter16 += 1;
		}
		return ViBitConverter.Unicode2Str(array, len16);
	}
	//
	private static readonly CharLowCaseOffset = 97 - 65;//'A':65/'Z':90/'a':97/'z':122;
	public static ToLowCaseString(value: Uint8Array, startIndex: number, length: number): string
	{
		let CharLowCaseOffset = ViBitConverter.CharLowCaseOffset;
		let array = ViBitConverter._stringArray;
		let len16 = length / 2;
		if (len16 > array.byteLength)
		{
			let newSize = Math.max(array.byteLength * 2, len16);
			array = new Uint16Array(newSize);
		}
		for (let iter8 = startIndex, iter16 = 0; iter16 < len16;)
		{
			let iterValue = value[iter8] + (value[iter8 + 1] << 8);
			if (65 <= iterValue && iterValue <= 90)
			{
				iterValue += CharLowCaseOffset;
			}
			array[iter16] = iterValue;
			iter8 += 2;
			iter16 += 1;
		}
		return ViBitConverter.Unicode2Str(array, len16);
	}
	public static ToUpCaseString(value: Uint8Array, startIndex: number, length: number): string
	{
		let CharLowCaseOffset = ViBitConverter.CharLowCaseOffset;
		let array = ViBitConverter._stringArray;
		let len16 = length / 2;
		if (len16 > array.byteLength)
		{
			let newSize = Math.max(array.byteLength * 2, len16);
			array = new Uint16Array(newSize);
		}
		for (let iter8 = startIndex, iter16 = 0; iter16 < len16;)
		{
			let iterValue = value[iter8] + (value[iter8 + 1] << 8);
			if (97 <= iterValue && iterValue <= 122)
			{
				iterValue -= CharLowCaseOffset;
			}
			array[iter16] = iterValue;
			iter8 += 2;
			iter16 += 1;
		}
		return ViBitConverter.Unicode2Str(array, len16);
	}
	//
	private static Unicode2Str(bytes: Uint16Array, length: number): string
	{
		switch (length)
		{
			case 0: return "";
			case 1: return String.fromCharCode(bytes[0]);
			case 2: return String.fromCharCode(bytes[0], bytes[1]);
			case 3: return String.fromCharCode(bytes[0], bytes[1], bytes[2]);
			case 4: return String.fromCharCode(bytes[0], bytes[1], bytes[2], bytes[3]);
			case 5: return String.fromCharCode(bytes[0], bytes[1], bytes[2], bytes[3], bytes[4]);
			case 6: return String.fromCharCode(bytes[0], bytes[1], bytes[2], bytes[3], bytes[4], bytes[5]);
			case 7: return String.fromCharCode(bytes[0], bytes[1], bytes[2], bytes[3], bytes[4], bytes[5], bytes[6]);
			case 8: return String.fromCharCode(bytes[0], bytes[1], bytes[2], bytes[3], bytes[4], bytes[5], bytes[6], bytes[7]);
			case 9: return String.fromCharCode(bytes[0], bytes[1], bytes[2], bytes[3], bytes[4], bytes[5], bytes[6], bytes[7], bytes[8]);
			case 10: return String.fromCharCode(bytes[0], bytes[1], bytes[2], bytes[3], bytes[4], bytes[5], bytes[6], bytes[7], bytes[8], bytes[9]);
			case 11: return String.fromCharCode(bytes[0], bytes[1], bytes[2], bytes[3], bytes[4], bytes[5], bytes[6], bytes[7], bytes[8], bytes[9], bytes[10]);
			case 12: return String.fromCharCode(bytes[0], bytes[1], bytes[2], bytes[3], bytes[4], bytes[5], bytes[6], bytes[7], bytes[8], bytes[9], bytes[10], bytes[11]);
			case 13: return String.fromCharCode(bytes[0], bytes[1], bytes[2], bytes[3], bytes[4], bytes[5], bytes[6], bytes[7], bytes[8], bytes[9], bytes[10], bytes[11], bytes[12]);
			case 14: return String.fromCharCode(bytes[0], bytes[1], bytes[2], bytes[3], bytes[4], bytes[5], bytes[6], bytes[7], bytes[8], bytes[9], bytes[10], bytes[11], bytes[12], bytes[13]);
			case 15: return String.fromCharCode(bytes[0], bytes[1], bytes[2], bytes[3], bytes[4], bytes[5], bytes[6], bytes[7], bytes[8], bytes[9], bytes[10], bytes[11], bytes[12], bytes[13], bytes[14]);
			case 16: return String.fromCharCode(bytes[0], bytes[1], bytes[2], bytes[3], bytes[4], bytes[5], bytes[6], bytes[7], bytes[8], bytes[9], bytes[10], bytes[11], bytes[12], bytes[13], bytes[14], bytes[15]);
			case 17: return String.fromCharCode(bytes[0], bytes[1], bytes[2], bytes[3], bytes[4], bytes[5], bytes[6], bytes[7], bytes[8], bytes[9], bytes[10], bytes[11], bytes[12], bytes[13], bytes[14], bytes[15], bytes[16]);
			case 18: return String.fromCharCode(bytes[0], bytes[1], bytes[2], bytes[3], bytes[4], bytes[5], bytes[6], bytes[7], bytes[8], bytes[9], bytes[10], bytes[11], bytes[12], bytes[13], bytes[14], bytes[15], bytes[16], bytes[17]);
			case 19: return String.fromCharCode(bytes[0], bytes[1], bytes[2], bytes[3], bytes[4], bytes[5], bytes[6], bytes[7], bytes[8], bytes[9], bytes[10], bytes[11], bytes[12], bytes[13], bytes[14], bytes[15], bytes[16], bytes[17], bytes[18]);
			case 20: return String.fromCharCode(bytes[0], bytes[1], bytes[2], bytes[3], bytes[4], bytes[5], bytes[6], bytes[7], bytes[8], bytes[9], bytes[10], bytes[11], bytes[12], bytes[13], bytes[14], bytes[15], bytes[16], bytes[17], bytes[18], bytes[19]);
			case 21: return String.fromCharCode(bytes[0], bytes[1], bytes[2], bytes[3], bytes[4], bytes[5], bytes[6], bytes[7], bytes[8], bytes[9], bytes[10], bytes[11], bytes[12], bytes[13], bytes[14], bytes[15], bytes[16], bytes[17], bytes[18], bytes[19], bytes[20]);
			case 22: return String.fromCharCode(bytes[0], bytes[1], bytes[2], bytes[3], bytes[4], bytes[5], bytes[6], bytes[7], bytes[8], bytes[9], bytes[10], bytes[11], bytes[12], bytes[13], bytes[14], bytes[15], bytes[16], bytes[17], bytes[18], bytes[19], bytes[20], bytes[21]);
			case 23: return String.fromCharCode(bytes[0], bytes[1], bytes[2], bytes[3], bytes[4], bytes[5], bytes[6], bytes[7], bytes[8], bytes[9], bytes[10], bytes[11], bytes[12], bytes[13], bytes[14], bytes[15], bytes[16], bytes[17], bytes[18], bytes[19], bytes[20], bytes[21], bytes[22]);
			case 24: return String.fromCharCode(bytes[0], bytes[1], bytes[2], bytes[3], bytes[4], bytes[5], bytes[6], bytes[7], bytes[8], bytes[9], bytes[10], bytes[11], bytes[12], bytes[13], bytes[14], bytes[15], bytes[16], bytes[17], bytes[18], bytes[19], bytes[20], bytes[21], bytes[22], bytes[23]);
			case 25: return String.fromCharCode(bytes[0], bytes[1], bytes[2], bytes[3], bytes[4], bytes[5], bytes[6], bytes[7], bytes[8], bytes[9], bytes[10], bytes[11], bytes[12], bytes[13], bytes[14], bytes[15], bytes[16], bytes[17], bytes[18], bytes[19], bytes[20], bytes[21], bytes[22], bytes[23], bytes[24]);
			case 26: return String.fromCharCode(bytes[0], bytes[1], bytes[2], bytes[3], bytes[4], bytes[5], bytes[6], bytes[7], bytes[8], bytes[9], bytes[10], bytes[11], bytes[12], bytes[13], bytes[14], bytes[15], bytes[16], bytes[17], bytes[18], bytes[19], bytes[20], bytes[21], bytes[22], bytes[23], bytes[24], bytes[25]);
			case 27: return String.fromCharCode(bytes[0], bytes[1], bytes[2], bytes[3], bytes[4], bytes[5], bytes[6], bytes[7], bytes[8], bytes[9], bytes[10], bytes[11], bytes[12], bytes[13], bytes[14], bytes[15], bytes[16], bytes[17], bytes[18], bytes[19], bytes[20], bytes[21], bytes[22], bytes[23], bytes[24], bytes[25], bytes[26]);
			case 28: return String.fromCharCode(bytes[0], bytes[1], bytes[2], bytes[3], bytes[4], bytes[5], bytes[6], bytes[7], bytes[8], bytes[9], bytes[10], bytes[11], bytes[12], bytes[13], bytes[14], bytes[15], bytes[16], bytes[17], bytes[18], bytes[19], bytes[20], bytes[21], bytes[22], bytes[23], bytes[24], bytes[25], bytes[26], bytes[27]);
			case 29: return String.fromCharCode(bytes[0], bytes[1], bytes[2], bytes[3], bytes[4], bytes[5], bytes[6], bytes[7], bytes[8], bytes[9], bytes[10], bytes[11], bytes[12], bytes[13], bytes[14], bytes[15], bytes[16], bytes[17], bytes[18], bytes[19], bytes[20], bytes[21], bytes[22], bytes[23], bytes[24], bytes[25], bytes[26], bytes[27], bytes[28]);
			case 30: return String.fromCharCode(bytes[0], bytes[1], bytes[2], bytes[3], bytes[4], bytes[5], bytes[6], bytes[7], bytes[8], bytes[9], bytes[10], bytes[11], bytes[12], bytes[13], bytes[14], bytes[15], bytes[16], bytes[17], bytes[18], bytes[19], bytes[20], bytes[21], bytes[22], bytes[23], bytes[24], bytes[25], bytes[26], bytes[27], bytes[28], bytes[29]);
			case 31: return String.fromCharCode(bytes[0], bytes[1], bytes[2], bytes[3], bytes[4], bytes[5], bytes[6], bytes[7], bytes[8], bytes[9], bytes[10], bytes[11], bytes[12], bytes[13], bytes[14], bytes[15], bytes[16], bytes[17], bytes[18], bytes[19], bytes[20], bytes[21], bytes[22], bytes[23], bytes[24], bytes[25], bytes[26], bytes[27], bytes[28], bytes[29], bytes[30]);
			case 32: return String.fromCharCode(bytes[0], bytes[1], bytes[2], bytes[3], bytes[4], bytes[5], bytes[6], bytes[7], bytes[8], bytes[9], bytes[10], bytes[11], bytes[12], bytes[13], bytes[14], bytes[15], bytes[16], bytes[17], bytes[18], bytes[19], bytes[20], bytes[21], bytes[22], bytes[23], bytes[24], bytes[25], bytes[26], bytes[27], bytes[28], bytes[29], bytes[30], bytes[31]);
			default:
				{
					let list = new Array<string>(length);
					for (let iter = 0, fromCharCode = String.fromCharCode; iter < length; ++iter)
					{
						list[iter] = fromCharCode(bytes[iter]);
					}
					return list.join("");
				}
		}
	}
	//
	private static _stringArray = new Uint16Array(1024);
}
