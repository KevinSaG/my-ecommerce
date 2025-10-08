import { createClient } from '@/lib/supabase/server';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const supabase = await createClient();

    // 1. Obtener usuario autenticado
    const { data, error } = await supabase.auth.getUser();

    if (error || !data.user) {
      return NextResponse.json(
        { success: false, error: error?.message || 'No autenticado' },
        { status: 401 }
      );
    }

    const authUser = data.user;

    // 2. Obtener rol desde public.users
    const { data: userData, error: userError } = await supabase
      .from('users')
      .select('id, email, role, phone, is_active')
      .eq('id', authUser.id)
      .single();

    if (userError) {
      console.error('Error fetching user data:', userError);
    }

    // 3. Obtener perfil desde public.user_profiles
    const { data: profileData, error: profileError } = await supabase
      .from('user_profiles')
      .select('*')
      .eq('user_id', authUser.id)
      .single();

    if (profileError) {
      console.error('Error fetching profile:', profileError);
    }

    // 4. Retornar todo junto
    return NextResponse.json({
      success: true,
      user: {
        user: userData || { id: authUser.id, email: authUser.email, role: 'customer' },
        profile: profileData || null,
        authUser: authUser,
      }
    });
  } catch (error) {
    console.error('Unexpected error:', error);
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    );
  }
}
