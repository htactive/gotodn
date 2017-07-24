using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using GotoDN.Entities;
using GotoDN.Common;

namespace GotoDN.Web.Migrations
{
    [DbContext(typeof(GTDBEntities))]
    [Migration("20170714090035_thuan_000003")]
    partial class thuan_000003
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
            modelBuilder
                .HasAnnotation("ProductVersion", "1.1.2");

            modelBuilder.Entity("GotoDN.Entities.Category", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<DateTime?>("CreatedDate");

                    b.Property<DateTime?>("UpdatedDate");

                    b.HasKey("Id");

                    b.ToTable("Category");
                });

            modelBuilder.Entity("GotoDN.Entities.CategoryLanguage", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<int?>("CategoryId");

                    b.Property<DateTime?>("CreatedDate");

                    b.Property<string>("Icon");

                    b.Property<int?>("ImageId");

                    b.Property<int>("Language");

                    b.Property<string>("Title");

                    b.Property<DateTime?>("UpdatedDate");

                    b.HasKey("Id");

                    b.HasIndex("CategoryId");

                    b.HasIndex("ImageId");

                    b.ToTable("CategoryLanguage");
                });

            modelBuilder.Entity("GotoDN.Entities.Claim", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("ClaimName");

                    b.HasKey("Id");

                    b.ToTable("Claim");
                });

            modelBuilder.Entity("GotoDN.Entities.Image", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("S3FileKey");

                    b.Property<string>("Url");

                    b.HasKey("Id");

                    b.ToTable("Image");
                });

            modelBuilder.Entity("GotoDN.Entities.Role", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("DisplayName");

                    b.Property<string>("Name");

                    b.Property<int>("RoleType");

                    b.HasKey("Id");

                    b.ToTable("Role");
                });

            modelBuilder.Entity("GotoDN.Entities.RoleClaim", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<int?>("ClaimId");

                    b.Property<int?>("RoleId");

                    b.HasKey("Id");

                    b.HasIndex("ClaimId");

                    b.HasIndex("RoleId");

                    b.ToTable("RoleClaim");
                });

            modelBuilder.Entity("GotoDN.Entities.User", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<DateTime?>("CreateDate");

                    b.Property<string>("Password");

                    b.Property<string>("ProviderKey");

                    b.Property<string>("ProviderName");

                    b.Property<DateTime?>("UpdatedDate");

                    b.Property<string>("UserName");

                    b.Property<int?>("UserStatusId");

                    b.HasKey("Id");

                    b.ToTable("User");
                });

            modelBuilder.Entity("GotoDN.Entities.UserLoginToken", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<DateTime>("ExpiredDated");

                    b.Property<bool?>("IsRememberMe");

                    b.Property<DateTime>("LastLoginDated");

                    b.Property<string>("Token");

                    b.Property<int>("UserId");

                    b.HasKey("Id");

                    b.HasIndex("UserId");

                    b.ToTable("UserLoginToken");
                });

            modelBuilder.Entity("GotoDN.Entities.UserProfile", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("Address");

                    b.Property<int?>("AvatarId");

                    b.Property<string>("City");

                    b.Property<string>("Email");

                    b.Property<string>("FirstName");

                    b.Property<string>("LastName");

                    b.Property<int?>("UserId");

                    b.Property<bool?>("WasVerifiedEmail");

                    b.HasKey("Id");

                    b.HasIndex("AvatarId");

                    b.HasIndex("UserId");

                    b.ToTable("UserProfile");
                });

            modelBuilder.Entity("GotoDN.Entities.UserRole", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<int?>("RoleId");

                    b.Property<int?>("UserId");

                    b.HasKey("Id");

                    b.HasIndex("RoleId");

                    b.HasIndex("UserId");

                    b.ToTable("UserRole");
                });

            modelBuilder.Entity("GotoDN.Entities.CategoryLanguage", b =>
                {
                    b.HasOne("GotoDN.Entities.Category", "Category")
                        .WithMany("CategoryLanguages")
                        .HasForeignKey("CategoryId")
                        .OnDelete(DeleteBehavior.Cascade);

                    b.HasOne("GotoDN.Entities.Image", "Image")
                        .WithMany()
                        .HasForeignKey("ImageId");
                });

            modelBuilder.Entity("GotoDN.Entities.RoleClaim", b =>
                {
                    b.HasOne("GotoDN.Entities.Claim", "Claim")
                        .WithMany("RoleClaims")
                        .HasForeignKey("ClaimId")
                        .OnDelete(DeleteBehavior.Cascade);

                    b.HasOne("GotoDN.Entities.Role", "Role")
                        .WithMany("RoleClaims")
                        .HasForeignKey("RoleId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("GotoDN.Entities.UserLoginToken", b =>
                {
                    b.HasOne("GotoDN.Entities.User", "User")
                        .WithMany("UserLoginTokens")
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("GotoDN.Entities.UserProfile", b =>
                {
                    b.HasOne("GotoDN.Entities.Image", "Image")
                        .WithMany()
                        .HasForeignKey("AvatarId");

                    b.HasOne("GotoDN.Entities.User", "User")
                        .WithMany("UserProfiles")
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("GotoDN.Entities.UserRole", b =>
                {
                    b.HasOne("GotoDN.Entities.Role", "Role")
                        .WithMany("UserRoles")
                        .HasForeignKey("RoleId");

                    b.HasOne("GotoDN.Entities.User", "User")
                        .WithMany("UserRoles")
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade);
                });
        }
    }
}
