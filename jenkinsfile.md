
pipeline {
    agent {
        label 'devops-agent'
    }

    options {
        timestamps()
        disableConcurrentBuilds()
    }

    parameters {
        string(
            name: 'APP_HOST',
            defaultValue: '18.117.72.114',
            description: 'Public IP of Application EC2'
        )
    }

    environment {
        DOCKERHUB_CREDENTIALS = 'dockerhub'
        SSH_CREDENTIALS = 'sshdevops'

        FRONTEND_IMAGE = 'om142/college-admission-frontend'
        BACKEND_IMAGE = 'om142/college-admission-backend'

        APP_USER = 'ubuntu'
        APP_DIR = '/opt/collegeadmission'
    }

    stages {

        // ==========================================
        // 1. CHECKOUT
        // ==========================================

        stage('Checkout') {
            steps {
                checkout scm

                script {
                    env.IMAGE_TAG = sh(
                        script: 'git rev-parse --short=7 HEAD',
                        returnStdout: true
                    ).trim()
                }

                echo "Building commit: ${env.IMAGE_TAG}"
            }
        }

        // ==========================================
        // 2. INSTALL DEPENDENCIES
        // ==========================================

        stage('Install Dependencies') {
            steps {
                dir('frontend') {
                    sh 'npm ci'
                }

                dir('backend') {
                    sh 'npm ci --legacy-peer-deps'
                }
            }
        }

        // ==========================================
        // 3. LINT
        // ==========================================

        stage('Lint') {
            parallel {
                stage('Frontend Lint') {
                    steps {
                        dir('frontend') {
                            sh 'npm run lint'
                        }
                    }
                }

                stage('Backend Lint') {
                    steps {
                        dir('backend') {
                            sh 'npm run lint'
                        }
                    }
                }
            }
        }

        // ==========================================
        // 4. TEST
        // ==========================================

        stage('Test') {
            steps {
                echo 'Automated tests are not configured.'
                echo 'Skipping automated test execution.'
            }
        }

        // ==========================================
        // 5. APPLICATION BUILD
        // ==========================================

        stage('Build') {
            parallel {
                stage('Frontend Build') {
                    steps {
                        dir('frontend') {
                            sh 'npm run build'
                        }
                    }
                }

                stage('Backend Build') {
                    steps {
                        dir('backend') {
                            sh 'npm run build'
                        }
                    }
                }
            }
        }

        // ==========================================
        // 6. DOCKER BUILD
        // ==========================================

        stage('Docker Build') {
            when {
                branch 'main'
            }

            steps {
                sh '''
                    docker build \
                      --target production \
                      --build-arg VITE_API_BASE_URL=/api/v1 \
                      -t ${FRONTEND_IMAGE}:${IMAGE_TAG} \
                      -t ${FRONTEND_IMAGE}:latest \
                      ./frontend

                    docker build \
                      --target production \
                      -t ${BACKEND_IMAGE}:${IMAGE_TAG} \
                      -t ${BACKEND_IMAGE}:latest \
                      ./backend
                '''
            }
        }

        // ==========================================
        // 7. DOCKER HUB LOGIN + PUSH
        // ==========================================

        stage('Docker Push') {
            when {
                branch 'main'
            }

            steps {
                withCredentials([
                    usernamePassword(
                        credentialsId: 'dockerhub',
                        usernameVariable: 'DOCKERHUB_USER',
                        passwordVariable: 'DOCKERHUB_TOKEN'
                    )
                ]) {
                    sh '''
                        set +x

                        printf '%s' "$DOCKERHUB_TOKEN" |
                          docker login \
                          -u "$DOCKERHUB_USER" \
                          --password-stdin

                        docker push ${FRONTEND_IMAGE}:${IMAGE_TAG}
                        docker push ${FRONTEND_IMAGE}:latest

                        docker push ${BACKEND_IMAGE}:${IMAGE_TAG}
                        docker push ${BACKEND_IMAGE}:latest

                        docker logout
                    '''
                }
            }
        }

        // ==========================================
        // 8. DEPLOY TO APPLICATION EC2
        // ==========================================

        stage('Deploy') {
            when {
                branch 'main'
            }

            steps {
                script {
                    if (params.APP_HOST == 'REPLACE_WITH_APPLICATION_EC2_PUBLIC_IP') {
                        error('Please provide the Application EC2 public IP.')
                    }
                }

                sshagent(credentials: [SSH_CREDENTIALS]) {

                    sh '''
                        set -e

                        echo "Preparing deployment directory..."

                        ssh -o StrictHostKeyChecking=accept-new \
                          ${APP_USER}@${APP_HOST} \
                          "mkdir -p ${APP_DIR}"

                        echo "Copying Docker Compose file..."

                        scp -o StrictHostKeyChecking=accept-new \
                          docker-compose.yml \
                          ${APP_USER}@${APP_HOST}:${APP_DIR}/docker-compose.yml

                        echo "Deploying application..."

                        ssh -o StrictHostKeyChecking=accept-new \
                          ${APP_USER}@${APP_HOST} \
                          "cd ${APP_DIR} && \
                           FRONTEND_IMAGE=${FRONTEND_IMAGE} \
                           BACKEND_IMAGE=${BACKEND_IMAGE} \
                           IMAGE_TAG=${IMAGE_TAG} \
                           docker compose pull && \
                           FRONTEND_IMAGE=${FRONTEND_IMAGE} \
                           BACKEND_IMAGE=${BACKEND_IMAGE} \
                           IMAGE_TAG=${IMAGE_TAG} \
                           docker compose up -d --no-build --remove-orphans"

                        echo "Checking running containers..."

                        ssh -o StrictHostKeyChecking=accept-new \
                          ${APP_USER}@${APP_HOST} \
                          "docker ps"
                    '''
                }
            }
        }
    }

    post {
        success {
            echo 'CI/CD pipeline completed successfully.'
        }

        failure {
            echo 'CI/CD pipeline failed. Check the stage logs.'
        }

        always {
            echo 'Pipeline execution finished.'
        }
    }
}