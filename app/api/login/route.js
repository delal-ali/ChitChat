import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { NextResponse } from 'next/server';
const prisma = new PrismaClient();
const JWT_SECRET = process.env.JWT_SECRET || 'supersecretkey123';
export async function POST(req) {
try {
const { email, password } = await req.json();
if (!email || !password) {
return NextResponse.json({ message: 'Email and password are required' }, { status: 400 });
}
const user = await prisma.user.findUnique({ where: { email } });
if (!user) {
return NextResponse.json({ message: 'Invalid credentials' }, { status: 401 });
}
const isValid = await bcrypt.compare(password, user.password);
if (!isValid) {
return NextResponse.json({ message: 'Invalid credentials' }, { status: 401 });
}
const token = jwt.sign({ userId: user.id, email: user.email, username: user.username }, JWT_SECRET, { expiresIn: '1h' });
return NextResponse.json(
{ message: 'Login successful', token, user: { id: user.id, username: user.username, email: user.email } },
{ status: 200 }
);
} catch (error) {
return NextResponse.json({ message: 'Server error' }, { status: 500 });
}
}
