This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, intall the application dependencies:

```bash
npm i
```

Next, run the development server:

```bash
npm run dev
```

In a new terminal, run the mock api server:

```bash
npm run start:mock-api
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Running Tests

With the development and mock api servers running, you can run the tests in headless mode:

```bash
npm run test:e2e
```

Or, visually inspect the tests:

```bash
npm run test:e2e:debug
```

## Build for Production

First, confirm the correct environment variables are set in `.env.production`.

Next, run the build command to create a production bundle:

```bash
npm run build
```

Then, run the production bundle:

```bash
npm run start
```

## Project Structure

```
├── app                 # nextjs app root
│   ├── users           # route /users
│   │   ├── components  # specific to this route
│   │   ├── page.tsx
│   ├── page.tsx
├── components          # shared components (shadcn/ui)
├── hooks               # shared hooks (shadcn/ui)
├── lib
│   ├── utils.ts        # (shadcn/ui)
├── e2e                 # e2e specs (playwright)
├── mocks               # mock api config (json-server)
├── node_modules
├── package.json
├── package-lock.json
```

## Design Decisions

The following considerations were made during the design and development of the application. Points marked as Out of Scope were deprioritised due to time constraints.

1. Meta Framework vs SPA
   - Considerations
     - time constraints: extra effort to bootstrap a SPA with bundling and routing
     - scalability: future requirements may add features like SSR or or image optimisation
     - expertise: experienced with data fetching paradigms which reduces time spent debugging.
     - **Decision: Use Next.js**
2. Testing Strategy
   - e2e
     - tests a range of components in the browser
     - provides a target (when this is built, stop)
     - a large test suite can become brittle, especially if testing to many edge cases (like variations of input validation)
   - unit
     - the application consists many presentation components that don't get value from unit tests
   - **Decision: Implement e2e tests**
3. Mock API Server
   - build it
     - using `/api` routes and implementing an in-memory storage is flexible
     - time and effort in builing a mock solution
   - buy it
     - out of the box solution is quick to set up
     - urls can be configured to match requirements
   - **Decision: Use out of the box solution - `json-server`**
4. Project Structure
   - **Decision: Use default config and directories provided by libraries**
   - Motivation
     - Works out of the box
     - Single developer on the project
     - Limited scope
     - As the scope grows, we can refactor into a scalable project structure
5. Production Readiness Checklist
   - [x] Acceptance tests
   - [x] Optimised production bundle
     - SSG/SSR on applicable routes
     - remove `data-testid` attributes
   - [o] Error handling
     - network failure handled on create/edit/delete actions.
     - App level error handling - Out of Scope
     - Monitoring (Sentry) - Out of Scope
   - [ ] Configure [Content Security Policy](https://nextjs.org/docs/app/building-your-application/configuring/content-security-policy) - Out of Scope
   - [ ] Docker - Out of Scope
   - [ ] GitHub Actions - Out of Scope
