# SkillSync Routing Guide

## Project Page Routing (`/project`)

### Current Structure
```
app/project/page.tsx - Main project page route
├── Authentication check
├── Navigation header
├── Projects component
└── API integration

app/api/projects/route.ts - Projects API
├── GET /api/projects - Fetch all projects
└── POST /api/projects - Create new project
```

### Key Improvements Made

1. **Fixed Component Name**: Changed from `SignUpPage` to `ProjectPage`
2. **Added Authentication**: Checks for user token and redirects to signin if not authenticated
3. **Added Navigation**: Header with links to other pages and logout functionality
4. **API Integration**: Projects are now fetched from `/api/projects` instead of hardcoded
5. **Loading States**: Proper loading and error handling
6. **Responsive Design**: Mobile-friendly navigation

### Route Flow

1. **User visits `/project`**
2. **Authentication Check**: Verifies if user has valid token
3. **If not authenticated**: Redirects to `/signin`
4. **If authenticated**: Shows project page with navigation
5. **API Call**: Fetches projects from `/api/projects`
6. **Display**: Renders projects with filtering and search

### Navigation Structure

```
Header Navigation:
├── Back to Home (/) - Returns to landing page
├── Skills (/skills) - Skills dashboard
├── Profile (/profile) - User profile
└── Logout - Clears token and redirects to home
```

### API Endpoints

#### GET /api/projects
- **Purpose**: Fetch all available projects
- **Authentication**: Required (Bearer token)
- **Response**: Array of project objects
- **Error Handling**: 401 for unauthorized, 500 for server errors

#### POST /api/projects
- **Purpose**: Create a new project
- **Authentication**: Required (Bearer token)
- **Body**: `{ title, description, skills, difficulty, domain }`
- **Response**: Created project object
- **Error Handling**: 400 for validation errors, 401 for unauthorized

### Future Enhancements

1. **Database Integration**: Store projects in Prisma database
2. **User Projects**: Show projects created by the current user
3. **Project Details**: Individual project pages with `/project/[id]` routing
4. **Join Projects**: API endpoint to join/leave projects
5. **Project Categories**: Better categorization and filtering
6. **Search API**: Server-side search functionality

### Testing the Route

1. **Without Authentication**:
   - Visit `/project` without being logged in
   - Should redirect to `/signin`

2. **With Authentication**:
   - Sign in to the application
   - Visit `/project`
   - Should see projects page with navigation

3. **API Testing**:
   - Use browser dev tools to check API calls
   - Verify projects are loaded from `/api/projects`

### File Structure Summary

```
app/
├── project/
│   └── page.tsx          # Project page route
├── api/
│   └── projects/
│       └── route.ts      # Projects API
└── components/
    └── Projects.tsx      # Projects component
```

This routing structure provides a solid foundation for the projects feature with proper authentication, navigation, and API integration. 