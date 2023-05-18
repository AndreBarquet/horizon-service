export function exists(value: any) {
  return value !== null && value !== undefined
}

export function notExists(value: any) {
  return value === null || value === undefined
}