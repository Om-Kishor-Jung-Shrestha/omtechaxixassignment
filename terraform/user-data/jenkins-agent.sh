#!/bin/bash

set -e

exec > >(tee /var/log/user-data.log) 2>&1

echo "Starting Jenkins Agent setup..."

# Update Ubuntu
apt-get update -y
apt-get upgrade -y

# Install required packages
apt-get install -y \
    ca-certificates \
    curl \
    gnupg \
    unzip \
    git \
    openjdk-21-jre

# Install Docker repository key
install -m 0755 -d /etc/apt/keyrings

curl -fsSL https://download.docker.com/linux/ubuntu/gpg \
    -o /etc/apt/keyrings/docker.asc

chmod a+r /etc/apt/keyrings/docker.asc

# Add Docker repository
echo \
  "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.asc] https://download.docker.com/linux/ubuntu \
  $(. /etc/os-release && echo "${UBUNTU_CODENAME:-$VERSION_CODENAME}") stable" \
  > /etc/apt/sources.list.d/docker.list

# Update package information
apt-get update -y

# Install Docker
apt-get install -y \
    docker-ce \
    docker-ce-cli \
    containerd.io \
    docker-buildx-plugin \
    docker-compose-plugin

# Enable Docker
systemctl enable docker
systemctl start docker

# Install Node.js 22 LTS and npm
curl -fsSL https://deb.nodesource.com/setup_22.x | bash -

apt-get install -y nodejs

# Create Jenkins Agent user
if ! id jenkins >/dev/null 2>&1; then
    useradd -m -s /bin/bash jenkins
fi

# Add users to Docker group
usermod -aG docker ubuntu
usermod -aG docker jenkins

# Create Jenkins workspace directory
mkdir -p /home/jenkins/agent

# Set Jenkins directory ownership
chown -R jenkins:jenkins /home/jenkins

# Set Ubuntu ownership of its home directory
chown -R ubuntu:ubuntu /home/ubuntu

# Verify installed software
echo "Checking Java..."
java -version

echo "Checking Docker..."
docker --version

echo "Checking Docker Compose..."
docker compose version

echo "Checking Git..."
git --version

echo "Checking Node.js..."
node --version

echo "Checking npm..."
npm --version

echo "Checking Docker group..."
getent group docker

echo "Jenkins Agent setup completed successfully."