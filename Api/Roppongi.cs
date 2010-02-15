using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Serialization;
using System.ServiceModel;
using System.Text;

using FirebirdSql.Data.FirebirdClient;
using System.IO;
using System.ServiceModel.Web;

namespace Roppongi.Api
{
    // NOTE: If you change the class name "Roppongi" here, you must also update the reference to "Roppongi" in Web.config and in the associated .svc file.
    public partial class Roppongi : IRoppongi
    {
        private string contentType = "application/json";
        #region IRoppongi Members

        public Stream GetArticles(string CustomerId)
        {
            FbParameter cust = new FbParameter("customer_id", CustomerId);
            FbParameter filter = new FbParameter("filter", null);

            WebOperationContext.Current.OutgoingResponse.ContentType = contentType;
            return new MemoryStream(Encoding.UTF8.GetBytes(GetJson("article_list", "articles", cust, filter)));
        }

        public Stream BuyArticle(string CustomerId, string ArticleId)
        {
            FbParameter cust = new FbParameter("customer_id", CustomerId);
            FbParameter article = new FbParameter("article_id", int.Parse(ArticleId));

            WebOperationContext.Current.OutgoingResponse.ContentType = contentType;
            return new MemoryStream(Encoding.UTF8.GetBytes(GetJson("article_purchase", cust, article)));
        }

        public Stream GetArticle(string CustomerId, string ArticleId)
        {
            FbParameter cust = new FbParameter("customer_id", int.Parse(CustomerId));
            FbParameter article = new FbParameter("article_id", int.Parse(ArticleId));

            WebOperationContext.Current.OutgoingResponse.ContentType = contentType;
            return new MemoryStream(Encoding.UTF8.GetBytes(GetJson("article_detail", cust, article)));
        }

        public Stream GetProviders(string CustomerId)
        {
            WebOperationContext.Current.OutgoingResponse.ContentType = contentType;
            return new MemoryStream(Encoding.UTF8.GetBytes(GetJson("supplier_list", "providers")));
        }

        public Stream GetFilters(string CustomerId)
        {
            FbParameter cust = new FbParameter("customer_id", CustomerId);

            WebOperationContext.Current.OutgoingResponse.ContentType = contentType;
            return new MemoryStream(Encoding.UTF8.GetBytes(GetJson("customer_criteria_list", cust)));
        }

        public void AddFilter(string CustomerId, string FilterId, string ProviderId, string TopicId)
        {
            throw new NotImplementedException();
            //TODO: throw HTTP error codes if failure
        }

        public void RemoveFilter(string CustomerId, string FilterId, string ProviderId, string TopicId)
        {
            throw new NotImplementedException();
            //TODO: throw HTTP error codes if failure
        }

        public Stream UpdateCustomer(string CustomerId, string name, string email)
        {
            throw new NotImplementedException();
            //TODO: throw HTTP error codes if failure
        }

        public Stream GetTransactions(string CustomerId)
        {
            FbParameter cust = new FbParameter("customer_id", CustomerId);

            WebOperationContext.Current.OutgoingResponse.ContentType = contentType;
            return new MemoryStream(Encoding.UTF8.GetBytes(GetJson("customer_account_statement", cust)));
        }

        public Stream GetBalance(string CustomerId)
        {
            FbParameter cust = new FbParameter("customer_id", CustomerId);

            WebOperationContext.Current.OutgoingResponse.ContentType = contentType;
            return new MemoryStream(Encoding.UTF8.GetBytes(GetJson("customer_account_balance", cust)));
        }

        #endregion
    }
}