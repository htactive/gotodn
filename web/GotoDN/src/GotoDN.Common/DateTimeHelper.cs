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
            return TimeZoneInfo.ConvertTime(DateTime.UtcNow, TimeZoneInfo.FindSystemTimeZoneById("SE Asia Standard Time"));
        }

        public static DateTime? SafeParse(string dateValue)
        {
            DateTime parseDate;
            if (DateTime.TryParse(dateValue, out parseDate))
                return parseDate;
            return null;
        }
    }
}
