namespace Data.Migrations
{
    using Domain.Entities;
    using Domain.Entities.Enum;
    using Domain.Entities.Enum.Setup;
    using Domain.Entities.Setup;
    using System;
    using System.Collections.Generic;
    using System.Data.Entity.Migrations;
    using System.Linq;

    internal sealed class Configuration : DbMigrationsConfiguration<Data.EFData.BOTContext>
    {
        public Configuration()
        {
            AutomaticMigrationsEnabled = false;
        }

        protected override void Seed(Data.EFData.BOTContext context)
        {


            context.Skills.AddRange(DummyData.Skills);
            context.SaveChanges();

            context.SocialNetworks.AddRange(DummyData.Socials);
            context.SaveChanges();

            context.Tags.AddRange(DummyData.Tags);
            context.SaveChanges();


            context.Industries.AddRange(DummyData.Industries);
            context.SaveChanges();


            context.Levels.AddRange(DummyData.Levels);
            context.SaveChanges();


            context.DepartmentGroups.AddRange(DummyData.DepartmentGroups);
            context.SaveChanges();

 
            context.Departments.AddRange(DummyData.Departments);
            context.SaveChanges();



            context.Languages.AddRange(DummyData.Languages);
            context.SaveChanges();



            context.Countries.AddRange(DummyData.Countries);
            context.SaveChanges();



            context.Locations.AddRange(DummyData.Locations);
            context.SaveChanges();



            context.Stages.AddRange(DummyData.Stages);
            context.SaveChanges();

 

            context.Permissions.AddRange(DummyData.Permissions);
            context.SaveChanges();


            context.Roles.AddRange(DummyData.Roles);
            context.SaveChanges();

            context.Users.AddRange(DummyData.Users);
            context.SaveChanges();

            Tag tag = new Tag()
            {
                Title = "tag"
            };
            context.Tags.Add(tag);
            context.SaveChanges();

            context.Vacancies.AddRange(DummyData.Vacancies);
            context.SaveChanges();

            context.Candidates.AddRange(DummyData.Candidates);
            context.SaveChanges();

            base.Seed(context);
        }


    }
}