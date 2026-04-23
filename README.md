# AeroCore Systems - Propulsion E-Commerce
## Jules Learning Project - 001

Welcome to the **AeroCore Systems** codebase. This application is developed as an end-to-end demo showcase for **Jules**.

We intentionally added too many steps to the checkout process so we can give Jules some "real" product feedback and it can help smooth those papercuts.

Below is a blueprint of how this application is structured.

---

## High-Level Architecture

This application is structured as a modern React web application built on top of the following core technologies:
*   **Vite**: Provides high-performance module bundling and instant local development server.
*   **React 19**: Serves as the core structural foundation, relying on predictable, top-down state management.
*   **Tailwind CSS v4**: Governs our design tokens, Material-inspired theming, and custom utility styles (such as the retro CRT scanline overlays).
*   **TypeScript**: Guarantees type safety across the inventory catalog, shopping carts, and system components.

### Styling Guidelines
*   **Tailwind CSS v4**: We use Tailwind for all component styling. Please avoid writing custom CSS in `src/index.css` unless creating global utilities or specific theme overrides.
*   **Material Symbols**: Icons are loaded via Material Symbols. Use the `<span className="material-symbols-outlined">icon_name</span>` pattern.

---

## Solid Architectural Base (vs. Deliberate Friction)

While browsing the catalog, you will notice a **high-quality, robust structural baseline**:
*   **Centralized State Management**: In [src/App.tsx](./src/App.tsx), global application state—including active cart items and details selection—is tracked in one predictable location (URLs handle view state).
*   **Intentional Friction**: In contrast to this solid architecture, the **checkout UX is deliberately designed with an excessive amount of steps**. Rather than providing a generic one-click checkout, the application obligates the user to verify regional delivery availability via ZIP code, describe their intended mechanical usage, acknowledge explicit hazardous terms, accept shipping protection, and input precise details. This friction exists to mirror sophisticated compliance-heavy logistics pipelines.

---

## File & Folder Blueprint

Below is an index explaining **why** each file exists in this codebase, and **what** role it fulfills functionally:

```text
src/
├── components/
│   ├── Footer.tsx
│   ├── Navigation.tsx
│   └── ProductCard.tsx
├── pages/
│   ├── Cart.tsx
│   ├── Checkout.tsx
│   ├── Home.tsx
│   ├── ProductDetails.tsx
│   ├── Profile.tsx
│   └── Search.tsx
├── App.tsx
├── index.css
├── main.tsx
└── types.ts
```

### Core & Configuration
*   [src/main.tsx](./src/main.tsx): The absolute starting entry point for the React application. It loads the main App element into the HTML root.
*   [src/App.tsx](./src/App.tsx): The nervous system of the web application. It orchestrates view routing using React Router, coordinates cart mutations, and delivers global props to nested children.
*   [src/types.ts](./src/types.ts): Houses data structure declarations such as `Product` and `CartItem`. It also maintains our mock inventory database including ion drives, star trackers, and hydrazine regulators.
*   [src/index.css](./src/index.css): Encapsulates theme configurations (e.g., curated color hexes, custom fonts) alongside retro UI utilities like the `.scanline-overlay`.

### Pages Folder ([src/pages/](./src/pages))
*   [src/pages/Home.tsx](./src/pages/Home.tsx): The main catalog view and hero section.
*   [src/pages/ProductDetails.tsx](./src/pages/ProductDetails.tsx): The technical datasheet view. Implements deep-dive specifications, mandatory regional availability ZIP checkers, intended use verifications, and liability disclaimers.
*   [src/pages/Cart.tsx](./src/pages/Cart.tsx): The shopping manifest. Implements urgency/scarcity countdowns, recalculation validations, pallet gift options, and shipping protection selections.
*   [src/pages/Checkout.tsx](./src/pages/Checkout.tsx): A robust, step-heavy transaction module split sequentially into Customer Information, Shipping Address, Payment Gateway, and Additional Compliance Notes.
*   [src/pages/Profile.tsx](./src/pages/Profile.tsx): Mock profile page (Under Construction).
*   [src/pages/Search.tsx](./src/pages/Search.tsx): Mock search page (Under Construction).

### Components Folder ([src/components/](./src/components))
*   [src/components/Navigation.tsx](./src/components/Navigation.tsx): The top navigation bar. Holds brand identifiers, quick catalog filters, and a reactive shopping cart counter badge.
*   [src/components/ProductCard.tsx](./src/components/ProductCard.tsx): A focused modular card responsible for presenting individual product names, category designations, and brief descriptions within the catalog grid.
*   [src/components/Footer.tsx](./src/components/Footer.tsx): Displays application metadata, customer support resources, legal disclaimers, and accepted aerospace payment mediums.

---

## Getting Started

### Prerequisites
*   **Node.js** (v18 or higher recommended)

### Run Locally
1.  Install application dependencies:
    ```bash
    npm install
    ```
2.  **Optional**: Configure the `GEMINI_API_KEY` inside `.env.local` if utilizing AI Studio features. The core e-commerce demo functions without this key.
3.  Kickstart the development server:
    ```bash
    npm run dev
    ```
4.  Access the application locally at: [http://localhost:3000](http://localhost:3000)
