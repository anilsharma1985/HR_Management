using hr_Data.Entities;
using System;
using System.Collections.Generic;
using System.Text;

namespace hr_Service.Interface
{
   public interface IUserService
    {
        User Authenticate(string usernameOrEmail, string password);
        User GetById(int userId);
        
    }
}
