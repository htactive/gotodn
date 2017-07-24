using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace GotoDN.Common
{
    public class DateTimeHelper
    {
        public static DateTime GetDateTimeNow()
        {
            return DateTime.UtcNow;
        }
    }
}
