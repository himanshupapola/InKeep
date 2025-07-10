pipeline {
  agent any

  environment {
    DB_URL                    = credentials('db_url')
    DB_USERNAME               = credentials('db_username')
    DB_PASSWORD               = credentials('db_password')
    BREVO_API_KEY             = credentials('brevo_api_key')
    UPSTASH_REDIS_URL         = credentials('upstash_redis_url')
    VITE_API_BASE_URL         = credentials('vite_api_base_url')
    VITE_OPENWEATHER_API_KEY  = credentials('vite_weather_key')
    VITE_GEONAMES_USERNAME    = credentials('vite_geo_username')
    CORS_ALLOWED_ORIGIN       = credentials('cors_origin')
  }

  stages {
    stage('Build & Run with Docker Compose') {
      steps {
        script {
          if (isUnix()) {
            sh """
              export VITE_API_BASE_URL="${VITE_API_BASE_URL}"
              export VITE_OPENWEATHER_API_KEY="${VITE_OPENWEATHER_API_KEY}"
              export VITE_GEONAMES_USERNAME="${VITE_GEONAMES_USERNAME}"
              export DB_URL="${DB_URL}"
              export DB_USERNAME="${DB_USERNAME}"
              export DB_PASSWORD="${DB_PASSWORD}"
              export BREVO_API_KEY="${BREVO_API_KEY}"
              export UPSTASH_REDIS_URL="${UPSTASH_REDIS_URL}"
              export CORS_ALLOWED_ORIGIN="${CORS_ALLOWED_ORIGIN}"
              docker compose build
              docker compose up -d
            """
          } else {
            bat '''set VITE_API_BASE_URL=%VITE_API_BASE_URL% &&
set VITE_OPENWEATHER_API_KEY=%VITE_OPENWEATHER_API_KEY% &&
set VITE_GEONAMES_USERNAME=%VITE_GEONAMES_USERNAME% &&
set DB_URL=%DB_URL% &&
set DB_USERNAME=%DB_USERNAME% &&
set DB_PASSWORD=%DB_PASSWORD% &&
set BREVO_API_KEY=%BREVO_API_KEY% &&
set UPSTASH_REDIS_URL=%UPSTASH_REDIS_URL% &&
set CORS_ALLOWED_ORIGIN=%CORS_ALLOWED_ORIGIN% &&
docker compose build &&
docker compose up -d'''
          }
        }
      }
    }
  }
}


// Configure this in Jenkins secrete

// | ID                  | Type        |
// | ------------------- | ----------- |
// | `db_url`            | Secret Text |
// | `db_username`       | Secret Text |
// | `db_password`       | Secret Text |
// | `brevo_api_key`     | Secret Text |
// | `upstash_redis_url` | Secret Text |
// | `vite_api_base_url` | Secret Text |
// | `vite_weather_key`  | Secret Text |
// | `vite_geo_username` | Secret Text |
// | `cors_origin`       | Secret Text |
