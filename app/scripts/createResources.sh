#!/bin/bash

# Check if at least one folder name is provided
if [ -z "$1" ]; then
    echo "Usage: $0 <folder_name1> [folder_name2 ...]"
    exit 1
fi

# Set the base directory
BASE_DIR="./app/resources"

# Define subfolders
SUBFOLDERS=("Controllers" "Services" "Queries" "Validators" "Routers")

# Loop through each folder name provided as an argument
for PARENT_FOLDER in "$@"; do
    PARENT_PATH="$BASE_DIR/$PARENT_FOLDER"
    
    # Check if the parent folder already exists
    if [ -d "$PARENT_PATH" ]; then
        echo "Folder $PARENT_FOLDER already exists. Skipping..."
        continue
    fi
    
    # Create the parent folder
    mkdir -p "$PARENT_PATH"
    
    echo "Creating folder structure in $PARENT_PATH..."
    
    # Loop through subfolders and create files
    for folder in "${SUBFOLDERS[@]}"; do
        # Convert folder name to lowercase singular form
        folder_lower=$(echo "$folder" | tr '[:upper:]' '[:lower:]')
        
        # Handle special case for Queries
        if [ "$folder" == "Queries" ]; then
            file_name="$PARENT_FOLDER.query.js"
        else
            folder_singular=$(echo "$folder_lower" | sed 's/s$//')
            file_name="$PARENT_FOLDER.$folder_singular.js"
        fi
        
        # Create the subfolder
        mkdir -p "$PARENT_PATH/$folder"
        
        # Create the corresponding file in lowercase
        touch "$PARENT_PATH/$folder/${file_name,,}"
    
        echo "Created: $PARENT_PATH/$folder/${file_name,,}"
    done

done

echo "Folder structures and files created successfully."