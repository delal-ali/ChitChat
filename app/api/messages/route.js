import { PrismaClient } from '@prisma/client';
import jwt from 'jsonwebtoken';
import { NextResponse } from 'next/server';
const prisma = new PrismaClient();
const JWT_SECRET = process.env.JWT_SECRET || 'supersecretkey123';
export async function GET(req) {
try {
const authHeader = req.headers.get('authorization');
if (!authHeader || !authHeader.startsWith('Bearer ')) {
return NextResponse.json({ message: 'Authentication required' }, { status: 401 });
}
const token = authHeader.split(' ')[1];
const decoded = jwt.verify(token, JWT_SECRET);
const messages = await prisma.message.findMany({
where: {
OR: [
{ senderId: decoded.userId },
{ receiverId: decoded.userId },
],
},
include: {
sender: { select: { username: true } },
receiver: { select: { username: true } },
},
orderBy: { timestamp: 'asc' },
});
return NextResponse.json(messages, { status: 200 });
} catch (error) {
return NextResponse.json({ message: 'Server error' }, { status: 500 });
}
}
