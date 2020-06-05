
export interface ViDelegate0
{
    (): void;
}

export interface ViDelegateRT0<RT>
{
    (): RT;
}

export interface ViDelegate1<TParam0>
{
    (param0: TParam0): void;
}

export interface ViDelegateRT1<RT, TParam0>
{
    (param0: TParam0): RT;
}

export interface ViDelegate2<TParam0, TParam1>
{
    (param0: TParam0, param1: TParam1): void;
}

export interface ViDelegateRT2<RT, TParam0, TParam1>
{
    (param0: TParam0, param1: TParam1): RT;
}

export interface ViDelegate3<TParam0, TParam1, TParam2>
{
    (param0: TParam0, param1: TParam1, param2: TParam2): void;
}

export interface ViDelegateRT3<RT, TParam0, TParam1, TParam2>
{
    (param0: TParam0, param1: TParam1, param2: TParam2): RT;
}

export interface ViDelegate4<TParam0, TParam1, TParam2, TParam3>
{
    (param0: TParam0, param1: TParam1, param2: TParam2, param3: TParam3): void;
}

export interface ViDelegateRT4<RT, TParam0, TParam1, TParam2, TParam3>
{
    (param0: TParam0, param1: TParam1, param2: TParam2, param3: TParam3): RT;
}

export interface ViDelegate5<TParam0, TParam1, TParam2, TParam3, TParam4>
{
    (param0: TParam0, param1: TParam1, param2: TParam2, param3: TParam3, param4: TParam4): void;
}

export interface ViDelegateRT5<RT, TParam0, TParam1, TParam2, TParam3, TParam4>
{
    (param0: TParam0, param1: TParam1, param2: TParam2, param3: TParam3, param4: TParam4): RT;
}


//-----------------------------------------------------------------------------------------------------------------------------
export class ViDelegater0
{
    public Set(listener: object, func: ViDelegate0)
    {
        this._listener = listener;
        this._func = func;
    }
    //
    public Clear(): void
    {
        this._listener = null;
        this._func = null;
    }
    //
    public Invoke(): void
    {
        if (this._func != null)
        {
            this._func.bind(this._listener)();
        }
    }
    //
    private _listener: object
    private _func: ViDelegate0;
}

export class ViDelegater1<TParam0>
{
    public constructor(listener?: object, func?: ViDelegate1<TParam0>)
    {
        this._listener = listener;
        this._func = func;
    }
    //
    public Set(listener: object, func: ViDelegate1<TParam0>)
    {
        this._listener = listener;
        this._func = func;
    }
    //
    public Clear(): void
    {
        this._listener = null;
        this._func = null;
    }
    //
    public Invoke(param0: TParam0): void
    {
        if (this._func != null)
        {
            this._func.bind(this._listener)(param0);
        }
    }
    //
    private _listener: object
    private _func: ViDelegate1<TParam0>;
}

export class ViDelegater2<TParam0, TParam1>
{
    public constructor(listener?: object, func?: ViDelegate2<TParam0, TParam1>)
    {
        this._listener = listener;
        this._func = func;
    }
    //
    public Set(listener: object, func: ViDelegate2<TParam0, TParam1>)
    {
        this._listener = listener;
        this._func = func;
    }
    //
    public Clear(): void
    {
        this._listener = null;
        this._func = null;
    }
    //
    public Invoke(param0: TParam0, param1: TParam1): void
    {
        if (this._func != null)
        {
            this._func.bind(this._listener)(param0, param1);
        }
    }
    //
    private _listener: object
    private _func: ViDelegate2<TParam0, TParam1>;
}

export class ViDelegater3<TParam0, TParam1, TParam2>
{
    public constructor(listener?: object, func?: ViDelegate3<TParam0, TParam1, TParam2>)
    {
        this._listener = listener;
        this._func = func;
    }
    //
    public Set(listener: object, func: ViDelegate3<TParam0, TParam1, TParam2>)
    {
        this._listener = listener;
        this._func = func;
    }
    //
    public Clear(): void
    {
        this._listener = null;
        this._func = null;
    }
    //
    public Invoke(param0: TParam0, param1: TParam1, param2: TParam2): void
    {
        if (this._func != null)
        {
            this._func.bind(this._listener)(param0, param1, param2);
        }
    }
    //
    private _listener: object
    private _func: ViDelegate3<TParam0, TParam1, TParam2>;
}

export class ViDelegater4<TParam0, TParam1, TParam2, TParam3>
{
    public constructor(listener?: object, func?: ViDelegate4<TParam0, TParam1, TParam2, TParam3>)
    {
        this._listener = listener;
        this._func = func;
    }
    //
    public Set(listener: object, func: ViDelegate4<TParam0, TParam1, TParam2, TParam3>)
    {
        this._listener = listener;
        this._func = func;
    }
    //
    public Clear(): void
    {
        this._listener = null;
        this._func = null;
    }
    //
    public Invoke(param0: TParam0, param1: TParam1, param2: TParam2, param3: TParam3): void
    {
        if (this._func != null)
        {
            this._func.bind(this._listener)(param0, param1, param2, param3);
        }
    }
    //
    private _listener: object
    private _func: ViDelegate4<TParam0, TParam1, TParam2, TParam3>;
}

export class ViDelegater5<TParam0, TParam1, TParam2, TParam3, TParam4>
{
    public constructor(listener?: object, func?: ViDelegate5<TParam0, TParam1, TParam2, TParam3, TParam4>)
    {
        this._listener = listener;
        this._func = func;
    }
    //
    public Set(listener: object, func: ViDelegate5<TParam0, TParam1, TParam2, TParam3, TParam4>)
    {
        this._listener = listener;
        this._func = func;
    }
    //
    public Clear(): void
    {
        this._listener = null;
        this._func = null;
    }
    //
    public Invoke(param0: TParam0, param1: TParam1, param2: TParam2, param3: TParam3, param4: TParam4): void
    {
        if (this._func != null)
        {
            this._func.bind(this._listener)(param0, param1, param2, param3, param4);
        }
    }
    //
    private _listener: object
    private _func: ViDelegate5<TParam0, TParam1, TParam2, TParam3, TParam4>;
}

//-----------------------------------------------------------------------------------------------------------------------------
export class ViDelegaterRT0<RT>
{
    public constructor(listener?: object, func?: ViDelegateRT0<RT>)
    {
        this._listener = listener;
        this._func = func;
    }
    //
    public Set(listener: object, func: ViDelegateRT0<RT>)
    {
        this._listener = listener;
        this._func = func;
    }
    //
    public Clear(): void
    {
        this._listener = null;
        this._func = null;
    }
    //
    public Invoke(): RT
    {
        if (this._func != null)
        {
            return this._func.bind(this._listener)();
        }
        else
        {
            return null;
        }
    }
    //
    private _listener: object
    private _func: ViDelegateRT0<RT>;
}

export class ViDelegaterRT1<RT, TParam0>
{
    public constructor(listener?: object, func?: ViDelegateRT1<RT, TParam0>)
    {
        this._listener = listener;
        this._func = func;
    }
    //
    public Set(listener: object, func: ViDelegateRT1<RT, TParam0>)
    {
        this._listener = listener;
        this._func = func;
    }
    //
    public Clear(): void
    {
        this._listener = null;
        this._func = null;
    }
    //
    public Invoke(param0: TParam0): RT
    {
        if (this._func != null)
        {
            return this._func.bind(this._listener)(param0);
        }
        else
        {
            return null;
        }
    }
    //
    private _listener: object
    private _func: ViDelegateRT1<RT, TParam0>;
}

export class ViDelegaterRT2<RT, TParam0, TParam1>
{
    public constructor(listener?: object, func?: ViDelegateRT2<RT, TParam0, TParam1>)
    {
        this._listener = listener;
        this._func = func;
    }
    //
    public Set(listener: object, func: ViDelegateRT2<RT, TParam0, TParam1>)
    {
        this._listener = listener;
        this._func = func;
    }
    //
    public Clear(): void
    {
        this._listener = null;
        this._func = null;
    }
    //
    public Invoke(param0: TParam0, param1: TParam1): RT
    {
        if (this._func != null)
        {
            return this._func.bind(this._listener)(param0, param1);
        }
        else
        {
            return null;
        }
    }
    //
    private _listener: object
    private _func: ViDelegateRT2<RT, TParam0, TParam1>;
}

export class ViDelegaterRT3<RT, TParam0, TParam1, TParam2>
{
    public constructor(listener?: object, func?: ViDelegateRT3<RT, TParam0, TParam1, TParam2>)
    {
        this._listener = listener;
        this._func = func;
    }
    //
    public Set(listener: object, func: ViDelegateRT3<RT, TParam0, TParam1, TParam2>)
    {
        this._listener = listener;
        this._func = func;
    }
    //
    public Clear(): void
    {
        this._listener = null;
        this._func = null;
    }
    //
    public Invoke(param0: TParam0, param1: TParam1, param2: TParam2): RT
    {
        if (this._func != null)
        {
            return this._func.bind(this._listener)(param0, param1, param2);
        }
        else
        {
            return null;
        }
    }
    //
    private _listener: object
    private _func: ViDelegateRT3<RT, TParam0, TParam1, TParam2>;
}

export class ViDelegaterRT4<Tlistener, RT, TParam0, TParam1, TParam2, TParam3>
{
    public constructor(listener?: object, func?: ViDelegateRT4<RT, TParam0, TParam1, TParam2, TParam3>)
    {
        this._listener = listener;
        this._func = func;
    }
    //
    public Set(listener: object, func: ViDelegateRT4<RT, TParam0, TParam1, TParam2, TParam3>)
    {
        this._listener = listener;
        this._func = func;
    }
    //
    public Clear(): void
    {
        this._listener = null;
        this._func = null;
    }
    //
    public Invoke(param0: TParam0, param1: TParam1, param2: TParam2, param3: TParam3): RT
    {
        if (this._func != null)
        {
            return this._func.bind(this._listener)(param0, param1, param2, param3);
        }
        else
        {
            return null;
        }
    }
    //
    private _listener: object
    private _func: ViDelegateRT4<RT, TParam0, TParam1, TParam2, TParam3>;
}

export class ViDelegaterRT5<RT, TParam0, TParam1, TParam2, TParam3, TParam4>
{
    public constructor(listener?: object, func?: ViDelegateRT5<RT, TParam0, TParam1, TParam2, TParam3, TParam4>)
    {
        this._listener = listener;
        this._func = func;
    }
    //
    public Set(listener: object, func: ViDelegateRT5<RT, TParam0, TParam1, TParam2, TParam3, TParam4>)
    {
        this._listener = listener;
        this._func = func;
    }
    //
    public Clear(): void
    {
        this._listener = null;
        this._func = null;
    }
    //
    public Invoke(param0: TParam0, param1: TParam1, param2: TParam2, param3: TParam3, param4: TParam4): RT
    {
        if (this._func != null)
        {
            return this._func.bind(this._listener)(param0, param1, param2, param3, param4);
        }
        else
        {
            return null;
        }
    }
    //
    private _listener: object
    private _func: ViDelegateRT5<RT, TParam0, TParam1, TParam2, TParam3, TParam4>;
}

//-----------------------------------------------------------------------------------------------------------------------------
export class ViDelegateAssisstant
{
    private constructor() { }
    //
    public static Clear(delegator: any): void
    {
        if (delegator != null)
        {
            delegator.Clear();
        }
    }

    public static Invoke0<TListener>(listener: TListener, func: ViDelegate0): void
    {
        if (func != null)
        {
            func.bind(listener)();
        }
    }

    public static InvokeRT0<TListener, RT>(listener: TListener, func: ViDelegateRT0<RT>): RT
    {
        if (func != null)
        {
            return func.bind(listener)();
        }
        else
        {
            return null;
        }
    }

    public static Invoke1<TListener, TParam0>(listener: TListener, func: ViDelegate1<TParam0>, param0: TParam0): void
    {
        if (func != null)
        {
            func.bind(listener)(param0);
        }
    }

    public static InvokeRT1<TListener, RT, TParam0>(listener: TListener, func: ViDelegateRT1<RT, TParam0>, param0: TParam0): RT
    {
        if (func != null)
        {
            return func.bind(listener)(param0);
        }
        else
        {
            return null;
        }
    }

    public static Invoke2<TListener, TParam0, TParam1>(listener: TListener, func: ViDelegate2<TParam0, TParam1>, param0: TParam0, param1: TParam1): void
    {
        if (func != null)
        {
            func.bind(listener)(param0, param1);
        }
    }

    public static InvokeRT2<TListener, RT, TParam0, TParam1>(listener: TListener, func: ViDelegateRT2<RT, TParam0, TParam1>, param0: TParam0, param1: TParam1): RT
    {
        if (func != null)
        {
            return func.bind(listener)(param0, param1);
        }
        else
        {
            return null;
        }
    }

    public static Invoke3<TListener, TParam0, TParam1, TParam2>(listener: TListener, func: ViDelegate3<TParam0, TParam1, TParam2>, param0: TParam0, param1: TParam1, param2: TParam2): void
    {
        if (func != null)
        {
            func.bind(listener)(param0, param1, param2);
        }
    }

    public static InvokeRT3<TListener, RT, TParam0, TParam1, TParam2>(listener: TListener, func: ViDelegateRT3<RT, TParam0, TParam1, TParam2>, param0: TParam0, param1: TParam1, param2: TParam2): RT
    {
        if (func != null)
        {
            return func.bind(listener)(param0, param1, param2);
        }
        else
        {
            return null;
        }
    }

    public static Invoke4<TListener, TParam0, TParam1, TParam2, TParam3>(listener: TListener, func: ViDelegate4<TParam0, TParam1, TParam2, TParam3>, param0: TParam0, param1: TParam1, param2: TParam2, param3: TParam3): void
    {
        if (func != null)
        {
            func.bind(listener)(param0, param1, param2, param3);
        }
    }

    public static InvokeRT4<TListener, RT, TParam0, TParam1, TParam2, TParam3>(listener: TListener, func: ViDelegateRT4<RT, TParam0, TParam1, TParam2, TParam3>, param0: TParam0, param1: TParam1, param2: TParam2, param3: TParam3): RT
    {
        if (func != null)
        {
            return func.bind(listener)(param0, param1, param2, param3);
        }
        else
        {
            return null;
        }
    }

    public static Invoke5<TListener, TParam0, TParam1, TParam2, TParam3, TParam4>(listener: TListener, func: ViDelegate5<TParam0, TParam1, TParam2, TParam3, TParam4>, param0: TParam0, param1: TParam1, param2: TParam2, param3: TParam3, param4: TParam4): void
    {
        if (func != null)
        {
            func.bind(listener)(param0, param1, param2, param3, param4);
        }
    }

    public static InvokeRT5<TListener, RT, TParam0, TParam1, TParam2, TParam3, TParam4>(listener: TListener, func: ViDelegateRT5<RT, TParam0, TParam1, TParam2, TParam3, TParam4>, param0: TParam0, param1: TParam1, param2: TParam2, param3: TParam3, param4: TParam4): RT
    {
        if (func != null)
        {
            return func.bind(listener)(param0, param1, param2, param3, param4);
        }
        else
        {
            return null;
        }
    }

    public static Exec0(dele: ViDelegater0): void
    {
        if (dele != null)
        {
            dele.Invoke();
        }
    }
    public static Exec1<TParam0>(dele: ViDelegater1<TParam0>, param0: TParam0): void
    {
        if (dele != null)
        {
            dele.Invoke(param0);
        }
    }
    public static Exec2<TParam0, TParam1>(dele: ViDelegater2<TParam0, TParam1>, param0: TParam0, param1: TParam1): void
    {
        if (dele != null)
        {
            dele.Invoke(param0, param1);
        }
    }
    public static Exec3<TParam0, TParam1, TParam2>(dele: ViDelegater3<TParam0, TParam1, TParam2>, param0: TParam0, param1: TParam1, param2: TParam2): void
    {
        if (dele != null)
        {
            dele.Invoke(param0, param1, param2);
        }
    }
    public static Exec4<TParam0, TParam1, TParam2, TParam3>(dele: ViDelegater4<TParam0, TParam1, TParam2, TParam3>, param0: TParam0, param1: TParam1, param2: TParam2, param3: TParam3): void
    {
        if (dele != null)
        {
            dele.Invoke(param0, param1, param2, param3);
        }
    }
    public static Exec5<TParam0, TParam1, TParam2, TParam3, TParam4>(dele: ViDelegater5<TParam0, TParam1, TParam2, TParam3, TParam4>, param0: TParam0, param1: TParam1, param2: TParam2, param3: TParam3, param4: TParam4): void
    {
        if (dele != null)
        {
            dele.Invoke(param0, param1, param2, param3, param4);
        }
    }
}
