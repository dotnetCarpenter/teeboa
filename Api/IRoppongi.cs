using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

using System.ServiceModel;
using System.IO;
using System.ServiceModel.Web;

namespace Roppongi.Api
{
    [ServiceContract]
    interface IRoppongi
    {
        [OperationContract]
        [WebGet(UriTemplate = "{CustomerId}/Articles")]
        Stream GetArticles(string CustomerId);

        [OperationContract]
        [WebGet(UriTemplate = "{CustomerId}/article/{ArticleId}/Buy")]
        Stream BuyArticle(string CustomerId, string ArticleId);

        [OperationContract]
        [WebGet(UriTemplate = "{CustomerId}/article/{ArticleId}")]
        Stream GetArticle(string CustomerId, string ArticleId);

        [OperationContract]
        [WebGet(UriTemplate = "Providers")]
        Stream GetProviders();

        [OperationContract]
        [WebGet(UriTemplate = "{CustomerId}/Provider/{ProviderId}/Topics")]
        Stream GetTopics(string CustomerId, string ProviderId);

        [OperationContract]
        [WebGet(UriTemplate = "{CustomerId}/Filters")]
        Stream GetFilters(string CustomerId);

        [OperationContract]
        [WebInvoke(UriTemplate = "{CustomerId}/Filter/Update?filterid={FilterId}&providerid={ProviderId}&topicid={TopicId}", Method = "POST", BodyStyle = WebMessageBodyStyle.Bare)]
        void AddFilter(string CustomerId, string FilterId, string ProviderId, string TopicId);
        
        [OperationContract]
        [WebInvoke(UriTemplate = "{CustomerId}/Filter/Update?filterid={FilterId}&providerid={ProviderId}&topicid={TopicId}", Method = "DELETE")]
        void RemoveFilter(string CustomerId, string FilterId, string ProviderId, string TopicId);

        [OperationContract]
        [WebInvoke(UriTemplate = "{CustomerId}/Update?name={name}&email={email}", Method = "PUT")]
        Stream UpdateCustomer(string CustomerId, string name, string email);

        [OperationContract]
        [WebGet(UriTemplate = "{CustomerId}/Account")]
        Stream GetTransactions(string CustomerId);

        [OperationContract]
        [WebGet(UriTemplate = "{CustomerId}/Account/Balance")]
        Stream GetBalance(string CustomerId);
    }
}