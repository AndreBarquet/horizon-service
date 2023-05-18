import { EncriptDTO } from "@/dto/CryptoDTO";
import sensitiveConfig from '@/config/sensitiveCongif';

const crypto = require("crypto");

const DEFAULT_CIPHER_CONFIG: EncriptDTO = {
  algorithm: sensitiveConfig.ALGORITHM,
  secret: sensitiveConfig.SECRET_KEY,
  type: sensitiveConfig.CRIPTO_TYPE
}


export function encript(text: string, encriptCofig?: EncriptDTO): string {
  const config: EncriptDTO = encriptCofig ?? DEFAULT_CIPHER_CONFIG;
  const cipher = crypto.createCipher(config.algorithm, config.secret);

  cipher.update(text);
  return cipher.final(config.type);
}

export function decript(text: string, encriptCofig?: EncriptDTO): string {
  const config: EncriptDTO = encriptCofig ?? DEFAULT_CIPHER_CONFIG;
  const decipher = crypto.createDecipher(config.algorithm, config.secret);

  decipher.update(text, config.type);
  return decipher.final();
}