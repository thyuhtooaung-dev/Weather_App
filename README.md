# Weather Intelligence Platform

A full-stack weather monitoring application providing high-resolution meteorological data, real-time geolocation services, and persistent user preferences. This project demonstrates advanced data visualization, Progressive Web App (PWA) implementation, and a robust synchronization between external weather APIs and a private PostgreSQL backend.

[Live Demo](https://weather-app-pi-eosin-28.vercel.app/) | [Source Code](https://github.com/thyuhtooaung-dev/Weather_App)

## System Architecture

### Frontend

* **React & Tailwind CSS**: Responsive, utility-first UI with dynamic background rendering based on atmospheric conditions.
* **TanStack Query**: Manages asynchronous server state, implementing intelligent caching to minimize redundant API calls to weather providers.
* **shadcn/ui**: Accessible component primitives optimized for high-density data displays.
* **PWA**: Configured for offline manifest support and "Add to Home Screen" functionality on mobile devices.

### Backend

* **NestJS**: A modular Node.js framework handling user authentication and location persistence.
* **TypeORM & Neon (PostgreSQL)**: Relational schema used to store user-defined favorite locations and unit preferences across sessions.
* **External API Integration**: Real-time data consumption from Open-Meteo for hyper-local forecasting.

---

## Core Engineering Features

### Advanced Meteorological Visualization

* **Multi-Temporal Forecasts**: Implementation of daily and hourly data structures, allowing users to toggle between a 7-day outlook and granular 24-hour temperature trends.
* **Solar & Atmospheric Tracking**: Real-time calculation of UV Index, visibility, and solar cycles (sunrise/sunset) via precise location metadata.
* **Dynamic Environment Mapping**: The UI dynamically updates its theme and animated background assets to reflect current weather states (e.g., precipitation, cloud coverage, or clear sky).

### Global Localization and Unit Conversion

* **Precision Geolocation**: Integration of browser-native Geolocation APIs for immediate weather detection upon initialization.
* **Unit Management Engine**: A centralized state logic for seamless toggling between Imperial and Metric systems, including individual overrides for temperature (°C/°F), wind speed (km/h/mph), and precipitation (mm/in).

### Persistence and Personalization

* **Location Bookmarking**: A full-stack CRUD system allowing users to save multiple global locations to a personal dashboard, synchronized via the NestJS API.
* **Theme Synchronization**: Automatic Light/Dark mode switching based on the user's local time or system preferences.

---

## Performance Previews


| Desktop View | Mobile View |
| :--- | :--- |
| ![Desktop Screenshot](./screenshots/desktop.png) | ![Mobile Screenshot](./screenshots/mobile.png) |

---

## Implementation Details

### Data Fetching Strategy

The application utilizes TanStack Query to wrap external API requests. This ensures that when a user switches between hourly and daily views, the data is retrieved from the cache rather than triggering a new network request, significantly improving perceived performance.

### Responsive Design Philosophy

The layout leverages CSS Grid and Flexbox to maintain readability across diverse viewports. On mobile devices, the PWA implementation provides a native-like experience, including optimized touch targets and eliminated browser chrome.

---

## Author

**Thyu Htoo Aung** [GitHub](https://github.com/thyuhtooaung-dev) | [Frontend Mentor](https://www.frontendmentor.io/profile/thyuhtooaung-dev) | [X / Twitter](https://x.com/Poung_Mont)

---
