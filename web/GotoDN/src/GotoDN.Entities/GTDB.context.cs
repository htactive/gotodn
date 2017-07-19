using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace GotoDN.Entities
{
    public partial class GTDBEntities : DbContext
    {
        public GTDBEntities(DbContextOptions<GTDBEntities> options) : base(options)
        {
        }
        public DbSet<Claim> Claim { get; set; }
        public DbSet<Image> Image { get; set; }
        public DbSet<Role> Role { get; set; }
        public DbSet<RoleClaim> RoleClaim { get; set; }
        public DbSet<User> User { get; set; }
        public DbSet<UserLoginToken> UserLoginToken { get; set; }
        public DbSet<UserProfile> UserProfile { get; set; }
        public DbSet<UserRole> UserRole { get; set; }
        public DbSet<Category> Category { get; set; }
        public DbSet<CategoryLanguage> CategoryLanguage { get; set; }
        public DbSet<HTService> HTService { get; set; }
        public DbSet<HTServiceLanguage> HTServiceLanguage { get; set; }
        public DbSet<Place> Place { get; set; }
        public DbSet<PlaceLanguage> PlaceLanguage { get; set; }
        public DbSet<City> City { get; set; }
        public DbSet<District> District { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<User>()
                .HasMany(x => x.UserProfiles)
                .WithOne(x => x.User)
                .OnDelete(Microsoft.EntityFrameworkCore.Metadata.DeleteBehavior.Cascade);
            modelBuilder.Entity<User>()
                .HasMany(x => x.UserRoles)
                .WithOne(x => x.User)
                .OnDelete(Microsoft.EntityFrameworkCore.Metadata.DeleteBehavior.Cascade);
            modelBuilder.Entity<User>()
                .HasMany(x => x.UserLoginTokens)
                .WithOne(x => x.User)
                .OnDelete(Microsoft.EntityFrameworkCore.Metadata.DeleteBehavior.Cascade);

            modelBuilder.Entity<Claim>()
                .HasMany(x => x.RoleClaims)
                .WithOne(x => x.Claim)
                .OnDelete(Microsoft.EntityFrameworkCore.Metadata.DeleteBehavior.Cascade);
            modelBuilder.Entity<Role>()
                .HasMany(x => x.RoleClaims)
                .WithOne(x => x.Role)
                .OnDelete(Microsoft.EntityFrameworkCore.Metadata.DeleteBehavior.Cascade);

            modelBuilder.Entity<Category>()
                .HasMany(x => x.CategoryLanguages)
                .WithOne(x => x.Category)
                .OnDelete(Microsoft.EntityFrameworkCore.Metadata.DeleteBehavior.Cascade);

            modelBuilder.Entity<HTService>()
                .HasMany(x => x.HTServiceLanguages)
                .WithOne(x => x.HTService)
                .OnDelete(Microsoft.EntityFrameworkCore.Metadata.DeleteBehavior.Cascade);

            modelBuilder.Entity<Place>()
                .HasMany(x => x.PlaceLanguages)
                .WithOne(x => x.Place)
                .OnDelete(Microsoft.EntityFrameworkCore.Metadata.DeleteBehavior.Cascade);
        }
    }
}
