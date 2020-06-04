local setmetatable = setmetatable

local LinkList = {}
LinkList.__index = LinkList

function LinkList:new()
	local t = {length = 0, _prev = 0, _next = 0}
	t._prev = t
	t._next = t
	return setmetatable(t, LinkList)
end

function LinkList:clear()
	self._next = self
	self._prev = self
	self.length = 0
end

function LinkList:push(value)
	local node = {value = value, _prev = 0, _next = 0, removed = false}
	
	self._prev._next = node
	node._next = self
	node._prev = self._prev
	self._prev = node
	
	self.length = self.length + 1
	return node
end

function LinkList:pushnode(node)
	if not node.removed then return end
	
	self._prev._next = node
	node._next = self
	node._prev = self._prev
	self._prev = node
	node.removed = false
	self.length = self.length + 1
end

function LinkList:pop()
	local _prev = self._prev
	self:remove(_prev)
	return _prev.value
end

function LinkList:unshift(v)
	local node = {value = v, _prev = 0, _next = 0, removed = false}
	
	self._next._prev = node
	node._prev = self
	node._next = self._next
	self._next = node
	
	self.length = self.length + 1
	return node
end

function LinkList:shift()
	local _next = self._next
	self:remove(_next)
	return _next.value
end

function LinkList:remove(iter)
	if iter.removed then return end
	
	local _prev = iter._prev
	local _next = iter._next
	_next._prev = _prev
	_prev._next = _next
	
	self.length = math.max(0, self.length - 1)
	iter.removed = true
end

function LinkList:find(v, iter)
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

function LinkList:findlast(v, iter)
	iter = iter or self
	
	repeat
		if v == iter.value then
			return iter
		end
		
		iter = iter._prev
	until iter == self
	
	return nil
end

function LinkList:next(iter)
	local _next = iter._next
	if _next ~= self then
		return _next, _next.value
	end
	
	return nil
end

function LinkList:prev(iter)
	local _prev = iter._prev
	if _prev ~= self then
		return _prev, _prev.value
	end
	
	return nil
end

function LinkList:erase(v)
	local iter = self:find(v)
	
	if iter then
		self:remove(iter)		
	end
end

function LinkList:insert(v, iter)	
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

function LinkList:head()
	return self._next.value
end

function LinkList:tail()
	return self._prev.value
end

function LinkList:clone()
	local t = LinkList:new()
	
	for i, v in LinkList.next, self, self do
		t:push(v)
	end
	
	return t
end

function LinkList:IndexOf(tValue)
	local idx = 0
	for i, v in LinkList.next, self, self do
		if v == tValue then
			return idx		
		end
		idx = idx + 1
	end
	return -1
end

function LinkList:Get(index)
	local idx = 0
	for i, v in LinkList.next, self, self do
		if idx == index then
			return v		
		end
		idx = idx + 1
	end
	return nil
end

function LinkList:InsertAt(index, tValue)
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

iLinkList = function(_LinkList) return LinkList.next, _LinkList, _LinkList end
riLinkList = function(_LinkList) return LinkList.prev, _LinkList, _LinkList end

setmetatable(LinkList, {__call = LinkList.new})
return LinkList