# Docker Build Fix for Frontend

## Problem

The Docker build failed with the error:
```
npm error The `npm ci` command can only install with an existing package-lock.json
```

And also:
```
npm warn config only Use `--omit=dev` to omit dev dependencies from the install.
```

## Root Causes

1. **Deprecated flag**: `npm ci --only=production` is deprecated. The correct syntax is `npm ci --omit=dev`
2. **Missing devDependencies**: Vite and build tools are in `devDependencies`, but we need them to build the app
3. **package-lock.json excluded**: The `.dockerignore` was excluding `package-lock.json` which `npm ci` requires

## Solution

### 1. Fixed Dockerfile

Changed from:
```dockerfile
RUN npm ci --only=production
```

To:
```dockerfile
RUN npm ci
```

**Why**: We need ALL dependencies (including devDependencies like Vite, ESLint, etc.) to build the React app. The multi-stage build ensures only the final built files are in the production image, not the node_modules.

### 2. Updated .dockerignore

Removed `package-lock.json` from `.dockerignore` so it's included in the Docker build context.

## How Multi-Stage Build Works

The Dockerfile uses a two-stage build:

**Stage 1 (builder):**
- Installs ALL dependencies (prod + dev)
- Builds the app with `npm run build`
- Creates optimized bundle in `/app/dist`

**Stage 2 (nginx):**
- Only copies the built `/app/dist` folder
- No node_modules, no source code
- Final image is small (~25MB) and secure

## Next Steps

1. Commit the fixed files
2. Push to GitHub
3. Render will automatically rebuild with the corrected Dockerfile

The build should now succeed!
