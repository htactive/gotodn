using GotoDN.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace GotoDN.Web
{

    public class TemporaryDbContextFactory : IDbContextFactory<GTDBEntities>
    {
        public GTDBEntities Create(DbContextFactoryOptions options)
        {
            var builder = new ConfigurationBuilder()
                .SetBasePath(options.ContentRootPath)
                .AddJsonFile("appsettings.json", optional: true, reloadOnChange: true)
                .AddJsonFile($"appsettings.{options.EnvironmentName}.json", optional: true)
                .AddEnvironmentVariables();

            var configuration = builder.Build();
            var optionBuilder = new DbContextOptionsBuilder<GTDBEntities>();
            optionBuilder.UseMySql(configuration.GetConnectionString("GTDBConnection"),
                b => b.MigrationsAssembly("GotoDN.Web")
                );
            return new GTDBEntities(optionBuilder.Options);
        }

    }
}
