using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace GotoDN.Common
{
    public class DefaultPhoto
    {
        public static string ImageUrl = "https://s3-ap-southeast-1.amazonaws.com/dfwresource/coms/img/coms_8323f5ac-fad6-4c2d-a1ca-2276af4a4a99.jpg";

        public static string IconUrl = "https://image.ibb.co/ngdnnk/ic_help.png";
    }

    public class LanguageArrays
    {
        public static Array GetLanguageArray()
        {
            return new LanguageEnums[] {
                LanguageEnums.Chinese,
                LanguageEnums.France,
                LanguageEnums.Japanese,
                LanguageEnums.Korean,
                LanguageEnums.Vietnamese,
                LanguageEnums.English
            };
        }
    }
}
