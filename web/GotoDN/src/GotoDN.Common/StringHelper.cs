using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace GotoDN.Common
{
    public static class StringHelper
    {
        public static string ToStringNullSafe(this object value)
        {
            return (value ?? string.Empty).ToString();
        }
    }
}
