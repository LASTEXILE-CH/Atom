export enum ViGameLogicChannel
{
	DB,
	OWN_CLIENT,
	ALL_CLIENT,
	CELL,
	CENTER,
	TOTAL,
}
export enum ViGameLogicChannelMask
{
	DB = 1 << ViGameLogicChannel.DB,
	OWN_CLIENT = 1 << ViGameLogicChannel.OWN_CLIENT,
	ALL_CLIENT = 1 << ViGameLogicChannel.ALL_CLIENT,
	CELL = 1 << ViGameLogicChannel.CELL,
	CENTER = 1 << ViGameLogicChannel.CENTER,
	TOTAL,
}
