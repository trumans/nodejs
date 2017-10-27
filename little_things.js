// little experiments

var a = [1,3,5]
console.log('a is type '+typeof(a));
console.log('a[0] is '+a[1]);
console.log('a size is '+a.length);
console.log('a not empty? '+(a.length > 0));

var b =1;
console.log('b is '+b);
console.log('b is undefined '+(b == undefined));
console.log('b is undefined '+((b == undefined || b < 1)));

var c=9;
if ((c.length == undefined || c.length < 1)) {
	console.log('c is falsy. ');
} else {
	console.log('c is truthy. ');
}