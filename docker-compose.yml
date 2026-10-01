services:

  # ==========================================
  # Frontend: React + Nginx
  # ==========================================
  frontend:
    build:
      context: ./frontend
      dockerfile: Dockerfile
      target: production
      args:
        VITE_API_BASE_URL: /api/v1

    env_file:
      - /opt/collegeadmission/frontendenv/.env

    restart: unless-stopped

    ports:
      - "80:8080"

    depends_on:
      - backend-nginx

    networks:
      - college-network


  # ==========================================
  # Backend: Express + Nginx
  # ==========================================
  backend-nginx:
    build:
      context: ./backend
      dockerfile: Dockerfile
      target: production

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


# ==========================================
# Docker Network
# ==========================================
networks:
  college-network:
    driver: bridge
