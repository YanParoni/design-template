export interface CreateUserDTO {
    username: string,
    email: string,
    password: string
}

export interface UserDTO {
	id: string,
	username: string,
	at: string,
	email: string,
	password: string,
	profileImage: string,
	bio: string,
	isPrivate: boolean,
	followers: string[],
	following: string[],
	blockedUsers: string[],
	reviews: string[],
	likes: string[],
	gameInteractions: string[]
}
export interface IUserGateway {
  getProfile: (id: string) => Promise<any>;
  createUser:(user:CreateUserDTO)=>Promise<UserDTO|null>
}
