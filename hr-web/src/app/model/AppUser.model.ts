export class AppUser {
   public userId:any;
   public firstName: any;
   public lastName: any;
   public    email: any;
   public userName: any;
    
   constructor(id, _firstName, _lastName, _email, _userName) {
    this.userId = id;
    this.firstName = _firstName;
    this.lastName = _lastName;
    this.email = _email;
    this.userName = _userName;
  }
}