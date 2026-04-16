# Render Deployment Guide

This guide will help you deploy the Calendly Clone project (frontend + backend) to Render separately.

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

1. Go to Render Dashboard → **"New +"** → **"PostgreSQL"**
2. Configure:
   - Name: `calendly-clone-db`
   - Database: `calendly_clone`
   - Region: Choose the closest to your users
3. Click **"Create Database"**
4. Wait for the database to be ready (1-2 minutes)
5. Copy the **Internal Database URL** from the database dashboard

## Step 3: Deploy Backend (Web Service)

1. Go to Render Dashboard → **"New +"** → **"Web Service"**
2. Connect your GitHub repository: `MayankGarg4343/Calendly_Clone`
3. Configure:
   - Name: `calendly-clone-backend`
   - Environment: `Node`
   - Build Command: `cd backend && npm install`
   - Start Command: `cd backend && npm start`
4. Click **"Advanced"** → **"Environment"**
5. Add environment variables:
   - `NODE_ENV`: `production`
   - `PORT`: `5000`
   - `DATABASE_URL`: Your database connection string (from Step 2)
   - `JWT_SECRET`: Generate a random secret key
   - `FRONTEND_URL`: Leave blank for now (will add after frontend deployment)
6. Click **"Create Web Service"**
7. Wait for deployment to complete
8. Copy your backend URL (e.g., `https://calendly-clone-backend.onrender.com`)

## Step 4: Deploy Frontend (Static Site)

1. Go to Render Dashboard → **"New +"** → **"Static Site"**
2. Connect your GitHub repository: `MayankGarg4343/Calendly_Clone`
3. Configure:
   - Name: `calendly-clone-frontend`
   - Build Command: `cd frontend && npm install && npm run build`
   - Publish Directory: `frontend/build`
4. Click **"Advanced"** → **"Environment"**
5. Add environment variable:
   - `REACT_APP_API_URL`: Your backend URL with `/api` suffix (e.g., `https://calendly-clone-backend.onrender.com/api`)
6. Click **"Create Static Site"**
7. Wait for deployment to complete
8. Copy your frontend URL (e.g., `https://calendly-clone-frontend.onrender.com`)

## Step 5: Update Backend Environment Variable

1. Go to your backend web service in Render
2. Click **"Environment"**
3. Add or update `FRONTEND_URL` with your frontend URL (from Step 4)
4. Click **"Save Changes"**
5. Render will automatically redeploy the backend

## Step 6: Run Database Migrations

### Using Render Console
1. Go to your PostgreSQL database in Render
2. Click **"Connect"** → **"Console"**
3. Copy the contents of `backend/database/schema.sql`
4. Paste it into the console and click **"Run"**

### Using psql CLI
```bash
psql "postgresql://[user]:[password]@[host]:[port]/[database]" -f backend/database/schema.sql
```

## Step 7: Verify Deployment

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
