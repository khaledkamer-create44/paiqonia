# منصة البيقونية

منصة تعلّم متن البيقونية في مصطلح الحديث — مبنية بحيث تتوسع لاحقًا لمتون أخرى.

## الحزمة التقنية

- **Next.js 14** (App Router) — فرونت إند وباك إند في مشروع واحد
- **PostgreSQL + Prisma** — قاعدة البيانات
- **NextAuth (Auth.js)** — تسجيل الدخول (بريد إلكتروني + كلمة سر)
- **3 أدوار:** ADMIN (أدمن عام) / SUPERVISOR (مشرف دفعة) / STUDENT (طالب)

## هيكل قاعدة البيانات (ملخص)

- `Matn` — المتن (البيقونية الآن، وقابل لإضافة متون أخرى مستقبلًا)
- `Cohort` — الدفعة، ولها كود دعوة فريد (`inviteCode`) يوزّعه الأدمن
- `User` — المستخدم بدوره (أدمن / مشرف / طالب) وربطه بدفعة
- `ChainLink` — كل "حلقة" في سلسلة التعلّم (فيديو، ملخص، اختبار...) لها موعد فتح (`unlockAt`)
- `Progress` — تتبع إكمال الطالب لكل حلقة

## التشغيل محليًا

```bash
npm install
cp .env.example .env
# عدّل DATABASE_URL و NEXTAUTH_SECRET في .env

npx prisma db push     # إنشاء الجداول في القاعدة
npm run db:seed        # إنشاء المتن الأساسي وحساب أدمن أول

npm run dev
```

هيفتح على `http://localhost:3000`. حساب الأدمن الافتراضي:
`admin@baiquniyyah.local` / `ChangeMe123!` — **غيّر كلمة السر فور أول دخول.**

## رفع المشروع على GitHub

```bash
git init
git add .
git commit -m "البداية: منصة البيقونية"
git branch -M main
git remote add origin https://github.com/USERNAME/baiquniyyah-platform.git
git push -u origin main
```

تأكد إن `.env` مش متضاف (موجود في `.gitignore` تلقائيًا مع Next.js).

## النشر (استضافة)

المشروع شغال بنفس الشكل على أي من المنصات دي، لازم بس قاعدة بيانات PostgreSQL حقيقية (مش SQLite):

### Vercel + قاعدة بيانات خارجية (مثل Neon أو Supabase — مجانيتين)
1. اربط حساب GitHub بـ Vercel واستورد الريبو
2. أضف `DATABASE_URL` و `NEXTAUTH_SECRET` و `NEXTAUTH_URL` في Environment Variables
3. Vercel هيبني وينشر تلقائيًا مع كل push

### Render أو Railway (فيهم PostgreSQL مدمج)
1. أنشئ قاعدة بيانات PostgreSQL من لوحة التحكم، وانسخ رابط الاتصال
2. أنشئ Web Service واربطه بالريبو على GitHub
3. أضف نفس متغيرات البيئة، والمنصة هتشغّل `npm run build` و `npm start` تلقائيًا

بعد أول نشر، شغّل مرة واحدة:
```bash
npx prisma db push
npm run db:seed
```
(في Render/Railway ده بيتعمل من الـ Shell المدمج في لوحة التحكم)

## الخطوات الجاية المقترحة

- صفحة تسجيل دخول/تسجيل للمشرف لإدارة دفعته (إضافة حلقات، ضبط مواعيد الفتح)
- ربط كل نوع حلقة (`LinkType`) بالأداة الفعلية عندك (رابط الفيديو، رابط أداة الحفظ...)
- لوحة تقدّم تفصيلية للمشرف يشوف فيها موضع كل طالب في السلسلة
- (اختياري) صفحة هبوط عامة تُبنى فوق `landing.html` اللي اتفقنا عليه، كمدخل تسويقي قبل تسجيل الدخول
