local ViDebuger = BaseClass("ViDebuger")


_G.ViLogLevel = CreateEnumTable({
    "OK",
    "CRIT_OK",
    "WARNING",
    "RECORD",
    "ERROR",
    "TOTAL",
    }, 
-1)

local function NoteCallback(msg)

end

local function CritOKCallback(msg)

end

local function WarningCallback(msg)

end
    
local function RecordCallback(msg)

end
    
local function ErrorCallback(msg)

end
    
local function ExceptionCallback(error)

end

local function AssertError(bCondition, log)
	if bCondition == false then
        ViDebuger._Error(log)
    end
end

local function AssertWarning(bCondition, log)
	if bCondition == false then
        ViDebuger._Warning(log)
    end
end

local function Error(log)
    ViDebuger._Error(log)
end

local function Warning(log)
	ViDebuger._Warning(log)
end

local function Record(log)
	if ViDebuger.LogLevel <= ViLogLevel.RECORD then
		-- if ViDebuger.RecordCallback ~= nil then
		-- 	ViDebuger.RecordCallback(log)
		-- end
	end
end

local function CritOK(log)
	if ViDebuger.LogLevel <= ViLogLevel.CRIT_OK then
		-- if ViDebuger.CritOKCallback ~= nil then
		-- 	ViDebuger.CritOKCallback(log)
		--end
	end
end

				
local function Note(log)
	if ViDebuger.LogLevel <= ViLogLevel.OK then
		-- if ViDebuger.NoteCallback ~= nil then
		-- 	ViDebuger.NoteCallback(log)
		-- end
	end
end

local function  _Error(log)
	if ViDebuger.LogLevel <= ViLogLevel.ERROR then
		-- if ViDebuger.ErrorCallback ~= nil then
		-- 	ViDebuger.ErrorCallback(log)
		-- end
	end
end

local function  _Warning(log)
	if ViDebuger.LogLevel <= ViLogLevel.WARNING then
		-- if ViDebuger.WarningCallback ~= nil then
		-- 	ViDebuger.WarningCallback(log)
		-- end
	end
end

local function  Exception(log)
	--ViDebuger.ExceptionCallback(error)
end

ViDebuger.LogLevel = ViLogLevel.OK
ViDebuger.UseTryCatch = false

ViDebuger.NoteCallback = NoteCallback
ViDebuger.CritOKCallback = CritOKCallback
ViDebuger.WarningCallback = WarningCallback
ViDebuger.RecordCallback = RecordCallback
ViDebuger.ErrorCallback = ErrorCallback
ViDebuger.ExceptionCallback = ExceptionCallback
ViDebuger.AssertError = AssertError
ViDebuger.AssertWarning = AssertWarning
ViDebuger.Error = Error
ViDebuger.Warning = Warning
ViDebuger.Record = Record
ViDebuger.CritOK = CritOK
ViDebuger.Note = Note
ViDebuger._Error = _Error
ViDebuger._Warning = _Warning
ViDebuger.Exception = Exception

return ViDebuger