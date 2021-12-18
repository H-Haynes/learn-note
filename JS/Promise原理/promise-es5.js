//状态一确定不可更改
//默认走resolve
//返回值传递为then的参数
//错误的捕获及传递
//链式调用
//空then如何忽视	(当做(val)=>{return val})	直接将值传递到下一个then
//异步执行	无微任务权限，使用定时器模拟
//返回值为Promise的处理	后续的then处理的对象改变
function myPromise(executor) {
	var self = this;
	self.status = "pending"; //状态，默认pending
	self.resolveValue = null;
	self.rejectReason = null;
	self.ResolveCallbacklist = [];
	self.RejectCallbacklist = [];

	function resolve(value) { //成功
		if (self.status === "pending") { //由于status是一经确定就不可改变的，所以要判断是否处于可变状态
			self.status = "Fulfilled"; //改变状态
			self.resolveValue = value; //存储参数
			self.ResolveCallbacklist.forEach(ele => ele());

		}


	}

	function reject(reason) { //失败
		if (self.status === "pending") {
			self.status = "Rejected";
			self.rejectReason = reason;
			self.RejectCallbacklist.forEach(ele => ele())
		}
	}

	try { //捕获错误从而触发reject
		executor(resolve, reject)
	} catch (e) {

		reject(e)
	}
}

//处理返回值是Promise
function ResolutionReturnPromise(nextPromise, returnValue, res, rej) { //下一个Promise,上一个的返回值，当前的res,rej参数

	if (returnValue instanceof myPromise) { //如果是Promise对象
		returnValue.then(function(val) { //去触发新对象的状态，返回给下一个then,看上去就像是这个then是注册在这个新的promise上一样，实际上还是上一个的；
			res(val)
		}, function(reason) {
			rej(reason)
		})
	} else { //如果不是
		res(returnValue);
	}
}

myPromise.prototype.then = function(onFulfilled, onRejected) {

	var self = this;

	if (!onFulfilled) { //空then的resolve处理，直接传递值到下一个
		onFulfilled = function(val) {
			return val;
		}
	}
	if (!onRejected) { //空then的reject处理,继续抛出错误
		onRejected = function(reason) {
			throw new Error(reason);
		}
	}

	var nextPromise = new myPromise(function(res, rej) { //链式调用
		if (self.status === "Fulfilled") { //判断状态，选择执行哪个回调
			setTimeout(function() { //模拟异步
				try { //捕获错误
					var nextResolveValue = onFulfilled(self.resolveValue);
					//执行成功回调并将返回值存储，作下一个then的参数
					ResolutionReturnPromise(nextPromise, nextResolveValue, res, rej);
					// res(nextResolveValue); 
					//将值传递到下一个then	此处只处理返回值非Promise，在上面的函数里处理了返回值是Promise

				} catch (e) {
					rej(e); //传递错误
				}
			}, 0)

		}
		if (self.status === "Rejected") { //失败
			setTimeout(function() { //模拟异步
				try {
					var nextRejectValue = onRejected(self.rejectReason);
					//执行失败回调并将返回值存储，作下一个then的参数
					ResolutionReturnPromise(nextPromise, nextRejectValue, res, rej);
				} catch (e) {
					rej(e)
				}

			}, 0)

		}

		if (self.status === "pending") {
			self.ResolveCallbacklist.push(function() {
				setTimeout(function() {
					try {
						var nextResolveValue = onFulfilled(self.resolveValue);
						ResolutionReturnPromise(nextPromise, nextResolveValue, res, rej);
					} catch (e) {
						rej(e)
					}
				}, 0)
			});

			self.RejectCallbacklist.push(function() {
				setTimeout(function() {
					try {
						var nextRejectValue = onRejected(self.rejectReason);
						ResolutionReturnPromise(nextPromise, nextRejectValue, res, rej);
					} catch (e) {
						rej(e)
					}
				}, 0)
			})
		}

	});


	return nextPromise;

}

myPromise.prototype.all = function(taskList) {
	var newP = new myPromise();
	var isResolve = taskList.every(function(promise) {
		promise.status == "Fulfilled"
	});
	if (isResolve) newP.resolve();
	else newP.reject();

}

myPromise.prototype.race = function(taskList) {
	return new myPromise(function(resolve, reject) {
		taskList.forEach(function(promise, index) {
			promise.then(resolve, reject)
		})
	})
}

