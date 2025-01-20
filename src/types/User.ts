export interface AppUser {
    id: string;
    name: string;
    firebaseAuthUid: string;
    role: string;
    address: string;
    city: string;
    userMsgs: UserMsg[];
    email: string;
    authToken: string;
    selectedLayout?: string;
}

export interface UserMsg {
    id?: string;
    text: string;
    timestamp: Date;
}

export interface UserCredential {
    email: string;
    password: string;
}