# To-do App Project

## Projektist

See projekt sisaldab täisfunktsionaalset To-do rakendust:
- Backend: Node.js + Express + SQLite
- Frontend: React
- Töövood: GitHub Actions (DigitalOcean, Azure, GitHub Pages)

## Käsud arendamiseks

### Lokaalne käivitamine (eeldab Dockerit)

```bash
docker-compose up --build
```

### React frontendi ehitamine

```bash
cd frontend-react
npm install
npm run build
```

## GitHub Actions

Kasutatakse kolme töövoogu:
- `deploy-do.yml` – DockerHub + DigitalOcean App Platform
- `deploy-azure.yml` – Azure Functions
- `deploy-pages.yml` – GitHub Pages (React buildist)

## AI kasutamine

Näited küsimustest:
- "Koosta API päring React komponendis fetch() abil."
- "Lisa kood, mis märgistab to-do tehtuks."
- "Loo testid sqlite CRUD funktsioonidele."

## Hindamine

Hindamine toimub juhendmaterjalis toodud kriteeriumite põhjal.
