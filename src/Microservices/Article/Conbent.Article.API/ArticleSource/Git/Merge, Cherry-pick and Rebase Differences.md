#ConbentWebProject 
#### Description
Differences on use cases between merge, cherry-pick, and rebase:

1. **Merge**:
    - Merge is commonly used to integrate the work done in feature branches back into the main development branch (e.g., merging feature branches into `master` or `develop`). It's also used to incorporate changes from one branch into another without altering the commit history.
2. **Cherry-pick**:
    - Cherry-pick is useful when you only want to apply specific commits from one branch to another, such as when you need to backport a bug fix from a stable release branch to an older release branch or when you want to apply a hotfix to a production branch without merging the entire feature branch.
3. **Rebase**:
    - Rebase is commonly used to maintain a linear, cleaner commit history by incorporating changes from one branch onto another without creating merge commits. It's often used to update feature branches with changes from the main development branch (`master` or `develop`) before merging to ensure a smoother integration process.

