import { ViAssisstant } from "../../ViSystem/ViSystemConfig";
import { ViAssisstantEx } from "../../ViSystem/ViSystemType";

export class ViTimePrintor
{
    public static Start(): void
    {
        let idx = 0;
        let time = 0;
        let timeSpan = 10;
        for (; time < 1000; time += timeSpan, ++idx)// < 10S/count:100
        {
            ViTimePrintor._printList.Set(idx, ViTimePrintor.Print(time));
        }
        //
        timeSpan = 100;
        ViTimePrintor.MAX_TIME = (ViTimePrintor._printList.Count - 100 - 1) * timeSpan + time;
        for (; time < ViTimePrintor.MAX_TIME; time += timeSpan, ++idx)//count:899
        {
            ViTimePrintor._printList.Set(idx, ViTimePrintor.Print(time));
        }
        //
        ViTimePrintor._printList.Set(idx, ViTimePrintor.Print(time));
    }
    //
    public static GetTickSpanAsInt(value: number): number
    {
        if (value < 0)
        {
            return 1.0;
        }
        else if (value < 1000)
        {
            return 0.1;
        }
        else
        {
            return 1.0;
        }
    }
    //
    public static GetTickSpanAsFloat(value: number): number
    {
        if (value < 0)
        {
            return 1.0;
        }
        else if (value < 1.0)
        {
            return 0.1;
        }
        else
        {
            return 1.0;
        }
    }
    //
    public static PrintFloat(value: number): string
    {
        return ViTimePrintor.PrintInt(ViAssisstant.IntNear(value * 100));
    }
    //
    public static PrintInt(value: number): string
    {
        if (value < 0)
        {
            return "0";
        }
        else if (value < 1000)
        {
            return ViTimePrintor._printList.Get(ViAssisstant.IntNear(value / 10));
        }
        else if (value < ViTimePrintor.MAX_TIME)
        {
            return ViTimePrintor._printList.Get(100 + ViAssisstant.IntNear((value - 1000) / 100));
        }
        else 
        {
            return "";
        }
    }
    //
    private static Print(value: number): string
    {
        if (value < 0)
        {
            return "0";
        }
        else if (value < 1000)
        {
            return (value * 0.01).toFixed(1).toString();
        }
        else
        {
            return ViAssisstant.IntNear(value / 100).toString();
        }
    }
    //
    private static MAX_TIME = 0;
    private static readonly _printList = ViAssisstantEx.NewList<string>(1000, null);
}

export class ViTimePrintor2
{
    public static Print(value: number): string
    {
        if (value <= 0)
        {
            return ViTimePrintor2._strInf;
        }
        else if (value < ViTimePrintor2._printList.Count)
        {
            value = ViAssisstant.IntNear(value);
            let str = ViTimePrintor2._printList.Get(value);
            if (str == null)
            {
                str = ViTimePrintor2._Print(value);
                ViTimePrintor2._printList.Set(value, str);
            }
            //
            return str;
        }
        else
        {
            return ViTimePrintor2._strSup;
        }
    }
    //
    private static _Print(value: number): string
    {
        let minute = ViAssisstant.IntInf(value / 60);
        let second = value - minute * 60;
        let minuteStr = minute < 10 ? "0" + minute.toString() : minute.toString();
        let secondStr = second < 10 ? "0" + second.toString() : second.toString();
        return minuteStr + ":" + secondStr;
    }
    //
    private static readonly _strInf = "00:00";
    private static readonly _strSup = "XX:XX";
    private static readonly _printList = ViAssisstantEx.NewList<string>(99 * 60 + 59, null);
}
