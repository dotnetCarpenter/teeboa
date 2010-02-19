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
Roppongi.Article = function(config) {
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
    this.price = config.article_price;
    this.isPurchased = config.is_purchased;
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
Roppongi.Provider = function(config) {
    this.id = config.supplier_id;
    this.name = config.supplier_name;
    this.logo = config.supplier_logo;
    this.topics = new hdStore('topics');
    // add topics to the provider
    if (config.supplier_topic_list) { this.addTopics(config.supplier_topic_list); }
    /**
     * Add a topic manually to local object
     * @param {Object} topics Has the following properties: text, isSelected and is stored in hdStore by id
     * @method addTopics
     */
    this.addTopics = function(topics) {
        for (var i = 0; i < topics.list.length; i++) {
            this.topics.add(
			    topics.list[i].topic_id, {
			        text: topics.list[i].topic_name,
			        isSelected: topics.list[i].is_topic_selected
			    }
		    );
        };
    }
	/**
	 * Load topics stored on the server
	 * @method loadTopics
	 */
	this.loadTopics = function(customerid, fn, scope){
		var refAddTopics = this.addTopics;
		var self = this;
		jQuery.getJSON("api/" + customerid + "/provider/" + this.id + "/topics", function(data, textStatus){
			refAddTopics.call(self, data);
			scope ? fn.call(scope): fn();
		});
	}
	
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