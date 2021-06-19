import React, { createContext, ReactNode, useContext } from 'react';

import * as Google from 'expo-google-app-auth';
import * as Apple from 'expo-apple-authentication';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface AuthProviderProps {
  children: ReactNode;
}

interface User {
  id: string;
  name: string;
  email: string;
  photo?: string; 
}

interface IAuthContextData {
  user: User;
  signInWithGoogle(): Promise<void>;
  signInWithApple(): Promise<void>;
  signOut(): Promise<void>;
  userLoading: boolean;
}

export const AuthContext = createContext({} as IAuthContextData);

function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = React.useState<User>({} as User);
  const [userLoading, setUserLoading] = React.useState(true);

  const userStoredKey = '@gofinances:user';

  async function signInWithGoogle() {
    try {
      const result = await Google.logInAsync({
        iosClientId: '397258250764-vpcb982pvf4lcekokaj6ebhvjsg03h4t.apps.googleusercontent.com',
        androidClientId: '397258250764-vhr7pj3vetlitf1jm79dqe2aitrd8hkf.apps.googleusercontent.com',
        scopes: ['profile', 'email']
      });

      if(result.type === 'success'){
        const userLogged = {
          id: String(result.user.id),
          email: result.user.email!,
          name: result.user.name!,
          photo: result.user.photoUrl!
        }
        
        setUser(userLogged);
        await AsyncStorage.setItem(userStoredKey, JSON.stringify(userLogged));

      }


    }catch(error) {
      throw new Error(error);
    }
  }

  async function signInWithApple() {
    try {
      const credential = await Apple.signInAsync({
        requestedScopes: [
          Apple.AppleAuthenticationScope.FULL_NAME,
          Apple.AppleAuthenticationScope.EMAIL,
        ]
      });

      if(credential) {
        const name = credential.fullName?.givenName!;
        const userLogged = {
          id: String(credential.user),
          email: credential.email!,
          name: name,
          photo: `https://ui-avatars.com/api/?name=${name}&length=1`
        }
        setUser(userLogged);
        await AsyncStorage.setItem(userStoredKey, JSON.stringify(userLogged));
      }
    } catch (error) {
      throw new Error(error);
    }
  }

  async function signOut() {
    setUser({} as User);
    await AsyncStorage.removeItem(userStoredKey);
  }

  React.useEffect(() => {
    async function loadUserStorageDate(): Promise<void> {
      const userStored = await AsyncStorage.getItem(userStoredKey);

      if(userStored) {
        const userLogged = JSON.parse(userStored) as User;
        setUser(userLogged);
      }

      setUserLoading(false);
    }

    loadUserStorageDate()
  }, [])

  return (
    <AuthContext.Provider value={{
      user,
      signInWithGoogle,
      signInWithApple,
      signOut,
      userLoading
    }}>
      { children }
    </AuthContext.Provider>
  )
}

function useAuth() {
  const context = useContext(AuthContext);

  return context;
}

export { AuthProvider, useAuth } 