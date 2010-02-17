using System;
using System.Text;
using System.Text.RegularExpressions;
using FirebirdSql.Data.FirebirdClient;
using Roppongi.Library;

namespace Roppongi.Api
{
    public partial class Roppongi : IRoppongi
    {
        private static string stringify(FbDataReader reader)
        {
            return stringify(reader, string.Empty);
        }

        private static string stringify(FbDataReader reader, string parentnodename)
        {
            StringBuilder json = new StringBuilder();
            int columns = reader.FieldCount;
            if (parentnodename.Length > 0) { json.AppendFormat("{{\"{0}\":", parentnodename); }
            while (reader.Read())
            {
                for (int i = 0; i < columns; i++)
                {
                    if (i % reader.FieldCount == 0) { json.Append("{"); }
                    json.AppendFormat("\"{0}\":{1},", reader.GetName(i).ToLower(), jsonify(reader.GetValue(i)));
                    if (i % reader.FieldCount == reader.FieldCount - 1)
                    {
                        json.Remove(json.Length - 1, 1);
                        json.Append("},");
                    }
                }
            }
            // if nothing (or only the parentnodename is appended to the string builder then the reader was empty and we return nothing. reader.HasRows doesn't work
            if (json.Length == 0 || json.ToString() == string.Format("{{\"{0}\":", parentnodename)) { return ""; }
            json.Remove(json.Length - 1, 1);
            if (parentnodename.Length > 0) { json.Append("}"); }
            // check if the json should contain an array and add array structure if true
            if (Regex.IsMatch(json.ToString(), "},{"))
            {
                /*
                json = new StringBuilder(
                    Regex.Replace(json.ToString(), "(:{)", ":[{")
                );*/
                json.Insert((parentnodename.Length > 0 ? parentnodename.Length + 4 : 4), "[");
                json.Insert(json.Length - 1, "]");
            }
            return json.ToString();
        }
        //PERF: Should return a strong type based on DbType using generic return types
        private static object jsonify(object value)
        {
            return Regex.IsMatch(value.ToString(), @"^\d+$|TRUE |FALSE$") ? Convert.ToString(value).ToLower() : "\"" + Regex.Replace(value.ToString(), "\"", "&quot;") + "\"";
        }


        private string GetJson(string CommandText, params FbParameter[] pars)
        { return GetJson(CommandText, string.Empty, pars); }
        private string GetJson(string CommandText, string ParentNodeName, params FbParameter[] pars)
        {
            FbConnectionStringBuilder connString = TeeboaConnection.ConnectionString;
            using (FbConnection conn = new FbConnection(connString.ToString()))
            {
                using (FbCommand cmd = conn.CreateCommand())
                {
                    cmd.CommandType = System.Data.CommandType.StoredProcedure;
                    cmd.CommandText = CommandText;

                    for (int i = 0; i < pars.Length; i++)
                    {
                        cmd.Parameters.Add(pars[i]);
                    }
                    try
                    {
                        conn.Open();
                        using (FbDataReader dr = cmd.ExecuteReader())
                        {
                            return ParentNodeName == string.Empty ? stringify(dr) : stringify(dr, ParentNodeName);
                        }
                    }
                    catch (Exception ex)
                    {
                        return string.Format("Message: {1}{0}Method: {2}{0}", "<br />", ex.Message, ex.TargetSite);
                    }
                }
            }
        }
    }
}