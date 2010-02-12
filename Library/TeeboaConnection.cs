using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

using FirebirdSql.Data.FirebirdClient;

namespace Roppongi.Library
{
    public static class TeeboaConnection
    {
        // Properties
        public static FbConnectionStringBuilder ConnectionString
        {
            get
            {
                FbConnectionStringBuilder conn = new FbConnectionStringBuilder("User=TEEBOA;Password=#teeboa!;Database=Teeboa;DataSource=melabos.dk;");
                conn.Port = 0x32fc;
                return conn;
            }
        }
    }
}
