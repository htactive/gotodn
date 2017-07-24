using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore.Migrations;

namespace GotoDN.Web.Migrations
{
    public partial class hoang_000006 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_HTServiceLanguage_HTService_HTServiceId",
                table: "HTServiceLanguage");

            migrationBuilder.DropForeignKey(
                name: "FK_PlaceLanguage_Place_PlaceId",
                table: "PlaceLanguage");

            migrationBuilder.AddForeignKey(
                name: "FK_HTServiceLanguage_HTService_HTServiceId",
                table: "HTServiceLanguage",
                column: "HTServiceId",
                principalTable: "HTService",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_PlaceLanguage_Place_PlaceId",
                table: "PlaceLanguage",
                column: "PlaceId",
                principalTable: "Place",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_HTServiceLanguage_HTService_HTServiceId",
                table: "HTServiceLanguage");

            migrationBuilder.DropForeignKey(
                name: "FK_PlaceLanguage_Place_PlaceId",
                table: "PlaceLanguage");

            migrationBuilder.AddForeignKey(
                name: "FK_HTServiceLanguage_HTService_HTServiceId",
                table: "HTServiceLanguage",
                column: "HTServiceId",
                principalTable: "HTService",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_PlaceLanguage_Place_PlaceId",
                table: "PlaceLanguage",
                column: "PlaceId",
                principalTable: "Place",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
