/**
 * @author Jon Ege Ronnenberg
 * @version 0.1
 * Property names is to the fullest extent taken from the blog post 'NEWSPAPER JARGON'
 * http://vasukibelavadi.wordpress.com/2006/08/06/newspaper-jargon/
 */
var Teeboa = {};
/**
 * An article
 * @classDescription A Teeboa article.
 * @param {Object} config
 */
Teeboa.Article = function(config){
	this.id = config.article_id;
	this.headline = config.article_headline;
	this.byLine = config.journalist_name;
	this.deck = config.article_summary;
	this.content = config.article_body_text;
	this.dateline = config.article_timestamp;
	this.providerName = config.supplier_name;
	this.providerLogo = config.supplier_logo;
	this.topicName = config.topic_name;
	this.purchaseTimestamp = config.purchase_timestamp;
	this.purchasePrice = config.purchase_timestamp;
};
/**
 * A user with id = 1234. Singleton
 * @param {Object} config
 */
Teeboa.Customer = function(config){
	this.id = config.id;
}(1234);
/**
 * A provider.
 * @param {Object} config
 */
Teeboa.Provider = function(config){
	this.id = config.supplier_id;
	this.name = config.supplier_name;
	this.logo = config.supplier_logo;
	
	return this.id;
};
/**
 * A transaction.
 * @param {Object} config
 */
Teeboa.Transaction = function(config){
	this.date = config.transaction_date;
	this.text = config.transaction_text;
	this.amount = config.transaction_amount;
};