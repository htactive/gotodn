using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore.Migrations;

namespace GotoDN.Web.Migrations
{
    public partial class huan_000001 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "PlaceImage",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("MySql:ValueGeneratedOnAdd", true),
                    ImageId = table.Column<int>(nullable: true),
                    PlaceLangId = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PlaceImage", x => x.Id);
                    table.ForeignKey(
                        name: "FK_PlaceImage_Image_ImageId",
                        column: x => x.ImageId,
                        principalTable: "Image",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_PlaceImage_PlaceLanguage_PlaceLangId",
                        column: x => x.PlaceLangId,
                        principalTable: "PlaceLanguage",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "PlaceMoreInfo",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("MySql:ValueGeneratedOnAdd", true),
                    IconId = table.Column<int>(nullable: true),
                    IsHalf = table.Column<bool>(nullable: true),
                    Name = table.Column<string>(nullable: true),
                    PlaceLangId = table.Column<int>(nullable: false),
                    Value = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PlaceMoreInfo", x => x.Id);
                    table.ForeignKey(
                        name: "FK_PlaceMoreInfo_Image_IconId",
                        column: x => x.IconId,
                        principalTable: "Image",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_PlaceMoreInfo_PlaceLanguage_PlaceLangId",
                        column: x => x.PlaceLangId,
                        principalTable: "PlaceLanguage",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_PlaceImage_ImageId",
                table: "PlaceImage",
                column: "ImageId");

            migrationBuilder.CreateIndex(
                name: "IX_PlaceImage_PlaceLangId",
                table: "PlaceImage",
                column: "PlaceLangId");

            migrationBuilder.CreateIndex(
                name: "IX_PlaceMoreInfo_IconId",
                table: "PlaceMoreInfo",
                column: "IconId");

            migrationBuilder.CreateIndex(
                name: "IX_PlaceMoreInfo_PlaceLangId",
                table: "PlaceMoreInfo",
                column: "PlaceLangId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "PlaceImage");

            migrationBuilder.DropTable(
                name: "PlaceMoreInfo");
        }
    }
}
