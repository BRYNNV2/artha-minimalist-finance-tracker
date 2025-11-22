# Artha - Minimalist Finance Tracker

[cloudflarebutton]

Artha is a visually stunning, minimalist personal finance monitoring application designed to make tracking money effortless and beautiful. It features a sleek, modern dashboard that provides an instant snapshot of financial health, including real-time balance calculation, income vs. expense tracking, and categorization. The application leverages Cloudflare Durable Objects for high-performance, low-latency data persistence, ensuring transactions are saved instantly. The UI is built with a 'glassmorphic' and 'clean' aesthetic, utilizing ample whitespace, subtle gradients, and smooth micro-interactions to reduce financial anxiety and promote clarity. Key features include a quick-add transaction interface, interactive spending charts, and a categorized transaction history ledger.

## Features

- **Real-Time Dashboard**: Instant overview of balance, income, expenses, and monthly summaries with interactive charts.
- **Transaction Management**: Easy addition, editing, and deletion of transactions with categories, dates, and notes.
- **Responsive Design**: Flawless experience on desktop, tablet, and mobile devices.
- **Data Persistence**: Secure, low-latency storage using Cloudflare Durable Objects.
- **Visual Excellence**: Modern UI with glassmorphism, smooth animations, and intuitive navigation.
- **Analytics**: Trend charts and categorized spending insights powered by Recharts.

## Technology Stack

### Frontend
- **React 18**: Core framework for building interactive UIs.
- **React Router**: Client-side routing.
- **Tailwind CSS**: Utility-first styling with custom themes.
- **Shadcn/UI**: Accessible, customizable UI components.
- **Framer Motion**: Smooth animations and micro-interactions.
- **Recharts**: Beautiful, responsive charts for financial data.
- **Zustand**: Lightweight state management.
- **React Hook Form & Zod**: Form handling and validation.
- **Lucide React**: Icon library.
- **Date-fns**: Date manipulation utilities.
- **Sonner**: Toast notifications.

### Backend
- **Hono**: Fast web framework for Cloudflare Workers.
- **Cloudflare Workers**: Serverless execution environment.
- **Cloudflare Durable Objects**: Stateful storage for transactions.
- **TypeScript**: Full-stack type safety.

### Development Tools
- **Vite**: Fast build tool and dev server.
- **Bun**: Package manager and runtime (used for setup and scripts).
- **Wrangler**: Cloudflare CLI for deployment and management.
- **ESLint & TypeScript**: Code quality and type checking.

## Quick Start

### Prerequisites
- [Bun](https://bun.sh/) installed (version 1.0+ recommended).
- [Cloudflare Account](https://dash.cloudflare.com/) with Workers enabled.
- Node.js (for some dev dependencies, but Bun is primary).

### Installation

1. Clone the repository:
   ```
   git clone <repository-url>
   cd artha-finance-tracker
   ```

2. Install dependencies using Bun:
   ```
   bun install
   ```

3. (Optional) Generate TypeScript types from Wrangler:
   ```
   bun run cf-typegen
   ```

The project is now ready for development.

## Usage

### Running Locally

Start the development server:
```
bun run dev
```

The app will be available at `http://localhost:3000` (or the port specified in your environment).

### Key User Flows

- **Dashboard View**: Navigate to the home page (`/`) to see balance summaries, recent transactions, and spending charts.
- **Add Transaction**: Use the floating "+" button or sidebar to open the transaction modal. Enter amount, category, date, and notes.
- **View Analytics**: Scroll to the chart section for interactive visualizations of income vs. expenses.
- **Mobile Experience**: The app adapts seamlessly; use the bottom navigation or hamburger menu on smaller screens.

Example API interaction (from frontend code):
```tsx
// Fetch transactions
const transactions = await api<Transaction[]>('/api/finance/transactions');

// Add a transaction
const newTx = await api<Transaction>('/api/finance/transactions', {
  method: 'POST',
  body: JSON.stringify({ amount: 25000, category: 'Food', type: 'expense' })
});
```

## Development

### Scripts

- `bun run dev`: Start the Vite dev server.
- `bun run build`: Build for production.
- `bun run lint`: Run ESLint checks.
- `bun run preview`: Preview the built app locally.
- `bun run deploy`: Build and deploy to Cloudflare Workers.

### Project Structure

- `src/`: Frontend React application.
  - `pages/`: Main views (e.g., HomePage.tsx for dashboard).
  - `components/`: Reusable UI components and layouts.
  - `hooks/`: Custom React hooks (e.g., useTheme).
- `worker/`: Backend Cloudflare Worker.
  - `user-routes.ts`: Add custom API endpoints here.
  - `entities.ts`: Define Durable Object entities (e.g., FinanceAccountEntity).
- `shared/`: Shared types between frontend and backend.
- `tailwind.config.js`: Custom Tailwind configuration.

### Adding Features

1. **Frontend**: Create new pages/routes in `src/pages/` and add to `src/main.tsx` router.
2. **Backend Routes**: Implement in `worker/user-routes.ts` using entity helpers from `worker/entities.ts`.
3. **Entities**: Extend `IndexedEntity` in `worker/entities.ts` for new data models.
4. **Styling**: Use Tailwind classes and Shadcn components; avoid custom CSS unless necessary.
5. **Testing**: Add unit tests for components and integration tests for API endpoints.

Ensure all changes maintain responsive design and accessibility standards.

## Deployment

Deploy to Cloudflare Workers for global, edge-deployed performance:

1. Authenticate with Cloudflare:
   ```
   wrangler login
   ```

2. Configure your project (Wrangler uses `wrangler.jsonc` automatically).

3. Deploy:
   ```
   bun run deploy
   ```

The app will be live at your Workers subdomain (e.g., `artha-finance-tracker.your-account.workers.dev`). Assets are served as a static site with Worker routing for API calls.

For custom domains or advanced configuration, refer to the [Cloudflare Workers documentation](https://developers.cloudflare.com/workers/).

[cloudflarebutton]

## Contributing

Contributions are welcome! Please:

1. Fork the repository.
2. Create a feature branch (`git checkout -b feature/amazing-feature`).
3. Commit changes (`git commit -m 'Add amazing feature'`).
4. Push to the branch (`git push origin feature/amazing-feature`).
5. Open a Pull Request.

Follow the existing code style and ensure tests pass. Focus on visual polish and performance.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Support

For issues, open a GitHub issue. For questions, check the [Cloudflare Workers docs](https://developers.cloudflare.com/workers/) or community forums.