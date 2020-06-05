local ViPriorityNode = BaseClass("ViPriorityNode")

local function ViPriorityNodeCtor(self)
    self.Name = ""
    self.Weight = 0
    self.Value = nil
end

ViPriorityNode.__init = ViPriorityNodeCtor

return ViPriorityNode