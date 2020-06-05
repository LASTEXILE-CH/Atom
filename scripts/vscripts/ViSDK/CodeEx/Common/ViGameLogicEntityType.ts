export enum ViGameLogicEntityType
{
	INF = 1,
	VIGAMEUNIT,
}
export class EntityTypeName
{
	public static Name(type: number): string
	{
		switch(type)
		{
			case ViGameLogicEntityType.VIGAMEUNIT: return "ViGameUnit";
			default: return "NONE"; 
		}
	}
}
