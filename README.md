# EventSphere AI - Event Planning & Performance Insights

![Node.js](https://img.shields.io/badge/Node.js-22.x_LTS-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![TypeScript](https://img.shields.io/badge/TypeScript-6-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-8-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-Database-4169E1?style=for-the-badge&logo=postgresql&logoColor=white)
![Drizzle ORM](https://img.shields.io/badge/Drizzle_ORM-TypeScript-C5F74F?style=for-the-badge&logo=drizzle&logoColor=black)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)
![GitHub Actions](https://img.shields.io/badge/GitHub_Actions-CI-2088FF?style=for-the-badge&logo=githubactions&logoColor=white)
![Vitest](https://img.shields.io/badge/Vitest-5.x-6E9F18?style=for-the-badge&logo=vitest&logoColor=white)
![Playwright](https://img.shields.io/badge/Playwright-E2E-2EAD33?style=for-the-badge&logo=playwright&logoColor=white)

**EventSphere AI** is an event-planning project focused on helping organizers manage events and understand how they perform. Its product direction brings event setup, attendee management, check-in, and post-event insights together in one place.

**Live Demo:** [eventsphere-ai-v63.vercel.app](https://eventsphere-ai-v63.vercel.app/)

> **Project status:** The current client is a product landing page with feature previews. The server and database schema are starter foundations; the complete event-management API and AI analytics integration are still to be implemented.

---

## Project Overview

Event organizers need to coordinate logistics while also answering practical questions: how many people attended, when guests arrived, and how the event performed against expectations. EventSphere AI aims to make those details easier to manage and review.

### Product Goals

1. **Simplify event planning:** Keep event details and attendee information organized.
2. **Make check-in easier:** Track arrivals and correct accidental check-ins.
3. **Turn event data into insights:** Summarize attendance, turnout, and revenue information in a way that is easy to understand.

## Key Features

- **Event setup:** Record event dates, venues, ticket prices, and attendee capacity.
- **Attendee management:** Keep attendee lists and registration details together.
- **Event check-in:** Track attendee arrivals and reverse check-ins when needed.
- **Performance insights:** Present attendance, arrival patterns, turnout statistics, and revenue summaries.

## Tech Stack

| Area                     | Technology                                                      |
| :----------------------- | :-------------------------------------------------------------- |
| **Frontend**             | React 19, TypeScript, Vite, Tailwind CSS 4                      |
| **Backend**              | Node.js, Express 5, TypeScript                                  |
| **Database**             | PostgreSQL, Drizzle ORM                                         |
| **Testing**              | Vitest (client), Jest (server), Playwright (E2E)                |
| **Deployment**           | Vercel (frontend), Render (backend), Neon (PostgreSQL database) |
| **CI**                   | GitHub Actions                                                  |
| **Workspace management** | npm workspaces                                                  |

## Getting Started

### Prerequisites

- Node.js 20.19+ or 22.12+ (required by Vite 8)
- npm
- PostgreSQL (for database migrations and database-backed development)

### Install and run

1. Clone the repository and enter the project directory:

   ```bash
   git clone https://github.com/chingu-voyages/V63-tier3-team-31.git
   cd V63-tier3-team-31
   ```

2. Install the dependencies:

   ```bash
   npm ci
   ```

3. Start the client and server together:

   ```bash
   npm run dev
   ```

   - Client: `http://localhost:5173`
   - Server health endpoint: `http://localhost:8080/api/hello`

### Configure the database

To run database migrations, create a local PostgreSQL database, then copy `server/.env.example` to `server/.env` and set the connection string:

```env
PORT=8080
DATABASE_URL=postgresql://username:password@localhost:5432/eventsphere
```

Run the migrations from the repository root:

```bash
npm run db:migrate --workspace=server
```

## Development Commands

| Command                                 | Description                                     |
| :-------------------------------------- | :---------------------------------------------- |
| `npm run dev`                           | Start the client and server in development mode |
| `npm run dev:client`                    | Start only the Vite client                      |
| `npm run dev:server`                    | Start only the Express server                   |
| `npm run build`                         | Build both workspaces                           |
| `npm run test:client`                   | Run the client test suite                       |
| `npm run test:server`                   | Run the server test suite                       |
| `npm run db:migrate --workspace=server` | Apply database migrations                       |

The GitHub Actions workflow runs the client and server test runners and builds both workspaces on pushes and pull requests.

## Architecture

```mermaid
flowchart LR
    Browser[Organizer] --> Client[React and Vite client]
    Client --> API[Express API]
    API --> ORM[Drizzle ORM]
    ORM --> Database[(PostgreSQL)]
    API --> Insights[Event performance insights]
```

## Meet the Team

| Name                  | Role          | Links                                                                                                                  |
| :-------------------- | :------------ | :--------------------------------------------------------------------------------------------------------------------- |
| **Chimdindu Nwobodo** | Product Owner | [GitHub](https://github.com/chimdisandra) / [LinkedIn](https://www.linkedin.com/in/chimdindu-nwobodo-ba0a75316/chimdi) |
| **Terence Lui**       | Scrum Master  | [GitHub](https://github.com/lwhterence) / [LinkedIn](https://www.linkedin.com/in/terence-lui-7ab78a4/)                 |
| **Banto-Laczi Klára** | Web Developer | [GitHub](https://github.com/bantoklara) / [LinkedIn](https://www.linkedin.com/in/banto-laczi-klara/)                   |
| **Pratyusha Dasari**  | Web Developer | [GitHub](https://github.com/pratyusha-ds) / [LinkedIn](https://www.linkedin.com/in/pratyusha-ds/)                      |
| **Mohamed Ouederni**  | Web Developer | [GitHub](https://github.com/9-barristanselmy-9) / [LinkedIn](https://www.linkedin.com/in/mohamed-ouederni-0bb11ab4/)   |
| **Sasikumar**         | Web Developer |                                                                                                                        |
| **Eduard**            | Web Developer |                                                                                                                        |
