# Deploying Frontend to Render with Docker

This guide explains how to deploy your React/Vite frontend to Render using the provided Dockerfile.

## Prerequisites

- A [Render account](https://render.com)
- Your code pushed to a Git repository (GitHub, GitLab, or Bitbucket)
- Backend API deployed and accessible

## Deployment Steps

### 1. Prepare Environment Variables

You'll need to set the backend API URL. If your backend is deployed on Render, the URL will be:
```
https://your-backend-service.onrender.com/rent-easy/api
```

### 2. Deploy to Render

1. **Log in to Render** at [dashboard.render.com](https://dashboard.render.com)

2. **Create a New Web Service**
   - Click "New +" → "Web Service"
   - Connect your Git repository
   - Select the repository containing this frontend code

3. **Configure the Service**
   - **Name**: Choose a name (e.g., `teacher-frontend`)
   - **Region**: Select the region closest to your users
   - **Branch**: Select your main branch (usually `main` or `master`)
   - **Root Directory**: Leave blank (or specify if frontend is in a subdirectory)
   - **Runtime**: Select **Docker**
   - **Instance Type**: Choose "Free" for testing or "Starter" for production

4. **Set Environment Variables**
   
   Click "Advanced" and add the following environment variables:
   
   | Key | Value | Example |
   |-----|-------|---------|
   | `VITE_API_BASE_URL` | Your backend API URL | `https://teacher-backend.onrender.com/rent-easy/api` |
   | `VITE_APP_TITLE` | Application title (optional) | `Student-Teacher Management System` |

   > **Important**: Environment variables must be set BEFORE building, as Vite embeds them during build time.

5. **Deploy**
   - Click "Create Web Service"
   - Render will automatically build your Docker image and deploy it
   - Wait for the deployment to complete (usually 3-7 minutes)

### 3. Access Your Application

Once deployed, your frontend will be available at:
```
https://your-service-name.onrender.com
```

## How It Works

### Multi-Stage Docker Build

The Dockerfile uses a two-stage build process:

1. **Build Stage** (Node.js)
   - Installs dependencies
   - Builds the React application with Vite
   - Creates optimized production bundle

2. **Serve Stage** (Nginx)
   - Copies built files from build stage
   - Serves static files with nginx
   - Handles React Router routing
   - Enables gzip compression
   - Sets security headers

### Nginx Configuration

The `nginx.conf` file:
- Serves the React SPA
- Handles client-side routing (all routes serve `index.html`)
- Caches static assets for 1 year
- Prevents caching of `index.html`
- Enables gzip compression
- Adds security headers

## Updating Environment Variables

If you need to update environment variables after deployment:

1. Go to your service in Render dashboard
2. Click "Environment" tab
3. Update the variables
4. Click "Save Changes"
5. **Important**: Trigger a manual deploy for changes to take effect
   - Go to "Manual Deploy" → "Deploy latest commit"

## Automatic Deployments

Render automatically redeploys your service when you push to your connected Git branch.

## Monitoring and Logs

- **View Logs**: Service → "Logs" tab
- **Metrics**: Service → "Metrics" tab
- **Events**: Service → "Events" tab for deployment history

## Troubleshooting

### Build Fails

**Check build logs** in Render dashboard:
- Verify all dependencies are in `package.json`
- Ensure `Dockerfile` syntax is correct
- Check that `nginx.conf` exists

### Blank Page After Deployment

**Possible causes:**
1. **API URL not set**: Verify `VITE_API_BASE_URL` is set correctly
2. **CORS issues**: Ensure backend allows requests from your frontend domain
3. **Build errors**: Check build logs for JavaScript errors

**Solution:**
```bash
# Test build locally first
docker build -t test-frontend .
docker run -p 8080:80 test-frontend
# Visit http://localhost:8080
```

### API Connection Errors

**Verify:**
1. Backend is running and accessible
2. `VITE_API_BASE_URL` points to correct backend URL
3. Backend has CORS enabled for your frontend domain
4. Check browser console for specific errors

**Update CORS on backend** to allow your frontend domain:
```python
# In backend (FastAPI)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["https://your-frontend.onrender.com"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
```

### Routing Issues (404 on Refresh)

This should be handled by `nginx.conf`, but if you see 404 errors:
- Verify `nginx.conf` is being copied in Dockerfile
- Check nginx logs in Render dashboard

## Cost Considerations

- **Free Tier**: 
  - Services spin down after 15 minutes of inactivity
  - Cold starts take 30-60 seconds
  - 750 hours/month free

- **Starter Tier** ($7/month):
  - Always running, no cold starts
  - Custom domains
  - Better performance

## Performance Optimization

### Already Included

✅ Multi-stage build (smaller image)  
✅ Gzip compression  
✅ Static asset caching  
✅ Security headers  

### Additional Optimizations

1. **Enable CDN** (Render Pro plan)
2. **Add service worker** for offline support
3. **Implement code splitting** in React
4. **Optimize images** before deployment

## Local Testing

Test the Docker build locally before deploying:

```bash
# Build the image
docker build -t teacher-frontend .

# Run the container
docker run -p 8080:80 teacher-frontend

# Visit http://localhost:8080
```

## Additional Resources

- [Render Documentation](https://render.com/docs)
- [Vite Deployment Guide](https://vitejs.dev/guide/static-deploy.html)
- [Nginx Documentation](https://nginx.org/en/docs/)
