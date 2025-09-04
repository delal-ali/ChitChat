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
export async function POST(req) {
  try {
    const authHeader = req.headers.get('authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json({ message: 'Authentication required' }, { status: 401 });
    }
    const token = authHeader.split(' ')[1];
    const decoded = jwt.verify(token, JWT_SECRET);

    const { toUsername, content } = await req.json();
    if (!toUsername || !content) {
      return NextResponse.json({ message: 'Username and content required' }, { status: 400 });
    }

    const receiver = await prisma.user.findUnique({ where: { username: toUsername } });
    if (!receiver) {
      return NextResponse.json({ message: 'User not found' }, { status: 404 });
    }

    const message = await prisma.message.create({
      data: {
        senderId: decoded.userId,
        receiverId: receiver.id,
        content,
      },
      include: {
        sender: { select: { username: true } },
        receiver: { select: { username: true } },
      },
    });

    return NextResponse.json(message, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: 'Server error' }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}
