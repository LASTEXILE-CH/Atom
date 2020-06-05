
export class ViVerticalInterpolation
{
	public get Value(): number { return this._value; }
	public get Speed(): number { return this._speed; }
	//
	public Update(deltaTime: number): void
	{
		if (this._reserveUpDuration > deltaTime)
		{
			this._reserveUpDuration -= deltaTime;
			let deltaSpeed = this._upGravity * deltaTime;
			this._speed += 0.5 * deltaSpeed;
			this._value += this._speed * deltaTime;
			this._speed += 0.5 * deltaSpeed;
			return;
		}
		else if (this._reserveUpDuration > 0.0)
		{
			deltaTime -= this._reserveUpDuration;
			this._reserveUpDuration = 0.0;
		}
		//
		if (this._reserveStandDuration > deltaTime)
		{
			this._reserveStandDuration -= deltaTime;
			this._speed = 0.0;
			return;
		}
		else if (this._reserveStandDuration > 0.0)
		{
			deltaTime -= this._reserveStandDuration;
			this._reserveStandDuration = 0.0;
		}
		//
		if (this._reserveDownDuration > deltaTime)
		{
			this._reserveDownDuration -= deltaTime;
			let deltaSpeed = this._downGravity * deltaTime;
			this._speed += 0.5 * deltaSpeed;
			this._value += this._speed * deltaTime;
			this._speed += 0.5 * deltaSpeed;
			return;
		}
		else if (this._reserveDownDuration > 0.0)
		{
			this._value = 0.0;
			//
			deltaTime -= this._reserveDownDuration;
			this._reserveDownDuration = 0.0;
		}
	}
	//
	public Reset(maxValue: number, totalDuration: number, standDuration: number): void
	{
		this._reserveUpDuration = (totalDuration - standDuration) * 0.5;
		this._reserveStandDuration = standDuration;
		this._reserveDownDuration = this._reserveUpDuration;
		//
		this._upGravity = -2.0 * (maxValue - this._value) / (this._reserveUpDuration * this._reserveUpDuration);
		this._downGravity = -2.0 * maxValue / (this._reserveUpDuration * this._reserveUpDuration);
		//
		this._speed = -this._upGravity * this._reserveUpDuration;
	}
	//
	public Stop(): void
	{
		this._reserveUpDuration = 0;
		this._reserveStandDuration = 0;
		this._reserveDownDuration = 0;
		this._upGravity = 0;
		this._downGravity = 0;
		this._speed = 0;
		this._value = 0;
	}
	//
	private _reserveUpDuration = 0.0;
	private _reserveStandDuration = 0.0;
	private _reserveDownDuration = 0.0;
	private _upGravity = 0.0;
	private _downGravity = 0.0;
	//
	private _value = 0.0;
	private _speed = 0.0;
}