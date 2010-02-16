/**
 * @author Jon Ege Ronnenberg
 * @version 0.4
 * Property names is to the fullest extent taken from the blog post 'NEWSPAPER JARGON'
 * http://vasukibelavadi.wordpress.com/2006/08/06/newspaper-jargon/
 */
var Roppongi = {};
/**
 * An article
 * @classDescription A Teeboa article.
 * @param {Object} config
 */
Roppongi.Article = function(config){
	this.id = config.article_id;
	this.headline = config.article_headline;
	this.byLine = config.journalist_name;
	this.deck = config.article_summary;
	this.content = config.article_body_text;
	this.dateline = config.article_timestamp;
	this.providerName = config.supplier_name;
	this.providerLogo = config.supplier_logo;
	this.topic = config.topic_name;
	this.purchaseTimestamp = config.purchase_timestamp;
	this.price = config.purchase_timestamp;
};
/**
 * A user
 * @param {Object} config
 */
Roppongi.Customer = function(config){
	this.id = config.customer_input_id;
	this.name = config.customer_name;
	this.email = config.customer_email;
	this.filters = new hdStore('filters');
	/**
	 * Add a filter to use as criteria when "MyPaper" is shown and
	 * to show on the criteria page
	 * @param {String} id The filter id
	 * @param {String} providerid The Roppongi.Provider.id
	 * @param {String} topicid
	 * @method addFilter
	 */
	this.addFilter = function(id, providerid, topicid){
		this.filters.add(id, { providerId: providerid, topicId: topicid });
		//TODO: do POST AJAX call to /{CustomerId}/Filter/Update
	};
	/**
	 * Remove a filter used as criteria when "MyPaper" is shown and
	 * used on the criteria page
	 * @param {String} id The filter id
	 * @method removeFilter
	 */
	this.removeFilter = function(id){
		var filter = this.filters.getItem(id);
		this.filters.remove(id);
		//TODO: do DELETE AJAX call to /{CustomerId}/Filter/Update
	};
};
/**
 * A provider.
 * @param {Object} config
 */
Roppongi.Provider = function(config){
	this.id = config.supplier_id;
	this.name = config.supplier_name;
	this.logo = config.supplier_logo;
	this.topics = new hdStore('topics');
	// add topics to the provider
	for(var i = 0; i < config.supplier_topic_list.length; i++){
		this.topics.add(
			config.supplier_topic_list[i].topic_id,{
				text: config.supplier_topic_list[i].topic_text,
				isSelected: config.supplier_topic_list[i].is_topic_selected
			}
		);
	};
	return this.id;
};
/**
 * A transaction.
 * @param {Object} config
 */
Roppongi.Transaction = function(config){
	this.date = config.transaction_date;
	this.text = config.transaction_text;
	this.amount = config.transaction_amount;
};