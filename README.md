# Pruneus
>"Prune the length, keep the reach"

## Steps to run the project

### Step 1: Clone the repository

```bash
git clone
```

### Step 2: Install the dependencies

```bash
cd .\web-coding-challenge\
composer install
npm install
npm run build
```

### Step 3: Create a new `.env` file

```bash
cp .env.example .env
```

Set `APP_URL=http://localhost:8000` or your local URL

### Step 4: Generate a new application key

```bash
php artisan key:generate
```

### Step 5: Run the migration

```bash
php artisan migrate
```

### Step 6: Start the development server

```bash
php artisan serve
```

```bash
npm run dev
```

## Notes
Next ideas for upgrading the project:
- add pagination to the user's links block
- update generation of the slug 
  - f.e/ use timestamp based encryption, so we don't need to check if the non-custom slug is unique
- add redis (or something like this) for caching the links
- add rate limiting for the creation of the links
...
