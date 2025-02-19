export interface UserModel {
  deleteUser(id: number): void;
  id: number;
  phone: string;
  address: string;
  username: string;
  name: string;
}

export interface PostModel {
  id: number;
  phone: string;
  address: string;
  username: string;
  name: string;
  user: UserModel;
  deletePost: (id: number) => void;
}

export interface PostAddModel {
  id: number;
  phone: string;
  address: string;
  username: string;
  name: string;
  user: UserModel;
}
