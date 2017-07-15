using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore.Migrations;

namespace GotoDN.Web.Migrations
{
    public partial class hoang_000002 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "HTServiceId",
                table: "Place",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "CategoryId",
                table: "HTService",
                nullable: true);

            migrationBuilder.AlterColumn<int>(
                name: "Language",
                table: "PlaceLanguage",
                nullable: true,
                oldClrType: typeof(int));

            migrationBuilder.AlterColumn<int>(
                name: "Longitude",
                table: "Place",
                nullable: true,
                oldClrType: typeof(int));

            migrationBuilder.AlterColumn<int>(
                name: "Latitude",
                table: "Place",
                nullable: true,
                oldClrType: typeof(int));

            migrationBuilder.AlterColumn<bool>(
                name: "IsServiceSlider",
                table: "Place",
                nullable: true,
                oldClrType: typeof(bool));

            migrationBuilder.AlterColumn<bool>(
                name: "IsCategorySlider",
                table: "Place",
                nullable: true,
                oldClrType: typeof(bool));

            migrationBuilder.CreateIndex(
                name: "IX_Place_HTServiceId",
                table: "Place",
                column: "HTServiceId");

            migrationBuilder.AlterColumn<int>(
                name: "Language",
                table: "HTServiceLanguage",
                nullable: true,
                oldClrType: typeof(int));

            migrationBuilder.CreateIndex(
                name: "IX_HTService_CategoryId",
                table: "HTService",
                column: "CategoryId");

            migrationBuilder.AlterColumn<int>(
                name: "Language",
                table: "CategoryLanguage",
                nullable: true,
                oldClrType: typeof(int));

            migrationBuilder.AddForeignKey(
                name: "FK_HTService_Category_CategoryId",
                table: "HTService",
                column: "CategoryId",
                principalTable: "Category",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Place_HTService_HTServiceId",
                table: "Place",
                column: "HTServiceId",
                principalTable: "HTService",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_HTService_Category_CategoryId",
                table: "HTService");

            migrationBuilder.DropForeignKey(
                name: "FK_Place_HTService_HTServiceId",
                table: "Place");

            migrationBuilder.DropIndex(
                name: "IX_Place_HTServiceId",
                table: "Place");

            migrationBuilder.DropIndex(
                name: "IX_HTService_CategoryId",
                table: "HTService");

            migrationBuilder.DropColumn(
                name: "HTServiceId",
                table: "Place");

            migrationBuilder.DropColumn(
                name: "CategoryId",
                table: "HTService");

            migrationBuilder.AlterColumn<int>(
                name: "Language",
                table: "PlaceLanguage",
                nullable: false,
                oldClrType: typeof(int),
                oldNullable: true);

            migrationBuilder.AlterColumn<int>(
                name: "Longitude",
                table: "Place",
                nullable: false,
                oldClrType: typeof(int),
                oldNullable: true);

            migrationBuilder.AlterColumn<int>(
                name: "Latitude",
                table: "Place",
                nullable: false,
                oldClrType: typeof(int),
                oldNullable: true);

            migrationBuilder.AlterColumn<bool>(
                name: "IsServiceSlider",
                table: "Place",
                nullable: false,
                oldClrType: typeof(bool),
                oldNullable: true);

            migrationBuilder.AlterColumn<bool>(
                name: "IsCategorySlider",
                table: "Place",
                nullable: false,
                oldClrType: typeof(bool),
                oldNullable: true);

            migrationBuilder.AlterColumn<int>(
                name: "Language",
                table: "HTServiceLanguage",
                nullable: false,
                oldClrType: typeof(int),
                oldNullable: true);

            migrationBuilder.AlterColumn<int>(
                name: "Language",
                table: "CategoryLanguage",
                nullable: false,
                oldClrType: typeof(int),
                oldNullable: true);
        }
    }
}
