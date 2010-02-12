/**
 * @author Jon Ege Ronnenberg
 * @version 0.2
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
 * A user
 * @param {Object} config
 */
Teeboa.Customer = function(config){
	this.id = config.customer_input_id;
	this.name = config.customer_name;
	this.email = config.customer_email;
	this.filters = new hdStore('filters');
	/**
	 * Add a filter to use as criteria when "MyPaper" is shown and
	 * to show on the criteria page
	 * @param {String} id The filter id
	 * @param {String} providerid The Teeboa.Provider.id
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
Teeboa.Provider = function(config){
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
Teeboa.Transaction = function(config){
	this.date = config.transaction_date;
	this.text = config.transaction_text;
	this.amount = config.transaction_amount;
};