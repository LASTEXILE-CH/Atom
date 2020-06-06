local ViWorkFlowEventNode = BaseClass("ViWorkFlowEventNode")

local function ViWorkFlowEventNodeCtor(self, name, callback)
    self.Name = name
    self.Callback = callback
end

ViWorkFlowEventNode.__init = ViWorkFlowEventNodeCtor

return ViWorkFlowEventNode