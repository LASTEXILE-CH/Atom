local ViEvent2List = BaseClass("ViEvent2List", ViEvent2AsynList)

local function Attach(self, node, func)
    node:Attach(func, self._eventList)
end

ViEvent2List.Attach = Attach

return ViEvent2List