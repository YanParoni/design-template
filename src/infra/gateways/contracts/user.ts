import { HttpClientDTO } from "@infra/http/contracts";
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
  getProfile: () => Promise<HttpClientDTO.Output<any>>;
  createUser: (user: CreateUserDTO) => Promise<HttpClientDTO.Output<UserDTO>>;
  changeAvatar: (avatarUrl: string) => Promise<HttpClientDTO.Output<any>>;
  updateBio: (newBio: string) => Promise<HttpClientDTO.Output<any>>;
  updateAt: (newAt: string) => Promise<HttpClientDTO.Output<any>>;
  updateUserDetails: (newUserDetails: any) => Promise<HttpClientDTO.Output<any>>;
}