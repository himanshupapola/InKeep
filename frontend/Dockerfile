FROM node:18 AS build
WORKDIR /app

# Accept build arguments
ARG VITE_API_BASE_URL
ARG VITE_OPENWEATHER_API_KEY
ARG VITE_GEONAMES_USERNAME

# Copy project files first
COPY package*.json ./
RUN npm install --legacy-peer-deps
COPY . .

# Inject Vite environment variables
RUN echo "VITE_API_BASE_URL=$VITE_API_BASE_URL" > .env && \
    echo "VITE_OPENWEATHER_API_KEY=$VITE_OPENWEATHER_API_KEY" >> .env && \
    echo "VITE_GEONAMES_USERNAME=$VITE_GEONAMES_USERNAME" >> .env

# Build the app
RUN npm run build

# Serve the app with Nginx
FROM nginx:alpine
RUN rm -rf /usr/share/nginx/html/*
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
