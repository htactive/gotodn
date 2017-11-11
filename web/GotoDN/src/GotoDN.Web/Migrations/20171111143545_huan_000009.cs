using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore.Migrations;

namespace GotoDN.Web.Migrations
{
    public partial class huan_000009 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "ShowInAllCity",
                table: "Category");

            migrationBuilder.AddColumn<bool>(
                name: "ShowInAllCity",
                table: "HTService",
                nullable: false,
                defaultValue: false);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "ShowInAllCity",
                table: "HTService");

            migrationBuilder.AddColumn<bool>(
                name: "ShowInAllCity",
                table: "Category",
                nullable: true);
        }
    }
}
