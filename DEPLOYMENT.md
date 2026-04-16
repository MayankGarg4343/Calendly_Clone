# Vercel Deployment Guide

This guide will help you deploy the complete Calendly Clone project (frontend + backend) to Vercel.

## Prerequisites

- A Vercel account (free tier works)
- A GitHub account (or GitLab/Bitbucket)
- A PostgreSQL database (recommended: Supabase, Neon, or Railway)
- Node.js and npm installed locally

## Step 1: Set Up PostgreSQL Database

Since Vercel doesn't provide database hosting, you need to use a cloud PostgreSQL provider:

### Option 1: Supabase (Recommended - Free Tier)
1. Go to [supabase.com](https://supabase.com) and create an account
2. Create a new project
3. Wait for the project to be ready (2-3 minutes)
4. Go to Settings → Database
5. Copy the "Connection string" (URI format)
6. It should look like: `postgresql://postgres:[password]@db.[project-id].supabase.co:5432/postgres`

### Option 2: Neon (Free Tier)
1. Go to [neon.tech](https://neon.tech) and create an account
2. Create a new project
3. Copy the connection string from the dashboard
4. It should look like: `postgresql://[user]:[password]@[project-id].aws.neon.tech/neondb`

### Option 3: Railway (Free Tier Available)
1. Go to [railway.app](https://railway.app) and create an account
2. Create a new PostgreSQL database
3. Copy the connection string from the dashboard

## Step 2: Push Code to GitHub

1. Initialize git repository in the project root:
```bash
git init
git add .
git commit -m "Initial commit"
```

2. Create a new repository on GitHub
3. Add the remote and push:
```bash
git remote add origin https://github.com/your-username/your-repo.git
git branch -M main
git push -u origin main
```

## Step 3: Deploy to Vercel

### 3.1 Import Project to Vercel

1. Go to [vercel.com](https://vercel.com) and sign in
2. Click "Add New..." → "Project"
3. Import your GitHub repository
4. Vercel will automatically detect the project structure

### 3.2 Configure Environment Variables

In the Vercel project settings, add the following environment variables:

**Required Variables:**
- `DATABASE_URL` - Your PostgreSQL connection string from Step 1
- `FRONTEND_URL` - Your Vercel domain (e.g., `https://your-app.vercel.app`)

**Optional Variables:**
- `NODE_ENV` - Set to `production`
- `PORT` - Set to `5000` (Vercel will override this, but good to have)

To add environment variables:
1. Go to your project in Vercel
2. Click "Settings" → "Environment Variables"
3. Add each variable with its value
4. Click "Save"

### 3.3 Configure Build Settings

Vercel should automatically detect the settings, but if not, configure:

**Root Directory:** Leave empty (or set to `.`)

**Build Command:** 
```
cd frontend && npm run build
```

**Output Directory:** 
```
frontend/build
```

**Install Command:** 
```
npm install && cd frontend && npm install && cd ../backend && npm install
```

### 3.4 Deploy

Click "Deploy" and wait for the deployment to complete. Vercel will:
- Install dependencies
- Build the frontend
- Set up the backend as serverless functions
- Deploy everything

## Step 4: Run Database Migrations

After deployment, you need to set up the database schema:

### Option A: Using Supabase SQL Editor
1. Go to your Supabase project
2. Click "SQL Editor" in the left sidebar
3. Click "New Query"
4. Copy the contents of `backend/database/schema.sql`
5. Paste it into the editor
6. Click "Run" to execute the schema

### Option B: Using Railway/Neon
1. Go to your database dashboard
2. Open the SQL editor
3. Copy the contents of `backend/database/schema.sql`
4. Paste and execute

### Option C: Using psql CLI
```bash
psql "postgresql://[user]:[password]@[host]:[port]/[database]" -f backend/database/schema.sql
```

## Step 5: Update Frontend API URL

After deployment, update the frontend to use the deployed backend URL:

1. Open `frontend/src/services/api.js`
2. Update the `API_BASE_URL`:
```javascript
const API_BASE_URL = process.env.REACT_APP_API_URL || 'https://your-app.vercel.app/api';
```

3. Add `REACT_APP_API_URL` to Vercel environment variables:
   - Value: `https://your-app.vercel.app/api`

4. Redeploy the project

## Step 6: Verify Deployment

1. Visit your Vercel domain (e.g., `https://your-app.vercel.app`)
2. Test the frontend loads correctly
3. Test the API:
   - Health check: `https://your-app.vercel.app/api/health`
   - Event types: `https://your-app.vercel.app/api/event-types`
4. Test the booking flow end-to-end

## Troubleshooting

### Issue: "Database connection failed"
- Verify your `DATABASE_URL` is correct
- Check if your database allows connections from anywhere (whitelist IP 0.0.0.0/0)
- Ensure the database is running

### Issue: "Build failed"
- Check the build logs in Vercel
- Ensure all dependencies are installed
- Verify the build command is correct

### Issue: "API returns 404"
- Check the vercel.json configuration
- Verify the API routes are properly configured
- Check the serverless function logs in Vercel

### Issue: "CORS errors"
- Verify `FRONTEND_URL` is set correctly in environment variables
- Check the CORS configuration in `backend/src/index.js`

### Issue: "Database schema not found"
- Run the database migrations (Step 4)
- Verify the schema was applied correctly
- Check if tables exist in your database

## Project Structure After Deployment

```
your-app.vercel.app/
├── /              → Frontend (React app)
├── /api/          → Backend API (serverless functions)
│   ├── /health
│   ├── /event-types
│   ├── /availability
│   ├── /bookings
│   ├── /time-slots
│   ├── /contacts
│   └── /integrations
```

## Continuous Deployment

After initial deployment, Vercel will automatically redeploy when you:
1. Push changes to the main branch
2. Create a pull request (preview deployment)

## Cost Estimate

- **Vercel:** Free tier (generous limits for personal projects)
- **Supabase:** Free tier (500MB database, 1GB bandwidth)
- **Neon:** Free tier (0.5GB storage, 100 hours compute)
- **Railway:** $5/month after free trial (or use free tier)

Total cost: **$0 - $5/month** depending on database choice.

## Additional Notes

- The backend runs as Vercel serverless functions, which have a maximum execution time of 10-60 seconds (depending on plan)
- Database connections are established per request (serverless functions are stateless)
- For better performance, consider using a connection pooler (Supabase provides this automatically)
- Monitor your Vercel dashboard for usage and performance metrics

## Support

If you encounter issues:
1. Check the Vercel deployment logs
2. Review the database connection settings
3. Verify all environment variables are set
4. Check this guide's troubleshooting section

For additional help, refer to:
- [Vercel Documentation](https://vercel.com/docs)
- [Supabase Documentation](https://supabase.com/docs)
- [Neon Documentation](https://neon.tech/docs)
