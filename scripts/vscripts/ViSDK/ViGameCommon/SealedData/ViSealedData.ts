import { ViString } from "../../ViSystem/ViSystemType";
import { ViAssisstant, ViProfiler } from "../../ViSystem/ViSystemConfig";
import { ViDebuger } from "../../ViSystem/ViDebuger";
import { ViIStream } from "../../ViSystem/ViIStream";
import { ViStringHashMap } from "../../ViStruct/ViHashMap";

export enum ViSealDataState
{
	ACTIVE,
	DEACTIVE,
}

export abstract class ViSealedData
{
	public ID = 0;
	public Name = "";
	public Note = "";
	public Active = true;
	//
	public Format(): void { }
	//
	public VisualName(language: number): string
	{
		return this.Name;
	}
	//
	public abstract Ready(stream: ViIStream): void;
}

class ViSealedDataLoadNode<TSealedData extends ViSealedData>
{
	public ID = 0;
	public Name = "";
	public Note = "";
	public Active = false;
	public Data: TSealedData = null;
	//
	public get IsReady(): boolean    
	{
		return this._stream == null;
	}
	//
	public ReadHead(stream: ViIStream, skipName: boolean, skipNote: boolean): void
	{
		this.ID = stream.ReadInt32();
		if (skipName)
		{
			stream.SkipString();
		}
		else
		{
			this.Name = stream.ReadString();
		}
		if (skipNote)
		{
			stream.SkipString();
		}
		else
		{
			this.Note = stream.ReadString();
		}
		this.Active = (stream.ReadUInt32() == ViSealDataState.ACTIVE);
		this._stream = stream;
	}
	//
	public Ready(name: string): void
	{
		let data = this.Data;
		let stream = this._stream;
		data.ID = this.ID;
		data.Name = this.Name;
		data.Note = this.Note;
		data.Active = this.Active;
		data.Ready(stream);
		data.Format();
		if (stream.RemainLength > 0 || stream.Error)
		{
			ViDebuger.Warning("SealedData<" + name + ">.Format Error!");
		}
		stream.Clear();
		//
		this._stream = null;
	}
	//
	private _stream: ViIStream = null;
}

export class ViSealedDB<TSealedData extends ViSealedData>
{
	public get Name(): string { return this._name; }
	//
	public constructor(alloc: { new(): TSealedData; }, name: string, skipName: boolean, skipNote: boolean, skipNameIndex?: boolean)
	{
		this._alloc = alloc;
		this._name = name;
		this._skipName = skipName;
		this._skipNote = skipNote;
		this._skipNameIndex = skipNameIndex != undefined ? (skipNameIndex || skipName) : skipName;
		this._defaultData = new alloc();
	}
	//
	public get MaxID(): number
	{
		if (this._stream != null)
		{
			this.UpdateStream();
		}
		//
		return this._maxID;
	}
	public get Count(): number
	{
		if (this._stream != null)
		{
			this.UpdateStream();
		}
		//
		return this._array.length;
	}
	public get IsLoaded(): boolean
	{
		return this._array != null || this._stream != null;
	}
	public get Array(): Array<TSealedData>
	{
		if (this._dataArray == null)
		{
			this.Ready();
			//
			let array = this._array;
			let count = array.length;
			let dataArray = new Array<TSealedData>(count);
			for (let iter = 0; iter < count; ++iter)
			{
				dataArray[iter] = array[iter].Data;
			}
			this._dataArray = dataArray;
		}
		//
		return this._dataArray;
	}
	//
	public Data(ID: number): TSealedData
	{
		if (this._stream != null)
		{
			this.UpdateStream();
		}
		//
		let data = this._array[this._IDIndexs_Get(ID, 0)];
		if (data != undefined)
		{
			if (data.Data == null)
			{
				data.Data = new this._alloc();
				data.Ready(this.Name);
			}
			return data.Data;
		}
		//
		ViDebuger.Warning("There is no data<" + this.Name + ">[" + ID + "]");
		//
		return this._defaultData;
	}
	//
	public IndexData(idx: number): TSealedData
	{
		let array = this.Array;
		if (idx < array.length)
		{
			return array[idx];
		}
		else
		{
			ViDebuger.Warning("There is no indexData<" + this.Name + ">[" + idx + "]");
			return this._defaultData;
		}
	}
	//
	public GetData(ID: number, includeZero: boolean): TSealedData
	{
		if (ID == 0 && !includeZero)
		{
			return null;
		}
		//
		if (this._stream != null)
		{
			this.UpdateStream();
		}
		//
		let index = this._IDIndexs_Get(ID, -1);
		if (index >= 0)
		{
			let data = this._array[index];
			if (data.Data == null)
			{
				data.Data = new this._alloc();
				data.Ready(this.Name);
			}
			return data.Data;
		}
		else
		{
			return null;
		}
	}
	//
	public GetIndexData(idx: number): TSealedData
	{
		let array = this.Array;
		if (idx < array.length)
		{
			return array[idx];
		}
		else
		{
			return null;
		}
	}
	//
	public DataByName(name: string): TSealedData
	{
		if (ViString.IsNullOrEmpty(name))
		{
			name = ViString.Empty;
		}
		//
		if (this._stream != null)
		{
			this.UpdateStream();
		}
		//
		let data = this._nameDict.Get(name);
		if (data != undefined)
		{
			if (data.Data == null)
			{
				data.Data = new this._alloc();
				data.Ready(this.Name);
			}
			return data.Data;
		}
		//
		data = this._array[0];
		if (data != undefined)
		{
			if (data.Data == null)
			{
				data.Data = new this._alloc();
				data.Ready(this.Name);
			}
			return data.Data;
		}
		//
		return this._defaultData;
	}
	//
	public GetDataByName(name: string): TSealedData
	{
		if (ViString.IsNullOrEmpty(name))
		{
			name = ViString.Empty;
		}
		//
		if (this._stream != null)
		{
			this.UpdateStream();
		}
		//
		let data = this._nameDict.Get(name);
		if (data != undefined)
		{
			if (data.Data == null)
			{
				data.Data = new this._alloc();
				data.Ready(this.Name);
			}
			return data.Data;
		}
		else
		{
			return null;
		}
	}
	//
	public Clear(): void
	{
		this._stream = null;
		//
		if (this._array != null)
		{
			this._array.splice(0, this._array.length);
			this._array = null;
		}
		if (this._IDIndexs != null)
		{
			this._IDIndexs.Clear();
			this._IDIndexs = null;
		}
		this._maxID = 0;
		this._nameDict.Clear(true);
		if (this._dataArray != null)
		{
			this._dataArray.splice(0, this._dataArray.length);
			this._dataArray = null;
		}
		this._ready = false;
	}
	//
	public Load(IS: ViIStream, ready: boolean): void
	{
		this.Clear();
		//
		if (IS == null)
		{
			ViDebuger.Note("Load IS == null");
			return;
		}
		//
		this._stream = IS;
		if (ready)
		{
			this.UpdateStream();
			this.Ready();
			this._ready = true;
		}
	}
	//
	public UpdateStream(): void
	{
		let count = this._stream.ReadInt32();
		if (count > this._stream.RemainLength)
		{
			ViDebuger.Warning("SealedData<" + this.Name + ">Load Stream Error!");
			return;
		}
		//
		ViProfiler.BeginSample("SealedData<" + this.Name + ">UpdateStream");
		//
		this._array = new Array<ViSealedDataLoadNode<TSealedData>>(count);
		this._IDIndexs = NumberDictionary.New(count);
		this._IDIndexs_Get = this._IDIndexs.Get.bind(this._IDIndexs);
		let _IDIndexs_Add = this._IDIndexs.Add.bind(this._IDIndexs);
		let _skipName = this._skipName;
		let _skipNote = this._skipNote;
		let _skipNameIndex = this._skipNameIndex;
		let _array = this._array;
		let maxID = 0;
		let Max = ViAssisstant.Max;
		let _stream = this._stream;
		let ReadStream = _stream.ReadStream.bind(_stream);
		let index = 0;
		while (count > 0 && _stream.RemainLength > 0)
		{
			--count;
			//
			let iterStream = new ViIStream();
			ReadStream(iterStream, false);
			let iterData = new ViSealedDataLoadNode<TSealedData>();
			iterData.ReadHead(iterStream, _skipName, _skipNote);
			if (iterData.Active)
			{
				_array[index] = iterData;
				_IDIndexs_Add(iterData.ID, index);
				//
				maxID = Max(iterData.ID, maxID);
				++index;
			}
		}
		_stream.Clear();
		//
		if (!_skipNameIndex)
		{
			let _nameDatas = this._nameDict;
			_nameDatas.SetSlotSize(count);
			for (let iter = 0, len = _array.length; iter < len; ++iter)
			{
				let iterData = _array[iter];
				_nameDatas.Add(iterData.Name, iterData);
			}
		}
		//
		ViProfiler.EndSample("SealedData<" + this.Name + ">UpdateStream");
		//
		this._array.splice(index, this._array.length - index);
		this._maxID = maxID;
		this._stream = null;
		//
		if (this._array.length != this._IDIndexs.Count())
		{
			ViDebuger.Warning("ID Conflicted<" + this.Name + ">");
		}
	}
	//
	public Ready(): void
	{
		if (this._stream != null)
		{
			this.UpdateStream();
		}
		//
		if (this._ready)
		{
			return;
		}
		//
		ViProfiler.BeginSample("SealedData<" + this.Name + ">Ready");
		//
		let _alloc = this._alloc, Name = this.Name;
		for (let iter = 0, array = this._array, count = array.length; iter < count; ++iter)
		{
			let iterNode = array[iter];
			if (iterNode.Data == null)
			{
				iterNode.Data = new _alloc();
				iterNode.Ready(Name);
			}
		}
		//
		ViProfiler.EndSample("SealedData<" + this.Name + ">Ready");
		//
		this._ready = true;
		//
	}
	//
	private _alloc: { new(): TSealedData; };
	private _name = "NONE";
	private _skipName = false;
	private _skipNote = false;
	private _skipNameIndex = false;
	private _array: Array<ViSealedDataLoadNode<TSealedData>> = null;
	private _IDIndexs: NumberDictionary = null;
	private _IDIndexs_Get: any = null;
	private _maxID = 0;
	private readonly _nameDict = new ViStringHashMap<ViSealedDataLoadNode<TSealedData>>();
	private _dataArray: Array<TSealedData> = null;
	private _defaultData: TSealedData = null;
	private _ready = false;
	private _stream: ViIStream = null;
}

export class ViEmptySealedData extends ViSealedData
{
	static readonly TABLE = new ViSealedDB(ViEmptySealedData, "ViEmptySealedData", true, true);
	//
	Ready(stream: ViIStream): void
	{

	}
}

export class ViSealedDataTypeStruct extends ViSealedData
{
	static readonly TABLE = new ViSealedDB(ViSealedDataTypeStruct, "ViSealedDataTypeStruct", true, true);
	//
	Ready(stream: ViIStream): void
	{

	}
}
