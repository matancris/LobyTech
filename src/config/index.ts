console.log('MODE:', import.meta.env.MODE);

export const config = {
  mode: import.meta.env.MODE,
  isDev: import.meta.env.MODE === 'dev',
  apiUrl: import.meta.env.VITE_API_URL || 'http://localhost:3000/api/',
  firebase: {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
    projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
    storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
    appId: import.meta.env.VITE_FIREBASE_APP_ID,
    measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,
    databaseURL: import.meta.env.VITE_API_URL
  },
  weatherApiKey: import.meta.env.VITE_WEATHER_API_KEY
};
