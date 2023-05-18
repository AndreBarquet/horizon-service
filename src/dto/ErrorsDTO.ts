import errorsList from '@/errors/errorsList';

export type ErrorCode = keyof typeof errorsList;

export interface IError {
  message: string,
  code: ErrorCode
}