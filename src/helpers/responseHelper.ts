import { ErrorCode } from "@/dto/ErrorsDTO";
import errorsList from "@/errors/errorsList";

export function getErrorMessage(errorCode: ErrorCode) {
  return errorsList[errorCode];
}

export function getOffset(currentPage: number = 1, listPerPage: number) {
  return (currentPage - 1) * listPerPage;
}

export function emptyOrList(rows: any) {
  if (!rows) return [];
  return rows;
}

export function emptyOrValue(result: any) {
  if (!result || result.length <= 0) return null;
  return result[0];
}