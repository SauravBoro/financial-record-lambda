import { createCipheriv, randomBytes, createHash , publicEncrypt, generateKeyPairSync} from 'crypto';

const {publicKey, privateKey} = generateKeyPairSync("rsa", {
    modulusLength: 2048,
});

export const encryptData = async (data: any) => {
  const aesKey = randomBytes(32);
  const iv = randomBytes(16);
  const cipher = createCipheriv('aes-256-cbc', aesKey, iv);

  let encrypted = cipher.update(JSON.stringify(data), 'utf8', 'hex');
  encrypted += cipher.final('hex');

  const encryptedKey = publicEncrypt(publicKey!, aesKey).toString('base64');
  const hash = createHash('sha256').update(JSON.stringify(data)).digest('hex');
  return { encryptedData: encrypted, encryptedKey, iv: iv.toString('hex'), hash };
};
