using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore.Migrations;

namespace GotoDN.Web.Migrations
{
    public partial class hoang_000008 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "City",
                table: "Place");

            migrationBuilder.DropColumn(
                name: "District",
                table: "Place");

            migrationBuilder.AddColumn<int>(
                name: "CityId",
                table: "Place",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "DistrictId",
                table: "Place",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Place_CityId",
                table: "Place",
                column: "CityId");

            migrationBuilder.CreateIndex(
                name: "IX_Place_DistrictId",
                table: "Place",
                column: "DistrictId");

            migrationBuilder.AddForeignKey(
                name: "FK_Place_City_CityId",
                table: "Place",
                column: "CityId",
                principalTable: "City",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Place_District_DistrictId",
                table: "Place",
                column: "DistrictId",
                principalTable: "District",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Place_City_CityId",
                table: "Place");

            migrationBuilder.DropForeignKey(
                name: "FK_Place_District_DistrictId",
                table: "Place");

            migrationBuilder.DropIndex(
                name: "IX_Place_CityId",
                table: "Place");

            migrationBuilder.DropIndex(
                name: "IX_Place_DistrictId",
                table: "Place");

            migrationBuilder.DropColumn(
                name: "CityId",
                table: "Place");

            migrationBuilder.DropColumn(
                name: "DistrictId",
                table: "Place");

            migrationBuilder.AddColumn<string>(
                name: "City",
                table: "Place",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "District",
                table: "Place",
                nullable: true);
        }
    }
}
