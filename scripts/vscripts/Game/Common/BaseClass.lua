--oop编程
local _class = {}

ClassType = 
{
	class = 1,
	instance = 2,
}
 
function BaseClass(classname, super)
	assert(type(classname) == "string" and #classname > 0)
	local class_type = {}
	class_type.__init = false
	class_type.__delete = false
	class_type.__cname = classname
	class_type.__ctype = ClassType.class
	class_type.super = super
	class_type.New = function(...)
		local obj = {}
		obj._class_type = class_type
		obj.__ctype = ClassType.instance
		setmetatable(obj, { 
			__index = _class[class_type],
		})
		do
			local create
			create = function(c, ...)
				if c.super then
					create(c.super, ...)
				end
				if c.__init then
					c.__init(obj, ...)
				end
			end

			create(class_type, ...)
		end
		obj.Delete = function(self)
			local now_super = self._class_type 
			while now_super ~= nil do	
				if now_super.__delete then
					now_super.__delete(self)
				end
				now_super = now_super.super
			end
		end
		return obj
	end
	--
	local vtbl = {}
	assert(_class[class_type] == nil, "Aready defined class : ", classname)
	_class[class_type] = vtbl
	setmetatable(class_type, {
		__newindex = function(t,k,v)
			vtbl[k] = v
		end
		, 
		__index = vtbl,
	})
 
	if super then
		setmetatable(vtbl, {
			__index = function(t,k)
				local ret = _class[super][k]
				return ret
			end
		})
	end
	return class_type
end
