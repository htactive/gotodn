using GotoDN.Common;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace GotoDN.Web
{
    public class ExcelHelper
    {
        public static List<string> Languages
        {
            get
            {
                return new List<string>
                {
                     "English", "TiengViet", "Japanese", "Chinese", "Korean", "France"
                };
            }
        }

        public static LanguageEnums GetLangEnums(string lang)
        {
            switch (lang)
            {
                case "English":
                    return LanguageEnums.English;
                case "TiengViet":
                    return LanguageEnums.Vietnamese;
                case "Japanese":
                    return LanguageEnums.Japanese;
                case "Chinese":
                    return LanguageEnums.Chinese;
                case "Korean":
                    return LanguageEnums.Korean;
                case "France":
                    return LanguageEnums.France;
                default:
                    return LanguageEnums.English;
            }
        }
    }
}
