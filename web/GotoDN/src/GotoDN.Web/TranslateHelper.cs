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
            if (string.IsNullOrEmpty(text)) return "";
            text = text.Replace("\n", "<br>");
            string[] srcText = new[] { text };
            var response = Service.Translations.List(srcText, targetLanguage).Execute();
            var translateResult = response.Translations.FirstOrDefault();
            if (translateResult == null) return "";
            var tranText = translateResult.TranslatedText.Replace(" <br> ", "\n").Replace(" <br>", "\n").Replace("<br> ", "\n").Replace("<br>", "\n");
            process_translation(ref tranText);
            return tranText;
        }

        public static List<string> TranslateText(List<string> text, string targetLanguage)
        {
            string[] srcText = text.ToArray();
            var response = Service.Translations.List(srcText, targetLanguage).Execute();
            var translateResult = new List<string>();
            foreach (var tran in response.Translations)
            {
                var tranText = tran.TranslatedText.Replace(" <br> ", "\n").Replace(" <br>", "\n").Replace("<br> ", "\n").Replace("<br>", "\n");
                process_translation(ref tranText);
                translateResult.Add(tranText);
            }
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

        private static void process_translation(ref String s)
        {
            s = System.Net.WebUtility.HtmlDecode(s);
            s = s.Replace("_", " ");
            s = s.Replace(" ,", ",");
            s = s.Replace(" .", ".");

            s = s.Replace(" /", "/"); s = s.Replace("/ ", "/");
            s = s.Replace("“ ", "“"); s = s.Replace(" ”", "”");
            s = s.Replace("( ", "("); s = s.Replace(" )", ")");
            s = s.Replace("# ", "#"); s = s.Replace(" #", "#");
            s = s.Replace(" '", "'"); s = s.Replace("' ", "'");

            s = s.Replace("??", ""); // remove ??, a Google Translate bug

            s = s.Replace("«", "\""); s = s.Replace("»", "\"");

            process_quotationmarks(ref s);

            // normal quotation marks
            s = s.Replace("\"-", "\" -"); // "- to " -
            s = s.Replace("-\"", "- \""); // -" to - "

            s = s.Replace("\"–", "\" –"); // "- to " –
            s = s.Replace("–\"", "– \""); // –" to - "

            // left quotation marks
            s = s.Replace("“-", "“ -"); // “- to “ -
            s = s.Replace("-“", "- “"); // -“ to - “

            s = s.Replace("“–", "“ –"); // “- to “ –
            s = s.Replace("–“", "– “"); // –" to - “

            // right quotation marks
            s = s.Replace("”-", "” -"); // ”- to ” -
            s = s.Replace("-”", "- ”"); // -” to - ”

            s = s.Replace("”–", "” –"); // ”- to ” –
            s = s.Replace("–”", "– ”"); // –” to - ”

            /*
            // Japanese
            s = s.Replace("、 ", "、"); s = s.Replace(" 、", "、");
            s = s.Replace("。 ", "。"); s = s.Replace(" 。", "。");
            */
        }

        private static void process_quotationmarks(ref String s)
        {
            int no_qm = 0;
            for (int i = 0; i < s.Length; i++)
            {
                if (s[i] == '\"') no_qm++;
                if (s[i] == '“') no_qm++;
                if (s[i] == '”') no_qm++;
                if (s[i] == '«') no_qm++;
                if (s[i] == '»') no_qm++;

            }
            if (no_qm % 2 == 0) // process quotation mark only if there is an even number of them in the description
            {
                s = s.Replace(" \"", "\""); s = s.Replace("\" ", "\"");
                int left_or_right = -1;
                for (int i = 0; i < s.Length; i++)
                {
                    if (s[i] == '\"')
                    {
                        if (left_or_right == -1) // put a space to the left
                        {
                            if (i > 0) // the description does not begin with "
                            {
                                if ((is_newline_char(s[i - 1]) == false) && (s[i - 1] != ' ')) // the line does not begin with "
                                {
                                    s = s.Insert(i, " ");
                                    i++;
                                }
                            }
                        }
                        else // put a space to the right
                        {
                            if (i < s.Length - 1) // if the document the not end with "
                            {
                                if (is_newline_char(s[i + 1]) == false) // if the line does not end with "
                                {
                                    if (Char.IsLetter(s[i + 1]) || Char.IsDigit(s[i + 1])) // if the next character is a letter or digit
                                    {
                                        s = s.Insert(i + 1, " ");
                                    }
                                }
                            }
                        }
                        left_or_right = left_or_right * -1;
                    }
                    if ((s[i] == '«') || (s[i] == '»')) left_or_right = left_or_right * -1;
                }
                s = s.Replace("\"( ", "\" (");
                s = s.Replace("( \"", "(\"");
                s = s.Replace("\"(", "\" (");
            }
        }

        private static bool is_newline_char(char c)
        {
            if (c.Equals('\n'))
            {
                return true;
            }
            return false;
        }
    }
}
