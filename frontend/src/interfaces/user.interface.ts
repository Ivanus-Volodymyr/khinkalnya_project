export interface IUser {
    name: string;
    email: string;
    age: number;
    city: string;
    password: string;
}

export interface IUserResponse extends IUser {
    id: number;
    status: boolean;
    avatar: string | null;
}
