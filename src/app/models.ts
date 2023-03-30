interface IRole {
  id: string;
  name: string;
}

export class RoleDto implements IRole {
  id: string;
  name: string;
  constructor(role: IRole) {
    this.id = role.id;
    this.name = role.name;
  }
}

interface IUser {
  firstName: string;
  // contact: ContactDto;
  permissions: string[];
  // friends: FriendDto[];
  roles: IRole[];
  roles2: IRole[];
}

interface IUserPassword {
  password: string;
  // passwordConfirmation: string;
}

export interface IUserSave extends IUser, IUserPassword {}

export interface IUserUpdate extends IUser {
  id: string;
}

export class FriendDto {
  name: string;
}

export class ContactDto {
  email: string;
}

export class UserDto implements IUser {
  firstName: string;
  // lastName: string;
  // contact: ContactDto;
  permissions: string[];
  // friends: FriendDto[];
  roles: RoleDto[];
  roles2: RoleDto[];

  constructor(user?: IUser) {
    this.firstName = user?.firstName || '';
    // this.lastName = user.lastName;
    // this.contact = user.contact;
    // this.friends = user.friends;
    this.roles = user?.roles || [];
    this.roles2 = user?.roles2 || [];
    this.permissions = user?.permissions || [];
  }

  // get fullName() {
  //   return `${this.firstName} ${this.lastName}`;
  // }
}

export class UserSaveDto extends UserDto implements IUserSave {
  password: string;
  // passwordConfirmation: string;
  constructor(user?: IUserSave) {
    super(user);
    this.password = user?.password || '';
    // this.passwordConfirmation = user.passwordConfirmation;
  }
}

export class UserUpdateDto extends UserDto implements IUserUpdate {
  id: string;
  constructor(user: IUserUpdate) {
    super(user);
    this.id = user.id;
  }
}
