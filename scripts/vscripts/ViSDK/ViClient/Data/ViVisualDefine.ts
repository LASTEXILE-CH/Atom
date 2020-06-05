
export enum ViExpressFadeType
{
	ATTACH,
	WORLD,
}

export enum ViExpressAttachMask
{
	WORLD = 0X01,
	UP = 0X02,
	NO_ROTATE = 0X04,
	FREE = 0X08,
	NO_SCALE = 0X10,
}

export enum ViVisualAutoScale
{
	NONE,
	HEIGHT,
	RADIUS,
	ATTACK,
	TOTAL,
}

export enum ViTravelEndExpressDirection
{
	INHERIT,
	RESERVE,
}

export enum ViGroundType
{
	NONE,
	GROUND,
	FLY,
}

export enum ViAuraLookAtType
{
	NONE,
	YAW,
	ATTACH,
}

export enum ViVisualAreaType
{
	ROUND,//! 圆形
	RECT,//! 矩形
	SECTOR,//! 扇形
	LINE,
	CUSTOM,
}

export enum ViSpellRangleLayer
{
	LAYER0,
	LAYER1,
	LAYER2,
	TOTAL
}
