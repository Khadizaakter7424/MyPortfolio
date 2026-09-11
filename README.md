# Khadiza Akter — Portfolio

A two-part project:

- **backend/PortfolioApi** — ASP.NET Core Web API (.NET 10). Owns **all** portfolio content
  (profile, skills, projects, education, languages, hobbies) and the "Let's Talk" contact form.
- **frontend** — React + TypeScript (Vite). Pure UI — it fetches everything from the API on load
  and stores no resume content of its own.

## Running the backend

Requires the .NET 10 SDK.

```bash
cd backend/PortfolioApi
dotnet restore
dotnet run
```

Starts on `http://localhost:5099` (and `https://localhost:7099`), with Swagger UI at `/swagger`
in development.

**Endpoints:**
- `GET /api/portfolio` — everything the site displays: profile, skills, projects, education,
  training, languages, hobbies, in one response.
- `POST /api/contact` — used by the "Let's Talk" form.
- `GET /api/contact` — review messages you've received.
- `PUT /api/contact/{id}/read`, `DELETE /api/contact/{id}` — manage them.
- `GET /media/profile.jpg` — your photo, served as a static file.

**Where the content lives:** the first time it runs, the API writes your resume content into
`backend/PortfolioApi/App_Data/portfolio.json`. Edit that file directly to update anything on the
site — name, objective, skills, projects, education, languages, hobbies — no code changes needed,
just restart the API (or refresh the page if you add a reload endpoint later).

Contact form submissions are saved separately to `backend/PortfolioApi/App_Data/messages.json`.

Your photo lives at `backend/PortfolioApi/wwwroot/media/profile.jpg` — replace the file to change it.

### Getting messages emailed to you (optional)

Open `appsettings.json` and fill in the `Smtp` section with your email provider's details (for Gmail,
use an "app password", not your normal password):

```json
"Smtp": {
  "Host": "smtp.gmail.com",
  "Port": "587",
  "Username": "you@gmail.com",
  "Password": "your-app-password",
  "FromAddress": "you@gmail.com",
  "ToAddress": "khadizabristy371@gmail.com"
}
```

Leave `Host` blank if you don't want email notifications — messages are still saved either way.

## Running the frontend

Requires Node.js 18+.

```bash
cd frontend
npm install
npm run dev
```

Open `http://localhost:5173`. The dev server proxies `/api` and `/media` requests to the backend
on port 5099 (see `vite.config.ts`), so make sure the backend is running too — the page shows a
loading state, then an error message if it can't reach the API.

## Deploying

Build the frontend with `npm run build` (outputs to `frontend/dist`) and either:
- serve it from the same ASP.NET Core app (copy `dist` into `wwwroot`, alongside `media/`, and add
  `app.MapFallbackToFile("index.html")` in `Program.cs`) — simplest, since both `/api` and the
  built frontend are then same-origin, or
- host it separately (e.g. Netlify/Vercel) and update `VITE`-time API calls to point at your
  deployed API's full URL, and add that origin to `Cors:AllowedOrigins` in `appsettings.json`.

## Design

The frontend uses a light "technical dossier" look — ink on paper, a drafting-table grid in the
background, the real .NET brand purple (`#512BD4`) as the single accent, and Space Grotesk paired
with IBM Plex Sans. A few deliberate animations tie it together rather than generic fade-ins
everywhere:
- The hero headline masks in line by line on load, followed by the rest of the hero content.
- A slow marquee ticker below the hero scrolls through your technologies (pauses on hover, and is
  disabled entirely if the visitor has reduced motion turned on).
- Section content reveals on scroll via a shared `<Reveal>` component (`src/components/Reveal.tsx`),
  used consistently rather than per-component one-offs.
- The three hero stats (projects shipped, technologies used, languages spoken) count up once
  they scroll into view (`src/components/AnimatedNumber.tsx`).
- A scroll-progress bar and a "back to top" button appear once you've scrolled a bit.

All of this respects `prefers-reduced-motion` — visitors with that setting on get the finished
layout with no animation.



All content is backend-owned now: edit `backend/PortfolioApi/App_Data/portfolio.json` (or change
the seed data in `Services/JsonPortfolioDataProvider.cs` before first run) to update skills,
projects, education, or your objective. The React components only render whatever
`GET /api/portfolio` returns — you won't find any resume text inside `frontend/src`.
