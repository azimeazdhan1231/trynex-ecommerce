# 🔧 Netlify Deployment Fix - Vite Not Found Error

## ❌ **Problem**
Netlify build fails with "vite: not found" because Vite is in devDependencies but Netlify doesn't install dev dependencies by default.

## ✅ **Solution Options**

### **Option 1: Update Build Command (RECOMMENDED)**
In your Netlify dashboard:

1. Go to **Site Settings** → **Build & Deploy** → **Build Settings**
2. Change **Build Command** to:
   ```
   npm install && npm run build
   ```
3. This ensures all dependencies (including dev) are installed

### **Option 2: Use Updated netlify.toml**
I've updated your netlify.toml with the fix. Push these changes:

```toml
[build]
  publish = "dist/public"
  command = "npm install && npm run build"

[build.environment]
  NODE_ENV = "production"
  VITE_GA_MEASUREMENT_ID = "G-22BF5BGNSX"
  NPM_FLAGS = "--include=dev"
```

### **Option 3: Move Dependencies (Manual)**
In your package.json, move these from devDependencies to dependencies:
- `vite`
- `@vitejs/plugin-react`
- `esbuild`
- `typescript`
- `tailwindcss`
- `autoprefixer`
- `postcss`

## 🚀 **Quick Fix Steps**

1. **Push the updated netlify.toml:**
   ```bash
   git add netlify.toml
   git commit -m "Fix netlify build - ensure dev dependencies installed"
   git push origin main
   ```

2. **Trigger new deploy in Netlify Dashboard**
   - Go to Deploys tab
   - Click "Trigger deploy" → "Deploy site"

3. **If still failing, update build command manually:**
   - Site Settings → Build & Deploy → Build Settings
   - Build command: `npm install && npm run build`
   - Publish directory: `dist/public`

## ✅ **Expected Result**
Your build should now succeed because:
- `npm install` installs all dependencies including dev dependencies
- Vite will be available during the build process
- The build will complete successfully and deploy your site

The error occurs because Netlify's default behavior is to run `npm ci --production` which skips devDependencies, but build tools like Vite are needed during the build process.