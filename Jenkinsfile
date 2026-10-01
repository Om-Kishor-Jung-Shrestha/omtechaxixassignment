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
            defaultValue: '3.15.27.160',
            description: 'Public IP of Application EC2'
        )

        string(
            name: 'MONITORING_HOST',
            defaultValue: '52.14.111.249',
            description: 'Public IP of Monitoring EC2'
        )
    }


    environment {

        SSH_CREDENTIALS = 'sshdevops'

        FRONTEND_IMAGE = 'om142/college-admission-frontend'
        BACKEND_IMAGE  = 'om142/college-admission-backend'


        APP_USER = 'ubuntu'
        APP_DIR  = '/opt/collegeadmission'


        MONITORING_USER = 'ubuntu'
        MONITORING_DIR  = '/opt/monitoring'
    }



    stages {


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





        stage('Test') {

            steps {

                echo 'Tests skipped - not configured.'

            }
        }





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

                    echo "$DOCKERHUB_TOKEN" | \
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








        stage('Deploy Application') {


            when {
                branch 'main'
            }


            steps {


                sshagent(credentials:[SSH_CREDENTIALS]) {


                    sh '''

                    set -e


                    ssh -o StrictHostKeyChecking=accept-new \
                    ${APP_USER}@${APP_HOST} "

                    sudo mkdir -p ${APP_DIR} &&
                    sudo chown -R ${APP_USER}:${APP_USER} ${APP_DIR}

                    "



                    scp -o StrictHostKeyChecking=accept-new \
                    docker-compose.yml \
                    ${APP_USER}@${APP_HOST}:${APP_DIR}/docker-compose.yml





                    ssh -o StrictHostKeyChecking=accept-new \
                    ${APP_USER}@${APP_HOST} "


                    cd ${APP_DIR} &&


                    FRONTEND_IMAGE=${FRONTEND_IMAGE} \
                    BACKEND_IMAGE=${BACKEND_IMAGE} \
                    IMAGE_TAG=${IMAGE_TAG} \
                    docker compose pull &&



                    FRONTEND_IMAGE=${FRONTEND_IMAGE} \
                    BACKEND_IMAGE=${BACKEND_IMAGE} \
                    IMAGE_TAG=${IMAGE_TAG} \
                    docker compose up -d --remove-orphans


                    "



                    ssh -o StrictHostKeyChecking=accept-new \
                    ${APP_USER}@${APP_HOST} \
                    "docker ps"


                    '''

                }

            }

        }









        stage('Deploy Monitoring Stack') {


            when {
                branch 'main'
            }



            steps {


                sshagent(credentials:[SSH_CREDENTIALS]) {


                    sh '''

                    set -e


                    echo "Deploying Monitoring Stack"



                    ssh -o StrictHostKeyChecking=accept-new \
                    ${MONITORING_USER}@${MONITORING_HOST} "


                    sudo mkdir -p ${MONITORING_DIR} &&


                    sudo chown -R ${MONITORING_USER}:${MONITORING_USER} ${MONITORING_DIR} &&


                    rm -rf ${MONITORING_DIR}/monitoring


                    "





                    echo "Copying monitoring files"



                    scp -r \
                    -o StrictHostKeyChecking=accept-new \
                    ./monitoring \
                    ${MONITORING_USER}@${MONITORING_HOST}:${MONITORING_DIR}/






                    echo "Starting Loki Grafana"



                    ssh -o StrictHostKeyChecking=accept-new \
                    ${MONITORING_USER}@${MONITORING_HOST} "


                    cd ${MONITORING_DIR}/monitoring &&


                    echo 'GRAFANA_ADMIN_PASSWORD=admin123' > .env &&


                    docker compose pull &&


                    docker compose up -d --remove-orphans


                    "





                    ssh -o StrictHostKeyChecking=accept-new \
                    ${MONITORING_USER}@${MONITORING_HOST} \
                    "docker ps"



                    echo "Monitoring deployment completed"


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

            echo 'Pipeline failed.'

        }


        always {

            echo 'Pipeline finished.'

        }

    }

}