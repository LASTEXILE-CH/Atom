import { ViList, ViMemoryAllocator, ViString } from "../ViSystem/ViSystemType";

class ViHashMap_Slot<TKey, TValue>
{
	public get Count(): number { return this._keyArray.length; }
	//
	public Add(key: TKey, value: TValue): void
	{
		let _keyArray = this._keyArray;
		let _valueArray = this._valueArray;
		for (let iter = 0, count = _keyArray.length; iter < count; ++iter)
		{
			if (_keyArray[iter] == key)
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
	public Del(key: TKey): TValue | undefined
	{
		let _keyArray = this._keyArray;
		let _valueArray = this._valueArray;
		for (let iter = 0, count = _keyArray.length; iter < count; ++iter)
		{
			if (_keyArray[iter] == key)
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
	public Get(key: TKey): TValue | undefined
	{
		let _keyArray = this._keyArray;
		let _valueArray = this._valueArray;
		for (let iter = 0, count = _keyArray.length; iter < count; ++iter)
		{
			if (_keyArray[iter] == key)
			{
				return _valueArray[iter];
			}
		}
		//
		return undefined;
	}
	//
	public GetEx(key: TKey, defaultValue: TValue): TValue
	{
		let _keyArray = this._keyArray;
		let _valueArray = this._valueArray;
		for (let iter = 0, count = _keyArray.length; iter < count; ++iter)
		{
			if (_keyArray[iter] == key)
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

//+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
export class ViNumberHashMap<TValue>
{
	public static readonly DEFAULT_SLOT_SIZE = 7;
	//
	public static ClearCache(): void
	{
		ViNumberHashMap.SlotAllocator.Clear(null);
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
	public get Count(): number { return this._count; }
	public get Empty(): boolean { return this._count <= 0; }
	public get NotEmpty(): boolean { return this._count > 0; }
	//
	public Add(key: number, value: TValue): void
	{
		if (this._slotList.length <= 0)
		{
			this.SetSlotSize(ViNumberHashMap.DEFAULT_SLOT_SIZE);
		}
		//
		let _slotList = this._slotList;
		let hashKey = Math.round(key) % _slotList.length;
		let list = _slotList[hashKey];
		let oldCount = list.Count;
		list.Add(key, value);
		this._count += (list.Count - oldCount);
		//
		if (this._count > _slotList.length * 2)
		{
			this.SetSlotSize(this._count * 2);
		}
	}
	//
	public AddIgnoreSlotSize(key: number, value: TValue): void
	{
		let _slotList = this._slotList;
		let hashKey = Math.round(key) % _slotList.length;
		let list = _slotList[hashKey];
		let oldCount = list.Count;
		list.Add(key, value);
		this._count += (list.Count - oldCount);
	}
	//
	public Del(key: number): TValue | undefined
	{
		let _slotList = this._slotList;
		if (_slotList.length > 0)
		{
			let hashKey = Math.round(key) % _slotList.length;
			let list = _slotList[hashKey];
			let oldCount = list.Count;
			let value = list.Del(key);
			this._count += (list.Count - oldCount);
			return value;
		}
		else
		{
			return undefined;
		}
	}
	//
	public Get(key: number): TValue | undefined
	{
		let _slotList = this._slotList;
		if (_slotList.length > 0)
		{
			let hashKey = Math.round(key) % _slotList.length;
			return _slotList[hashKey].Get(key);
		}
		else
		{
			return undefined;
		}
	}
	//
	public GetEx(key: number, defaultValue: TValue): TValue
	{
		let _slotList = this._slotList;
		if (_slotList.length > 0)
		{
			let hashKey = Math.round(key) % _slotList.length;
			return _slotList[hashKey].GetEx(key, defaultValue);
		}
		else
		{
			return defaultValue;
		}
	}
	//
	public Contain(key: number): boolean
	{
		let _slotList = this._slotList;
		if (_slotList.length > 0)
		{
			let hashKey = Math.round(key) % _slotList.length;
			return _slotList[hashKey].Get(key) != undefined;
		}
		else
		{
			return false;
		}
	}
	//
	private static readonly CACHE_SetSlotSize_KeyList = new ViList<number>();
	private static readonly CACHE_SetSlotSize_ValueList = new ViList<any>();
	public SetSlotSize(value: number): void
	{
		let oldSlotList = this._slotList;
		if (value <= oldSlotList.length)
		{
			return;
		}
		//
		let SlotAllocator = ViNumberHashMap.SlotAllocator;
		let cacheKeyList = ViNumberHashMap.CACHE_SetSlotSize_KeyList;
		let cacheValueList = ViNumberHashMap.CACHE_SetSlotSize_ValueList;
		for (let iter = 0, count = oldSlotList.length; iter < count; ++iter)
		{
			let iterSlot = oldSlotList[iter];
			iterSlot.CopyToEx(cacheKeyList, cacheValueList);
			iterSlot.Clear();
		}
		//
		let newSlotList = new Array<ViHashMap_Slot<number, TValue>>(value);
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
			let iterHashKey = Math.round(iterKey) % slotSize;
			let iterList = newSlotList[iterHashKey];
			iterList.Add(iterKey, iterValue);
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
			ViNumberHashMap.SlotAllocator.FreeArray(_slotList, true);
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
	private _slotList = new Array<ViHashMap_Slot<number, TValue>>(0);
	private static readonly SlotAllocator = new ViMemoryAllocator<ViHashMap_Slot<number, any>>(ViHashMap_Slot, "ViHashMap_Slot", "NumberHashMap");
}

//+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
export class ViStringHashMap<TValue>
{
	public static readonly DEFAULT_SLOT_SIZE = 7;
	//
	public static ClearCache(): void
	{
		ViStringHashMap.SlotAllocator.Clear(null);
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
	public get Count(): number { return this._count; }
	public get Empty(): boolean { return this._count <= 0; }
	public get NotEmpty(): boolean { return this._count > 0; }
	//
	public Add(key: string, value: TValue): void
	{
		if (this._slotList.length <= 0)
		{
			this.SetSlotSize(ViStringHashMap.DEFAULT_SLOT_SIZE);
		}
		//
		let _slotList = this._slotList;
		let hashKey = ViString.HashCodeEx(key) % _slotList.length;
		let list = _slotList[hashKey];
		let oldCount = list.Count;
		list.Add(key, value);
		this._count += (list.Count - oldCount);
		//
		if (this._count > _slotList.length * 2)
		{
			this.SetSlotSize(this._count * 2);
		}
	}
	//
	public AddIgnoreSlotSize(key: string, value: TValue): void
	{
		let _slotList = this._slotList;
		let hashKey = ViString.HashCodeEx(key) % _slotList.length;
		let list = _slotList[hashKey];
		let oldCount = list.Count;
		list.Add(key, value);
		this._count += (list.Count - oldCount);
	}
	//
	public Del(key: string): TValue | undefined
	{
		let _slotList = this._slotList;
		if (_slotList.length > 0)
		{
			let hashKey = ViString.HashCodeEx(key) % _slotList.length;
			let list = _slotList[hashKey];
			let oldCount = list.Count;
			let value = list.Del(key);
			this._count += (list.Count - oldCount);
			return value;
		}
		else
		{
			return undefined;
		}
	}
	//
	public Get(key: string): TValue | undefined
	{
		let _slotList = this._slotList;
		if (_slotList.length > 0)
		{
			let hashKey = ViString.HashCodeEx(key) % _slotList.length;
			return _slotList[hashKey].Get(key);
		}
		else
		{
			return undefined;
		}
	}
	//
	public GetEx(key: string, defaultValue: TValue): TValue
	{
		let _slotList = this._slotList;
		if (_slotList.length > 0)
		{
			let hashKey = ViString.HashCodeEx(key) % _slotList.length;
			return _slotList[hashKey].GetEx(key, defaultValue);
		}
		else
		{
			return defaultValue;
		}
	}
	//
	public Contain(key: string): boolean
	{
		let _slotList = this._slotList;
		if (_slotList.length > 0)
		{
			let hashKey = ViString.HashCodeEx(key) % _slotList.length;
			return _slotList[hashKey].Get(key) != undefined;
		}
		else
		{
			return false;
		}
	}
	//
	private static readonly CACHE_SetSlotSize_KeyList = new ViList<string>();
	private static readonly CACHE_SetSlotSize_ValueList = new ViList<any>();
	public SetSlotSize(value: number): void
	{
		let oldSlotList = this._slotList;
		if (value <= oldSlotList.length)
		{
			return;
		}
		//
		let SlotAllocator = ViStringHashMap.SlotAllocator;
		let cacheKeyList = ViStringHashMap.CACHE_SetSlotSize_KeyList;
		let cacheValueList = ViStringHashMap.CACHE_SetSlotSize_ValueList;
		for (let iter = 0, count = oldSlotList.length; iter < count; ++iter)
		{
			let iterSlot = oldSlotList[iter];
			iterSlot.CopyToEx(cacheKeyList, cacheValueList);
			iterSlot.Clear();
		}
		//
		let newSlotList = new Array<ViHashMap_Slot<string, TValue>>(value);
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
			let iterHashKey = ViString.HashCodeEx(iterKey) % slotSize;
			let iterList = newSlotList[iterHashKey];
			iterList.Add(iterKey, iterValue);
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
			ViStringHashMap.SlotAllocator.FreeArray(_slotList, true);
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
	private _slotList = new Array<ViHashMap_Slot<string, TValue>>(0);
	private static readonly SlotAllocator = new ViMemoryAllocator<ViHashMap_Slot<string, any>>(ViHashMap_Slot, "ViHashMap_Slot", "StringHashMap");
}
