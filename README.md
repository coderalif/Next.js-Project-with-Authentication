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
- MongoDB Atlas বা local MongoDB-তে Better Auth data
- React Hot Toast
- Bazar Dor API

## চালু করা

```bash
npm install
Copy-Item .env.example .env.local
# Set BETTER_AUTH_SECRET and MONGODB_URI in .env.local before running.
npm run dev
```

`http://localhost:3000` খুলুন। Better Auth প্রথম signup/sign-in request-এ MongoDB-তে প্রয়োজনীয় collections স্বয়ংক্রিয়ভাবে তৈরি করবে; আলাদা schema migration দরকার নেই।

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
| `MONGODB_URI` | MongoDB Atlas বা local MongoDB connection string |
| `MONGODB_DB_NAME` | MongoDB database name; default `bazar_dor` |
| `GOOGLE_CLIENT_ID` / `GOOGLE_CLIENT_SECRET` | ঐচ্ছিক Google OAuth credentials |
| `GITHUB_CLIENT_ID` / `GITHUB_CLIENT_SECRET` | ঐচ্ছিক GitHub OAuth credentials |

সোশ্যাল সাইন-ইন চালু করতে OAuth provider console-এ callback URL হিসেবে
`<BETTER_AUTH_URL>/api/auth/callback/google` এবং
`<BETTER_AUTH_URL>/api/auth/callback/github` যোগ করুন। সংশ্লিষ্ট credentials না দিলে email/password authentication চালু থাকবে, কিন্তু social provider সক্রিয় হবে না।

Vercel বা অন্য serverless deployment-এ MongoDB Atlas-সহ managed MongoDB ব্যবহার করুন এবং deployment environment-এ `MONGODB_URI`, `MONGODB_DB_NAME`, `BETTER_AUTH_URL`, `NEXT_PUBLIC_APP_URL` ও নতুন random `BETTER_AUTH_SECRET` দিন। Atlas Network Access-এ deployment platform-এর outbound IP allow করুন এবং database user-কে শুধু প্রয়োজনীয় database-এ read/write access দিন। আগে SQLite-এ তৈরি user MongoDB-তে স্বয়ংক্রিয়ভাবে থাকবে না; MongoDB-তে নতুন account তৈরি করতে হবে।

## যাচাই

```bash
npm run lint
npm run build
```

Deployment-এর আগে `/`, `/category/chal`, `/product/sorno-machi-chal`, `/signin`, `/signup`, `/profile` এবং `/profile/update` যাচাই করুন। Product details login-প্রয়োজনীয়; লগইনের পর আগের product URL-এ ফেরত যাবে।
