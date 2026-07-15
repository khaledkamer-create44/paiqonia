const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcryptjs");
const db = new PrismaClient();

async function main() {
  // إنشاء المتن الأساسي
  const matn = await db.matn.upsert({
    where: { slug: "al-baiquniyyah" },
    update: {},
    create: { name: "البيقونية", slug: "al-baiquniyyah" },
  });

  // إنشاء حساب الأدمن الأول — غيّر البريد وكلمة السر بعد أول دخول
  const adminEmail = "admin@baiquniyyah.local";
  const existingAdmin = await db.user.findUnique({ where: { email: adminEmail } });
  if (!existingAdmin) {
    const passwordHash = await bcrypt.hash("ChangeMe123!", 10);
    await db.user.create({
      data: {
        name: "المدير العام",
        email: adminEmail,
        passwordHash,
        role: "ADMIN",
      },
    });
    console.log(`تم إنشاء حساب الأدمن: ${adminEmail} / ChangeMe123!  — غيّر كلمة السر فورًا`);
  }

  console.log("تم إعداد المتن:", matn.name);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => db.$disconnect());
