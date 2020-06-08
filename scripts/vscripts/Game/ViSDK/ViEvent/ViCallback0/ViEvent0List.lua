local ViEvent0List = BaseClass("ViEvent0List", ViEvent0AsynList)

local function Attach(self, node, listener, func)
    node:Attach(listener, func, self._eventList)
end

ViEvent0List.Attach = Attach

return ViEvent0List