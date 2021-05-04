using AutoMapper;
using hr_Data.Entities;
using hr_Domain.users;

namespace hr_api.Helpers
{
    public class AutoMapperProfile : Profile
    {
        #region Constructor

        public AutoMapperProfile()
        {
            CreateMap<RegisterModel, User>();
        }

        #endregion
    }
}
