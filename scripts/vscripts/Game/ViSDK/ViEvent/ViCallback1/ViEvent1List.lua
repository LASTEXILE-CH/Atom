local ViEvent1List = BaseClass("ViEvent1List", ViEvent1AsynList)

local function Attach(self, node, func)
    node:Attach(func, self._eventList)
end

ViEvent1List.Attach = Attach

return ViEvent1List