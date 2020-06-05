local setmetatable = setmetatable

local Vi_LinkListLinkList = {}
Vi_LinkListLinkList.__index = Vi_LinkListLinkList

function Vi_LinkListLinkList:new()
	local t = {length = 0, _prev = 0, _next = 0}
	t._prev = t
	t._next = t
	return setmetatable(t, Vi_LinkListLinkList)
end

function Vi_LinkListLinkList:clear()
	self._next = self
	self._prev = self
	self.length = 0
end

function Vi_LinkListLinkList:push(value)
	local node = {value = value, _prev = 0, _next = 0, removed = false}
	
	self._prev._next = node
	node._next = self
	node._prev = self._prev
	self._prev = node
	
	self.length = self.length + 1
	return node
end

function Vi_LinkListLinkList:pushnode(node)
	if not node.removed then return end
	
	self._prev._next = node
	node._next = self
	node._prev = self._prev
	self._prev = node
	node.removed = false
	self.length = self.length + 1
end

function Vi_LinkListLinkList:pop()
	local _prev = self._prev
	self:remove(_prev)
	return _prev.value
end

function Vi_LinkListLinkList:unshift(v)
	local node = {value = v, _prev = 0, _next = 0, removed = false}
	
	self._next._prev = node
	node._prev = self
	node._next = self._next
	self._next = node
	
	self.length = self.length + 1
	return node
end

function Vi_LinkListLinkList:shift()
	local _next = self._next
	self:remove(_next)
	return _next.value
end

function Vi_LinkListLinkList:remove(iter)
	if iter.removed then return end
	
	local _prev = iter._prev
	local _next = iter._next
	_next._prev = _prev
	_prev._next = _next
	
	self.length = math.max(0, self.length - 1)
	iter.removed = true
end

function Vi_LinkListLinkList:find(v, iter)
	iter = iter or self
	
	repeat
		if v == iter.value then
			return iter
		else
			iter = iter._next
		end		
	until iter == self
	
	return nil
end

function Vi_LinkListLinkList:findlast(v, iter)
	iter = iter or self
	
	repeat
		if v == iter.value then
			return iter
		end
		
		iter = iter._prev
	until iter == self
	
	return nil
end

function Vi_LinkListLinkList:next(iter)
	local _next = iter._next
	if _next ~= self then
		return _next, _next.value
	end
	
	return nil
end

function Vi_LinkListLinkList:prev(iter)
	local _prev = iter._prev
	if _prev ~= self then
		return _prev, _prev.value
	end
	
	return nil
end

function Vi_LinkListLinkList:erase(v)
	local iter = self:find(v)
	
	if iter then
		self:remove(iter)		
	end
end

function Vi_LinkListLinkList:insert(v, iter)	
	if not iter then
		return self:push(v)
	end
	
	local node = {value = v, _next = 0, _prev = 0, removed = false}
	
	if iter._next then
		iter._next._prev = node
		node._next = iter._next
	else
		self.last = node
	end
	
	node._prev = iter
	iter._next = node
	self.length = self.length + 1
	return node
end

function Vi_LinkListLinkList:head()
	return self._next.value
end

function Vi_LinkListLinkList:tail()
	return self._prev.value
end

function Vi_LinkListLinkList:clone()
	local t = Vi_LinkListLinkList:new()
	
	for i, v in Vi_LinkListLinkList.next, self, self do
		t:push(v)
	end
	
	return t
end

function Vi_LinkListLinkList:IndexOf(tValue)
	local idx = 0
	for i, v in Vi_LinkListLinkList.next, self, self do
		if v == tValue then
			return idx		
		end
		idx = idx + 1
	end
	return -1
end

function Vi_LinkListLinkList:Get(index)
	local idx = 0
	for i, v in Vi_LinkListLinkList.next, self, self do
		if idx == index then
			return v		
		end
		idx = idx + 1
	end
	return nil
end

function Vi_LinkListLinkList:InsertAt(index, tValue)
	local idx = 0
	local iter = self
	repeat
		if idx == index then
			self:insert(tValue, iter)
			return
		end
		idx = idx + 1
		iter = iter._next
	until iter == self
	iter:push(tValue)
end

Vi_LinkListiLinkList = function(Vi_LinkList_LinkList) return Vi_LinkListLinkList.next, Vi_LinkList_LinkList, Vi_LinkList_LinkList end
Vi_LinkListriLinkList = function(Vi_LinkList_LinkList) return Vi_LinkListLinkList.prev, Vi_LinkList_LinkList, Vi_LinkList_LinkList end

setmetatable(Vi_LinkListLinkList, {__call = Vi_LinkListLinkList.new})
return Vi_LinkListLinkList