import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const distPath = path.dirname(__filename);
export const PKG_ROOT = path.join(distPath, '../');

export const TITLE_TEXT = `
           /$$           /$$                 /$$   /$$    
          |__/          | $$                |__/  | $$    
  /$$$$$$  /$$ /$$$$$$$ | $$$$$$$   /$$$$$$  /$$ /$$$$$$  
 /$$__  $$| $$| $$__  $$| $$__  $$ /$$__  $$| $$|_  $$_/  
| $$$$$$$$| $$| $$  \ $$| $$  \ $$| $$$$$$$$| $$  | $$    
| $$_____/| $$| $$  | $$| $$  | $$| $$_____/| $$  | $$ /$$
|  $$$$$$$| $$| $$  | $$| $$  | $$|  $$$$$$$| $$  |  $$$$/
 \_______/|__/|__/  |__/|__/  |__/ \_______/|__/   \___/  
                                                          
                                                          
                                                          
`;
export const DEFAULT_TITLE = `
 /$$                   /$$               /$$                               /$$
| $$                  | $$              | $$                              | $$
| $$$$$$$  /$$   /$$ /$$$$$$    /$$$$$$ | $$$$$$$  /$$$$$$   /$$$$$$  /$$$$$$$
| $$__  $$| $$  | $$|_  $$_/   /$$__  $$| $$__  $$|____  $$ /$$__  $$/$$__  $$
| $$  \ $$| $$  | $$  | $$    | $$$$$$$$| $$  \ $$ /$$$$$$$| $$  \__/ $$  | $$
| $$  | $$| $$  | $$  | $$ /$$| $$_____/| $$  | $$/$$__  $$| $$     | $$  | $$
| $$$$$$$/|  $$$$$$$  |  $$$$/|  $$$$$$$| $$$$$$$/  $$$$$$$| $$     |  $$$$$$$
|_______/  \____  $$   \___/   \_______/|_______/ \_______/|__/      \_______/
           /$$  | $$                                                          
          |  $$$$$$/                                                          
           \______/                                                           
`;
export const DEFAULT_APP_NAME = 'einheit-app';
export const CREATE_EH_APP = 'create-eh-app';
