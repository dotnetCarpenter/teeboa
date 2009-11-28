/**
 * @author Jon Ege Ronnenberg
 * @version 0.1
 */
var Teeboa = {};
/**
 * http://vasukibelavadi.wordpress.com/2006/08/06/newspaper-jargon/
 * @classDescription A Teeboa article.
 * @param {Object} config
 */
Teeboa.Article = function(config){
	this.title = function(){ throw new Error('Not implemented.'); };
	this.byLine = function(){ throw new Error('Not implemented.'); };
	this.deck = function(){ throw new Error('Not implemented.'); };
	this.content = function(){ throw new Error('Not implemented.'); };
};
