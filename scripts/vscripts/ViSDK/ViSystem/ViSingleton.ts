
export class ViSingleton<T>
{
	constructor(alloc: { new(): T; }, name: string)
	{
		this._allocate = alloc;
		this._name = name;
	}
	//
	public get Instance(): T
	{
		if (this._instance != null)
		{
			return this._instance;
		}
		else
		{
			this._instance = new this._allocate();
			return this._instance;
		}
	}
	//
	public get Name(): string { return this._name; }
	//
	private readonly _name: string;
	private readonly _allocate: { new(): T; };
	private _instance: T = null;
}

export class TestSingleton
{

}
export let TestSingletonInstance = new ViSingleton(TestSingleton, "TestSingleton");
