pipeline {
    agent any

    environment {
        FRONTEND_IMAGE = "inkeep-frontend:latest"
        BACKEND_IMAGE  = "inkeep-backend:latest"

        // Public/static values
    
        DB_USERNAME = "admin"
        VITE_API_BASE_URL = "http://localhost:8081/api"
        VITE_GEONAMES_USERNAME = "himanshu_singh_papol"
        CORS_ALLOWED_ORIGIN = "http://localhost:5173"
    }

    stages {
        stage('Checkout Code') {
            steps {
                checkout scm
            }
        }

        stage('Build Frontend Docker Image') {
            steps {
                dir('frontend') {
                    bat "docker build -t %FRONTEND_IMAGE% ."
                }
            }
        }

        stage('Build Backend Docker Image') {
            steps {
                dir('backend') {
                    bat "docker build -t %BACKEND_IMAGE% ."
                }
            }
        }

        stage('Deploy via Docker Compose') {
            steps {
                withCredentials([
                    string(credentialsId: 'db-password', variable: 'DB_PASSWORD'),
                    string(credentialsId: 'brevo-api', variable: 'BREVO_API_KEY'),
                    string(credentialsId: 'weather-api-key', variable: 'VITE_OPENWEATHER_API_KEY'),
                    string(credentialsId: 'upstash-url', variable: 'UPSTASH_REDIS_URL')
                ]) {
                    bat '''
                        set DB_PASSWORD=%DB_PASSWORD%
                        set BREVO_API_KEY=%BREVO_API_KEY%
                        set VITE_OPENWEATHER_API_KEY=%VITE_OPENWEATHER_API_KEY%
                        set UPSTASH_REDIS_URL=%UPSTASH_REDIS_URL%
                        set DB_URL=%DB_URL%
                        set DB_USERNAME=%DB_USERNAME%
                        set VITE_API_BASE_URL=%VITE_API_BASE_URL%
                        set VITE_GEONAMES_USERNAME=%VITE_GEONAMES_USERNAME%
                        set CORS_ALLOWED_ORIGIN=%CORS_ALLOWED_ORIGIN%

                        docker-compose down || exit 0
                        docker-compose up -d --build
                    '''
                }
            }
        }
    }
}
