console.log('MODE:', import.meta.env.MODE);

export const config = {
  mode: import.meta.env.MODE,
  isDev: import.meta.env.MODE === 'dev',
  apiUrl: import.meta.env.VITE_API_URL || 'http://localhost:3000/api/',
  firebaseApiKey: import.meta.env.VITE_FIREBASE_API_KEY 
};
