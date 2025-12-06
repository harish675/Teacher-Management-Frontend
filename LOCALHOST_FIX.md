# Fixed: Why Deployed App Was Hitting Localhost

## The Issue

Your deployed frontend was trying to connect to `http://localhost:8000` instead of the production backend.

## The Cause

1. **Vite bundles variables at build time**: React apps are static. The API URL must be "baked in" to the Javascript during `npm run build`.
2. **Missing ARG in Dockerfile**: Even though you set the environment variable `VITE_API_BASE_URL` in Render, the Dockerfile did not have instructions to **accept** those variables and pass them to the build command.
3. **Fallback triggered**: Since the variable was missing during the build, the code fell back to the default:
   ```javascript
   // VITE_API_BASE_URL was undefined, so it used localhost
   const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/rent-easy/api';
   ```

## The Fix

I updated the `Dockerfile` to accept the build arguments:

```dockerfile
# Accept build arguments
ARG VITE_API_BASE_URL
ARG VITE_APP_TITLE

# Set as environment variables for the build
ENV VITE_API_BASE_URL=$VITE_API_BASE_URL
ENV VITE_APP_TITLE=$VITE_APP_TITLE
```

## Immediate Next Steps to Fix Deploy

1. **Push changes** to GitHub:
   ```bash
   git add Dockerfile
   git commit -m "Fix: Add build args to Dockerfile to pick up env vars"
   git push
   ```

2. **Verify Render Environment Variables**:
   - Go to Render Dashboard -> Your Frontend Service -> **Environment**
   - Ensure `VITE_API_BASE_URL` is set to your **Backend URL** (e.g., `https://teacher-backend.onrender.com/rent-easy/api`)

3. **Deploy**:
   - The push should trigger a new deployment.
   - Render will now pass the environment variable into the build.
   - Vite will bake the correct URL into the code.
