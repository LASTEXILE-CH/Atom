local ViTimeNode1 = BaseClass("ViTimeNode1", ViTimeNodeInterface)

local function ViTimeNode1Ctor(self)
    
end

local function Delegate(self)
    return self._delegate
end

local function Detach(self)
    self._listener = nil
    self._delegate = nil
    self._time = 0
    self.AttachNode:Detach()
end

local function SetDelegate(self, listener, dele)
    self._listener = listener
    self._delegate = dele
end

local function _Exce(self, timer)
    local dele = self._delegate
	self._delegate = nil
	self._time = 0
	ViDelegateAssisstant.Invoke1(self._listener, dele, self)
end

ViTimeNode1.__init = ViTimeNode1Ctor
ViTimeNode1.Delegate = Delegate
ViTimeNode1.Detach = Detach
ViTimeNode1.SetDelegate = SetDelegate
ViTimeNode1._Exce = _Exce

return ViTimeNode1