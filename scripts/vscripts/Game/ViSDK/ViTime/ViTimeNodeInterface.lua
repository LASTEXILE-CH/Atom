local ViTimeNodeInterface = BaseClass("ViTimeNodeInterface")

local function ViTimeNodeInterfaceCtor(self)
    self.AttachNode = ViDoubleLinkNode2.New()
    self.AttachNode.Data = self
    self._time = 0
end

local function Time(self)
   return self._time
end

local function IsAttach(self)
    return self.AttachNode:IsAttach()
end

local function Detach(self)
    
end

local function _Exce(self, timer)
    
end

local function SetTime(self, time)
    self._time = time
end

local function GetReserveDuration(self, timer)
    if self.AttachNode:IsAttach() then
        return (self._time > timer.Time) and (self._time - timer.Time) or 1
    else
        return 0
    end
end

local function Exec(self, timer)
    if self:IsAttach() then
        self.AttachNode:Detach()
        self._Exce(timer)
        return true
    else
        return false
    end
end


ViTimeNodeInterface.__init = ViTimeNodeInterfaceCtor
ViTimeNodeInterface.Time = Time
ViTimeNodeInterface.IsAttach = IsAttach
ViTimeNodeInterface.Detach = Detach
ViTimeNodeInterface._Exce = _Exce
ViTimeNodeInterface.SetTime = SetTime
ViTimeNodeInterface.GetReserveDuration = GetReserveDuration
ViTimeNodeInterface.Exec = Exec

return ViTimeNodeInterface