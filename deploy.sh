#!/bin/bash

# Quick deploy script for EVZAIN
# Usage: ./deploy.sh "your commit message"

# Check if commit message provided
if [ -z "$1" ]; then
  echo "❌ Please provide a commit message"
  echo "Usage: ./deploy.sh \"your commit message\""
  exit 1
fi

echo "🚀 Deploying to evzain.com..."
echo ""

# Add all changes
git add -A

# Commit with provided message
git commit -m "$1"

# Push to GitHub (triggers Vercel deploy)
git push

echo ""
echo "✅ Pushed to GitHub!"
echo "⏳ Vercel is building... (30-60 seconds)"
echo "🌐 Check: https://evzain.com"
