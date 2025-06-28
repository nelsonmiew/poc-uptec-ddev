#!/bin/bash

# Script to extract uploads and languages folders from wp-content backup
# Author: Auto-generated script
# Date: $(date)

set -e  # Exit on any error

# Define paths
BACKUP_ZIP=".data/wp-content_backup.zip"
WP_CONTENT_DIR="wordpress/wp-content"
TEMP_DIR="/tmp/wp-content-extract-$$"

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${GREEN}[INFO]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Check if backup file exists
if [ ! -f "$BACKUP_ZIP" ]; then
    print_error "Backup file $BACKUP_ZIP not found!"
    exit 1
fi

print_status "Found backup file: $BACKUP_ZIP"

# Check if wp-content directory exists
if [ ! -d "$WP_CONTENT_DIR" ]; then
    print_error "WordPress content directory $WP_CONTENT_DIR not found!"
    exit 1
fi

print_status "WordPress content directory found: $WP_CONTENT_DIR"

# Create temporary directory
mkdir -p "$TEMP_DIR"
print_status "Created temporary directory: $TEMP_DIR"

# Function to cleanup temporary directory
cleanup() {
    print_status "Cleaning up temporary directory..."
    rm -rf "$TEMP_DIR"
}

# Set trap to cleanup on exit
trap cleanup EXIT

# Extract the zip file to temporary directory
print_status "Extracting backup file to temporary directory..."
unzip -q "$BACKUP_ZIP" -d "$TEMP_DIR"

# Check what's inside the extracted content
print_status "Checking extracted content structure..."
if [ -d "$TEMP_DIR/wp-content-download" ]; then
    EXTRACTED_BASE="$TEMP_DIR/wp-content-download"
    print_status "Found wp-content-download directory in backup"
elif [ -d "$TEMP_DIR/wp-content" ]; then
    EXTRACTED_BASE="$TEMP_DIR/wp-content"
    print_status "Found wp-content directory in backup"
elif [ -d "$TEMP_DIR/uploads" ] || [ -d "$TEMP_DIR/languages" ]; then
    EXTRACTED_BASE="$TEMP_DIR"
    print_status "Found uploads/languages directories directly in backup"
else
    print_warning "Searching for uploads and languages folders in backup..."
    EXTRACTED_BASE=$(find "$TEMP_DIR" -type d \( -name "wp-content" -o -name "*wp-content*" \) | head -1)
    if [ -z "$EXTRACTED_BASE" ]; then
        EXTRACTED_BASE="$TEMP_DIR"
        print_warning "Using backup root directory as base"
    else
        print_status "Found wp-content at: $EXTRACTED_BASE"
    fi
fi

# Function to copy directory with merge capability
copy_with_merge() {
    local source_dir="$1"
    local dest_dir="$2"
    local folder_name="$3"
    
    if [ -d "$source_dir" ]; then
        print_status "Processing $folder_name folder..."
        
        # Create destination directory if it doesn't exist
        mkdir -p "$dest_dir"
        
        # If destination exists, create a backup first
        if [ -d "$dest_dir" ] && [ "$(ls -A "$dest_dir" 2>/dev/null)" ]; then
            backup_name="${dest_dir}.backup.$(date +%Y%m%d_%H%M%S)"
            print_warning "Creating backup of existing $folder_name to: $backup_name"
            cp -r "$dest_dir" "$backup_name"
        fi
        
        # Copy/merge the new directory content
        print_status "Merging $folder_name content..."
        cp -r "$source_dir"/* "$dest_dir"/ 2>/dev/null || {
            print_warning "Some files in $folder_name may have had permission issues, but continuing..."
        }
        
        print_status "Successfully merged $folder_name folder"
        
        # Show some stats
        file_count=$(find "$dest_dir" -type f 2>/dev/null | wc -l)
        dir_size=$(du -sh "$dest_dir" 2>/dev/null | cut -f1)
        print_status "$folder_name: $file_count files, $dir_size total size"
    else
        print_warning "$folder_name folder not found in backup at: $source_dir"
        print_status "Available directories in backup:"
        find "$EXTRACTED_BASE" -maxdepth 2 -type d | head -10
    fi
}

# Extract uploads folder
print_status "Extracting uploads folder..."
copy_with_merge "$EXTRACTED_BASE/uploads" "$WP_CONTENT_DIR/uploads" "uploads"

# Extract languages folder
print_status "Extracting languages folder..."
copy_with_merge "$EXTRACTED_BASE/languages" "$WP_CONTENT_DIR/languages" "languages"

# Set proper permissions
print_status "Setting proper permissions..."
if [ -d "$WP_CONTENT_DIR/uploads" ]; then
    chmod -R 755 "$WP_CONTENT_DIR/uploads"
    print_status "Set permissions for uploads folder"
fi

if [ -d "$WP_CONTENT_DIR/languages" ]; then
    chmod -R 755 "$WP_CONTENT_DIR/languages"
    print_status "Set permissions for languages folder"
fi

# Final status
print_status "Extraction completed successfully!"
print_status "Check the following directories:"
echo "  - $WP_CONTENT_DIR/uploads"
echo "  - $WP_CONTENT_DIR/languages"

# Show final directory structure
print_status "Current wp-content structure:"
ls -la "$WP_CONTENT_DIR/"
