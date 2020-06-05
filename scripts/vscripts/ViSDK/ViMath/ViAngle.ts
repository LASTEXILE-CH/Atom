import { ViAssisstant } from "../ViSystem/ViSystemConfig";
import { ViMathDefine } from "./ViMathDefine";

export class ViAngle
{
    public static Normalize(value: number): number
    {
        if (value >= ViMathDefine.PI)
        {
            if (value > ViMathDefine.PI_X3)
            {
                return value - ViAssisstant.IntInf(value / ViMathDefine.PI_X2) * ViMathDefine.PI_X2;
            }
            else
            {
                return value - ViMathDefine.PI_X2;
            }
        }
        else if (value < -ViMathDefine.PI)
        {
            if (value < -ViMathDefine.PI_X3)
            {
                return value - ViAssisstant.IntInf(value / ViMathDefine.PI_X2 - 1) * ViMathDefine.PI_X2;
            }
            else
            {
                return value + ViMathDefine.PI_X2;
            }
        }
        else
        {
            return value;
        }
    }
}
