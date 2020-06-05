import { ViAssisstant } from "../ViSystem/ViSystemConfig";
import { ViList, ViMemoryAllocator, ViString, UInt8, Int8, UInt16, Int16, UInt32, Int32, UInt64, Int64 } from "../ViSystem/ViSystemType";
import { ViDelegateRT2, ViDelegateRT1 } from "../ViSystem/ViDelegate";

class ViHashMapEx_Slot<TKey, TValue>
{
	public get Count(): number { return this._keyArray.length; }
	//
	public Add(equalsFunc: ViDelegateRT2<boolean, TKey, TKey>, key: TKey, value: TValue): void
	{
		let _keyArray = this._keyArray;
		let _valueArray = this._valueArray;
		for (let iter = 0, count = _keyArray.length; iter < count; ++iter)
		{
			if (equalsFunc(_keyArray[iter], key))
			{
				_valueArray[iter] = value;
				return;
			}
		}
		//
		_keyArray.push(key);
		_valueArray.push(value);
	}
	//
	public Del(equalsFunc: ViDelegateRT2<boolean, TKey, TKey>, key: TKey): TValue | undefined
	{
		let _keyArray = this._keyArray;
		let _valueArray = this._valueArray;
		for (let iter = 0, count = _keyArray.length; iter < count; ++iter)
		{
			if (equalsFunc(_keyArray[iter], key))
			{
				let value = _valueArray[iter];
				_keyArray.splice(iter, 1);
				_valueArray.splice(iter, 1);
				return value;
			}
		}
		//
		return undefined;
	}
	//
	public Get(equalsFunc: ViDelegateRT2<boolean, TKey, TKey>, key: TKey): TValue | undefined
	{
		let _keyArray = this._keyArray;
		let _valueArray = this._valueArray;
		for (let iter = 0, count = _keyArray.length; iter < count; ++iter)
		{
			if (equalsFunc(_keyArray[iter], key))
			{
				return _valueArray[iter];
			}
		}
		//
		return undefined;
	}
	//
	public GetEx(equalsFunc: ViDelegateRT2<boolean, TKey, TKey>, key: TKey, defaultValue: TValue): TValue
	{
		let _keyArray = this._keyArray;
		let _valueArray = this._valueArray;
		for (let iter = 0, count = _keyArray.length; iter < count; ++iter)
		{
			if (equalsFunc(_keyArray[iter], key))
			{
				return _valueArray[iter];
			}
		}
		//
		return defaultValue;
	}
	//
	public GetAsRaw(equalsFunc: ViDelegateRT1<number | string, TKey>, key: number | string): TValue | undefined
	{
		let _keyArray = this._keyArray;
		let _valueArray = this._valueArray;
		for (let iter = 0, count = _keyArray.length; iter < count; ++iter)
		{
			if (equalsFunc(_keyArray[iter]) == key)
			{
				return _valueArray[iter];
			}
		}
		//
		return undefined;
	}
	//
	public GetAsRawEx(equalsFunc: ViDelegateRT1<number | string, TKey>, key: number | string, defaultValue: TValue): TValue
	{
		let _keyArray = this._keyArray;
		let _valueArray = this._valueArray;
		for (let iter = 0, count = _keyArray.length; iter < count; ++iter)
		{
			if (equalsFunc(_keyArray[iter]) == key)
			{
				return _valueArray[iter];
			}
		}
		//
		return defaultValue;
	}
	//
	public Clear(): void
	{
		this._keyArray.splice(0, this._keyArray.length);
		this._valueArray.splice(0, this._valueArray.length);
	}
	//
	public CopyTo(list: ViList<TValue>): void
	{
		let _valueArray = this._valueArray;
		for (let iter = 0, count = _valueArray.length; iter < count; ++iter)
		{
			list.Push(this._valueArray[iter]);
		}
	}
	//
	public CopyToEx(keyList: ViList<TKey>, valueList: ViList<TValue>): void
	{
		let _keyArray = this._keyArray;
		let _valueArray = this._valueArray;
		for (let iter = 0, count = _keyArray.length; iter < count; ++iter)
		{
			keyList.Push(_keyArray[iter]);
			valueList.Push(_valueArray[iter]);
		}
	}
	//
	private readonly _keyArray = new Array<TKey>();
	private readonly _valueArray = new Array<TValue>();
}

export class ViHashMapEx<TKey, TValue>
{
	public static readonly DEFAULT_SLOT_SIZE = 7;
	//
	public static ClearCache(): void
	{
		ViHashMapEx.SlotAllocator.Clear(null);
	}
	//
	constructor(defaultSlotSize?: number)
	{
		if (defaultSlotSize != undefined && defaultSlotSize > 0)
		{
			this.SetSlotSize(defaultSlotSize);
		}
	}
	//
	public EqualsFunc: ViDelegateRT2<boolean, TKey, TKey>;
	public KeyIdentificate: ViDelegateRT1<number | string, TKey>;
	public KeyIdentificateHashFunc: ViDelegateRT1<number, number | string>;
	public HashFunc: ViDelegateRT1<number, TKey>;
	public get Count(): number { return this._count; }
	public get Empty(): boolean { return this._count <= 0; }
	public get NotEmpty(): boolean { return this._count > 0; }
	//
	public Add(key: TKey, value: TValue): void
	{
		if (this._slotList.length <= 0)
		{
			this.SetSlotSize(ViHashMapEx.DEFAULT_SLOT_SIZE);
		}
		//
		let _slotList = this._slotList;
		let hashKey = this.HashFunc(key) % _slotList.length;
		let list = _slotList[hashKey];
		let oldCount = list.Count;
		list.Add(this.EqualsFunc, key, value);
		this._count += (list.Count - oldCount);
		//
		if (this._count > _slotList.length * 2)
		{
			this.SetSlotSize(this._count * 2);
		}
	}
	//
	public Del(key: TKey): TValue | undefined
	{
		let _slotList = this._slotList;
		if (_slotList.length > 0)
		{
			let hashKey = this.HashFunc(key) % _slotList.length;
			let list = _slotList[hashKey];
			let oldCount = list.Count;
			let value = list.Del(this.EqualsFunc, key);
			this._count += (list.Count - oldCount);
			return value;
		}
		else
		{
			return undefined;
		}
	}
	//
	public Get(key: TKey): TValue | undefined
	{
		let _slotList = this._slotList;
		if (_slotList.length > 0)
		{
			let hashKey = this.HashFunc(key) % _slotList.length;
			return _slotList[hashKey].Get(this.EqualsFunc, key);
		}
		else
		{
			return undefined;
		}
	}
	//
	public GetEx(key: TKey, defaultValue: TValue): TValue
	{
		let _slotList = this._slotList;
		if (this._slotList.length > 0)
		{
			let hashKey = this.HashFunc(key) % _slotList.length;
			return _slotList[hashKey].GetEx(this.EqualsFunc, key, defaultValue);
		}
		else
		{
			return defaultValue;
		}
	}
	//
	public GetAsRaw(key: number | string): TValue | undefined
	{
		let _slotList = this._slotList;
		if (_slotList.length > 0)
		{
			let hashKey = this.KeyIdentificateHashFunc(key) % _slotList.length;
			return _slotList[hashKey].GetAsRaw(this.KeyIdentificate, key);
		}
		else
		{
			return undefined;
		}
	}
	//
	public GetAsRawEx(key: number | string, defaultValue: TValue): TValue
	{
		let _slotList = this._slotList;
		if (_slotList.length > 0)
		{
			let hashKey = this.KeyIdentificateHashFunc(key) % _slotList.length;
			return _slotList[hashKey].GetAsRawEx(this.KeyIdentificate, hashKey, defaultValue);
		}
		else
		{
			return defaultValue;
		}
	}
	//
	public Contain(key: TKey): boolean
	{
		let _slotList = this._slotList;
		if (_slotList.length > 0)
		{
			let hashKey = this.HashFunc(key) % _slotList.length;
			return _slotList[hashKey].Get(this.EqualsFunc, key) != undefined;
		}
		else
		{
			return false;
		}
	}
	//
	public ContainAsRaw(key: number | string): boolean
	{
		let _slotList = this._slotList;
		if (_slotList.length > 0)
		{
			let hashKey = this.KeyIdentificateHashFunc(key) % _slotList.length;
			return _slotList[hashKey].GetAsRaw(this.KeyIdentificate, key) != undefined;
		}
		else
		{
			return false;
		}
	}
	//
	private static readonly CACHE_SetSlotSize_KeyList = new ViList<any>();
	private static readonly CACHE_SetSlotSize_ValueList = new ViList<any>();
	public SetSlotSize(value: number): void
	{
		let oldSlotList = this._slotList;
		if (value <= oldSlotList.length)
		{
			return;
		}
		//
		let SlotAllocator = ViHashMapEx.SlotAllocator;
		let cacheKeyList = ViHashMapEx.CACHE_SetSlotSize_KeyList;
		let cacheValueList = ViHashMapEx.CACHE_SetSlotSize_ValueList;
		for (let iter = 0, count = oldSlotList.length; iter < count; ++iter)
		{
			let iterSlot = oldSlotList[iter];
			iterSlot.CopyToEx(cacheKeyList, cacheValueList);
			iterSlot.Clear();
		}
		//
		let newSlotList = new Array<ViHashMapEx_Slot<TKey, TValue>>(value);
		for (let iter = 0, count = oldSlotList.length; iter < count; ++iter)
		{
			newSlotList[iter] = oldSlotList[iter];
		}
		for (let iter = oldSlotList.length, alloc = SlotAllocator.Alloc.bind(SlotAllocator); iter < value; ++iter)
		{
			newSlotList[iter] = alloc();
		}
		//
		for (let iter = 0, slotSize = newSlotList.length; iter < cacheKeyList.Count; ++iter)
		{
			let iterKey = cacheKeyList.Get(iter);
			let iterValue = cacheValueList.Get(iter);
			let iterHashKey = this.HashFunc(iterKey) % slotSize;
			let iterList = newSlotList[iterHashKey];
			iterList.Add(this.EqualsFunc, iterKey, iterValue);
		}
		//
		this._slotList = newSlotList;
		//
		cacheKeyList.Clear();
		cacheValueList.Clear();
	}
	//
	public Clear(destroySlotSize: boolean): void
	{
		let _slotList = this._slotList;
		for (let iter = 0, count = _slotList.length; iter < count; ++iter)
		{
			_slotList[iter].Clear();
		}
		//
		if (destroySlotSize)
		{
			ViHashMapEx.SlotAllocator.FreeArray(_slotList, true);
		}
		//
		this._count = 0;
	}
	//
	public CopyTo(list: ViList<TValue>): void
	{
		list.SetCapacity(this.Count);
		for (let iter = 0, array = this._slotList, count = array.length; iter < count; ++iter)
		{
			array[iter].CopyTo(list);
		}
	}
	//
	private _count: number = 0;
	private _slotList = new Array<ViHashMapEx_Slot<TKey, TValue>>(0);
	private static readonly SlotAllocator = new ViMemoryAllocator<ViHashMapEx_Slot<any, any>>(ViHashMapEx_Slot, "ViHashMapEx_Slot", "HashMapEx");
}

export class ViHashMapExAssisstant
{
	public static GetHash<T>(obj: T): ViDelegateRT1<number, T>
	{
		if (obj instanceof ViString)
		{
			return ViString.HashCode as any;
		}
		else if (obj instanceof UInt8)
		{
			return UInt8.HashCode as any;
		}
		else if (obj instanceof Int8)
		{
			return Int8.HashCode as any;
		}
		else if (obj instanceof UInt16)
		{
			return UInt16.HashCode as any;
		}
		else if (obj instanceof Int16)
		{
			return Int16.HashCode as any;
		}
		else if (obj instanceof UInt32)
		{
			return UInt32.HashCode as any;
		}
		else if (obj instanceof Int32)
		{
			return Int32.HashCode as any;
		}
		else if (obj instanceof UInt64)
		{
			return UInt64.HashCode as any;
		}
		else if (obj instanceof Int64)
		{
			return Int64.HashCode as any;
		}
		//
		return null;
	}
	//
	public static GetRawHash<T>(obj: T): ViDelegateRT1<number, number | string>
	{
		if (obj instanceof ViString)
		{
			return ViString.HashCodeEx;
		}
		else
		{
			return ViAssisstant.IntNear;
		}
	}
}

export class ViStringHashMapEx<TValue> extends ViHashMapEx<ViString, TValue>
{
	constructor(defaultSlotSize?: number)
	{
		super(defaultSlotSize);
		//
		this.EqualsFunc = ViString.Equals;
		this.KeyIdentificate = ViString.KeyValue;
		this.HashFunc = ViString.HashCode;
		this.KeyIdentificateHashFunc = ViString.HashCodeEx;
	}
}