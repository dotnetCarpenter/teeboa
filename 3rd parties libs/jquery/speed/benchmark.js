// Runs a function many times without the function call overhead
function benchmark(fn, times){
	fn = fn.toString();
	var s = fn.indexOf('{')+1,
		e = fn.lastIndexOf('}');
	fn = fn.substring(s,e);
	
	return new Function('i','var t=new Date;while(i--){'+fn+'};return new Date-t')(times);
}
