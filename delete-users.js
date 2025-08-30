const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
async function deleteUsers() {
try {
await prisma.message.deleteMany({
where: {
OR: [
{ sender: { email: 'test@example.com' } },
{ receiver: { email: 'test@example.com' } },
{ sender: { email: 'user2@example.com' } },
{ receiver: { email: 'user2@example.com' } },
],
},
});
console.log('Messages deleted');
await prisma.user.deleteMany({
where: {
OR: [
{ email: 'test@example.com' },
{ email: 'user2@example.com' },
],
},
});
console.log('Users temesgen and user2 deleted');
} catch (error) {
console.error('Error deleting users:', error);
} finally {
await prisma.();
}
}
deleteUsers();
