import { renderHook, act } from '@testing-library/react-hooks';
import { mocked } from 'ts-jest/utils';
import { AuthProvider, useAuth } from './auth';
import { logInAsync } from 'expo-google-app-auth';

jest.mock('expo-google-app-auth');

describe('Auth Hook', () => {
  it('should be able to sign in with a Google account', async () => {
    const googleMocked = mocked(logInAsync as any);
    googleMocked.mockReturnValueOnce({
      type: 'success',
      user: {
        id: 'any_id',
        email: 'saron.ph@gmail.com',
        name: 'Saron',
        photo: 'any_photo.png'
      }
    });

    const { result } = renderHook(() => useAuth(), {
      wrapper: AuthProvider
    });

    await act(() => result.current.signInWithGoogle());

    expect(result.current.user.email).toBe('saron.ph@gmail.com');
  });

  it('user should not connect if cancel authentication with google', async () => {
    const googleMocked = mocked(logInAsync as any);
    googleMocked.mockReturnValue({
      type: 'cancel',
    });

    const { result } = renderHook(() => useAuth(), {
      wrapper: AuthProvider
    });

    await act(() => result.current.signInWithGoogle());

    expect(result.current.user).not.toHaveProperty('id');
  })

  it('should be error signIn with google', async () => {
    const { result } = renderHook(() => useAuth(), {
      wrapper: AuthProvider
    });

    try {
      await act(() => result.current.signInWithGoogle()); 
    } catch (error) {
      expect(result.current.user).toEqual({});      
    }
  })
})