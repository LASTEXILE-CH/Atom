
export class ViValueInterpolcation_Spring
{
	public get Value(): number { return this._value; }
	public get SpringRate(): number { return this._springRate; }
	public get Speed(): number { return this._speed; }
	public get Accelerate(): number { return this._accelerate; }
	public get TimeScale(): number { return this._timeScale; }
	public get IsFiltering(): boolean { return this._speed != 0.0; }
	public TimeSpan = 1.0 / 120.0;
	//
	public Init(springRate: number, speedFriction: number, timeScale: number, speed: number): void
	{
		this._springRate = springRate;
		this._speedFriction = speedFriction;
		this._timeScale = timeScale;
		this._speed = speed;
	}
	//
	public Update(destValue: number, deltaTime: number): boolean
	{
		if (destValue == this._value && this._speed == 0)
		{
			return false;
		}
		let span = this.TimeSpan;
		while (deltaTime > span)
		{
			this._Update(destValue, span);
			deltaTime -= span;
		}
		//
		this._Update(destValue, deltaTime);
		//
		return true;
	}
	//
	private _Update(destValue: number, deltaTime: number): void
	{
		let oldValue = this._value;
		//
		let _value = this._value;
		let _speed = this._speed;
		let _accelerate = this._accelerate;
		let _sprintCount = this._sprintCount;
		//
		deltaTime *= this._timeScale;
		let diff = destValue - _value;
		let springForce = this._springRate * diff;
		_accelerate = springForce - _speed * this._speedFriction;
		_speed += _accelerate * deltaTime;
		_value += _speed * deltaTime;
		//
		if (_sprintCount > 0 && (_value - destValue) * (oldValue - destValue) < 0)//Cross
		{
			--_sprintCount;
			if (_sprintCount <= 0)
			{
				_value = destValue;
				_speed = 0.0;
				_accelerate = 0.0;
			}
		}
		//
		this._value = _value;
		this._speed = _speed;
		this._accelerate = _accelerate;
		this._sprintCount = _sprintCount;
	}
	//
	public StartRingCount(value: number): void
	{
		this._sprintCount = value;
	}
	public EndRingCount(): void
	{
		this._sprintCount = 0;
	}
	//
	public Set(value: number, stop: boolean): void
	{
		this._value = value;
		if (stop)
		{
			this._speed = 0.0;
			this._accelerate = 0.0;
		}
	}
	//
	private _springRate = 20.0;
	private _speed = 0.0;
	private _value = 0.0;
	private _speedFriction = 3.0;
	private _timeScale = 1.0;
	private _accelerate = 2.0;
	private _sprintCount = 0;
	// 	//质量=1.0
}

// class ViValueInterpolcation_Spring_Demo
// {
// 	public static Test(): void
// 	{
// 		let spring = new ViValueInterpolcation_Spring();
// 		let dest = 1.0;
// 		spring.Init(1.0, 1.0, 1.0, 0.0, 10);
// 		while (true)
// 		{
// 			spring.Update(dest, 0.1);
// 			console.log("Value: " + spring.Value);
// 		}
// 	}
// }