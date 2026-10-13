# Smart Campus - Frontend (React + Vite)

## Run locally
```bash
cd frontend
npm install
copy .env.example .env        # Windows (use "cp" on Mac/Linux)
npm run dev
```
Open http://localhost:5173 (the backend must be running on port 8080).

## Environment variable
| Name | Meaning | Example |
|---|---|---|
| `VITE_API_BASE_URL` | Backend API address (must end with `/api`) | `http://localhost:8080/api` |

Vite reads `.env` **when the dev server starts**. Restart `npm run dev` after editing it.

## Build for production
```bash
npm run build     # creates the dist/ folder
```

## Folder map
- `src/services/` - all Axios calls (`api.js`, `studentService.js`)
- `src/pages/` - one file per screen
- `src/components/` - reusable pieces (table, form, dialog, alerts)
