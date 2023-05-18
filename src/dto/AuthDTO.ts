export type LoginFormDTO = {
  login: string,
  password: string,
}

export type LoginResponseDTO = {
  id: number,
  token: string,
}