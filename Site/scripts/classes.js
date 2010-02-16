/**
 * @author Jon Ege Ronnenberg
 * @version 0.1
 */
/**
 * Provider collection.
 * Singleton
 */
Roppongi.Providers = function(){
	return new hdStore('providers');
}();
/**
 * Articles collection.
 * Singleton
 */
Roppongi.Articles = function(){
	return new hdStore('articles');
}();
/**
 * Transaction collection.
 * Singleton
 */
Roppongi.Transactions = function(){ return new hdStore('transactions'); }();