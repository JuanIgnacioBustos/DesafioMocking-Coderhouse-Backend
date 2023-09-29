import {fileURLToPath} from 'url';
import { dirname } from 'path';
import bcrypt from 'bcrypt'

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename); 

// Devuelve un string con el password hasheado
export const createHash = (password) => bcrypt.hashSync(password, bcrypt.genSaltSync(10));

// Se compara el password sin hashear con el password hasheado (del usuario), y se valida que coincidan
export const validatePassword = (password, user) => bcrypt.compareSync(password, user.password);

export default __dirname; // Basicamente, __dirname es el directorio donde se encuentra este archivo