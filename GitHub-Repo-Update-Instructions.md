# Git Update Instructions
1. Open the terminal and navigate to the project folder.
2. Run the command `git pull`.
3. If there are any conflicts, resolve them by editing the files in the conflicted regions.
4. Run the command `git add .` to stage the changes.
5. Run the command `git commit -m "Your commit message"` to commit the changes.
6. Run the command `git push origin` to push the changes to the remote repository.

Or tell trae.ai to "stage changes on git repo" can it can do it for you

# If you want to undo AND rewrite files
1. Run the command `git reset --hard HEAD~1` to undo the last commit.
2. Edit the files as needed.
3. Run the command `git add .` to stage the changes.
4. Run the command `git commit -m "Your commit message"` to commit the changes.
5. Run the command `git push origin --force` to force push the changes to the remote repository.