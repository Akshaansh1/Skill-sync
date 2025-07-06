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

        // For now, return dummy projects data
        // In a real application, you would fetch projects from the database
        const projects = [
            {
                id: 1,
                title: 'AI-Powered Resume Builder',
                description: 'Create intelligent resumes using machine learning to optimize for ATS systems',
                skills: ['React', 'Python', 'Machine Learning', 'OpenAI'],
                difficulty: 'Intermediate',
                domain: 'AI',
                collaborators: 8,
                owner: { name: 'Sarah Chen', avatar: 'SC' },
                featured: true
            },
            {
                id: 2,
                title: 'Blockchain Voting System',
                description: 'Decentralized voting platform ensuring transparency and security',
                skills: ['Solidity', 'Web3', 'React', 'Ethereum'],
                difficulty: 'Expert',
                domain: 'Blockchain',
                collaborators: 12,
                owner: { name: 'Alex Rivera', avatar: 'AR' }
            },
            {
                id: 3,
                title: 'Social Media Analytics Dashboard',
                description: 'Real-time analytics for social media performance tracking',
                skills: ['React', 'D3.js', 'Node.js', 'MongoDB'],
                difficulty: 'Intermediate',
                domain: 'Web',
                collaborators: 6,
                owner: { name: 'Emily Johnson', avatar: 'EJ' },
                featured: true
            },
            {
                id: 4,
                title: 'E-learning Platform',
                description: 'Interactive learning platform with video streaming and assessments',
                skills: ['Next.js', 'TypeScript', 'PostgreSQL', 'AWS'],
                difficulty: 'Expert',
                domain: 'Web',
                collaborators: 15,
                owner: { name: 'Michael Brown', avatar: 'MB' }
            },
            {
                id: 5,
                title: 'IoT Smart Home Controller',
                description: 'Control and monitor smart home devices through a unified interface',
                skills: ['React Native', 'IoT', 'Python', 'MQTT'],
                difficulty: 'Intermediate',
                domain: 'IoT',
                collaborators: 9,
                owner: { name: 'Lisa Wang', avatar: 'LW' }
            },
            {
                id: 6,
                title: 'Fitness Tracking App',
                description: 'Mobile app for tracking workouts and nutrition with AI recommendations',
                skills: ['React Native', 'Machine Learning', 'Firebase'],
                difficulty: 'Beginner',
                domain: 'Mobile',
                collaborators: 4,
                owner: { name: 'David Kim', avatar: 'DK' },
                featured: true
            }
        ];

        return NextResponse.json({ projects });
    } catch (error) {
        console.error('Error fetching projects:', error);
        return NextResponse.json({ error: 'Failed to fetch projects' }, { status: 500 });
    }
}

export async function POST(req: NextRequest) {
    try {
        const authHeader = req.headers.get('authorization');
        const token = authHeader?.replace('Bearer ', '');

        if (!token) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const { id } = JSON.parse(atob(token.split('.')[1]));
        const body = await req.json();
        const { title, description, skills, difficulty, domain } = body;

        // Validate required fields
        if (!title || !description || !skills || !difficulty || !domain) {
            return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
        }

        // In a real application, you would save the project to the database
        // For now, return a success response
        const newProject = {
            id: Date.now(),
            title,
            description,
            skills,
            difficulty,
            domain,
            collaborators: 1,
            owner: { name: 'You', avatar: 'YO' },
            featured: false
        };

        return NextResponse.json({ project: newProject }, { status: 201 });
    } catch (error) {
        console.error('Error creating project:', error);
        return NextResponse.json({ error: 'Failed to create project' }, { status: 500 });
    }
} 