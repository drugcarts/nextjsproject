import AdminUser from '@/models/AdminUser';
import Product from '@/models/Product';
import { adminAuthorization } from '../../../utils/middleware';
import { NextResponse } from 'next/server';
import connnectionToDatabase from '../../../lib/mongodb';

export async function GET() {
  const { success, message } = await adminAuthorization();

  if (!success) {
    return NextResponse.json({ error: message }, { status: 401 });
  }

  await connnectionToDatabase();

  const allUsers = await AdminUser.find({});
  const filteredUsers = allUsers.filter((adminUser) => adminUser.role !== 'admin');

  const usersWithProductCount = await Promise.all(
    filteredUsers.map(async (user) => {
      const productCount = await Product.countDocuments({ userid: user.id });
      return {
        userId: user?.id,
        username: user.username,
        productCount,
      };
    })
  );

  return NextResponse.json(usersWithProductCount, { status: 200 });
}
