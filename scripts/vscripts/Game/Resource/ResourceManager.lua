local ResourceManager = BaseClass("ResourceManager", Singleton)

local function Preload(self, context)
    print("ResourceManager : Preload")
end

ResourceManager.Preload = Preload

return ResourceManager

