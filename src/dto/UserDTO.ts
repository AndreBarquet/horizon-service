export type UserFormDTO = {
  id?: number,
  name: string,
  email: string,
  password: string,
  age: number,
  created_at?: Date,
}

export type UserDTO = {
  id?: number,
  name: string,
  email: string,
  age: number,
}