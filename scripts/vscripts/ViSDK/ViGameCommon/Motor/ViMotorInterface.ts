import { ViMathDefine } from "../../ViMath/ViMathDefine";
import { ViVector3, ViVector3Assisstant } from "../../ViMath/ViVector3";

export class ViMotorInterface
{
	public get Duration(): number { return this._duration; }
	public get Speed(): number { return this._speed; }
	public get Distance(): number { return this._distance; }
	public get IsEnd(): boolean { return this._duration < 0.01; }
	public get Translate(): ViVector3 { return this._translate; }
	public get Velocity(): ViVector3 { return this._velocity; }
	public get Target(): ViVector3 { return this._target; }
	//
	public EndForceUpdate: boolean = true;
	public readonly Direction = new ViVector3();
	public get Roll(): number { return 0.0; }
	public UpdateSpan: number = 0.1;
	//
	public Start(from: ViVector3, to: ViVector3, duration: number): void
	{
		this._duration = duration;
		this._velocity.CopyFrom(ViVector3.ZERO);
		this._translate.CopyFrom(from);
		this._target = to;
	}
	//
	private static readonly CACHE_Update_IterMoved = new ViVector3();
	public Update(deltaTime: number, moved?: ViVector3): boolean
	{
		if (moved != null)
		{
			moved.CopyFrom(ViVector3.ZERO);
		}
		//
		if (this._duration <= 0)
		{
			return false;
		}
		//
		let iterMoved = ViMotorInterface.CACHE_Update_IterMoved;
		deltaTime = ViMathDefine.Min(this._duration, deltaTime);
		while (deltaTime > this.UpdateSpan)
		{
			deltaTime -= this.UpdateSpan;
			this.Update2(this.UpdateSpan, iterMoved);
			if (moved != null)
			{
				ViVector3Assisstant.Add(moved, iterMoved, moved);
			}
		}
		if (deltaTime > 0)
		{
			this.Update2(deltaTime, iterMoved);
			if (moved != null)
			{
				ViVector3Assisstant.Add(moved, iterMoved, moved);
			}
		}
		//
		return true;
	}
	//
	private static readonly CACHE_Update_Diff = new ViVector3();
	private Update2(deltaTime: number, moved: ViVector3): void
	{
		ViVector3Assisstant.Del(this._target, this._translate, ViMotorInterface.CACHE_Update_Diff);
		this._distance = ViMotorInterface.CACHE_Update_Diff.Length;
		let STABLE = 0.01;
		this._speed = (this._distance + STABLE) / (this._duration + STABLE);
		if (this._speed > 0.1)
		{
			this._Update(deltaTime, this._target);
			ViVector3Assisstant.Set(this._velocity, deltaTime, moved);
			ViVector3Assisstant.Add(this._translate, moved, this._translate);
		}
		else
		{
			moved.CopyFrom(ViVector3.ZERO);
		}
		this._duration -= deltaTime;
		if (this._duration <= 0.0)
		{
			if (this.EndForceUpdate)
			{
				ViVector3Assisstant.Del(this._target, this._translate, moved);
				this._translate.CopyFrom(this._target);
			}
		}
	}
	//
	public _Update(deltaTime: number, target: ViVector3): void { }
	//
	protected _target: ViVector3 = null;
	private _duration;
	private _speed;
	private _distance;
	private readonly _translate = new ViVector3();
	public readonly _velocity = new ViVector3();
}