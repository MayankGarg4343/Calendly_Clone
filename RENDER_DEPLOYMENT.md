# Render Deployment Guide

This guide will help you deploy the complete Calendly Clone project (frontend + backend) to Render.

## Prerequisites

- A Render account (free tier available)
- A GitHub account
- Node.js and npm installed locally

## Step 1: Set Up Render Account

1. Go to [render.com](https://render.com) and create an account
2. Sign in with GitHub (recommended for easy deployment)
3. Verify your email address

## Step 2: Deploy PostgreSQL Database

Render provides a managed PostgreSQL database (free tier: 90 days, then $7/month):

### Option 1: Use Render PostgreSQL (Recommended)
1. Go to Render Dashboard → **"New +"** → **"PostgreSQL"**
2. Configure:
   - Name: `calendly-clone-db`
   - Database: `calendly_clone`
   - User: `postgres`
   - Region: Choose the closest to your users
3. Click **"Create Database"**
4. Wait for the database to be ready (1-2 minutes)
5. Copy the **Internal Database URL** from the database dashboard

### Option 2: Use External Database
If you prefer to use Supabase, Neon, or Railway:
1. Create your database following their setup guides
2. Copy the connection string
3. You'll add this manually later as an environment variable

## Step 3: Deploy Backend (Web Service)

### Using render.yaml (Recommended)
The project includes a `render.yaml` configuration file. When you push to GitHub and connect to Render, it will automatically deploy:

1. Go to Render Dashboard → **"New +"** → **"Web Service"**
2. Connect your GitHub repository: `MayankGarg4343/Calendly_Clone`
3. Render will detect the `render.yaml` file
4. Click **"Create Web Service"**

### Manual Configuration (Alternative)
If you prefer manual setup:

1. Go to Render Dashboard → **"New +"** → **"Web Service"**
2. Connect your GitHub repository
3. Configure:
   - Name: `calendly-clone-backend`
   - Environment: `Node`
   - Build Command: `cd backend && npm install`
   - Start Command: `cd backend && npm start`
4. Click **"Advanced"** → **"Environment"**
5. Add environment variables:
   - `NODE_ENV`: `production`
   - `PORT`: `5000`
   - `DATABASE_URL`: Your database connection string
   - `FRONTEND_URL`: Your frontend URL (add after frontend deployment)
6. Click **"Create Web Service"**

## Step 4: Deploy Frontend (Static Site)

### Using render.yaml (Recommended)
The `render.yaml` file includes frontend configuration. It will be deployed automatically with the backend.

### Manual Configuration (Alternative)
1. Go to Render Dashboard → **"New +"** → **"Static Site"**
2. Connect your GitHub repository
3. Configure:
   - Name: `calendly-clone-frontend`
   - Build Command: `cd frontend && npm install && npm run build`
   - Publish Directory: `frontend/build`
4. Click **"Advanced"** → **"Environment"**
5. Add environment variable:
   - `REACT_APP_API_URL`: Your backend URL (e.g., `https://calendly-clone-backend.onrender.com`)
6. Click **"Create Static Site"**

## Step 5: Update Frontend API URL

After deployment, update the frontend to use the deployed backend URL:

1. Open `frontend/src/services/api.js`
2. Update the API base URL:
```javascript
const API_BASE_URL = process.env.REACT_APP_API_URL || 'https://calendly-clone-backend.onrender.com/api';
```

3. Push the changes to GitHub
4. Render will automatically redeploy

## Step 6: Run Database Migrations

### Using Render Database
1. Go to your PostgreSQL database in Render
2. Click **"Connect"** → **"External Connection"**
3. Copy the connection string
4. Use a database tool (DBeaver, pgAdmin, or psql) to connect
5. Run the schema from `backend/database/schema.sql`

### Using psql CLI
```bash
psql "postgresql://[user]:[password]@[host]:[port]/[database]" -f backend/database/schema.sql
```

### Using Render Console
1. Go to your PostgreSQL database in Render
2. Click **"Connect"** → **"Console"**
3. Paste the schema SQL and run it

## Step 7: Update Environment Variables

After both services are deployed:

1. Go to your backend web service in Render
2. Click **"Environment"**
3. Update `FRONTEND_URL` with your frontend URL
4. Go to your frontend static site in Render
5. Click **"Environment"**
6. Update `REACT_APP_API_URL` with your backend URL (append `/api`)

## Step 8: Verify Deployment

1. Visit your frontend URL (e.g., `https://calendly-clone-frontend.onrender.com`)
2. Test the frontend loads correctly
3. Test the API:
   - Health check: `https://calendly-clone-backend.onrender.com/health`
   - Event types: `https://calendly-clone-backend.onrender.com/api/event-types`
4. Test the booking flow end-to-end

## Project Structure on Render

```
calendly-clone-backend.onrender.com/
├── /              → Backend API (Express)
├── /health        → Health check
├── /api/          → API routes
│   ├── /event-types
│   ├── /availability
│   ├── /bookings
│   ├── /time-slots
│   ├── /contacts
│   └── /integrations

calendly-clone-frontend.onrender.com/
├── /              → Frontend (React app)
```

## Troubleshooting

### Issue: "Database connection failed"
- Verify your `DATABASE_URL` is correct
- Check if the database is running in Render
- Ensure the database allows connections from Render

### Issue: "Build failed"
- Check the build logs in Render
- Ensure all dependencies are installed
- Verify the build command is correct

### Issue: "API returns 404"
- Check the backend service is running
- Verify the API routes are properly configured
- Check the backend logs in Render

### Issue: "CORS errors"
- Verify `FRONTEND_URL` is set correctly in backend environment variables
- Check the CORS configuration in `backend/src/index.js`

### Issue: "Frontend can't connect to backend"
- Verify `REACT_APP_API_URL` is set correctly in frontend
- Ensure the backend service is running
- Check if the backend URL includes `/api` prefix

### Issue: "Database schema not found"
- Run the database migrations (Step 6)
- Verify the schema was applied correctly
- Check if tables exist in your database

## Continuous Deployment

After initial deployment, Render will automatically redeploy when you:
1. Push changes to the main branch
2. Create a pull request (preview deployment)

## Cost Estimate

- **Render Web Service (Backend):** Free tier (750 hours/month)
- **Render Static Site (Frontend):** Free (unlimited)
- **Render PostgreSQL:** Free for 90 days, then $7/month
- **Total:** $0 - $7/month

## Additional Notes

- Render web services have a spin-up time (30-60 seconds) when idle
- Database connections are established per request
- For better performance, consider upgrading to paid plans
- Monitor your Render dashboard for usage and performance metrics
- Render provides free SSL certificates automatically

## Environment Variables Reference

### Backend Environment Variables
- `NODE_ENV`: `production`
- `PORT`: `5000`
- `DATABASE_URL`: Your PostgreSQL connection string
- `FRONTEND_URL`: Your frontend URL

### Frontend Environment Variables
- `REACT_APP_API_URL`: Your backend API URL (with `/api` suffix)

## Support

If you encounter issues:
1. Check the Render service logs
2. Review the build logs
3. Verify all environment variables are set
4. Check this guide's troubleshooting section

For additional help, refer to:
- [Render Documentation](https://render.com/docs)
- [Render Web Services Guide](https://render.com/docs/web-services)
- [Render Static Sites Guide](https://render.com/docs/static-sites)
- [Render PostgreSQL Guide](https://render.com/docs/databases)
