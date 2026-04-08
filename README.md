# Interactive Wall Calendar Component

A polished, interactive wall calendar component built with **Next.js (App Router)** and **Tailwind CSS**. It replicates the aesthetic of a physical wall calendar while providing modern interactive functionalities such as date range selection, integrated notes (persisted locally), and dynamic theme switching based on curated hero images.

## Features Implemented

* **Minimal Wall Calendar Layout**: A clean, highly visual design with strong hierarchy and dynamic theming.
* **Hero Image Integration**: Select from a collection of curated themes (Lush Forest, Deep Ocean, Desert Sunset, Minimalist Architecture). The UI colors update dynamically based on the selected theme image.
* **Full Monthly Calendar Grid**: Accurate display of dates aligned (Sun–Sat) with weekend highlights and dynamic current month focus.
* **Date Range Selector**:
  * First click sets the start date.
  * Second click sets the end date.
  * Start, end, and in-between dates are highlighted clearly with distinct visual styles.
* **Integrated Notes Section**:
  * Users can take notes associated with a selected date, a date range, or generally for the month.
  * Notes are **persisted automatically via `localStorage`**, mimicking a real wall notepad.
* **Responsive Design**: Segmented side-by-side design on desktop, natively stacking vertically on smaller mobile screens. Smooth interactions across all layouts.
* **Micro-interactions**: Beautiful soft shadows, scale transitions, calendar day hover effects, and themed rings create a premium user experience.
* **Zero Backend**: Fully static, utilizing local storage for data persistence, ensuring an instant response and easy deployments.

## Setup Instructions

### Prerequisites
* Node.js v18.x or above (v20+ recommended)
* npm, yarn, or pnpm

### Getting Started

1. **Clone or Extract** the project repository.
2. **Install dependencies**:
   ```bash
   npm install
   ```
3. **Run the Development Server**:
   ```bash
   npm run dev
   ```
4. **Access the application**:
   Open [http://localhost:3000](http://localhost:3000) in your web browser.

### Building for Production
To build the application for deployment on Vercel:
```bash
npm run build
npm run start
```

## Deployment on Vercel
Since this runs entirely on the frontend with `localStorage`, it is fully production-ready for standard Next.js deployments.
Push your code to a Git provider (like GitHub) and import the repository into your Vercel dashboard. The build settings should automatically be configured for a Next.js framework.
