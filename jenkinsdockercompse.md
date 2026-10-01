services:
  frontend:
    image: ${FRONTEND_IMAGE}:${IMAGE_TAG}
    env_file:
      - /opt/collegeadmission/frontendenv/.env
    restart: unless-stopped
    ports:
      - "80:8080"
    depends_on:
      - backend-nginx
    networks:
      - college-network

  backend-nginx:
    image: ${BACKEND_IMAGE}:${IMAGE_TAG}
    container_name: college-backend
    restart: unless-stopped
    env_file:
      - /opt/collegeadmission/backendenv/.env
    environment:
      NODE_ENV: production
      PORT: 8000
    expose:
      - "8080"
    volumes:
      - /opt/appdatas:/opt/appdatas
    networks:
      - college-network

networks:
  college-network:
    driver: bridge