import { customAlphabet } from "nanoid"

// generate URL-safe IDs with 8 characters
// using alphanumeric characters (excluding similar-looking ones for better readability)

const alphabet = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
const nanoid = customAlphabet(alphabet, 8);

export const generateShortId = (): string => {
  return nanoid();
}