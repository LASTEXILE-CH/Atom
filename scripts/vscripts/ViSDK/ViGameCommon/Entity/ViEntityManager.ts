import { NumberUI64 } from "../../ViSystem/ViNumber64";
import { ViDoubleLinkNode, ViDoubleLink } from "../../ViStruct/ViDoubleLink";
import { ViEntity } from "./ViEntity";
import { ViDelegater0, ViDelegate0 } from "../../ViSystem/ViDelegate";
import { NumberDictionaryEx } from "../../../Struct/NumberDictionaryEx";

export class ViEntityHunter
{
    public get Entity(): ViEntity { return this._entity; }
    public get ID(): number { return this._ID; }
    public readonly AttachNode = new ViDoubleLinkNode<ViEntityHunter>();
    //
    public OnStart(entity: ViEntity): void
    {
        this._entity = entity;
        this.Invoke();
    }
    //
    public OnEnd(entity: ViEntity): void
    {
        this._entity = null;
        this.Invoke();
    }
    //
    public SetListener(listener: any, func: ViDelegate0): void
    {
        this._callback.Set(listener, func);
    }
    //
    public ClearListener(): void
    {
        this._callback.Clear();
    }
    //
    public SetID(value: number): void
    {
        this._ID = value;
    }
    //
    private Invoke(): void
    {
        this._callback.Invoke();
    }
    //
    private _ID = 0;
    private _entity: ViEntity = null;
    private readonly _callback = new ViDelegater0();
}

export class ViEntityManager
{
    public readonly List = new ViDoubleLink<ViEntity>();
    public readonly TickList = new ViDoubleLink<ViEntity>();
    //
    public AddEntity(entity: ViEntity, node: ViDoubleLinkNode<ViEntity>): void
    {
        let packID = entity.PackID();
        //
        this.List.PushBackEx(node, entity);
        //
        entity.PreStart();
        entity.Start();
        entity.AftStart();
        //
        this._packList.Add(packID, entity);
        //
        let hunterList = this._hunterList.GetEx(packID, null);
        if(hunterList != null)
        {
            for (let iter = hunterList.GetHead(); !hunterList.IsEnd(iter);)
            {
                let iterHunter = iter.Data;
                iter = hunterList.Next(iter);
                //
                iterHunter.OnStart(entity);
            }
        }
    }
    //
    public DelEntity(entity: ViEntity, node: ViDoubleLinkNode<ViEntity>): void
    {
        let packID = entity.PackID();
        //
        let hunterList = this._hunterList.GetEx(packID, null);
        if (hunterList != null)
        {
            for (let iter = hunterList.GetHead(); !hunterList.IsEnd(iter);)
            {
                let iterHunter = iter.Data;
                iter = hunterList.Next(iter);
                //
                iterHunter.OnEnd(entity);
            }
        }
        //
        this._packList.Del(packID);
        //
        entity.ClearCallback();
        entity.PreEnd();
        entity.End();
        entity.AftEnd();
        entity.ClearCallback();
        node.DetachEx(null);
    }
    //
    public GetEntity(ID: NumberUI64): ViEntity
    {
        for (let list = this.List, iter = list.GetHead(); !list.IsEnd(iter);)
        {
            let iterEntity = iter.Data;
            iter = list.Next(iter);
            //
            if (iterEntity.ID().Equal(ID))
            {
                return iterEntity;
            }
        }
        //
        return null;
    }
    //
    public GetPackEntity(packID: number): ViEntity
    {
        return this._packList.Get(packID);
    }
    //
    public Start(): void
    {

    }
    //
    public End(): void
    {
        this._packList.Clear();
        this.List.Clear();
    }
    //
    public Tick(deltaTime: number): void
    {
        for (let list = this.TickList, iter = list.GetHead(), IsEnd = list.IsEnd.bind(list), Next = list.Next.bind(list); !IsEnd(iter);)
        {
            let iterEntity = iter.Data;
            iter = Next(iter);
            //
            iterEntity.Tick(deltaTime);
        }
    }
    //
    public AddHunter(packID: number, hunter: ViEntityHunter): void
    {
        hunter.SetID(packID);
        //
        let list = this._hunterList.GetEx(packID, null);
        if (list == null)
        {
            list = new ViDoubleLink<ViEntityHunter>();
            this._hunterList.Add(packID, list);
        }
        list.PushBackEx(hunter.AttachNode, hunter);
        //
        let entity = this.GetPackEntity(packID);
        if (entity != null)
        {
            hunter.OnStart(entity);
        }
    }
    //
    public DelHunter(hunter: ViEntityHunter): void
    {
        let packID = hunter.ID;
        //
        hunter.AttachNode.DetachEx(null);
        let list = this._hunterList.GetEx(packID, null);
        if (list != null && list.Empty)
        {
            this._hunterList.Del(packID);
        }
        //
        let entity = hunter.Entity;
        if (entity != null)
        {
            hunter.OnEnd(entity);
        }
    }
    //
    private readonly _packList = new NumberDictionaryEx<ViEntity>(499);
    private readonly _hunterList = new NumberDictionaryEx<ViDoubleLink<ViEntityHunter>>();
}