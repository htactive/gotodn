using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace GotoDN.Common
{
    public enum RoleTypeEnums
    {
        NormalUser = 10,
        Mod = 20,
        Operator = 30,
        Admin = 40,
        SuperAdmin = 50,
        Executor = 60,
    }
    public enum UserStatusEnums
    {
        Active = 1,
        Deactive = 2,
    }
    public enum LoginResponseEnums
    {
        UnknowError = 0,
        WrongPassword = 1,
        ErrorCaptcha = 2,
        WasBanned = 3,
        DuplicateUserName = 4,
    }
    public enum LanguageEnums
    {
        English = 1,
        Vietnamese = 2,
        Chinese = 3,
        Japanese = 4,
        Korean = 5,
        France = 6,
    }

    public class DefaultPhoto
    {
        public static string ImageUrl = "https://s3-ap-southeast-1.amazonaws.com/dfwresource/coms/img/coms_8323f5ac-fad6-4c2d-a1ca-2276af4a4a99.jpg";

        public static string IconUrl = "https://image.ibb.co/ngdnnk/ic_help.png";
    }
}
