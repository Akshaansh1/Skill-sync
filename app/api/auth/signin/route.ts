import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { generateToken } from '@/lib/jwt';

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { email, password } = body;

        const user = await prisma.user.findUnique({ where: { email } });
        if (!user || !user.password) {
        return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
    }

    const token = generateToken({ id: user.id, email: user.email });

    return NextResponse.json({ token, user: { id: user.id, email: user.email, name: user.name } });
    } 
    
    catch (err) {
    return NextResponse.json({ error: 'Signin failed' }, { status: 500 });
    }
}
