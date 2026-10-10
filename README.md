# বাজার দর | Bazar Dor

বাংলাদেশের নিত্যপ্রয়োজনীয় পণ্যের বর্তমান বাজারদর, দামের ওঠানামা এবং বিভিন্ন এলাকার বাজারভিত্তিক মূল্য এক জায়গায় দেখার ওয়েব অ্যাপ।

## প্রধান সুবিধা

- নির্ধারিত Bazar Dor API থেকে পণ্য ও ক্যাটাগরির তথ্য লোড।
- দাম বাড়া-কমার তালিকা, ক্যাটাগরি ফিল্টার এবং সংখ্যাভিত্তিক মূল্য সাজানো।
- পণ্যের বিস্তারিত, সর্বনিম্ন/সর্বোচ্চ/গড় মূল্য এবং বাজারভিত্তিক দামের তুলনা।
- Better Auth দিয়ে ইমেল-পাসওয়ার্ড নিবন্ধন, সাইন ইন এবং সেশন ব্যবস্থাপনা।
- Google ও GitHub OAuth, শর্তসাপেক্ষে OAuth credentials সেট করলে।
- লগইন-সুরক্ষিত পণ্যের বিস্তারিত ও প্রোফাইল পেজ।
- প্রোফাইলের নাম পরিবর্তন, প্রতিক্রিয়াশীল লোডিং skeleton এবং toast notification।
- ছোট স্ক্রিনসহ মোবাইল, ট্যাবলেট ও ডেস্কটপে ব্যবহারযোগ্য বিন্যাস।

## প্রযুক্তি

- Next.js App Router এবং TypeScript
- React 19
- Tailwind CSS 4
- Better Auth
- SQLite (স্থানীয় উন্নয়ন) অথবা PostgreSQL (স্থায়ী deployment)
- React Hot Toast
- Bazar Dor API

## চালু করা

```bash
npm install
Copy-Item .env.example .env.local
# Replace BETTER_AUTH_SECRET with a fresh random secret before running.
npm run auth:migrate
npm run dev
```

`http://localhost:3000` খুলুন। Better Auth-এর schema তৈরি করতে migration চালানো জরুরি। SQLite দিয়ে স্থানীয়ভাবে শুরু হয়; PostgreSQL ব্যবহার করতে `DATABASE_URL` দিন এবং migration চালান।

PowerShell-এ random secret তৈরি করুন:

```powershell
node -e "console.log(require('node:crypto').randomBytes(32).toString('base64'))"
```

## Environment variables

| Variable | ব্যবহার |
| --- | --- |
| `BETTER_AUTH_SECRET` | Better Auth session/signing secret; deployment-এ অবশ্যই শক্তিশালী random secret দিন |
| `BETTER_AUTH_URL` | অ্যাপের মূল URL; যেমন `http://localhost:3000` |
| `NEXT_PUBLIC_APP_URL` | ঐচ্ছিক public app URL |
| `DATABASE_URL` | স্থানীয় কাজে ঐচ্ছিক; Vercel/serverless deployment-এ persistent PostgreSQL connection string আবশ্যক |
| `BETTER_AUTH_DB_PATH` | ঐচ্ছিক SQLite database path |
| `GOOGLE_CLIENT_ID` / `GOOGLE_CLIENT_SECRET` | ঐচ্ছিক Google OAuth credentials |
| `GITHUB_CLIENT_ID` / `GITHUB_CLIENT_SECRET` | ঐচ্ছিক GitHub OAuth credentials |

সোশ্যাল সাইন-ইন চালু করতে OAuth provider console-এ callback URL হিসেবে
`<BETTER_AUTH_URL>/api/auth/callback/google` এবং
`<BETTER_AUTH_URL>/api/auth/callback/github` যোগ করুন। সংশ্লিষ্ট credentials না দিলে email/password authentication চালু থাকবে, কিন্তু social provider সক্রিয় হবে না।

Vercel বা অন্য serverless deployment-এ local SQLite filesystem স্থায়ী নয়—সেখানে managed PostgreSQL-সহ `DATABASE_URL` configure করুন। Production environment variables যোগ করার পর একই `DATABASE_URL` দিয়ে `npm run auth:migrate` একবার চালিয়ে Better Auth-এর tables তৈরি করুন। Deployment domain-এ `BETTER_AUTH_URL`, `NEXT_PUBLIC_APP_URL`, `BETTER_AUTH_SECRET` এবং database schema migration ঠিক না থাকলে auth/deep-link flow কাজ করবে না। লোকাল SQLite-এ তৈরি user production PostgreSQL-এ স্বয়ংক্রিয়ভাবে থাকবে না; production-এ নতুন account তৈরি করুন।

## যাচাই

```bash
npm run lint
npm run build
```

Deployment-এর আগে `/`, `/category/chal`, `/product/sorno-machi-chal`, `/signin`, `/signup`, `/profile` এবং `/profile/update` যাচাই করুন। Product details login-প্রয়োজনীয়; লগইনের পর আগের product URL-এ ফেরত যাবে।
