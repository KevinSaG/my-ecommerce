import { createClient } from '@/lib/supabase/server';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { email, firstName, lastName, companyName, phone } = await request.json();

    if (!email) {
      return NextResponse.json(
        { error: 'Email es requerido' },
        { status: 400 }
      );
    }

    const supabase = await createClient();

    // Send OTP for sign up
    const { data, error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        shouldCreateUser: true,
        data: {
          first_name: firstName,
          last_name: lastName,
          company_name: companyName,
          phone: phone,
        },
      },
    });

    if (error) {
      return NextResponse.json(
        { error: error.message },
        { status: 400 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Código de verificación enviado a tu email',
    });
  } catch (error) {
    console.error('Sign up OTP error:', error);
    return NextResponse.json(
      { error: 'Error al enviar código de verificación' },
      { status: 500 }
    );
  }
}

