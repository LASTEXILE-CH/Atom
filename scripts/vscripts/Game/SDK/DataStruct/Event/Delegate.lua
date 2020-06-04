local Delegate = BaseClass("Delegate")

local function DelegateCotr(self)
    self.Callbacks = {}
end

local function Add(self, action)
    print("Add"..tostring(action))
    self.Callbacks[tostring(action)] = action
end

local function Delete(self, action) 
    print("Delete"..tostring(action))
    self.Callbacks[tostring(action)] = nil
end

local function Invoke(self, ...)
    for _, callback in pairs(self.Callbacks) do
        if callback ~= nil then
            callback(...)
         end
    end
end

local function Clear(self) 
    self.Callbacks = {}
end

Delegate.__init = DelegateCotr
Delegate.Add = Add
Delegate.Delete = Delete
Delegate.Invoke = Invoke
Delegate.Clear = Clear

return Delegate