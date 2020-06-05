export enum ViLogLevel
{
	OK,
	CRIT_OK,
	WARNING,
	RECORD,
	ERROR,
	TOTAL,
}

export class ViDebuger
{
	public static NoteCallback(msg: string) { }
	public static CritOKCallback(msg: string) { }
	public static WarningCallback(msg: string) { }
	public static RecordCallback(msg: string) { }
	public static ErrorCallback(msg: string) { }
	public static ExceptionCallback(error: Error) { }
	public static LogLevel: ViLogLevel = ViLogLevel.OK;
	public static UseTryCatch = false;
	private constructor() { }
	//+---------------------------------------------------------------------------------------------------------
	public static AssertError(bCondition: boolean, log?: string): void
	{
		if (bCondition == false)
		{
			ViDebuger._Error(log);
		}
	}
	public static AssertWarning(bCondition: boolean, log?: string): void
	{
		if (bCondition == false)
		{
			ViDebuger._Warning(log);
		}
	}
	//+---------------------------------------------------------------------------------------------------------
	public static Error(log: string): void
	{
		ViDebuger._Error(log);
	}
	public static Warning(log: string): void
	{
		ViDebuger._Warning(log);
	}
	public static Record(log: string): void
	{
		if (ViDebuger.LogLevel <= ViLogLevel.RECORD)
		{
			if (ViDebuger.RecordCallback != null)
			{
				ViDebuger.RecordCallback(log);
			}
		}
	}
	public static CritOK(log: string): void
	{
		//Debug.Print(log);
		if (ViDebuger.LogLevel <= ViLogLevel.CRIT_OK)
		{
			if (ViDebuger.CritOKCallback != null)
			{
				ViDebuger.CritOKCallback(log);
			}
		}
	}
	public static Note(log: string): void
	{
		//Debug.Print(log);
		if (ViDebuger.LogLevel <= ViLogLevel.OK)
		{
			if (ViDebuger.NoteCallback != null)
			{
				ViDebuger.NoteCallback(log);
			}
		}
	}
	//+---------------------------------------------------------------------------------------------------------
	static _Error(log: string): void
	{
		//Debug.Assert(false, log);
		if (ViDebuger.LogLevel <= ViLogLevel.ERROR)
		{
			if (ViDebuger.ErrorCallback != null)
			{
				ViDebuger.ErrorCallback(log);
			}
		}
	}
	static _Warning(log: string): void
	{
		//Trace.WriteLine(false, log);
		if (ViDebuger.LogLevel <= ViLogLevel.WARNING)
		{
			if (ViDebuger.WarningCallback != null)
			{
				ViDebuger.WarningCallback(log);
			}
		}
	}
	//+---------------------------------------------------------------------------------------------------------
	public static Exception(error: Error): void
	{
		//Debug.Print(log);
		ViDebuger.ExceptionCallback(error);
	}
}