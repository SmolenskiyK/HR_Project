﻿using BotDomain.Entities.Enum;
using BotDomain.Entities.Setup;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BotDomain.Entities
{
    public class WorkInfo: BaseEntity
    {
        public string PositionDesired { get; set; }
        public int SalaryDesired { get; set; }
        public List<Skill> Skills { get; set; }
        public TypeOfEmployment TypeOfEmployment { get; set; }
        public string Practice { get; set; }
        public Experience Experience { get; set; }
    }
}
