﻿using GotoDN.Entities;
using GotoDN.Web.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace GotoDN.Web.Mappers
{
    public partial class Mapper
    {
        public static UserModel ToModel(User entity)
        {
            return entity == null ? null : new UserModel()
            {
                Id = entity.Id,
                UserName = entity.UserName,
                UserStatusId = entity.UserStatusId,
                ProviderName = entity.ProviderName,
                ProviderKey = entity.ProviderKey,
                CreateDate = entity.CreateDate,
            };
        }

        public static List<UserModel> ToModel(IEnumerable<User> entities)
        {
            return entities == null ? null : entities.Select(ToModel).ToList();
        }
    }
}
