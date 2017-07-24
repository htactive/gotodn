using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore.Migrations;

namespace GotoDN.Web.Migrations
{
    public partial class hoang_000004 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "IsServiceSlider",
                table: "Place",
                newName: "IsHomeSlider");

            migrationBuilder.AddColumn<string>(
                name: "Description",
                table: "PlaceLanguage",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Address",
                table: "Place",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "CategoryId",
                table: "Place",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "City",
                table: "Place",
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "CloseTime",
                table: "Place",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "District",
                table: "Place",
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "EndDate",
                table: "Place",
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "OpenTime",
                table: "Place",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Phone",
                table: "Place",
                nullable: true);

            migrationBuilder.AddColumn<float>(
                name: "Rating",
                table: "Place",
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "StartDate",
                table: "Place",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Website",
                table: "Place",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Place_CategoryId",
                table: "Place",
                column: "CategoryId");

            migrationBuilder.AddForeignKey(
                name: "FK_Place_Category_CategoryId",
                table: "Place",
                column: "CategoryId",
                principalTable: "Category",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Place_Category_CategoryId",
                table: "Place");

            migrationBuilder.RenameColumn(
                name: "IsHomeSlider",
                table: "Place",
                newName: "IsServiceSlider");

            migrationBuilder.DropIndex(
                name: "IX_Place_CategoryId",
                table: "Place");

            migrationBuilder.DropColumn(
                name: "Description",
                table: "PlaceLanguage");

            migrationBuilder.DropColumn(
                name: "Address",
                table: "Place");

            migrationBuilder.DropColumn(
                name: "CategoryId",
                table: "Place");

            migrationBuilder.DropColumn(
                name: "City",
                table: "Place");

            migrationBuilder.DropColumn(
                name: "CloseTime",
                table: "Place");

            migrationBuilder.DropColumn(
                name: "District",
                table: "Place");

            migrationBuilder.DropColumn(
                name: "EndDate",
                table: "Place");

            migrationBuilder.DropColumn(
                name: "OpenTime",
                table: "Place");

            migrationBuilder.DropColumn(
                name: "Phone",
                table: "Place");

            migrationBuilder.DropColumn(
                name: "Rating",
                table: "Place");

            migrationBuilder.DropColumn(
                name: "StartDate",
                table: "Place");

            migrationBuilder.DropColumn(
                name: "Website",
                table: "Place");
        }
    }
}
