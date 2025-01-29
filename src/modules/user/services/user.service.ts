import { AppUser } from '@/types/User';
import { firebase } from '../../../firebase/firebase'; // Assuming you've exported db from firebase.js
import { storageService } from '@/modules/common/services/web-storage.service';
import { MediaState } from '../../../types/Lobby';
import { DEFAULT_MEDIA_STATE } from '../../../config/media.config';
const { ref, get, db, signInWithEmailAndPassword, auth, update } = firebase

const usersRef = ref(db, 'users');
async function getMasterAdmin() {
    // get admin from firebase db
    try {
        const snapshot = await get(usersRef);
        if (snapshot.exists()) {
            const users = snapshot.val(); // Return the data as an object if you want to use it elsewhere in your application.
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
            const users = snapshot.val(); // Return the data as an object if you want to use it elsewhere in your application.
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

// Update user

async function updateUser(newUser: Partial<AppUser>) {
    if (!newUser.id) {
        console.error("Error: 'id' is required to update a user.");
        return;
    }

    try {
        // Find the user key by their ID
        const userKey = await _findUserKeyBy("id", newUser.id);

        if (!userKey) {
            console.error(`User with ID ${newUser.id} not found.`);
            return;
        }

        // Reference to the specific user
        const userRef = ref(db, `users/${userKey}`);

        // Update the user in the database
        await update(userRef, newUser);

        console.log(`User with ID ${newUser.id} updated successfully.`);
    } catch (error: any) {
        console.error(`Error updating user with ID ${newUser.id}:`, error.message);
    }
}

async function getUserByAuthId(authId: string) {
    const userKey = await _findUserKeyBy("authToken", authId);

    if (!userKey) {
        console.error(`User with authId ${authId} not found.`);
        return;
    }

    // Reference to the specific user
    const userRef = ref(db, `users/${userKey}`);
    try {
        const snapshot = await get(userRef);
        storageService.save('loggedInUser', snapshot.val())
        return snapshot.val();
    } catch (err: any) {
        console.error(`Error fetching user with authId ${authId}:`, err);
        return null;
    }

}


async function _findUserKeyBy(searchKey: string, fieldVal: string): Promise<string | null> {
    try {
        const usersRef = ref(db, "users");
        const snapshot = await get(usersRef);

        if (!snapshot.exists()) {
            console.error("No users found in the database.");
            return null;
        }

        let userKey: string | null = null;

        // Loop through the users to find the matching `id`
        snapshot.forEach((childSnapshot) => {
            const user = childSnapshot.val();
            if (user[searchKey] === fieldVal) {
                userKey = childSnapshot.key; // Get the user's key (e.g., `1`, `2`)
            }
        });

        return userKey;
    } catch (error: any) {
        console.error(`Error finding user by ${searchKey} - ${fieldVal}:`, error.message);
        return null;
    }
}

async function getLoggedInUser() {
    const loggedInUser = await storageService.load('loggedInUser') as AppUser;
    if (!loggedInUser) {
        console.log('No logged in user found');
        return null;
    }
    
    // Initialize media state if needed
    const savedMediaState = await loadMediaState();
    if (!savedMediaState) {
        await saveMediaState(DEFAULT_MEDIA_STATE);
    }

    return loggedInUser;
}

async function saveMediaState(mediaState: MediaState) {
    await storageService.save('mediaState', mediaState);
}

async function loadMediaState(): Promise<MediaState | undefined> {
    const mediaState = await storageService.load<MediaState>('mediaState');
    return mediaState;
}

async function logout() {
    await storageService.remove('loggedInUser');
    await storageService.remove('mediaState');
    return null;
}

export const userService = {
    getMasterAdmin,
    authenticateUser,
    getCurrUser,
    getUserByAuthId,
    updateUser,
    getLoggedInUser,
    logout,
    saveMediaState,
    loadMediaState
}

