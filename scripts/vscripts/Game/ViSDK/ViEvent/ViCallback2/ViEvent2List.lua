local ViEvent2List = BaseClass("ViEvent2List", ViEvent2AsynList)

local function Attach(self, node, listener, func)
    node:Attach(listener, func, self._eventList)
end

ViEvent2List.Attach = Attach

return ViEvent2List