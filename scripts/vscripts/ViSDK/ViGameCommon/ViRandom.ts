import { ViAssisstant } from "../ViSystem/ViSystemConfig";
import { ViList, ViPair } from "../ViSystem/ViSystemType";

export class ViRandom
{
    public static Probability(prob: number): boolean
    {
        if (prob <= 0.0)
        {
            return false;
        }
        if (prob >= 1.0)
        {
            return true;
        }
        return prob > Math.random();
    }
    //
    public static Value(min: number, max: number): number// 取值范围[min, max)
    {
        if (min >= max)
        {
            return min;
        }
        let span = max - min;
        let value = ViAssisstant.IntInf(Math.random() * span + min);
        if (value == max)
        {
            value -= 1;
        }
        return value;
    }
    //
    public static ValueFloat(min: number, max: number, scale: number): number
    {
        return ViRandom.Value(ViAssisstant.Int32Near(min * scale), ViAssisstant.Int32Near(max * scale)) / scale;
    }
    //
    public static Probability2(rangeList: ViList<number>): number
    {
        let sup = 0;
        for (let iter = 0, count = rangeList.Count; iter < count; ++iter)
        {
            sup += rangeList.Get(iter);
        }
        let value = ViRandom.Value(0, sup);
        let idx = 0;
        for (let iter = 0, count = rangeList.Count; iter < count; ++iter)
        {
            value -= rangeList.Get(iter);
            if (value < 0)
            {
                return idx;
            }
            ++idx;
        }
        //
        return -1;
    }
    //
    private static readonly CACHE_GetValues_ProbabilityList = new ViList<number>();
    public static GetValues(range: number, count: number, values: ViList<number>): void// 取值范围[0, range)
    {
        if (range <= 0)
        {
            return;
        }
        if (count <= 0)
        {
            return;
        }
        //
        let probabilityList = ViRandom.CACHE_GetValues_ProbabilityList;
        probabilityList.Clear();
        for (let iter = 0; iter < range; ++iter)
        {
            probabilityList.Push(1);
        }
        //
        let reserveCount = ViAssisstant.Min(count, range);
        while (reserveCount > 0)
        {
            let iterIdx = ViRandom.Probability2(probabilityList);
            probabilityList.Set(iterIdx, 0);
            values.Push(iterIdx);
            --reserveCount;
        }
        //
        while (values.Count < count)
        {
            values.Push(ViRandom.Value(0, range));
        }
    }
    //
    private static readonly CACHE_SelectList_ProbabilityList = new ViList<number>();
    public static SelectList(rangeList: ViList<number>, count: number, idxList: ViList<number>): void
    {
        let probabilityList = ViRandom.CACHE_SelectList_ProbabilityList;
        probabilityList.Clear();
        let probabilityCount = 0;
        for (let iter = 0, count = rangeList.Count; iter < count; ++iter)
        {
            let iterValue = rangeList.Get(iter);
            if (iterValue > 0)
            {
                probabilityList.Push(iterValue);
                ++probabilityCount;
            }
            else
            {
                probabilityList.Push(0);
            }
        }
        //
        let reserveCount = ViAssisstant.Min(count, probabilityCount);
        while (reserveCount > 0)
        {
            let iterIdx = ViRandom.Probability2(probabilityList);
            probabilityList.Set(iterIdx, 0);
            idxList.Push(iterIdx);
            --reserveCount;
        }
    }
    //
    private static readonly CACHE_SelectList2_ProbabilityList = new ViList<number>();
    public static SelectList2<T>(rangeList: ViList<ViPair<T, number>>, count: number, selected: ViList<T>): void
    {
        let probabilityList = ViRandom.CACHE_SelectList2_ProbabilityList;
        probabilityList.Clear();
        let probabilityCount = 0;
        for (let iter = 0, count = rangeList.Count; iter < count; ++iter)
        {
            let iterValue = rangeList.Get(iter).Second;
            if (iterValue > 0)
            {
                probabilityList.Push(iterValue);
                ++probabilityCount;
            }
            else
            {
                probabilityList.Push(0);
            }
        }
        //
        let reserveCount = ViAssisstant.Min(count, probabilityCount);
        while (reserveCount > 0)
        {
            let iterIdx = ViRandom.Probability2(probabilityList);
            probabilityList.Set(iterIdx, 0);
            selected.Push(rangeList.Get(iterIdx).First);
            --reserveCount;
        }
    }
    //
    private static readonly CACHE_Randomize_List = new ViList<any>();
    private static readonly CACHE_Randomize_IdxList = new ViList<number>();
    public static Randomize<T>(list: ViList<T>): void
    {
        let localList = ViRandom.CACHE_Randomize_List;
        localList.Clear();
        localList.PushExx(list);
        //
        let idxList = ViRandom.CACHE_Randomize_IdxList;
        idxList.Clear();
        ViRandom.GetValues(localList.Count, localList.Count, idxList);
        //
        list.Clear();
        for (let iter = 0; iter < idxList.Count; ++iter)
        {
            list.Push(localList.Get(idxList.Get(iter)));
        }
    }
}