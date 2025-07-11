FROM node:18-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm install --legacy-peer-deps
COPY . .

# Handle Env Start
ARG VITE_OPENWEATHER_API_KEY
ARG VITE_GEONAMES_USERNAME
ARG VITE_API_BASE_URL
RUN echo "VITE_OPENWEATHER_API_KEY=$VITE_OPENWEATHER_API_KEY" > .env && \
    echo "VITE_GEONAMES_USERNAME=$VITE_GEONAMES_USERNAME" >> .env && \
    echo "VITE_API_BASE_URL=$VITE_API_BASE_URL" >> .env
# Handle Env End

RUN npm run build

FROM nginx:alpine
RUN rm -rf /usr/share/nginx/html/*
COPY --from=build /app/dist /usr/share/nginx/html
COPY default.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
