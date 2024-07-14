export interface CreateUserDTO {
  username: string;
  email: string;
  password: string;
}

export interface UserDTO {
  id: string;
  username: string;
  at: string;
  email: string;
  password: string;
  profileImage: string;
  bio: string;
  isPrivate: boolean;
  followers: string[];
  following: string[];
  blockedUsers: string[];
  reviews: string[];
  likes: string[];
  gameInteractions: string[];
}
export interface IUserGateway {
  getProfile: () => Promise<any>;
  createUser: (user: CreateUserDTO) => Promise<UserDTO | null>;
  changeAvatar: (avatarUrl: string) => Promise<any>;
  updateBio: (newBio: string) => Promise<any>;
  updateAt: (newAt: string) => Promise<any>;
  updateUserDetails: (newUserDetails: any) => Promise<any>;
}
