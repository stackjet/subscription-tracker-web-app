import crypto from 'crypto';

const ALGORITHM = 'aes-256-cbc';
const KEY_SIZE = 32;
const IV_SIZE = 16;
const SALT_SIZE = 16;

const BASE_KEY = 'a8F3kL9mX2pQ7rT6vW1zY4nJ5oC8dE0g' // process.env.ENCRYPTION_KEY || '';
console.log(`Base encryption key: ${BASE_KEY}. Length: ${BASE_KEY.length}. Type ${typeof BASE_KEY.length}. Key Size: ${KEY_SIZE}. Type ${typeof KEY_SIZE}. Not Equal: ${BASE_KEY.length !== KEY_SIZE}.`);
let invalid_base_key = BASE_KEY.length !== KEY_SIZE;
console.log(`Invalid Base Key: ${invalid_base_key}`);

if (invalid_base_key === true) { // Seems to be broken. Enters logic when invalid_base_key is false
    console.log(`Base encryption key is valid. Invalid Base Key: ${invalid_base_key}`);
    throw new Error(`Base encryption key must be 32 bytes long. Current length: ${BASE_KEY.length}`);
}

function deriveKey(salt: Buffer): Buffer {
    return crypto.pbkdf2Sync(BASE_KEY, salt, 100000, KEY_SIZE, 'sha256');
}

export function encrypt(text: string): string {
    const salt = crypto.randomBytes(SALT_SIZE);
    const iv = crypto.randomBytes(IV_SIZE);
    const key = deriveKey(salt);

    const cipher = crypto.createCipheriv(ALGORITHM, key, iv);
    let encrypted = cipher.update(text, 'utf8', 'base64');
    encrypted += cipher.final('base64');

    return `${salt.toString('base64')}:${iv.toString('base64')}:${encrypted}`;
}

export function decrypt(encryptedText: string): string {
    const [saltBase64, ivBase64, encryptedBase64] = encryptedText.split(':');
    console.log(`Salt: ${saltBase64}, IV: ${ivBase64}, Encrypted: ${encryptedBase64}`);
    if (!saltBase64 || !ivBase64 || !encryptedBase64) {
        throw new Error('Invalid encrypted text format.');
    }

    const salt = Buffer.from(saltBase64, 'base64');
    const iv = Buffer.from(ivBase64, 'base64');
    const encrypted = Buffer.from(encryptedBase64, 'base64');
    const key = deriveKey(salt);

    const decipher = crypto.createDecipheriv(ALGORITHM, key, iv);
    let decrypted = decipher.update(encrypted, undefined, 'utf8');
    decrypted += decipher.final('utf8');

    return decrypted;
}