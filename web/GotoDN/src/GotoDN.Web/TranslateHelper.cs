using Google.Apis.Services;
using Google.Apis.Translate.v2;
using GotoDN.Common;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace GotoDN.Web
{
    public class TranslateHelper
    {
        private const string APIKEY = "AIzaSyARWHr6uJrC-cVnlByXNeiIm-UGBFPUgiQ";
        private const string APP_NAME = "gotoDN";

        private static TranslateService Service
        {
            get
            {
                return new TranslateService(new BaseClientService.Initializer()
                {
                    ApiKey = APIKEY, // your API key, that you get from Google Developer Console
                    ApplicationName = APP_NAME // your application name, that you get form Google Developer Console
                });
            }
        }

        public static string TranslateText(string text, string targetLanguage)
        {
            string[] srcText = new[] { text };
            var response = Service.Translations.List(srcText, targetLanguage).Execute();
            var translateResult = response.Translations.FirstOrDefault();
            if (translateResult == null) return "";
            return System.Net.WebUtility.HtmlDecode(translateResult.TranslatedText);
        }

        public static List<string> TranslateText(List<string> text, string targetLanguage)
        {
            string[] srcText = text.ToArray();
            var response = Service.Translations.List(srcText, targetLanguage).Execute();
            var translateResult = response.Translations.Select(t => System.Net.WebUtility.HtmlDecode(t.TranslatedText)).ToList();
            return translateResult;
        }

        public static string GetLanguageCode(LanguageEnums lang )
        {
            switch (lang)
            {
                case LanguageEnums.Vietnamese:
                    return "vi";
                case LanguageEnums.English:
                    return "en";
                case LanguageEnums.Chinese:
                    return "zh";
                case LanguageEnums.Japanese:
                    return "ja";
                case LanguageEnums.Korean:
                    return "ko";
                case LanguageEnums.France:
                    return "fr";
                default:
                    return "en";
            }
        }
    }
}
