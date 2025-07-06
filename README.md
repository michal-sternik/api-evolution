# My Next.js Internationalized App

A **Next.js** application leveraging **next-intl** for seamless localization. This professional-grade README will guide you through installation, setup, usage, and best practices.

---

## 🚀 Features

* **Next.js** (v14+) framework for optimized performance
* **next-intl** for declarative, JSON-based translations
* JSON translation files for **Korean**, **German**, **Hungarian**, **Russian**, **Polish**, **Sorani**, and more
* Simple folder structure: `messages.{locale}.json`
* Automatic locale detection and routing
* SSR and client-side rendering support
* Lightweight, zero-runtime dependency on translations

---

## 📦 Installation

1. **Clone** the repository:

   ```bash
   git clone https://github.com/your-org/your-app.git
   cd your-app
   ```

2. **Install** dependencies:

   ```bash
   npm install
   # or
   yarn install
   ```

3. **Start** the development server:

   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. Open your browser at `http://localhost:3000`.

---

## 🌐 Internationalization (i18n)

### Configuring `next-intl`

In `next.config.js`:

```js
module.exports = {
  i18n: {
    locales: ['en', 'ko', 'de', 'hu', 'ru', 'pl', 'ckb'],
    defaultLocale: 'en',
    localeDetection: true,
  },
};
```

### Loading Translations

Use the `useTranslations` hook in your components:

```tsx
'use client';

import {useTranslations} from 'next-intl';

export default function Header() {
  const t = useTranslations('Header');

  return <h1>{t('title')}</h1>;
}
```

And your JSON (`messages.de.json`):

```json
{
  "Header": {
    "title": "Leistungsbewertung von REST, GraphQL und gRPC"
  }
}
```

---

## 🛠️ Usage

* **Run** in development: `npm run dev`
* **Build** for production: `npm run build`
* **Start** production server: `npm start`

**Environment Variables** (if any):

```bash
# Example:
NEXT_PUBLIC_API_URL=https://api.example.com
```

---

## 🧪 Testing

Add unit and integration tests with your preferred framework (Jest, React Testing Library, etc.).

```bash
npm run test
# or
yarn test
```

---

## 🔧 Deployment

Deploy to Vercel for best compatibility:

1. Push to GitHub.
2. Import project in Vercel dashboard.
3. Vercel auto-detects Next.js and builds.

---

## 💡 Best Practices

* **Scope** translation keys by feature (e.g., `Header.title`).
* **Validate** translations with type-safe definitions (`next-intl.d.ts`).
* **Optimize** JSON size for performance.

---

## 📄 License

MIT © Mateusz Jakubowski
