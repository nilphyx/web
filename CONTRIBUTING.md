# Contributing to Lex-Impact

Welcome, We are excited that you are interested in contributing to Lex-Impact.

This document outlines the steps you should follow to ensure a smooth contribution process.

---

## Getting Started

### 1. Fork the Repository
First, fork the repository to your own Github account.

Click on the **"Fork"** button on the top right of the page.

---

### 2. Clone Your Fork
Clone your fork repository to your local machine:

```bash
git clone https://github.com/your-username/leximpact.git
cd leximpact
```

### 3. Install Dependencies
After cloning, install the project's dependencies:

```bash
npm install
```
### Setup Environment Varables

Create a `.env.local` file in the root of the project
Copy the enviromnemt variables from `.env.example` from the clone project into the `.env.local` you just created

```bash
cp .env.example .env.local
```

You can get the requested variable from the WhatsApp group

### Running the Project Locally

Start the development server:
```bash
npm run dev
```
The app should be runnig on 

```bash
http://localhost:3000
```
### Running lint and test

```bash
npm run lint

npm run test

```
### Branching Strategy
We use a simple Git flow:
- `main` - Stable branch (Production ready code)
- `dev` - Active development branch
- type/short-description  
- eg `feat/login-flow` - Your workig branch for features or fixes

**Some common commit types we would be using**

- `feat` - A new feature
- `fix` - A bug fix
- `chore` - Minor tasks, refactoring, updates
- `docs` - Documentation changes
- `style` - Code formatting, no code change
- `refactor` - Code changes without fixing a bug or adding a feature
- `test` - Adding or updating tests
- `perf` - Performance improvements
- `ci` - CI/CD configuration changes
- `build` - Build-related changes

**Some common commit scopes we would be using**

- `auth` - Authentication system (login, signup, reset password)
- `user` - User-related features (profiles, settings)
- `task` - CRUD tasks
- `course` - Course tasks or pages
- `dashboard` - Dashboard tasks or pages
- `dc` - Data Center tasks or pages
- `rc` - Resource Compute tasks or pages
- `api` - API integrations
- `ui` - UI components (eg buttons, modals, etc.)
- `tests` - Specific to test files 
  > **❗** Scope should match logical parts of the app — not physical folders.

### 4. Create a `dev` branch on your fork (if you do not have already)

```bash
git checkout -b dev

git push origin dev

```

### 5. Create a Feature Branch From Your Fork's `dev`

```bash
git checkout dev
git pull origin dev
git checkout -b feature/[short-description]
```

Example:

```bash
git checkout -b feature/add-user-auth
```

## Code Standards and Commit Messages

### Commit Message Format
 Use Conventional Commits standard to make to make commit history easy to understand
 ```bash
 <type>(<scope>): <short summary>
 ```
 Example:
 ```bash
feat(auth): implement user login flow
fix(task): resolve crash when deleting task
chore(deps): update package dependencies
 ```

 ### Run Tests and Build Before Push

 Before pushing, make sure your code is clean:
 ```bash
npm run lint
npm run test
npm run build
 ```

 ### Pushing Changes

 Push your feature branch to your fork:

 ```bash
 git add .
 git commit -m "feat(auth): add login UI"
 git push origin feature/[short-description]
 ```

 ### Submitting a Pull Request (PR)

 1. Open a PR from your forks `dev` branch into the main repository's `dev` branch.
 2. Fill in the provided Pull Request template:
   - Add contribution, changes made, why this change  and how to test it
   - Add a Loom video demonstration if possible.   
 3. Request at least one reviewer
 4. Make sure all tests pass before asking for review.
   ❗ Important: Always PR to `dev`, not `main`.

### Pull Request Checklist
- - [X] Sync your `dev` branch with the main `dev` branch
- - [X] Code builds successfully
- - [x] Linting and tests pass
- - [x] PR points to dev
- - [x] PR description filled correctly
- - [x] Screenrecord provided if needed
- - [x] Changes are focused and small

### Keeping Your Fork Updated

Regularly sync your fork's `dev` branch with the main `dev`:

```bash
git fetch upstream
git checkout dev
git merge upstream/dev
git push origin dev
```

### Need Help?

If you have any questions?

- Reachout on the WhatsApp group