using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore.Migrations;

namespace GotoDN.Web.Migrations
{
    public partial class hoang_000009 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_District_City_CityId",
                table: "District");

            migrationBuilder.DropForeignKey(
                name: "FK_HTService_Category_CategoryId",
                table: "HTService");

            migrationBuilder.DropForeignKey(
                name: "FK_Place_Category_CategoryId",
                table: "Place");

            migrationBuilder.DropForeignKey(
                name: "FK_Place_City_CityId",
                table: "Place");

            migrationBuilder.DropForeignKey(
                name: "FK_Place_District_DistrictId",
                table: "Place");

            migrationBuilder.DropForeignKey(
                name: "FK_Place_HTService_HTServiceId",
                table: "Place");

            migrationBuilder.AddForeignKey(
                name: "FK_District_City_CityId",
                table: "District",
                column: "CityId",
                principalTable: "City",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_HTService_Category_CategoryId",
                table: "HTService",
                column: "CategoryId",
                principalTable: "Category",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Place_Category_CategoryId",
                table: "Place",
                column: "CategoryId",
                principalTable: "Category",
                principalColumn: "Id",
                onDelete: ReferentialAction.SetNull);

            migrationBuilder.AddForeignKey(
                name: "FK_Place_City_CityId",
                table: "Place",
                column: "CityId",
                principalTable: "City",
                principalColumn: "Id",
                onDelete: ReferentialAction.SetNull);

            migrationBuilder.AddForeignKey(
                name: "FK_Place_District_DistrictId",
                table: "Place",
                column: "DistrictId",
                principalTable: "District",
                principalColumn: "Id",
                onDelete: ReferentialAction.SetNull);

            migrationBuilder.AddForeignKey(
                name: "FK_Place_HTService_HTServiceId",
                table: "Place",
                column: "HTServiceId",
                principalTable: "HTService",
                principalColumn: "Id",
                onDelete: ReferentialAction.SetNull);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_District_City_CityId",
                table: "District");

            migrationBuilder.DropForeignKey(
                name: "FK_HTService_Category_CategoryId",
                table: "HTService");

            migrationBuilder.DropForeignKey(
                name: "FK_Place_Category_CategoryId",
                table: "Place");

            migrationBuilder.DropForeignKey(
                name: "FK_Place_City_CityId",
                table: "Place");

            migrationBuilder.DropForeignKey(
                name: "FK_Place_District_DistrictId",
                table: "Place");

            migrationBuilder.DropForeignKey(
                name: "FK_Place_HTService_HTServiceId",
                table: "Place");

            migrationBuilder.AddForeignKey(
                name: "FK_District_City_CityId",
                table: "District",
                column: "CityId",
                principalTable: "City",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_HTService_Category_CategoryId",
                table: "HTService",
                column: "CategoryId",
                principalTable: "Category",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Place_Category_CategoryId",
                table: "Place",
                column: "CategoryId",
                principalTable: "Category",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

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

            migrationBuilder.AddForeignKey(
                name: "FK_Place_HTService_HTServiceId",
                table: "Place",
                column: "HTServiceId",
                principalTable: "HTService",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
