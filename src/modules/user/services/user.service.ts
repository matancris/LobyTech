import { firebase } from '../../../firebase/firebase'; // Assuming you've exported db from firebase.js
const { ref, get, db, signInWithEmailAndPassword, auth } = firebase

const usersRef = ref(db, 'users');
async function getMasterAdmin() {
    // get admin from firebase db
    try {
        const snapshot = await get(usersRef);
        if (snapshot.exists()) {
            const users =  snapshot.val(); // Return the data as an object if you want to use it elsewhere in your application.
            return users.find((user: any) => user.id === 1)
        } else {
            console.log('No data available');
        }
    } catch (error) {
        console.error(error);
    }
};

async function getCurrUser() {
    // get admin from firebase db
    try {
        const snapshot = await get(usersRef);
        if (snapshot.exists()) {
            const users =  snapshot.val(); // Return the data as an object if you want to use it elsewhere in your application.
            return users.find((user: any) => user.id === 2)
        } else {
            console.log('No data available');
        }
    } catch (error) {
        console.error(error);
    }
};

async function authenticateUser(email: string, password: string) {
    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        // User successfully authenticated
        const user = userCredential.user;
        
        // You can return user details or a custom response as needed
        return {
            uid: user.uid,
            email: user.email,
            displayName: user.displayName,
            token: await user.getIdToken() // Get the Firebase ID token if required
        };
    } catch (error: any) {
        // Handle errors
        switch (error.code) {
            case 'auth/invalid-email':
                console.error('Invalid email format');
                break;
            case 'auth/user-disabled':
                console.error('User account is disabled');
                break;
            case 'auth/user-not-found':
                console.error('User not found');
                break;
            case 'auth/wrong-password':
                console.error('Incorrect password');
                break;
            default:
                console.error('An error occurred:', error.message);
        }
        throw error; // Optionally rethrow the error to handle it elsewhere
    }
}

export const userService = {
    getMasterAdmin,
    authenticateUser,
    getCurrUser
}

