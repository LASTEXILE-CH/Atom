local PriorityNode = BaseClass("PriorityNode")

local function PriorityNodeCtor(self)
    self.Name = ""
    self.Weight = 0
    self.Value = nil
end

PriorityNode.__init = PriorityNodeCtor

return PriorityNode