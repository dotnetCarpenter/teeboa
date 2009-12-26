/**
 * @author Jon Ege Ronnenberg
 * @version 0.1
 */
/**
 * Provider collection.
 * Singleton
 */
Teeboa.Providers = function(){
	return new hdStore('providers');
}();
/**
 * Articles collection.
 * Singleton
 */
Teeboa.Articles = function(){
	return new hdStore('articles');
}();
/**
 * Transaction collection.
 * Singleton
 */
Teeboa.Transactions = function(){ return new hdStore('transactions'); }();