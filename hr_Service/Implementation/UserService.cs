using hr_Data.Entities;
using hr_Service.Interface;

namespace hr_Service.Implementation
{
   public class UserService: IUserService
    {
        public User Authenticate(string usernameOrEmail, string password)
        {
            User abc = new User();
            abc.Id = 1;
            abc.FirstName = "Amar";
            abc.LastName = "Sharma";
            return abc;
            //return _userRepository.Authenticate(usernameOrEmail, password);
        }
        public User GetById(int userId)
        {
            User abc = new User();
            abc.Id = 1;
            abc.FirstName = "Amar";
            abc.LastName = "Sharma";
            return abc;
            //return _userRepository.Authenticate(usernameOrEmail, password);
        }
    }
}
