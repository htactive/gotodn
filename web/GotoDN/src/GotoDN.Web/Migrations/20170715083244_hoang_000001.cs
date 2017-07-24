using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore.Migrations;

namespace GotoDN.Web.Migrations
{
    public partial class hoang_000001 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "HTService",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("MySql:ValueGeneratedOnAdd", true),
                    CreatedDate = table.Column<DateTime>(nullable: true),
                    UpdatedDate = table.Column<DateTime>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_HTService", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Place",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("MySql:ValueGeneratedOnAdd", true),
                    CreatedDate = table.Column<DateTime>(nullable: true),
                    IsCategorySlider = table.Column<bool>(nullable: false),
                    IsServiceSlider = table.Column<bool>(nullable: false),
                    Latitude = table.Column<int>(nullable: false),
                    Longitude = table.Column<int>(nullable: false),
                    UpdatedDate = table.Column<DateTime>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Place", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "HTServiceLanguage",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("MySql:ValueGeneratedOnAdd", true),
                    CreatedDate = table.Column<DateTime>(nullable: true),
                    HTServiceId = table.Column<int>(nullable: true),
                    Icon = table.Column<string>(nullable: true),
                    ImageId = table.Column<int>(nullable: true),
                    Language = table.Column<int>(nullable: false),
                    Title = table.Column<string>(nullable: true),
                    UpdatedDate = table.Column<DateTime>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_HTServiceLanguage", x => x.Id);
                    table.ForeignKey(
                        name: "FK_HTServiceLanguage_HTService_HTServiceId",
                        column: x => x.HTServiceId,
                        principalTable: "HTService",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_HTServiceLanguage_Image_ImageId",
                        column: x => x.ImageId,
                        principalTable: "Image",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "PlaceLanguage",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("MySql:ValueGeneratedOnAdd", true),
                    CreatedDate = table.Column<DateTime>(nullable: true),
                    Icon = table.Column<string>(nullable: true),
                    ImageId = table.Column<int>(nullable: true),
                    Language = table.Column<int>(nullable: false),
                    PlaceId = table.Column<int>(nullable: true),
                    Title = table.Column<string>(nullable: true),
                    UpdatedDate = table.Column<DateTime>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PlaceLanguage", x => x.Id);
                    table.ForeignKey(
                        name: "FK_PlaceLanguage_Image_ImageId",
                        column: x => x.ImageId,
                        principalTable: "Image",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_PlaceLanguage_Place_PlaceId",
                        column: x => x.PlaceId,
                        principalTable: "Place",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_HTServiceLanguage_HTServiceId",
                table: "HTServiceLanguage",
                column: "HTServiceId");

            migrationBuilder.CreateIndex(
                name: "IX_HTServiceLanguage_ImageId",
                table: "HTServiceLanguage",
                column: "ImageId");

            migrationBuilder.CreateIndex(
                name: "IX_PlaceLanguage_ImageId",
                table: "PlaceLanguage",
                column: "ImageId");

            migrationBuilder.CreateIndex(
                name: "IX_PlaceLanguage_PlaceId",
                table: "PlaceLanguage",
                column: "PlaceId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "HTServiceLanguage");

            migrationBuilder.DropTable(
                name: "PlaceLanguage");

            migrationBuilder.DropTable(
                name: "HTService");

            migrationBuilder.DropTable(
                name: "Place");
        }
    }
}
