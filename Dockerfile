# 1. Use a base Node.js image
FROM node:20.19.4-alpine AS base

# 2. Set the working directory
WORKDIR /app

# 3. Install dependencies (this creates a clean layer)
# Only copy package.json files first to leverage Docker cache
COPY package.json yarn.lock* package-lock.json* ./
RUN npm install --frozen-lockfile

# 4. Copy the rest of your app's source code
COPY . .

# 5. Build your Nuxt app for production
# This runs the "build": "nuxt build" script from your package.json
RUN npm run build

# 6. Set up the production environment
# Tell Nuxt/Nitro to bind to all network interfaces
ENV HOST=0.0.0.0
# The PORT env var will be automatically supplied by Cloud Run (e.g., 8080)
# Nuxt 3 automatically picks this up.

# 7. Expose the port
EXPOSE 8080

# 8. Define the command to run your app
CMD [ "node", ".output/server/index.mjs", "--host", "0.0.0.0", "--port", "8080" ]