using System;
using System.Collections.Generic;
using System.Text;

namespace hr_Data.Entities
{
   public class UserLoginHistory
    {
        public int Id { get; set; }
        public User User { get; set; }
        public DateTime LoginDate { get; set; }
        public string RequestOrigin { get; set; }
    }
}
