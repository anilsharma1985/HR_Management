using System.ComponentModel;
using System.ComponentModel.DataAnnotations;

namespace hr_Domain.users
{
    public class RegisterModel
    {
        [Required(ErrorMessage = "FirstName is required")]
        public string FirstName { get; set; }

        [Required(ErrorMessage = "LastName is required")]
        public string LastName { get; set; }

        public string Email { get; set; }
        public string Username { get; set; }

    }
}
