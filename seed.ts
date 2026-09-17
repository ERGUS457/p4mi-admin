import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  const email = "admin@p4mi.id";
  const existing = await prisma.user.findUnique({ where: { email } });
  if (!existing) {
    const password = await bcrypt.hash("admin123", 10);
    await prisma.user.create({
      data: {
        name: "Administrator",
        email,
        password,
        role: "SUPER_ADMIN",
      },
    });
    console.log("✅ Admin user created (email: admin@p4mi.id | password: admin123)");
  } else {
    console.log("⚠ Admin user already exists");
  }
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
