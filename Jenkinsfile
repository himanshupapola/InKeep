pipeline {
    agent any

    environment {
        FRONTEND_IMAGE = "inkeep-frontend:latest"
        BACKEND_IMAGE  = "inkeep-backend:latest"

        // Static values
        DB_USERNAME = "admin"
        VITE_GEONAMES_USERNAME = "himanshu_singh_papol"
        CORS_ALLOWED_ORIGIN = "http://localhost:5173/api"
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
                    script {
                        sh "docker build -t $FRONTEND_IMAGE ."
                    }
                }
            }
        }

        stage('Build Backend Docker Image') {
            steps {
                dir('backend') {
                    script {
                        sh "docker build -t $BACKEND_IMAGE ."
                    }
                }
            }
        }

        stage('Deploy via Docker Compose') {
            steps {
                withCredentials([
                    string(credentialsId: 'db-password', variable: 'DB_PASSWORD'),
                    string(credentialsId: 'db-url', variable: 'DB_URL'),
                    string(credentialsId: 'brevo-api', variable: 'BREVO_API_KEY'),
                    string(credentialsId: 'weather-api-key', variable: 'VITE_OPENWEATHER_API_KEY'),
                    string(credentialsId: 'upstash-url', variable: 'UPSTASH_REDIS_URL')
                    string(credentialsId: 'vitapi-url', variable: 'VITE_API_BASE_URL')
                ]) {
                    script {
                        sh '''
                            export DB_PASSWORD="$DB_PASSWORD"
                            export DB_URL="$DB_URL"
                            export DB_USERNAME="$DB_USERNAME"
                            export BREVO_API_KEY="$BREVO_API_KEY"
                            export VITE_OPENWEATHER_API_KEY="$VITE_OPENWEATHER_API_KEY"
                            export UPSTASH_REDIS_URL="$UPSTASH_REDIS_URL"
                            export VITE_API_BASE_URL="$VITE_API_BASE_URL"
                            export VITE_GEONAMES_USERNAME="$VITE_GEONAMES_USERNAME"
                            export CORS_ALLOWED_ORIGIN="$CORS_ALLOWED_ORIGIN"

                            docker compose down || true
                            docker compose up -d --build
                        '''
                    }
                }
            }
        }
    }
}
