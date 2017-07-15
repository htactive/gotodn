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
        Vietnamese =1,
        English = 2,

    }

}
