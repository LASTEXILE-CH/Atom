local ViConst = BaseClass("ViConst")

ViConst.MAX_INT8 = 0x7F
ViConst.MIN_INT8 = -ViConst.MAX_INT8 - 1
ViConst.ZERO_INT8 = 0
ViConst.MAX_UINT8 = 0XFF
ViConst.ZERO_UINT8 = 0

ViConst.MAX_INT16 = 0X7FFF
ViConst.MIN_INT16 = -ViConst.MAX_INT16 - 1
ViConst.ZERO_INT16 = 0
ViConst.MAX_UINT16 = 0XFFFF
ViConst.ZERO_UINT16 = 0

ViConst.MAX_INT32 = 0X7FFFFFFF
ViConst.MIN_INT32 = -ViConst.MAX_INT32 - 1
ViConst.ZERO_INT32 = 0

ViConst.MAX_UINT32 = 0XFFFFFFFF
ViConst.ZERO_UINT32 = 0

ViConst.TWO_PWR_64_DBL = (ViConst.MAX_UINT32 + 1) * (ViConst.MAX_UINT32 + 1)
ViConst.TWO_PWR_63_DBL = ViConst.TWO_PWR_64_DBL / 2
ViConst.TWO_PWR_32_DBL = (ViConst.MAX_UINT32 + 1)

return ViConst