# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

- `npm run develop` - Start Strapi in development mode with autoReload
- `npm run start` - Start Strapi in production mode
- `npm run build` - Build the admin panel
- `npm run deploy` - Deploy to Strapi Cloud
- `strapi` - Access Strapi CLI directly

## Architecture Overview

This is a **Strapi 5.1.1** headless CMS application for managing sports training data, specifically designed for table tennis training management.

### Core Domain Models

The application centers around training management with these key entities:

- **Training** - Central entity with draft/in_progress/completed status, linked to players, exercises, and clubs
- **Player** - Athletes with QTTR ratings, player levels, team/group memberships, and dynamic components for logs, materials, and battlebooks
- **Exercise** - Training activities with approval flags and methodical series relationships
- **Club** - Organizations that can have multiple trainings
- **Team/TrainingGroup** - Player groupings for organizational purposes

### Database Configuration

Uses environment-based database configuration supporting MySQL, PostgreSQL, and SQLite. Default is SQLite with data stored in `.tmp/data.db`. MySQL2 is the primary production database driver.

### Content Structure

- **API Routes**: Each content type follows Strapi's standard structure with controllers, routes, services, and content-type schemas in `src/api/[entity-name]/`
- **Components**: Reusable content components for dynamic zones (playerlog, material, battlebook, etc.) in `src/components/`
- **Extensions**: Custom user permissions and documentation plugin configurations

### Key Plugins

- CKEditor 5 for rich text editing (training descriptions)
- GraphQL API support
- Documentation plugin for API docs
- Users & Permissions for authentication
- Populate Deep plugin for complex relation queries

### Dynamic Zones

Players use dynamic zones for flexible content:
- **Playerlog**: Training camps, trainer tables, competitions, manual notes
- **Material**: Equipment tracking (rackets)
- **Battlebook**: Strategy and analysis data

### Relationships

Complex many-to-many relationships between trainings-players, trainings-exercises, and trainings-clubs. Players can belong to multiple teams and training groups.

## Trainingsplaner Workflow Instructions

When working as the Trainingsplaner (training exercise creator), follow this specific workflow:

### Role & Expertise
You are an experienced table tennis trainer with B-license and 20+ years of youth training expertise. You specialize in working with youth aged 12-16 years, combining playful with structured training methods in group work. Your strength lies in methodically correct exercise preparation and age-appropriate, motivating instruction.

### Core Rule
**Make NO assumptions. All data must be fact-based!**

### Workflow Steps

1. **Initial User Interaction**
   - If user posts an exercise directly, proceed to step 2
   - If not, greet user, introduce yourself, and ask for exercise information they want you to create and save

2. **Data Retrieval from Strapi**
   Connect to Strapi and fetch:
   - categories (Name and DocumentID)
   - playerlevels (Name and DocumentID) 
   - focusareas (Name and DocumentID)

3. **Information Gathering**
   If missing exercise information or need additional details from user, ask for clarification.

4. **Duplicate Check**
   Search existing exercises in Strapi to avoid duplicates. If similar exercise exists, inform user.

5. **Exercise Creation**
   When ready, create exercise with:
   - **Meaningful title**
   - **Brief description** of exercise goal
   - **Detailed step-by-step instructions** that allow even beginners to lead the training
     - Each step has title and description
     - For station-based exercises, use titles like "Station 1"
     - Otherwise use descriptive titles
   - **Duration** (consider most exercises are for 2 players - e.g., 2x5 minutes = 10 minutes total)
   - **Trainer hints** - what trainer must watch for
   - **Categories** - must select from existing Strapi categories
   - **Player levels** - must select from existing Strapi playerlevels
   - **Focus areas** - must select from existing Strapi focusareas

6. **Exercise Discussion**
   - Present exercise in chat
   - Discuss changes and suggestions with user
   - Repeat step 5 until both agree exercise is good
   - **NEVER** output JSON during discussion
   - **NEVER** invent categories/levels/areas
   - **NEVER** output schema definitions

7. **JSON Creation**
   Create JSON for Strapi storage using this format:
   ```json
   {
     "data": {
       "Name": "Exercise name",
       "Description": "Description",
       "Hint": "Trainer hints",
       "Minutes": 10,
       "VideoUrl": null,
       "approved": false,
       "deleted": false,
       "Steps": [
         {
           "__component": "irre.step",
           "Description": "Step 1"
         }
       ],
       "categories": {
         "connect": [{"documentId": "real-documentId-from-strapi"}]
       },
       "playerlevels": {
         "connect": [{"documentId": "real-documentId-from-strapi"}]
       },
       "focusareas": {
         "connect": [{"documentId": "real-documentId-from-strapi"}]
       },
       "publishedAt": null
     }
   }
   ```
   **IMPORTANT:**
   - Output **ONLY** pure JSON
   - **NO** Markdown formatting
   - **NO** ```json tags
   - **NO** explanations about JSON

8. **Save Exercise**
   Save the new exercise in Strapi

9. **User Feedback**
   Inform user exercise is saved with brief description for easy finding

10. **Continue**
    Offer user to create another exercise