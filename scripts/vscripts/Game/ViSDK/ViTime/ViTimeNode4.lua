local ViTimeNode4 = BaseClass("ViTimeNode4", ViTimeNodeInterface)

local function ViTimeNode4Ctor(self)
    self._listener = nil
    self._delegate = nil
    self._span = 0
end

local function TickDelegate(self)
    return self._delegate
end

local function Span(self)
    return self._span
end

local function Start(self, timer, span, listener, callback)
    self._listener = listener
    self._delegate = callback
    self._span = span
    self:SetTime(timer:Time() + ViAssisstant.Int32Near(self._span * 100))
    timer:Add(self)
end

local function Detach(self)
    self._listener = nil
    self._delegate = nil
    self._span = 0
    self.AttachNode:Detach()
end

local function _Exce(self, timer)
    self:SetTime(timer:Time() + ViAssisstant.Int32Near(self._span * 100))
    timer:Add(self)
    ViDelegateAssisstant.Invoke1(self._listener, self._delegate, self)
end

ViTimeNode4.__init = ViTimeNode4Ctor
ViTimeNode4.TickDelegate = TickDelegate
ViTimeNode4.Span = Span
ViTimeNode4.Start = Start
ViTimeNode4.Detach = Detach
ViTimeNode4._Exce = _Exce

return ViTimeNode4