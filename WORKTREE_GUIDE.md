# Git Worktrees Setup Guide

## 🎯 Overview
You now have three separate working directories for parallel development:

```
expense-tracker-ai/          (main branch - original repo)
expense-tracker-export/      (feature/data-export branch)
expense-tracker-analytics/   (feature/analytics-dashboard branch)
```

## 📁 Worktree Structure

### Main Repository (`expense-tracker-ai/`)
- **Branch**: `main`
- **Purpose**: Main development, integration, releases
- **Contains**: Base expense tracker application

### Export Feature (`expense-tracker-export/`)
- **Branch**: `feature/data-export`
- **Purpose**: Data export system development
- **Features to implement**:
  - CSV export functionality
  - PDF report generation
  - JSON data export
  - Export configuration options
  - Batch export capabilities

### Analytics Feature (`expense-tracker-analytics/`)
- **Branch**: `feature/analytics-dashboard`
- **Purpose**: Analytics and insights development
- **Features to implement**:
  - Interactive charts and graphs
  - Spending trends analysis
  - Category breakdowns
  - Monthly/yearly comparisons
  - Budget vs actual analysis

## 🔄 How Worktrees Work

### Isolation Benefits
1. **Separate Working Directories**: Each worktree has its own files and can be in different states
2. **Independent Development**: Work on features without affecting each other
3. **Shared Git History**: All worktrees share the same `.git` repository
4. **Branch Isolation**: Each worktree is on a different branch

### Shared Elements
- **Git History**: All commits, branches, and tags are shared
- **Configuration**: Git config settings are shared
- **Remotes**: Remote repositories are shared across worktrees

## 🚀 Working with Worktrees

### Switching Between Features
```bash
# Work on export feature
cd ../expense-tracker-export

# Work on analytics feature  
cd ../expense-tracker-analytics

# Return to main
cd ../expense-tracker-ai
```

### Development Workflow

#### For Export Feature:
```bash
cd ../expense-tracker-export

# Start development
npm install  # if needed
npm run dev

# Make changes, commit
git add .
git commit -m "feat: add CSV export functionality"

# Push feature branch
git push origin feature/data-export
```

#### For Analytics Feature:
```bash
cd ../expense-tracker-analytics

# Start development
npm install  # if needed
npm run dev

# Make changes, commit
git add .
git commit -m "feat: add spending trends chart"

# Push feature branch
git push origin feature/analytics-dashboard
```

### Merging Features Back to Main

#### Option 1: Merge from main repository
```bash
cd ../expense-tracker-ai  # main repo

# Merge export feature
git checkout main
git merge feature/data-export

# Merge analytics feature
git merge feature/analytics-dashboard
```

#### Option 2: Use Pull Requests (Recommended)
1. Push feature branches to remote
2. Create Pull Requests on GitHub/GitLab
3. Review and merge through web interface

## 📋 Useful Commands

### Worktree Management
```bash
# List all worktrees
git worktree list

# Remove a worktree (from any worktree)
git worktree remove ../expense-tracker-export

# Add new worktree
git worktree add ../new-feature -b feature/new-feature

# Prune deleted worktrees
git worktree prune
```

### Branch Management
```bash
# See all branches (from any worktree)
git branch -a

# Create new branch in current worktree
git checkout -b feature/sub-feature

# Switch branches in current worktree
git checkout other-branch
```

### Status Checking
```bash
# Check status of current worktree
git status

# Check status of all worktrees
git worktree list --porcelain
```

## ⚠️ Important Considerations

### Do's ✅
- **Commit regularly** in each worktree
- **Push feature branches** to remote for backup
- **Keep main branch clean** for integration
- **Use descriptive commit messages**
- **Test features independently**

### Don'ts ❌
- **Don't checkout the same branch** in multiple worktrees
- **Don't delete worktree directories** manually (use `git worktree remove`)
- **Don't forget to push** feature branches before merging
- **Don't work on main branch** in feature worktrees

### Potential Issues & Solutions

#### Issue: "Branch is checked out in another worktree"
**Solution**: Each branch can only be checked out in one worktree at a time

#### Issue: Node modules conflicts
**Solution**: Run `npm install` in each worktree separately

#### Issue: Port conflicts during development
**Solution**: Use different ports for each worktree:
```bash
# Export feature
npm run dev -- --port 3001

# Analytics feature  
npm run dev -- --port 3002
```

## 🎯 Development Strategy

### Phase 1: Independent Development
1. Develop export features in `expense-tracker-export/`
2. Develop analytics features in `expense-tracker-analytics/`
3. Test each feature independently

### Phase 2: Integration Testing
1. Merge one feature to main
2. Test integration
3. Merge second feature
4. Resolve any conflicts
5. Final integration testing

### Phase 3: Cleanup
1. Remove worktrees after successful merge
2. Delete feature branches if no longer needed
3. Continue development on main branch

## 🔧 Quick Setup Commands

If you need to recreate this setup:
```bash
# From main repository
git worktree add ../expense-tracker-export -b feature/data-export
git worktree add ../expense-tracker-analytics -b feature/analytics-dashboard
git worktree list
```

## 📊 Current Status
✅ **Export Worktree**: Ready at `../expense-tracker-export` (branch: feature/data-export)
✅ **Analytics Worktree**: Ready at `../expense-tracker-analytics` (branch: feature/analytics-dashboard)
✅ **Main Repository**: Available at current location (branch: main)

You can now start developing both features in parallel! 🚀