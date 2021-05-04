using System.ComponentModel.DataAnnotations;

namespace hr_Domain.users
{
   public class AuthenticateModel
    {
        [Required]
        public string UsernameOrEmail { get; set; }

        [Required]
        public string Password { get; set; }
    }
}
