import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(req: NextRequest) {
    try {
        const authHeader = req.headers.get('authorization');
        const token = authHeader?.replace('Bearer ', '');

        if (!token) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const { id } = JSON.parse(atob(token.split('.')[1]));

        const user = await prisma.user.findUnique({
            where: { id },
            select: {
                skills: true,
                jobInterests: true
            }
        });

        if (!user) {
            return NextResponse.json({ error: 'User not found' }, { status: 404 });
        }

        // Convert skills array to Skill objects with default values
        const skills = user.skills.map((skill, index) => ({
            id: index + 1,
            name: skill,
            level: 'Beginner', // Default level
            category: 'General', // Default category
            score: 50 // Default score
        }));

        return NextResponse.json({ skills });
    } catch (error) {
        console.error('Error fetching skills:', error);
        return NextResponse.json({ error: 'Failed to fetch skills' }, { status: 500 });
    }
} 