import { ViList, ViValueList } from "../ViSystem/ViSystemType";
import { ViAssisstant } from "../ViSystem/ViSystemConfig";
import { ViDebuger } from "../ViSystem/ViDebuger";
import { ViLinkListEx } from "../ViStruct/ViLinkList";
import { ViActiveValue, ViActiveValueEx } from "../ViStruct/ViActiveValue";
import { ViMathDefine } from "../ViMath/ViMathDefine";
import { ViVector3, ViVector3Assisstant } from "../ViMath/ViVector3";
import { ViEvent0AsynList } from "./Event/ViCallback0";
import { ViGeographic } from "./ViGeographic";

export class ViRoute
{
	public static HorizonZeroList(posList: ViList<ViVector3>): void
	{
		for (let iter = 0, array = posList.Values, count = posList.Count; iter < count; ++iter)
		{
			array[iter].z = 0;
		}
	}
	//
	public static HorizonZero(pos: ViVector3): void
	{
		pos.z = 0;
	}
	//
	public static GetLength(posList: ViList<ViVector3>, ignoreVertical: boolean): number
	{
		if (posList.Count <= 1)
		{
			return 0.0;
		}
		let len = 0.0;
		let prePos = posList.Get(0);
		let Distance = ViRoute.Distance;
		for (let iter = 1, array = posList.Values, count = posList.Count; iter < count; ++iter)
		{
			let iterPos = array[iter];
			len += Distance(iterPos, prePos, ignoreVertical);
			prePos = iterPos;
		}
		return len;
	}
	//
	public static GetLengthEx(posList: ViValueList<ViVector3>, ignoreVertical: boolean): number
	{
		return ViRoute.GetLengthExx(posList.Array, posList.Count, ignoreVertical);
	}
	public static GetLengthExx(posBuffer: Array<ViVector3>, posCount: number, ignoreVertical: boolean): number
	{
		if (posCount <= 1)
		{
			return 0.0;
		}
		let len = 0.0;
		let prePos = posBuffer[0];
		let Distance = ViRoute.Distance;
		for (let iter = 1; iter < posCount; ++iter)
		{
			let iterPos = posBuffer[iter];
			len += Distance(iterPos, prePos, ignoreVertical);
			prePos = iterPos;
		}
		return len;
	}
	//
	public static GetLength2(startPos: ViVector3, posList: ViList<ViVector3>, ignoreVertical: boolean): number
	{
		let len = 0.0;
		let prePos = startPos;
		let Distance = ViRoute.Distance;
		for (let iter = 0, array = posList.Values, count = posList.Count; iter < count; ++iter)
		{
			let iterPos = array[iter];
			len += Distance(iterPos, prePos, ignoreVertical);
			prePos = iterPos;
		}
		return len;
	}
	//
	public static GetLength2Ex(startPos: ViVector3, posList: ViValueList<ViVector3>, ignoreVertical: boolean): number
	{
		return ViRoute.GetLength2Exx(startPos, posList.Array, posList.Count, ignoreVertical);
	}
	//
	public static GetLength2Exx(startPos: ViVector3, posBuffer: Array<ViVector3>, posCount: number, ignoreVertical: boolean): number
	{
		let len = 0.0;
		let prePos = startPos;
		let Distance = ViRoute.Distance;
		for (let iter = 0; iter < posCount; ++iter)
		{
			let iterPos = posBuffer[iter];
			len += Distance(iterPos, prePos, ignoreVertical);
			prePos = iterPos;
		}
		return len;
	}
	//
	// public static ViVector3 GetPosByLength(ViVector3 src, List<ViVector3> path, float len)
	// {
	// 	return GetPosByLength(src, path, len, true);
	// }
	// public static ViVector3 GetPosByLength(ViVector3 src, List<ViVector3> path, float len, bool ignoreVertical)
	// {
	// 	if (len <= 0.0f)
	// 	{
	// 		return src;
	// 	}
	// 	float reserveLen = len;
	// 	//
	// 	ViVector3 prePos = src;
	// 	for (int iter = 0; iter < path.Count; ++iter)
	// 	{
	// 		ViVector3 iterPos = path[iter];
	// 		float stepLen = Distance(iterPos, prePos, ignoreVertical);
	// 		reserveLen -= stepLen;
	// 		if (reserveLen <= 0.0f)
	// 		{
	// 			ViVector3 kPos = ViVector3.Lerp(iterPos, prePos, -reserveLen / stepLen);
	// 			return kPos;
	// 		}
	// 		prePos = iterPos;
	// 	}
	// 	return prePos;
	// }
	//
	public static Distance(from: ViVector3, to: ViVector3, ignoreVertical: boolean): number
	{
		if (ignoreVertical)
		{
			let deltaX = from.x - to.x;
			let deltaY = from.y - to.y;
			return ViMathDefine.Sqrt((deltaX * deltaX) + (deltaY * deltaY));
		}
		else
		{
			return ViVector3.Distance(from, to);
		}
	}
	//
	public readonly Position = new ViVector3();
	public readonly Direction = new ViVector3();
	public get Yaw(): number { return this._yaw; }
	private readonly EndCallbackList = new ViEvent0AsynList();
	//
	public Append(pos: ViVector3): void
	{
		this._posList.PushBack(pos, ViVector3.CacheAllocator, ViVector3Assisstant.CopyTo);
	}
	//
	public AppendList(posList: ViList<ViVector3>): void
	{
		let CacheAllocator = ViVector3.CacheAllocator;
		let CopyTo = ViVector3Assisstant.CopyTo;
		let _posList = this._posList;
		for (let iter = 0, array = posList.Values, count = posList.Count; iter < count; ++iter)
		{
			_posList.PushBack(array[iter], CacheAllocator, CopyTo);
		}
	}
	//
	public AppendListEx(posList: ViValueList<ViVector3>): void
	{
		let CacheAllocator = ViVector3.CacheAllocator;
		let CopyTo = ViVector3Assisstant.CopyTo;
		let _posList = this._posList;
		for (let iter = 0, array = posList.Array, count = posList.Count; iter < count; ++iter)
		{
			_posList.PushBack(array[iter], CacheAllocator, CopyTo);
		}
	}
	//
	public AppendListExx(posList: Array<ViVector3>, count: number): void
	{
		let CacheAllocator = ViVector3.CacheAllocator;
		let CopyTo = ViVector3Assisstant.CopyTo;
		let _posList = this._posList;
		for (let iter = 0, count = posList.length; iter < count; ++iter)
		{
			_posList.PushBack(posList[iter], CacheAllocator, CopyTo);
		}
	}
	//
	// public void GetPosList(List<ViVector3> posList)
	// {
	// 	ViDoubleLinkNode2<ViRouteNode> iter = _nodes.GetHead();
	// 	while (!_nodes.IsEnd(iter))
	// 	{
	// 		ViRouteNode value = iter.Data;
	// 		ViDoubleLink2<ViRouteNode>.Next(ref iter);
	// 		//
	// 		posList.Add(value._pos);
	// 	}
	// }
	//
	public OnTick(deltaTime: number, spd: number): boolean
	{
		return this._UpdateDistance(deltaTime * spd, null);
	}
	public OnTickEx(deltaTime: number, spd: number, cornerPos: ViActiveValueEx<ViVector3>): boolean
	{
		return this._UpdateDistance(deltaTime * spd, cornerPos);
	}
	//
	public Start(pos: ViVector3): void
	{
		if (this._posList.IsEmpty())
		{
			this._ClearState();
			return;
		}
		this.Position.CopyFrom(pos);
		this._nextPos = this._LerpToNextNode();
		ViDebuger.AssertError(this._nextPos != null);
	}
	//
	public Reset(): void
	{
		this._ClearState();
		this._ClearNodeList();
		this.EndCallbackList.Clear();
	}
	//
	public ClearOtherPos(): void
	{
		this._ClearNodeList();
	}
	//
	// public bool GetNextPosition(ref ViVector3 pos)
	// {
	// 	if (_nextNode != null)
	// 	{
	// 		pos = _nextNode._pos;
	// 		return true;
	// 	}
	// 	else
	// 	{
	// 		return false;
	// 	}
	// }
	// public bool GetDestPosition(ref ViVector3 pos)
	// {
	// 	if (_nodes.IsEmpty())
	// 	{
	// 		return false;
	// 	}
	// 	else
	// 	{
	// 		pos = _nextNode._pos;
	// 		return true;
	// 	}
	// }
	//
	// public bool SetPosAtLength(float fReserveLen, bool accordHorizon)
	// {
	// 	if (fReserveLen >= Length())
	// 	{
	// 		return false;
	// 	}
	// 	float fDiff = Length() - fReserveLen;
	// 	_UpdateDistance(fDiff);
	// 	return true;
	// }
	//
	public Length(ignoreVertical: boolean): number
	{
		let len = 0.0;
		let prePos = this.Position;
		let _posList = this._posList;
		let Distance = ViRoute.Distance;
		for (let iter = _posList.GetHead(); !_posList.IsEnd(iter); iter = _posList.Next(iter))
		{
			let iterPos = iter.Data;
			len += Distance(iterPos, prePos, ignoreVertical);
			prePos = iterPos;
		}
		return len;
	}
	//
	public IsEnd(): boolean
	{
		return (this._nextPos == null);
	}
	//
	private _UpdateDistance(distance: number, cornerPos: ViActiveValueEx<ViVector3>): boolean
	{
		if (this._nextPos == null)
		{
			return false;
		}
		//
		let nextPos = this._nextPos;
		let Position = this.Position;
		let distRight = ViVector3.Distance(Position, nextPos);
		if (distance < distRight)
		{
			ViVector3Assisstant.AddEx(Position, this.Direction, distance, Position);
		}
		else
		{
			if (cornerPos != null)
			{
				cornerPos.Set(nextPos);
			}
			//
			let newDistance = distance - distRight;
			this.Position.CopyFrom(nextPos);
			this._posList.PopFront(ViVector3.CacheAllocator);
			this._nextPos = this._LerpToNextNode();
			if (this._nextPos != null)
			{
				this._UpdateDistance(newDistance, cornerPos);
			}
			else
			{
				this._ClearState();
			}
		}
		//
		return true;
	}
	//
	private _LerpToNextNode(): ViVector3
	{
		if (this._posList.IsNotEmpty())
		{
			let nextPos = this._posList.GetHead().Data;
			ViVector3Assisstant.Del(nextPos, this.Position, this.Direction);
			this.Direction.Normalize();
			this._yaw = ViGeographic.GetDirection(this.Direction.x, this.Direction.y);
			return nextPos;
		}
		else
		{
			return null;
		}
	}
	//
	private _ClearNodeList(): void
	{
		this._posList.Clear(ViVector3.CacheAllocator);
	}
	//
	private _ClearState(): void
	{
		this._nextPos = null;
	}
	//
	private _nextPos: ViVector3;
	private _yaw: number;
	private readonly _posList = new ViLinkListEx<ViVector3>();
}
