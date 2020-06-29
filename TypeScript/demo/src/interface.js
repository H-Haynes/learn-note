var me = {
    name: '星河',
    age: 25,
    reply: function () {
        console.log("\u6211\u53EB\u661F\u6CB3,\u6211\u4ECA\u5E7425\u5C81");
    },
    favorite: function () {
        console.log("我打酱油");
    }
};
me.reply();
function sum(numbers, callback) {
    var result = 0;
    numbers.forEach(function (ele) {
        if (callback(ele)) {
            result += ele;
        }
    });
    return result;
}
//功能为按要求完成指定数组的某些数值相加
console.log(sum([1, 2, 3, 4, 5, 6, 7, 8, 9], function (n) { return n % 2 == 0; }), '偶数位之和');
console.log(sum([1, 44, 63, 67, 78, 99, 107, 128, 149], function (n) { return n * 5 % 10 == 0; }), '5倍后尾数为0的数之和');
var ext = {
    T1: 24,
    T2: "继承"
};
var ext2 = {
    T1: 66,
    T2: '多重继承',
    T3: true
};
var learn = {
    lesson: 1,
    name: "ts"
};
var a = 1;
for (var i = 0; i < 10; i++) {

    a = a++;
}
console.log(a);
