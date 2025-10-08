import { authEndpoints } from '@/constants/api';

/**
 * Sign in with email and password
 */
export async function signInWithEmail(email: string, password: string) {
  try {
    const response = await fetch(authEndpoints.signInEmail, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.error || 'Error al iniciar sesión');
    }

    return {
      success: true,
      message: result.message,
      user: result.user,
    };
  } catch (error) {
    console.error('Error signing in:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Error al iniciar sesión',
    };
  }
}

/**
 * Sign up with OTP - Send verification code
 */
export async function signUpWithOTP(
  email: string,
  firstName: string,
  lastName: string,
  companyName?: string,
  phone?: string
) {
  try {
    const response = await fetch(authEndpoints.signUpOTP, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        firstName,
        lastName,
        companyName,
        phone,
      }),
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.error || 'Error al registrar usuario');
    }

    return {
      success: true,
      message: result.message,
    };
  } catch (error) {
    console.error('Error signing up:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Error al registrar usuario',
    };
  }
}

/**
 * Verify OTP code
 */
export async function verifyOTPCode(email: string, token: string) {
  try {
    const response = await fetch(authEndpoints.verifyOTP, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, token }),
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.error || 'Código OTP inválido');
    }

    return {
      success: true,
      message: result.message,
      data: result.data,
    };
  } catch (error) {
    console.error('Error verifying OTP:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Código OTP inválido',
    };
  }
}

/**
 * Sign in with Google
 */
export async function signInWithGoogle() {
  try {
    const response = await fetch(authEndpoints.signInGoogle, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.error || 'Error al iniciar sesión con Google');
    }

    // Redirect to Google OAuth URL
    if (result.url) {
      window.location.href = result.url;
    }

    return {
      success: true,
      url: result.url,
      data: result.data,
    };
  } catch (error) {
    console.error('Error signing in with Google:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Error al iniciar sesión con Google',
    };
  }
}

/**
 * Sign out current user
 */
export async function signOut() {
  try {
    const response = await fetch(authEndpoints.signOut, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.error || 'Error al cerrar sesión');
    }

    return {
      success: true,
      message: result.message,
    };
  } catch (error) {
    console.error('Error signing out:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Error al cerrar sesión',
    };
  }
}

/**
 * Get current session
 */
export async function getSession() {
  try {
    const response = await fetch(authEndpoints.getSession, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      cache: 'no-store',
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.error || 'Error al obtener sesión');
    }

    return {
      success: true,
      session: result.session,
      user: result.user,
    };
  } catch (error) {
    console.error('Error getting session:', error);
    return {
      success: false,
      session: null,
      user: null,
      error: error instanceof Error ? error.message : 'Error al obtener sesión',
    };
  }
}
