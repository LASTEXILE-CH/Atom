local ViEvent1List = BaseClass("ViEvent1List", ViEvent1AsynList)

local function Attach(self, node, listener, func)
    node:Attach(listener, func, self._eventList)
end

ViEvent1List.Attach = Attach

return ViEvent1List