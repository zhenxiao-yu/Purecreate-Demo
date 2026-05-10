# Purecreate Designer Studio

A 3D clothing customizer with AI-powered logo and texture generation. Customize a t-shirt in real-time, add logos / text, and generate custom designs using DALL·E 3.

The application lives in [`next/`](next/) — a Next.js 15 (App Router) app that combines the frontend and the OpenAI-backed image API in a single deployable unit.

## Quick start

```bash
cd next
cp .env.example .env.local        # add your OPENAI_API_KEY
npm install
npm run dev                       # http://localhost:3000
```

See [`next/README.md`](next/README.md) for full details on the stack, API routes, project structure, and Vercel deployment.

## Tech stack

- **Next.js 15** (App Router) + **React 18** + **Tailwind CSS**
- **react-three-fiber** + **drei** + **three.js** for the 3D canvas
- **Valtio** for reactive state
- **OpenAI SDK** (DALL·E 3) inside Next.js Route Handlers — no separate backend server

## License

[MIT](LICENSE)

## Contact

For questions or feedback, please reach out to **Mark Yu** at [zyu347@uwo.ca](mailto:zyu347@uwo.ca).
