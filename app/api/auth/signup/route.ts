import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';

export async function POST(request: Request) {
    try {
    const body = await request.json();
    const { email, password, name } = body;

    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
        return NextResponse.json({ error: 'User already exists' }, { status: 400 });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
        data: {
            email,
            name,
            password: hashedPassword,
        },
    });

    return NextResponse.json({ message: 'User created', user }, { status: 201 });
  } 
  
    catch (err) {
    return NextResponse.json({ error: 'Signup failed' }, { status: 500 });
  }
}
