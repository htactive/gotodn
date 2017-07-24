using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore.Migrations;

namespace GotoDN.Web.Migrations
{
    public partial class hoang_000003 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Icon",
                table: "PlaceLanguage");

            migrationBuilder.DropColumn(
                name: "Icon",
                table: "HTServiceLanguage");

            migrationBuilder.DropColumn(
                name: "Icon",
                table: "CategoryLanguage");

            migrationBuilder.AddColumn<int>(
                name: "IconId",
                table: "PlaceLanguage",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "IconId",
                table: "HTServiceLanguage",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "IconId",
                table: "CategoryLanguage",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_PlaceLanguage_IconId",
                table: "PlaceLanguage",
                column: "IconId");

            migrationBuilder.CreateIndex(
                name: "IX_HTServiceLanguage_IconId",
                table: "HTServiceLanguage",
                column: "IconId");

            migrationBuilder.CreateIndex(
                name: "IX_CategoryLanguage_IconId",
                table: "CategoryLanguage",
                column: "IconId");

            migrationBuilder.AddForeignKey(
                name: "FK_CategoryLanguage_Image_IconId",
                table: "CategoryLanguage",
                column: "IconId",
                principalTable: "Image",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_HTServiceLanguage_Image_IconId",
                table: "HTServiceLanguage",
                column: "IconId",
                principalTable: "Image",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_PlaceLanguage_Image_IconId",
                table: "PlaceLanguage",
                column: "IconId",
                principalTable: "Image",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_CategoryLanguage_Image_IconId",
                table: "CategoryLanguage");

            migrationBuilder.DropForeignKey(
                name: "FK_HTServiceLanguage_Image_IconId",
                table: "HTServiceLanguage");

            migrationBuilder.DropForeignKey(
                name: "FK_PlaceLanguage_Image_IconId",
                table: "PlaceLanguage");

            migrationBuilder.DropIndex(
                name: "IX_PlaceLanguage_IconId",
                table: "PlaceLanguage");

            migrationBuilder.DropIndex(
                name: "IX_HTServiceLanguage_IconId",
                table: "HTServiceLanguage");

            migrationBuilder.DropIndex(
                name: "IX_CategoryLanguage_IconId",
                table: "CategoryLanguage");

            migrationBuilder.DropColumn(
                name: "IconId",
                table: "PlaceLanguage");

            migrationBuilder.DropColumn(
                name: "IconId",
                table: "HTServiceLanguage");

            migrationBuilder.DropColumn(
                name: "IconId",
                table: "CategoryLanguage");

            migrationBuilder.AddColumn<string>(
                name: "Icon",
                table: "PlaceLanguage",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Icon",
                table: "HTServiceLanguage",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Icon",
                table: "CategoryLanguage",
                nullable: true);
        }
    }
}
