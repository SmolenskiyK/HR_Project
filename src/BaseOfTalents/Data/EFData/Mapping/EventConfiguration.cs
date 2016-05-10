﻿using Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Data.EFData.Mapping
{
    public class EventConfiguration : BaseEntityConfiguration<Event>
    {
        public EventConfiguration()
        {
            Map(m => m.Requires("IsDeleted").HasValue(false)).Ignore(m => m.IsDeleted);

            Property(e => e.EventDate).IsRequired();
            Property(e => e.Description).IsRequired();

            HasOptional(e => e.Vacancy).WithMany();
            HasOptional(e => e.Candidate).WithMany();

            HasRequired(e => e.EventType).WithMany().HasForeignKey(e => e.EventTypeId);
            HasRequired(e => e.Responsible).WithMany().HasForeignKey(e => e.ResponsibleId);

        }
    }
}
