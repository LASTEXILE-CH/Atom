
export enum ViUnitSocietyMask
{
	SELF = 0X01,
	FRIEND = 0X02,
	ENEMY = 0X04,
	NEUTRAL = 0X08,
	TEAM = 0X10,
	GROUND = 0X20,
}

export enum ViMoveDirection
{
	SELF,
	SELF_TARGET,
	TARGET,
	TARGET_SELF,
}

export enum ViAccumulateTimeType
{
	SELF,
	WORLD,
}

export enum ViStartTimeType
{
	WORLD,
	ENTITY,
	WORLD1970,
}

export enum ViDateLoopType
{
	NONE,
	DAY,
	WEEK,
	MONTH,
	TOTAL,
}

export enum ViValueMappingType
{
	NONE,
	LINE,
}

export enum ViAreaType
{
	ROUND,//! 圆形
	RECT,//! 矩形
	SECTOR,//! 扇形
}
