# Registration Form — Technical Documentation

**Version:** 0.1.0  
**Last Updated:** 2026-06-07  
**Framework:** Next.js 16.2.7 (App Router)

---

## Table of Contents

1. [Project Overview](#1-project-overview)
2. [Technology Stack](#2-technology-stack)
3. [Architecture](#3-architecture)
4. [Directory Structure](#4-directory-structure)
5. [Frontend Deep Dive](#5-frontend-deep-dive)
6. [Backend Deep Dive](#6-backend-deep-dive)
7. [Validation Rules](#7-validation-rules)
8. [Data Storage](#8-data-storage)
9. [Security Notes](#9-security-notes)
10. [Build & Development](#10-build--development)
11. [Key Configuration Files](#11-key-configuration-files)
12. [Design System](#12-design-system)

---

## 1. Project Overview

The **Registration Form** is a Next.js web application designed to collect and store user registration data for Zanzibar government institutions. The system validates incoming registration requests against domain-specific rules (Tanzanian government email addresses, national phone number format) and persists submissions to a Markdown-formatted file for lightweight data storage.

**Primary Use Case:** Registering users affiliated with Zanzibar government institutions (`.go.tz` domain), enabling a simple submission pipeline without a traditional database backend.

**Key Characteristics:**
- Client-side and server-side form validation
- Duplicate detection across username, email, and phone fields
- Markdown-based persistence layer
- Responsive, accessible UI built with Tailwind CSS and Radix UI primitives

---

## 2. Technology Stack

### Core Framework

| Library | Version | Purpose |
|---------|---------|---------|
| **Next.js** | 16.2.7 | React framework with App Router, API routes, server-side rendering |
| **React** | 19.0.0 | UI library with hooks for state management |
| **React DOM** | 19.0.0 | DOM-specific rendering methods |
| **TypeScript** | 5.7.0 | Type safety across the codebase |

### Styling & UI

| Library | Version | Purpose |
|---------|---------|---------|
| **Tailwind CSS** | 3.4.17 | Utility-first CSS framework |
| **PostCSS** | 8.4.49 | CSS transformation pipeline |
| **Autoprefixer** | 10.4.20 | Vendor prefix injection |
| **tailwindcss-animate** | 1.0.7 | Animation utilities for Tailwind |
| **class-variance-authority** | 0.7.0 | Conditional class composition for components |
| **clsx** | 2.1.1 | Lightweight utility for conditional class names |
| **tailwind-merge** | 2.6.0 | Merges Tailwind class lists intelligently |

### UI Component Primitives

| Library | Version | Purpose |
|---------|---------|---------|
| **@radix-ui/react-slot** | 1.1.0 | Primitive for polymorphic "as child" component pattern |
| **@radix-ui/react-label** | 2.1.0 | Accessible label component |
| **lucide-react** | 0.462.0 | Icon library (consistent stroke-based icons) |

### Development Tools

| Library | Version | Purpose |
|---------|---------|---------|
| **ESLint** | 9.0.0 | Code linting |
| **eslint-config-next** | 16.2.7 | Next.js-specific ESLint configuration |
| **@types/node** | 22.0.0 | TypeScript definitions for Node.js |
| **@types/react** | 19.0.0 | TypeScript definitions for React |
| **@types/react-dom** | 19.0.0 | TypeScript definitions for React DOM |

---

## 3. Architecture

### App Router Structure

The application uses **Next.js App Router** (version 13+ paradigm), organizing routes as a file-system hierarchy under the `app/` directory.

```
┌─────────────────────────────────────────────────────────┐
│                     Client Browser                       │
└─────────────────────────┬───────────────────────────────┘
                          │ HTTP/S
┌─────────────────────────▼───────────────────────────────┐
│                    Next.js Server                        │
│  ┌─────────────────────────────────────────────────────┐│
│  │                 app/layout.tsx                       ││
│  │              (Root Layout + Metadata)                ││
│  └────────────────────────┬────────────────────────────┘│
│                           │                              │
│         ┌─────────────────┼─────────────────┐           │
│         ▼                 ▼                 ▼           │
│  ┌─────────────┐  ┌─────────────────┐  ┌─────────────┐ │
│  │ app/page.tsx│  │app/success/     │  │app/api/     │ │
│  │ (Client)    │  │page.tsx         │  │register/    │ │
│  │ Registration│  │(Client)         │  │route.ts     │ │
│  │ Form        │  │Success View     │  │(Server)     │ │
│  └─────────────┘  └─────────────────┘  └─────────────┘ │
│                                             │           │
│                                             ▼           │
│                                    ┌─────────────────┐  │
│                                    │ submissions.md  │  │
│                                    │ (File Storage)  │  │
│                                    └─────────────────┘  │
└─────────────────────────────────────────────────────────┘
```

### Component Classification

| Component | Type | Description |
|-----------|------|-------------|
| `app/layout.tsx` | Server Component | Root layout, metadata, HTML structure |
| `app/page.tsx` | Client Component (`"use client"`) | Registration form with state, validation, submission |
| `app/success/page.tsx` | Client Component (`"use client"`) | Post-registration success view |
| `app/api/register/route.ts` | Server Route Handler | REST API endpoint for form submission |
| `components/ui/*` | Client Components | Reusable UI primitives (Button, Input, Label) |

### Data Flow

1. **User Input:** User fills the registration form in the browser (client component)
2. **Client Validation:** On submit, client-side validation runs against defined rules
3. **API Request:** Valid form data is sent via `fetch()` POST to `/api/register`
4. **Server Validation:** API route re-validates all fields server-side
5. **Duplicate Check:** Server reads `submissions.md`, parses entries, checks for duplicates
6. **Persistence:** If validation passes and no duplicates found, entry is appended to `submissions.md`
7. **Response:** Server returns `{ success: true }` or `{ success: false, errors: [...] }`
8. **Navigation:** Client redirects to `/success` on success, displays errors on failure

---

## 4. Directory Structure

```
registration-form/
├── app/
│   ├── api/
│   │   └── register/
│   │       └── route.ts          # POST handler for registration
│   ├── globals.css               # Global styles + CSS variables + animations
│   ├── layout.tsx                # Root layout with metadata
│   ├── page.tsx                  # Registration form (client component)
│   └── success/
│       └── page.tsx              # Success confirmation page
├── components/
│   └── ui/
│       ├── button.tsx            # Button with variants and sizes
│       ├── input.tsx             # Styled input component
│       └── label.tsx             # Accessible label component
├── lib/
│   └── utils.ts                  # cn() utility for class merging
├── public/
│   └── logo_smz.webp             # App logo (Zanzibar branding)
├── submissions.md                # Data persistence (Markdown table)
├── TECHNICAL_DETAILS.md          # This documentation
├── next.config.ts                # Next.js configuration
├── package.json                  # Dependencies and scripts
├── postcss.config.mjs            # PostCSS configuration
├── tailwind.config.ts            # Tailwind CSS configuration
└── tsconfig.json                 # TypeScript configuration
```

---

## 5. Frontend Deep Dive

### Registration Page (`app/page.tsx`)

The registration page is a **client component** (`"use client"`) that handles all form interactions.

#### State Management

```typescript
const [formData, setFormData] = useState({
  fullName: "",
  username: "",
  email: "",
  phone: "",
  password: "",
  institution: "",
});

const [errors, setErrors] = useState<Record<string, string>>({});
const [errorMessage, setErrorMessage] = useState("");
const [isLoading, setIsLoading] = useState(false);
```

#### Form Fields

| Field | Type | Icon | Placeholder |
|-------|------|------|-------------|
| `fullName` | `text` | `User` | "Full Name" |
| `username` | `text` | `AtSign` | "Username" |
| `email` | `email` | `Mail` | "Email address" |
| `phone` | `tel` | `Phone` | "Phone number" |
| `password` | `text` (visible) | `Key` | "Password" |
| `institution` | `text` | `Building2` | "Institution" |

#### Client-Side Validation Rules

| Field | Rule | Error Message |
|-------|------|---------------|
| `fullName` | Required | "Full Name is required" |
| `username` | Required | "Username is required" |
| `email` | Required, must end with `.go.tz` | "Email must end with .go.tz" |
| `phone` | Required, match `^0\d{9}$` | "Phone must be 10 digits starting with 0" |
| `password` | Required, min 8 chars, 1 digit, 1 special char | "Password must be at least 8 characters with 1 number and 1 special character" |
| `institution` | Required | "Institution is required" |

#### Submission Flow

```typescript
const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  
  // 1. Validate all fields
  // 2. If errors exist, display them and abort
  // 3. Set isLoading = true
  // 4. POST to /api/register with JSON body
  // 5. On 200: router.push("/success")
  // 6. On error: display data.errors joined or "Registration failed"
  // 7. Set isLoading = false
};
```

#### UI/UX Details

- **Gradient Background:** `from-emerald-50 via-teal-50 to-cyan-100`
- **Card Design:** White background, `backdrop-blur-sm`, `rounded-2xl`, `shadow-2xl`
- **Top Accent Bar:** Gradient from `from-emerald-500 to-teal-500`
- **Logo:** `/logo_smz.webp` displayed at 80x80 pixels
- **Title:** "USER REGISTRATION" with gradient text styling
- **Icons:** Lucide React icons embedded inside each input field
- **Error States:** Red border on invalid inputs, red error text below field
- **Password Field:** `type="text"` for demo visibility, includes helper text "Password is visible for this demo"
- **Submit Button:** Gradient background, shadow, hover scale effect, shows `Loader2` spinner when `isLoading`
- **Footer:** "Registration System • Zanzibar"

### Success Page (`app/success/page.tsx`)

A minimal client component displaying post-registration confirmation.

**Elements:**
- `CheckCircle2` icon from Lucide React (green, 80x80)
- Heading: "Congratulations!"
- Subheading: "Registration successful"
- Link back to registration form with same gradient button styling
- Same card layout and logo as registration page

### Reusable UI Components (`components/ui/`)

#### Button (`button.tsx`)

Polymorphic button component using Radix UI Slot for `asChild` pattern.

```typescript
// Variants
const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors...",
  { variants: { variant: {...}, size: {...} } }
);
```

| Variant | Use Case |
|---------|----------|
| `default` | Primary actions (gradient emerald) |
| `destructive` | Destructive actions (red) |
| `outline` | Secondary actions (bordered) |
| `secondary` | Less prominent actions (gray) |
| `ghost` | Minimal actions (transparent hover) |
| `link` | Inline links |

| Size | Height/Padding |
|------|----------------|
| `default` | h-10 px-4 py-2 |
| `sm` | h-9 px-3 |
| `lg` | h-11 px-8 |
| `icon` | h-10 w-10 |

#### Input (`input.tsx`)

Styled HTML input extending `React.InputHTMLAttributes<HTMLInputElement>`.

```typescript
const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm...",
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
```

**Styling Features:**
- `ring-offset-background` focus ring
- `file:border-0 file:bg-transparent file:text-sm file:font-medium` for file input reset
- `placeholder:text-muted-foreground` for placeholder styling

#### Label (`label.tsx`)

Accessible label component using `@radix-ui/react-label`.

```typescript
const labelVariants = cva(
  "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
);
```

### Styling System

#### Tailwind Configuration (`tailwind.config.ts`)

Custom color palette matching shadcn/ui design tokens:

```typescript
colors: {
  border: "hsl(var(--border))",
  input: "hsl(var(--input))",
  ring: "hsl(var(--ring))",
  background: "hsl(var(--background))",
  foreground: "hsl(var(--foreground))",
  primary: {
    DEFAULT: "hsl(var(--primary))",         // Emerald green
    foreground: "hsl(var(--primary-foreground))",
  },
  // ... secondary, destructive, muted, accent, popover, card
}
```

#### Global CSS (`app/globals.css`)

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@keyframes fade-in {
  from { opacity: 0; transform: translateY(16px); }
  to { opacity: 1; transform: translateY(0); }
}

.animate-fade-in {
  animation: fade-in 0.7s ease-out forwards;
}
```

#### CSS Variables (shadcn Theme)

```css
:root {
  --background: 0 0% 100%;
  --foreground: 222.2 84% 4.9%;
  --primary: 142 76% 36%;          /* Emerald green */
  --primary-foreground: 210 40% 98%;
  --ring: 142 76% 36%;             /* Match primary */
  --radius: 0.5rem;
  /* ... */
}
```

---

## 6. Backend Deep Dive

### API Route (`app/api/register/route.ts`)

A **server-side** route handler that processes POST requests for registration submissions.

#### Request Handling

```typescript
export async function POST(request: Request) {
  // 1. Parse JSON body
  // 2. Validate using validateRegistration()
  // 3. Check duplicates using checkDuplicates()
  // 4. On failure: return { success: false, errors: [...] } with 400
  // 5. On success: append to submissions.md
  // 6. Return { success: true } with 200
  // 7. On server error: return 500 with error message
}
```

#### Data Interface

```typescript
interface RegistrationData {
  fullName: string;
  username: string;
  email: string;
  phone: string;
  password: string;
  institution: string;
}
```

#### Validation Functions

| Function | Purpose | Implementation |
|----------|---------|----------------|
| `validateRegistration(data)` | Master validator, runs all checks | Returns string array of errors |
| `validateEmail(email)` | Check `.go.tz` domain | `email.endsWith(".go.tz")` |
| `validatePhone(phone)` | Check 10 digits starting with 0 | `/^0\d{9}$/.test(phone)` |
| `validatePassword(password)` | Min length, digit, special char | Checks `length >= 8`, `/\d/`, `/[!@#$%^&*(),.?":{}\|<>]/` |

#### Duplicate Detection Algorithm

```typescript
async function checkDuplicates(data: RegistrationData): Promise<string[]> {
  const errors: string[] = [];
  const content = await readFile(submissionsPath, "utf-8");
  const lines = content.split("\n");
  
  // Skip header: title, blank, header row, separator (first 4 lines)
  const dataLines = lines.slice(4);
  
  for (const line of dataLines) {
    if (!line.trim()) continue;
    const parts = line.split("|").map(s => s.trim());
    // parts[1]=username, parts[3]=email, parts[4]=phone
    
    if (parts[1]?.toLowerCase() === data.username.toLowerCase()) {
      errors.push("Username already exists");
    }
    if (parts[3]?.toLowerCase() === data.email.toLowerCase()) {
      errors.push("Email already exists");
    }
    if (parts[4]?.toLowerCase() === data.phone.toLowerCase()) {
      errors.push("Phone already exists");
    }
  }
  return errors;
}
```

#### Markdown Escaping

```typescript
function escapeMarkdown(text: string): string {
  return text.replace(/\|/g, "\\|").replace(/\n/g, "\\n");
}
```

#### Response Shapes

**Success (200):**
```json
{ "success": true }
```

**Validation/Duplicate Error (400):**
```json
{ "success": false, "errors": ["Email must end with .go.tz", "Username already exists"] }
```

**Server Error (500):**
```json
{ "success": false, "errors": ["Internal server error"] }
```

### Data Persistence Strategy

The application uses a **Markdown table file** (`submissions.md`) as a lightweight persistence layer. This approach:

- Requires no database setup or connection
- Stores data in human-readable format
- Enables easy inspection and manual editing
- Is suitable for low-volume demo/prototype applications

**Trade-offs:**
- Not scalable for high-volume or concurrent writes
- No built-in indexing or querying
- File locking required for production concurrent access

---

## 7. Validation Rules

### Client-Side vs Server-Side Parity

Both client and server implement identical validation rules. The client-side validation provides immediate feedback; server-side validation is authoritative.

| Field | Rule | Type | Client Error | Server Error |
|-------|------|------|--------------|--------------|
| `fullName` | Required | String | "Full Name is required" | "Full Name is required" |
| `username` | Required | String | "Username is required" | "Username is required" |
| `email` | Required | String | "Email is required" | "Email is required" |
| `email` | Format | `.go.tz` domain | "Email must end with .go.tz" | "Email must end with .go.tz" |
| `phone` | Required | String | "Phone is required" | "Phone is required" |
| `phone` | Format | `^0\d{9}$` (10 digits, starts 0) | "Phone must be 10 digits starting with 0" | "Phone must be a valid Tanzanian phone number" |
| `password` | Required | String | "Password is required" | "Password is required" |
| `password` | Min length | 8 characters | "Password must be at least 8 characters" | "Password must be at least 8 characters" |
| `password` | Content | At least 1 digit | "Password must contain at least 1 number" | "Password must contain at least 1 number" |
| `password` | Content | At least 1 special char | Special chars: `!@#$%^&*(),.?":{}\|<>` | "Password must contain at least 1 special character" |
| `institution` | Required | String | "Institution is required" | "Institution is required" |

### Special Character Set for Passwords

```
! @ # $ % ^ & * ( ) , . ? " : { } | < >
```

---

## 8. Data Storage

### File Location

`/home/yusuf/registration-form/submissions.md` (project root)

### Schema (Markdown Table Format)

```markdown
| Timestamp | Full Name | Username | Email | Phone | Password | Institution |
|-----------|-----------|----------|-------|-------|----------|-------------|
| 2026-06-07T10:30:00.000Z | John Doe | johndoe | johndoe@mail.go.tz | 0612345678 | pass123! | Ministry of Education |
| 2026-06-07T11:45:00.000Z | Jane Smith | janesmith | janesmith@mail.go.tz | 0623456789 | secure@456 | Zanzibar Revenue Board |
```

### Column Definitions

| Column | Index | Type | Description |
|--------|-------|------|-------------|
| `Timestamp` | 0 | ISO 8601 string | Auto-generated at submission time |
| `Full Name` | 1 | String | User's full legal name |
| `Username` | 2 | String | Unique identifier (case-insensitive check) |
| `Email` | 3 | String | Must end with `.go.tz` (case-insensitive check) |
| `Phone` | 4 | String | 10 digits starting with `0` (case-insensitive check) |
| `Password` | 5 | Plain text | Stored in plain text for demo purposes |
| `Institution` | 6 | String | Government institution name |

### Duplicate Detection Algorithm

1. Read entire file contents
2. Split by newlines
3. Skip first 4 lines (title line, blank line, header line, separator line `|---|---|...|`)
4. For remaining lines:
   - Split by `|` delimiter
   - Trim whitespace from each part
   - Compare `parts[2]` (username), `parts[3]` (email), `parts[4]` (phone) case-insensitively
5. Collect all matching errors
6. Return array of error messages

---

## 9. Security Notes

### What's Implemented

| Security Measure | Implementation |
|------------------|----------------|
| **Server-side validation** | All client input re-validated in API route |
| **Markdown escaping** | `|` and newline characters escaped before storage |
| **Duplicate prevention** | Username, email, phone uniqueness enforced |
| **Structured error responses** | Validation errors returned as structured JSON array |

### Known Security Considerations

| Issue | Severity | Mitigation Strategy |
|-------|----------|---------------------|
| **Plain text passwords** | HIGH | This is explicitly a demo application. In production, passwords MUST be hashed (bcrypt/argon2) and never stored in plain text |
| **No authentication** | MEDIUM | The registration endpoint is open. Production should require admin authentication or API keys |
| **No rate limiting** | MEDIUM | API route has no throttling. Production should implement rate limiting to prevent abuse |
| **No HTTPS enforcement** | MEDIUM | Deploy behind TLS termination (Vercel, nginx, etc.) |
| **No input sanitization** | LOW | Markdown escaping is applied; consider additional HTML encoding if rendered |
| **File race conditions** | LOW | For demo volume this is acceptable; production requires file locking or database |

### Recommendations for Production

1. **Password Hashing:** Use bcrypt or argon2 to hash passwords before storage
2. **Database:** Replace Markdown file with PostgreSQL, MySQL, or similar
3. **Rate Limiting:** Implement per-IP or per-user submission limits
4. **Input Length Limits:** Add maximum length constraints on all fields
5. **HTTPS Only:** Configure security headers and enforce TLS

---

## 10. Build & Development

### Available npm Scripts

| Script | Command | Description |
|--------|---------|-------------|
| `dev` | `next dev` | Start development server with hot reload |
| `build` | `next build` | Create optimized production build |
| `start` | `next start` | Start production server (after build) |
| `lint` | `next lint` | Run ESLint on the codebase |

### Local Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

The development server runs on `http://localhost:3000` by default.

### Production Build & Deployment

```bash
# Create production build
npm run build

# Start production server
npm run start
```

### Environment Requirements

- **Node.js:** 18.x or later (LTS recommended)
- **Package Manager:** npm, yarn, pnpm, or bun

---

## 11. Key Configuration Files

### `tsconfig.json`

```json
{
  "compilerOptions": {
    "target": "ES2017",
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "react-jsx",
    "incremental": true,
    "plugins": [{ "name": "next" }],
    "paths": { "@/*": ["./*"] }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
  "exclude": ["node_modules"]
}
```

**Key Settings:**
- `strict: true` — Enables all strict type-checking options
- `"paths": { "@/*": ["./*"] }` — Path alias for imports
- `moduleResolution: "bundler"` — Compatible with Next.js bundler
- `"jsx": "react-jsx"` — New JSX transform (React 17+)

### `tailwind.config.ts`

```typescript
import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        border: "hsl(var(--border))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        // ... extended color tokens
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
```

**Key Settings:**
- `darkMode: ["class"]` — Class-based dark mode support
- `content` — Globs for Tailwind to scan for class usage
- `plugins` — `tailwindcss-animate` for animation utilities

### `next.config.ts`

```typescript
import type { NextConfig } from "next";

const nextConfig: NextConfig = {};

export default nextConfig;
```

**Current State:** Minimal configuration with no custom settings. Extend as needed for:
- Image domains (`images.domains`)
- Redirects/rewrites (`rewrites`, `redirects`)
- Headers (`headers`)
- Environment variables (`env`)

### `postcss.config.mjs`

```javascript
const config = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
};
export default config;
```

**Purpose:** Processes Tailwind CSS and adds vendor prefixes for browser compatibility.

---

## 12. Design System

### Color Palette

The application uses a **teal/emerald/cyan** palette for a professional, government-appropriate aesthetic.

#### Primary Brand Colors

| Color | Tailwind Class | Hex (approx) | Usage |
|-------|----------------|--------------|-------|
| Emerald 500 | `emerald-500` | `#10b981` | Top accent bar, buttons |
| Emerald 600 | `emerald-600` | `#059669` | Button hover |
| Teal | `teal-500` | `#14b8a6` | Accent gradients |

#### Background Gradient

```css
bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-100
```

| Stop | Color |
|------|-------|
| Start | Emerald 50 (`#ecfdf5`) |
| Middle | Teal 50 (`#f0fdfa`) |
| End | Cyan 100 (`#ecfeff`) |

#### Theme Colors (CSS Variables)

| Variable | HSL Value | Purpose |
|----------|-----------|---------|
| `--primary` | `142 76% 36%` | Emerald green |
| `--primary-foreground` | `210 40% 98%` | White/light text on primary |
| `--background` | `0 0% 100%` | White card backgrounds |
| `--foreground` | `222.2 84% 4.9%` | Primary text |
| `--border` | `214.3 31.8% 91.4%` | Input/card borders |

### Typography

- **Font Family:** System font stack (Tailwind default)
- **Headings:** Bold, gradient text for emphasis
- **Body:** `text-sm` (14px) standard, `text-muted-foreground` for secondary text
- **Form Labels:** `text-sm font-medium`

### Spacing System

Uses Tailwind's default 4px-based spacing scale:

| Class | Value | Usage |
|-------|-------|-------|
| `p-6` | 24px | Card padding |
| `gap-4` | 16px | Form field spacing |
| `space-y-2` | 8px | Error message spacing |
| `mb-2` | 8px | Label to input spacing |

### Border Radius

| Class | Value | Usage |
|-------|-------|-------|
| `rounded-2xl` | 16px | Main card container |
| `rounded-md` | 6px | Buttons, inputs |
| `rounded-full` | 9999px | Avatars, badges |

### Shadows

| Class | Usage |
|-------|-------|
| `shadow-2xl` | Card elevation |
| `shadow-lg` | Button shadow |

### Animations

| Animation | Duration | Easing | Usage |
|-----------|----------|--------|-------|
| `fade-in` | 0.7s | ease-out | Page/card entrance |
| `transition-all` | 150-200ms | default | Hover states |
| `hover:scale-105` | - | - | Button hover effect |

#### Fade-In Keyframe

```css
@keyframes fade-in {
  0% { opacity: 0; transform: translateY(16px); }
  100% { opacity: 1; transform: translateY(0); }
}
```

---

## Appendix: File Reference Index

| File Path | Purpose |
|-----------|---------|
| `app/page.tsx` | Registration form client component |
| `app/success/page.tsx` | Success confirmation page |
| `app/api/register/route.ts` | Registration API endpoint |
| `app/layout.tsx` | Root layout with metadata |
| `app/globals.css` | Global styles and CSS variables |
| `components/ui/button.tsx` | Button component with variants |
| `components/ui/input.tsx` | Input component |
| `components/ui/label.tsx` | Label component |
| `lib/utils.ts` | `cn()` utility function |
| `tailwind.config.ts` | Tailwind CSS configuration |
| `submissions.md` | Data storage file |
| `public/logo_smz.webp` | Application logo |

---

*This documentation is generated for registration-form v0.1.0 — Next.js 16.2.7*