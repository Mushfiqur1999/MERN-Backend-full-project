export const PORT = 5050;
export const MONGODB_CONNECTION = "mongodb+srv://backend:******@cluster0.zqhusgg.mongodb.net/******?retryWrites=true&w=majority&appName=Cluster0";


// JWT Config
export const JWT_SECRET = 'A123SE';
export const JWT_EXPIRATION_TIME = 60*60*24*30; // 30 days

// Email Config
export const EMAIL_HOST = 'smtp.titan.email';
export const EMAIL_PORT = '465';
export const EMAIL_USER = 'support@laravelpoint.com';
export const EMAIL_PASSWORD = 'Rup77_4827';
export const MAIL_ENCRYPTION = "ssl"
//export const EMAIL_SECURITY = false;
//export const EMAIL_UN_AUTH = false;

// App Behavior Config
export const WEB_CACHE = false;  // Fixed typo from WEB_CATCH to WEB_CACHE
export const MAX_JSON_SIZE = '10MB';
export const URL_ENCODE = true;

// Request Limiting Config
export const REQUEST_LIMIT_TIME = 20 * 60 * 1000; // 20 minutes
export const REQUEST_LIMIT_NUMBER = 2000;
