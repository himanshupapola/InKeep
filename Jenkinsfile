pipeline {
    agent any

    environment {
        FRONTEND_IMAGE = "inkeep-frontend:latest"
        BACKEND_IMAGE  = "inkeep-backend:latest"

        // Public/static values
        DB_URL = "jdbc:mysql://mysql:3306/inkeep"
        DB_USERNAME = "root"
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
                script {
                    dir('frontend') {
                        isUnix() ? sh("docker build -t $FRONTEND_IMAGE .") : bat("docker build -t %FRONTEND_IMAGE% .")
                    }
                }
            }
        }

        stage('Build Backend Docker Image') {
            steps {
                script {
                    dir('backend') {
                        isUnix() ? sh("docker build -t $BACKEND_IMAGE .") : bat("docker build -t %BACKEND_IMAGE% .")
                    }
                }
            }
        }

        stage('Deploy via Docker Compose') {
            steps {
                script {
                    withCredentials([
                        string(credentialsId: 'db-password', variable: 'DB_PASSWORD'),
                        string(credentialsId: 'brevo-api', variable: 'BREVO_API_KEY'),
                        string(credentialsId: 'weather-api-key', variable: 'VITE_OPENWEATHER_API_KEY'),
                        string(credentialsId: 'upstash-url', variable: 'UPSTASH_REDIS_URL')
                    ]) {
                        def exportCmds = isUnix() ? '''
                            export DB_PASSWORD=$DB_PASSWORD
                            export BREVO_API_KEY=$BREVO_API_KEY
                            export VITE_OPENWEATHER_API_KEY=$VITE_OPENWEATHER_API_KEY
                            export UPSTASH_REDIS_URL=$UPSTASH_REDIS_URL
                            export DB_URL=$DB_URL
                            export DB_USERNAME=$DB_USERNAME
                            export VITE_API_BASE_URL=$VITE_API_BASE_URL
                            export VITE_GEONAMES_USERNAME=$VITE_GEONAMES_USERNAME
                            export CORS_ALLOWED_ORIGIN=$CORS_ALLOWED_ORIGIN

                            docker-compose down || true
                            docker-compose up -d --build
                        ''' : '''
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

                        isUnix() ? sh(exportCmds) : bat(exportCmds)
                    }
                }
            }
        }
    }
}
