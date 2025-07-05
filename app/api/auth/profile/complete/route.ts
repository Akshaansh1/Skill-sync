import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { writeFile } from 'fs/promises';
import path from 'path';
import { generateToken } from '@/lib/jwt';

export async function POST(req: NextRequest) {
  const data = await req.formData();

  const authHeader = req.headers.get('authorization');
  const token = authHeader?.replace('Bearer ', '');

  if (!token) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { id, email, name } = JSON.parse(atob(token.split('.')[1]));

  const fullName = data.get('fullName') as string;
  const skills = JSON.parse(data.get('skillSet') as string);
  const jobRoles = JSON.parse(data.get('interestedJobRoles') as string);
  const bio = data.get('shortBio') as string;
  const resume = data.get('resume') as File;

  let resumeUrl = '';

  if (resume && resume.name) {
    const bytes = await resume.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const uploadPath = path.join(process.cwd(), 'public', 'uploads', resume.name);
    await writeFile(uploadPath, buffer);
    resumeUrl = `/uploads/${resume.name}`;
  }

  const updated = await prisma.user.update({
    where: { id },
    data: {
      name: fullName,
      skills,
      jobInterests: jobRoles,
      bio,
      resumeUrl,
      isProfileCompleted: true,
    },
  });

  // Generate new token with updated profile status
  const newToken = generateToken({
    id: updated.id,
    email: updated.email,
    name: updated.name,
    isProfileCompleted: true
  });

  return NextResponse.json({
    message: 'Profile updated',
    user: updated,
    token: newToken
  });
}
