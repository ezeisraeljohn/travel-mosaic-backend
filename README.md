# Travel Mosaic

Travel Mosaic is a backend API for a travel planning application. It provides endpoints for user authentication, trip management, itinerary planning, city and country data, hotspots discovery, budgeting, and more.

## Features

- User authentication (email/password, Google OAuth)
- Trip and itinerary management
- City and country data synchronization from GeoNames
- Hotspot discovery using OpenStreetMap
- Budget planning for trips
- Questionnaire for user preferences
- Robust error handling and validation

## Tech Stack

- Node.js
- Express.js
- Sequelize (PostgreSQL)
- Passport.js (authentication)
- Yup (validation)
- Winston (logging)
- dotenv (environment variables)

## Getting Started

### Prerequisites

- Node.js (v14+)
- PostgreSQL

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/yourusername/travel-mosaic-backend.git
   cd travel-mosaic-backend
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Copy `.env.example` to `.env` and fill in your environment variables:

   ```bash
   cp .env.example .env
   ```

4. Run database migrations and seeders:

   ```bash
   npx sequelize-cli db:migrate
   npx sequelize-cli db:seed:all
   ```

5. Start the server:
   ```bash
   npm start
   ```

## API Endpoints

All endpoints are prefixed with `/api/v1`.

### Authentication

- `POST /api/v1/signup`  
  Register a new user.  
  **Body:** `{ email, password, firstname?, lastname?, profilePicture? }`

- `POST /api/v1/login`  
  Login with email and password.  
  **Body:** `{ email, password }`

- `GET /api/v1/google`  
  Start Google OAuth2 login.

- `GET /api/v1/login/google`  
  Callback for Google OAuth2 login.

### Trips

- `POST /api/v1/trips`  
  Create a new trip.  
  **Body:** `{ name, startDate, endDate?, description?, destination }`  
  **Auth:** Bearer token

- `GET /api/v1/trips`  
  Get all trips for the authenticated user.  
  **Auth:** Bearer token

### Itineraries

- `POST /api/v1/itineraries`  
  Create a new itinerary for a trip.  
  **Body:** `{ name?, tripId, hotspot?, description?, date? }`  
  **Auth:** Bearer token

- `GET /api/v1/itineraries?tripId=...`  
  Get all itineraries for a trip.  
  **Auth:** Bearer token

- `PUT /api/v1/itineraries/:id`  
  Update an itinerary.  
  **Body:** `{ name?, tripId?, hotspot?, description?, date? }`  
  **Auth:** Bearer token

### Cities

- `GET /api/v1/cities?country=...`  
  Get cities for a country.  
  **Auth:** Bearer token

### Hotspots

- `GET /api/v1/hotspots?cityId=...&categoryId=...`  
  Get hotspots for a city and category.  
  **Auth:** Bearer token

### Budget

- `POST /api/v1/budgets`  
  Create a budget for a trip.  
  **Body:** See budget schema  
  **Auth:** Bearer token

### Questionnaire

- `POST /api/v1/questionnaire`  
  Submit questionnaire responses.  
  **Body:** See questionnaire schema  
  **Auth:** Bearer token

- `GET /api/v1/questionnaire`  
  Get questionnaire questions/options.  
  **Auth:** Bearer token

## Error Handling

All error responses follow this format:

```json
{
  "success": false,
  "error": "ErrorType",
  "message": "Error message",
  "details": null
}
```

## Environment Variables

See `.env.example` for all required environment variables.

## License

MIT

## Contact

For questions or support, please open an issue or contact the maintainer.
