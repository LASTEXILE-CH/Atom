import { ViMemoryAllocator, ViList, ViAssisstantEx } from "../ViSystem/ViSystemType";
import { ViDebuger } from "../ViSystem/ViDebuger";
import { ViNumberSerializer } from "../ViSystem/ViSerializer";
import { NumberUI64, NumberI64 } from "../ViSystem/ViNumber64";
import { ViDelegater2, ViDelegater1, ViDelegater3 } from "../ViSystem/ViDelegate";
import { ViNetInterface } from "../ViSystem/ViNetInterface";
import { ViDoubleLinkNode } from "../ViStruct/ViDoubleLink";
import { ViEntityManager } from "../ViGameCommon/Entity/ViEntityManager";
import { ViEntitySerialize } from "../ViGameCommon/Entity/ViEntitySerialize";
import { ViEntityAssisstant } from "../ViGameCommon/Entity/ViEntityAssisstant";
import { ViRPCResultDistributor } from "./Result/ViRPCResultDistributor";
import { ViRPCLicence } from "./ViRPCLicence";
import { ViRPCEntity } from "./ViRPCEntity";
import { ViIStream } from "../ViSystem/ViIStream";
import { NumberDictionaryEx } from "../../Struct/NumberDictionaryEx";

export enum ViRPCMessage
{
	INF = 60000,
	CONNECT_START,
	CONNECT_END,
	EXEC_ACK,
	EXEC_RESULT,
	EXEC_EXCEPTION,
	EXEC_BUSY,
	VERSION,
	VERSION_RESULT,
	LOGIN,
	LOGIN_RESULT,
	LICENCE_UPDATE,
	GAME_START,
	GAME_TIME_UPDATE,
	CREATE_SELF,
	ENTITY_EMERGE,
	ENTITY_VANISH,
	ENTITY_LIST_EMERGE,
	ENTITY_LIST_VANISH,
	ENTITY_PROPERTY_UPDATE_CHANNEL_INF,
	ENTITY_PROPERTY_UPDATE_CHANNEL_SUP = ENTITY_PROPERTY_UPDATE_CHANNEL_INF + 15,
	ENTITY_GM,
	ENTITY_MESSAGE,
	SCRIPT_STREAM,
	ENTITY_ID_PACK,
	ENTITY_ID_PACK_LIST,
	PING,
	SQL_EXEC,
	SQL_EXEC_LIST,
	SQL_RESULT,
	SUP,
}

export interface ViRPCExecer
{
	ID(): NumberUI64;
	PackID(): number;
	Entity(): ViRPCEntity;
	AttachNode(): ViDoubleLinkNode<ViRPCExecer>;
	//
	End(entityManager: ViEntityManager): void;
	Start(ID: NumberUI64, packID: number, asLocal: boolean, entityManager: ViEntityManager, channelMask: number, stream: ViIStream): void;
	OnPropertyUpdateStart(channel: number): void;
	OnPropertyUpdate(channel: number, stream: ViIStream): void;
	OnPropertyUpdateEnd(channel: number): void;
	OnMessage(funcID: number, stream: ViIStream): void;
	CreateHandler(): void;
	ClearHandler(): void;
}

export class ViEntityCreator
{
	public static RegisterCreator(type: number, alloc: { new(): ViRPCExecer; }): void
	{
		ViEntityCreator._list.Add(type, new ViMemoryAllocator<ViRPCExecer>(alloc, "ViRPCExecer", "EntityCreator"));
	}
	//
	public static Alloc(type: number): ViRPCExecer
	{
		let allocator = ViEntityCreator._list.Get(type);
		if (allocator != undefined)
		{
			return allocator.Alloc();
		}
		else
		{
			ViDebuger.Error("ViEntityCreator.Alloc(Type:" + type + ") error!");
			return null;
		}
	}
	//
	public static Free(type: number, execer: ViRPCExecer): void
	{
		let allocator = ViEntityCreator._list.Get(type);
		if (allocator != undefined)
		{
			allocator.Free(execer);
		}
	}
	//
	public static ClearCache(): void
	{
		let list = new ViList<ViMemoryAllocator<ViRPCExecer>>();
		this._list.CopyTo(list);
		for (let iter = 0, count = list.Count; iter < count; ++iter)
		{
			let iterAllocator = list.Get(iter);
			iterAllocator.Clear(null);
		}
		list.Clear();
	}
	//
	private static readonly _list = new NumberDictionaryEx<ViMemoryAllocator<ViRPCExecer>>(29);
}

export class ViRPCExecerManager
{
	public readonly SystemMessageExecer = new ViDelegater2<number, ViIStream>();
	public readonly OnLoginResult = new ViDelegater2<number, string>();
	public readonly OnSelfCreatedExecer = new ViDelegater1<ViRPCExecer>();
	public readonly OnSelfMessageExecer = new ViDelegater3<number, NumberUI64, ViIStream>();
	public readonly OnExecBusyExecer = new ViDelegater1<number>();
	public readonly OnEntityEnterExecer = new ViDelegater1<ViRPCExecer>();
	public readonly OnEntityLeaveExecer = new ViDelegater1<ViRPCExecer>();
	public readonly OnGameStartExecer = new ViDelegater2<NumberI64, NumberI64>();
	public readonly OnGameTimeExecer = new ViDelegater1<NumberI64>();
	public readonly OnScriptStream = new ViDelegater2<string, ViIStream>();
	public readonly OnPing = new ViDelegater2<NumberI64, NumberI64>();
	//
	public static readonly SYSTEM_MSG_INF: number = 60000;
	public SELF_PROPERTY_MASK: number = 0;
	public OTHER_PROPERTY_MASK: number = 0;
	//
	public readonly EntityManager = new ViEntityManager();
	public get OtherEntityShow(): boolean { return this._otherEntityShow; }
	public get ResultDistributor(): ViRPCResultDistributor { return this._resultDistributor; }
	public get Licence(): ViRPCLicence { return this._licence; }
	//
	public constructor(otherEntityShow: boolean)
	{
		this._otherEntityShow = otherEntityShow;
		//
		this._handleList[ViRPCMessage.CREATE_SELF] = this.OnSelfEntity.bind(this);
		this._handleList[ViRPCMessage.ENTITY_EMERGE] = this.OnEntityEmerge.bind(this);
		this._handleList[ViRPCMessage.ENTITY_VANISH] = this.OnEntityVanish.bind(this);
		this._handleList[ViRPCMessage.ENTITY_LIST_EMERGE] = this.OnEntityListEmerge.bind(this);
		this._handleList[ViRPCMessage.ENTITY_LIST_VANISH] = this.OnEntityListVanish.bind(this);
		this._handleList[ViRPCMessage.ENTITY_MESSAGE] = this.OnEntityMessage.bind(this);
		this._handleList[ViRPCMessage.GAME_START] = this.OnGameStart.bind(this);
		this._handleList[ViRPCMessage.GAME_TIME_UPDATE] = this.OnGameTime.bind(this);
		this._handleList[ViRPCMessage.EXEC_ACK] = this.OnExecACK.bind(this);
		this._handleList[ViRPCMessage.EXEC_RESULT] = this._OnRPCResult.bind(this);
		this._handleList[ViRPCMessage.EXEC_EXCEPTION] = this._OnRPCResultException.bind(this);
		this._handleList[ViRPCMessage.EXEC_BUSY] = this._OnExecBusy.bind(this);
		this._handleList[ViRPCMessage.LOGIN_RESULT] = this._OnLoginResult.bind(this);
		this._handleList[ViRPCMessage.LICENCE_UPDATE] = this._OnLicenceUpdate.bind(this);
		this._handleList[ViRPCMessage.SCRIPT_STREAM] = this._OnScriptStream.bind(this);
		this._handleList[ViRPCMessage.PING] = this._OnPing.bind(this);
	}
	//
	private static readonly CACHE_OnMessage_BroadCastChannelStream = new ViIStream();
	public OnMessage(stream: ViIStream): void
	{
		ViEntitySerialize.EntityNameger = this.EntityManager;
		ViEntityAssisstant.EntityManager = this.EntityManager;
		let SYSTEM_MSG_INF = ViRPCExecerManager.SYSTEM_MSG_INF;
		let ENTITY_PROPERTY_UPDATE_CHANNEL_INF = ViRPCMessage.ENTITY_PROPERTY_UPDATE_CHANNEL_INF;
		let ENTITY_PROPERTY_UPDATE_CHANNEL_SUP = ViRPCMessage.ENTITY_PROPERTY_UPDATE_CHANNEL_SUP;
		let ReadUInt16 = stream.ReadUInt16.bind(stream);
		let ReadUInt24 = stream.ReadUInt24.bind(stream);
		let ReadStream = stream.ReadStream.bind(stream);
		let propertyStream = ViRPCExecerManager.CACHE_OnMessage_BroadCastChannelStream;
		let OnEntityPropertyUpdate = this.OnEntityPropertyUpdate.bind(this);
		let OnEntityExec = this.OnEntityExec.bind(this);
		let handleList = this._handleList;
		while (stream.RemainLength > 0)
		{
			let iterFuncID = ReadUInt16();
			this._lastFuncID = iterFuncID;
			//ViDebuger.CritOK("ViRPCExecer._OnMessage(FuncID: " + funcID + ", Len: " + stream.RemainLength() + ")");
			if (iterFuncID >= SYSTEM_MSG_INF)
			{
				if (ENTITY_PROPERTY_UPDATE_CHANNEL_INF <= iterFuncID && iterFuncID <= ENTITY_PROPERTY_UPDATE_CHANNEL_SUP)
				{
					let channel = iterFuncID - ENTITY_PROPERTY_UPDATE_CHANNEL_INF;
					let entityPackID = ReadUInt24();
					ReadStream(propertyStream, false);
					OnEntityPropertyUpdate(entityPackID, channel, propertyStream);
				}
				else
				{
					let iterFunc = handleList[iterFuncID];
					if (iterFunc != null)
					{
						iterFunc(stream);
					}
					else
					{
						this.PrintLastState();
						ViDebuger.AssertError(this.SystemMessageExecer != null, "RPCExecer.SystemMessageExecer == null");
						this.SystemMessageExecer.Invoke(iterFuncID, stream);
					}
				}
			}
			else
			{
				let entityPackedID = ReadUInt24();
				OnEntityExec(entityPackedID, iterFuncID, stream);
			}
		}
	}
	//
	public Start(net: ViNetInterface): void
	{
		this._net = net;
		this.Licence.Clear();
		this.EntityManager.Start();
	}
	//
	public End(): void
	{
		let execerList = new ViList<ViRPCExecer>();
		this._execerList.CopyTo(execerList);
		let Type = ViEntityAssisstant.Type;
		let Free = ViEntityCreator.Free;
		for (let iter = 0; iter < execerList.Count; ++iter)
		{
			let iterExecer = execerList.Get(iter);
			Free(Type(iterExecer.ID()), iterExecer);
			iterExecer.ClearHandler();
			iterExecer.End(this.EntityManager);
		}
		this._execerList.Clear();
		this.EntityManager.End();
		this.Licence.Clear();
		this._resultDistributor.Clear();
		//
		execerList.Clear();
	}
	//
	public OnEntityExec(packedID: number, funcID: number, stream: ViIStream): void
	{
		let execer = this._execerList.Get(packedID);
		if (execer != undefined)
		{
			execer.OnMessage(funcID, stream);
		}
		else
		{
			if (this.OtherEntityShow)
			{
				this.PrintLastState();
				ViDebuger.Warning("Exec[FuncID:" + funcID + "].Entity(PackedID:" + packedID + ") is not exist!");
			}
		}
	}
	//
	public OnEntityListEmerge(stream: ViIStream): void
	{
		if (!this.OtherEntityShow)
		{
			return;
		}
		//
		let entityIDList = ViRPCExecerManager.CACHE_EntityIDList;
		let entityPackIDList = ViRPCExecerManager.CACHE_EntityPackIDList;
		let count = ViNumberSerializer.ReadFromListAsUInt64Ex(entityIDList, stream);
		ViNumberSerializer.ReadFromListAsUInt24Ex(entityPackIDList, stream);
		let OTHER_PROPERTY_MASK = this.OTHER_PROPERTY_MASK;
		let _net = this._net;
		let _licence = this._licence;
		let _execerList = this._execerList;
		let EntityManager = this.EntityManager;
		let OnEntityEnterExecer = this.OnEntityEnterExecer;
		let Alloc = ViEntityCreator.Alloc;
		let Type = ViEntityAssisstant.Type;
		for (let iter = 0; iter < count; ++iter)
		{
			let entityID = entityIDList[iter];
			let entityPackID = entityPackIDList[iter];
			if (_execerList.Contain(entityPackID))
			{
				this.PrintLastState();
				ViDebuger.Warning("EmergeList.Entity(ID:" + entityID.ToString() + "/" + entityPackID + ") is exist!");
				continue;
			}
			//
			let execer = Alloc(Type(entityID));
			execer.Start(entityID, entityPackID, false, EntityManager, OTHER_PROPERTY_MASK, stream);
			execer.Entity().RPC().Start(_net, null, _licence);
			_execerList.Add(entityPackID, execer);
			OnEntityEnterExecer.Invoke(execer);
		}
	}
	//
	private static readonly CACHE_OnEntityEmerge_EntityID = new NumberUI64();
	public OnEntityEmerge(stream: ViIStream): void
	{
		if (!this.OtherEntityShow)
		{
			return;
		}
		//
		let entityID = ViRPCExecerManager.CACHE_OnEntityEmerge_EntityID;
		stream.ReadUInt64(entityID);
		let entityPackID = stream.ReadUInt24();
		if (this._execerList.Contain(entityPackID))
		{
			this.PrintLastState();
			ViDebuger.Warning("Emerge.Entity(ID:" + entityID.ToString() + "/" + entityPackID + ") is exist!");
			return;
		}
		else
		{
			//ViDebuger.CritOK("Emerge.Entity(ID:" + entityID.ToString() + "/" + entityPackID + ")");
		}
		let execer = ViEntityCreator.Alloc(ViEntityAssisstant.Type(entityID));
		execer.Start(entityID, entityPackID, false, this.EntityManager, this.OTHER_PROPERTY_MASK, stream);
		execer.Entity().RPC().Start(this._net, null, this._licence);
		execer.CreateHandler();
		this._execerList.Add(entityPackID, execer);
		this.OnEntityEnterExecer.Invoke(execer);
	}
	//
	private static readonly CACHE_OnSelfEntity_EntityID = new NumberUI64();
	public OnSelfEntity(stream: ViIStream): void
	{
		let entityID = ViRPCExecerManager.CACHE_OnSelfEntity_EntityID;
		stream.ReadUInt64(entityID);
		let entityPackID = stream.ReadUInt24();
		let execer = ViEntityCreator.Alloc(ViEntityAssisstant.Type(entityID));
		execer.Start(entityID, entityPackID, true, this.EntityManager, this.SELF_PROPERTY_MASK, stream);
		execer.Entity().RPC().Start(this._net, this._resultDistributor, this._licence);
		execer.CreateHandler();
		this._execerList.Add(entityPackID, execer);
		this.OnSelfCreatedExecer.Invoke(execer);
	}
	//
	public OnEntityListVanish(stream: ViIStream): void
	{
		if (!this.OtherEntityShow)
		{
			return;
		}
		//
		let entityPackIDList = ViRPCExecerManager.CACHE_EntityPackIDList;
		let count = ViNumberSerializer.ReadFromListAsUInt24Ex(entityPackIDList, stream);
		this._OnEntityListVanish(entityPackIDList, count);
	}
	//
	private _OnEntityListVanish(entityList: Array<number>, size: number): void
	{
		let _execerList = this._execerList;
		let OnEntityLeaveExecer = this.OnEntityLeaveExecer;
		let EntityManager = this.EntityManager;
		let Free = ViEntityCreator.Free;
		let Type = ViEntityAssisstant.Type;
		for (let iter = 0; iter < size; ++iter)
		{
			let iterPackID = entityList[iter];
			let iterExecer = _execerList.Del(iterPackID);
			if (iterExecer == undefined)
			{
				this.PrintLastState();
				ViDebuger.Warning("Vanish.Entity(PackedID:" + iterPackID + ") is not exist!");
				continue;
			}
			//
			let iterID = iterExecer.ID();
			iterExecer.Entity().SetActive(false);
			OnEntityLeaveExecer.Invoke(iterExecer);
			iterExecer.ClearHandler();
			iterExecer.End(EntityManager);
			Free(Type(iterID), iterExecer);
		}
	}
	//
	public OnEntityVanish(stream: ViIStream): void
	{
		if (!this.OtherEntityShow)
		{
			return;
		}
		//
		let entityPackID = stream.ReadUInt24();
		let execer = this._execerList.Del(entityPackID);
		if (execer == undefined)
		{
			this.PrintLastState();
			ViDebuger.Warning("Vanish.Entity(PackedID:" + entityPackID + ") is not exist!");
			return;
		}
		//
		let entityID = execer.ID();
		execer.Entity().SetActive(false);
		this.OnEntityLeaveExecer.Invoke(execer);
		execer.ClearHandler();
		execer.End(this.EntityManager);
		ViEntityCreator.Free(ViEntityAssisstant.Type(entityID), execer);
	}
	//
	public DestroyEntityWithType(type: number): void
	{
		let delList = new ViList<number>();
		let execerList = new ViList<ViRPCExecer>();
		this._execerList.CopyTo(execerList);
		let Type = ViEntityAssisstant.Type;
		for (let iter = 0; iter < execerList.Count; ++iter)
		{
			let iterExecer = execerList.Get(iter);
			let iterEntity = iterExecer.Entity();
			if (iterEntity != null && Type(iterEntity.ID()) == type) 
			{
				delList.Push(iterEntity.PackID());
			}
		}
		//
		this._OnEntityListVanish(delList.Values, delList.Count);
		//
		delList.Clear();
		execerList.Clear();
	}
	//
	public OnEntityPropertyUpdate(entityPackID: number, channel: number, stream: ViIStream): void
	{
		let execer = this._execerList.Get(entityPackID);
		if (execer == undefined)
		{
			if (this.OtherEntityShow)
			{
				ViDebuger.Warning("UpdateProperty.Entity(PackedID:" + entityPackID + ") is not exist!");
			}
			return;
		}
		//
		execer.OnPropertyUpdateStart(channel);
		let OnPropertyUpdate = execer.OnPropertyUpdate.bind(execer);
		while (stream.RemainLength > 0)
		{
			OnPropertyUpdate(channel, stream);
		}
		execer.OnPropertyUpdateEnd(channel);
	}
	//
	private static readonly CACHE_OnEntityMessage_TypeMask = new NumberUI64();
	public OnEntityMessage(stream: ViIStream): void
	{
		let msgID = stream.ReadUInt16();
		let typeMask = ViRPCExecerManager.CACHE_OnEntityMessage_TypeMask;
		stream.ReadUInt64(typeMask);
		this.OnSelfMessageExecer.Invoke(msgID, typeMask, stream);
	}
	//
	public OnExecACK(stream: ViIStream): void
	{
		let entityPackID = stream.ReadUInt24();
		let funcID = stream.ReadUInt16();
		let execer = this._execerList.Get(entityPackID);
		if (execer != undefined)
		{
			execer.Entity().RPC().ACK.Ack(funcID);
		}
	}
	//
	public _OnExecBusy(stream: ViIStream): void
	{
		/*let entityPackID = */stream.ReadUInt24();
		let funcID = stream.ReadUInt16();
		this.OnExecBusyExecer.Invoke(funcID);
	}
	//
	private static readonly CACHE_OnRPCResult_Stream = new ViIStream();
	private static readonly CACHE_OnRPCResult_RPCID = new NumberUI64();
	public _OnRPCResult(stream: ViIStream): void
	{
		let localStream = ViRPCExecerManager.CACHE_OnRPCResult_Stream;
		stream.ReadStream(localStream, false);
		let RPCID = ViRPCExecerManager.CACHE_OnRPCResult_RPCID;
		localStream.ReadUInt64(RPCID);
		this.ResultDistributor.OnResult(RPCID, localStream);
	}
	//
	private static readonly CACHE_OnRPCResultException_Stream = new ViIStream();
	private static readonly CACHE_OnRPCResultException_RPCID = new NumberUI64();
	public _OnRPCResultException(stream: ViIStream): void
	{
		let localStream = ViRPCExecerManager.CACHE_OnRPCResultException_Stream;
		stream.ReadStream(localStream, false);
		let RPCID = ViRPCExecerManager.CACHE_OnRPCResultException_RPCID;
		localStream.ReadUInt64(RPCID);
		this.ResultDistributor.OnException(RPCID);
	}
	//
	public _OnLoginResult(stream: ViIStream): void
	{
		let result = stream.ReadUInt8();
		let note = stream.ReadString();
		this.OnLoginResult.Invoke(result, note);
	}
	//
	private static readonly CACHE_OnLicenceUpdate_LicenceList = new ViList<number>();
	public _OnLicenceUpdate(stream: ViIStream): void
	{
		let licenceList = ViRPCExecerManager.CACHE_OnLicenceUpdate_LicenceList;
		ViNumberSerializer.ReadFromListAsUInt8(licenceList, stream);
		this._licence.Add(licenceList);
	}
	//
	public OnGameStart(stream: ViIStream): void
	{
		let time1970 = new NumberI64();
		stream.ReadInt64(time1970);
		let timeAccumulate = new NumberI64();
		stream.ReadInt64(timeAccumulate);
		this.OnGameStartExecer.Invoke(time1970, timeAccumulate);
	}
	//
	private static readonly CACHE_OnGameTime_TimeAccumulate = new NumberI64();
	public OnGameTime(stream: ViIStream): void 
	{
		let timeAccumulate = ViRPCExecerManager.CACHE_OnGameTime_TimeAccumulate;
		stream.ReadInt64(timeAccumulate);
		this.OnGameTimeExecer.Invoke(timeAccumulate);
	}
	//
	private static readonly CACHE_OnScriptStream_Stream = new ViIStream();
	public _OnScriptStream(stream: ViIStream): void
	{
		let script = stream.ReadString();
		let localStream = ViRPCExecerManager.CACHE_OnScriptStream_Stream;
		stream.ReadStream(localStream, false);
		this.OnScriptStream.Invoke(script, localStream);
	}
	//
	private static readonly CACHE_OnPing_LocalTime = new NumberI64();
	private static readonly CACHE_OnPing_ServerTime = new NumberI64();
	public _OnPing(stream: ViIStream): void
	{
		let localTime = ViRPCExecerManager.CACHE_OnPing_LocalTime;
		stream.ReadInt64(localTime);
		let serverTime = ViRPCExecerManager.CACHE_OnPing_ServerTime;
		stream.ReadInt64(serverTime);
		//
		this.OnPing.Invoke(localTime, serverTime);
	}
	//
	private PrintLastState(): void
	{
		ViDebuger.Warning("ViRPCExecer.PrintLastState(FuncID:" + this._lastFuncID + ")");
	}
	//
	private _net: ViNetInterface;
	private readonly _resultDistributor = new ViRPCResultDistributor();
	private readonly _licence = new ViRPCLicence();
	private readonly _handleList = new Array<any>(ViRPCMessage.SUP - ViRPCMessage.INF);
	private readonly _execerList = new NumberDictionaryEx<ViRPCExecer>(499);
	private _otherEntityShow: boolean;
	private _lastFuncID = 0;
	//
	private static readonly CACHE_EntityIDList = ViAssisstantEx.NewArrayEx<NumberUI64>(4096, NumberUI64);
	private static readonly CACHE_EntityPackIDList = ViAssisstantEx.NewArray<number>(4096, 0);
}
