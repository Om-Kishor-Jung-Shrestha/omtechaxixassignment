#!/bin/bash

set -e

exec > >(tee /var/log/user-data.log) 2>&1

echo "Starting Application Server setup..."

# Update Ubuntu
apt-get update -y
apt-get upgrade -y

# Install required packages
apt-get install -y \
    ca-certificates \
    curl \
    gnupg \
    git \
    unzip

# Create Docker keyring directory
install -m 0755 -d /etc/apt/keyrings

# Download Docker GPG key
curl -fsSL https://download.docker.com/linux/ubuntu/gpg \
    -o /etc/apt/keyrings/docker.asc

chmod a+r /etc/apt/keyrings/docker.asc

# Add Docker repository
echo \
  "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.asc] https://download.docker.com/linux/ubuntu \
  $(. /etc/os-release && echo "${UBUNTU_CODENAME:-$VERSION_CODENAME}") stable" \
  > /etc/apt/sources.list.d/docker.list

# Install Docker and Compose
apt-get update -y

apt-get install -y \
    docker-ce \
    docker-ce-cli \
    containerd.io \
    docker-buildx-plugin \
    docker-compose-plugin

# Enable Docker service
systemctl enable docker
systemctl start docker

# Add ubuntu user to Docker group
usermod -aG docker ubuntu

# Create application directories
mkdir -p /opt/collegeadmission/frontendenv
mkdir -p /opt/collegeadmission/backendenv
mkdir -p /opt/appdatas

# Set application directory ownership
chown -R ubuntu:ubuntu /opt/collegeadmission

# Set application directory permissions
chmod 755 /opt/collegeadmission
chmod 755 /opt/collegeadmission/frontendenv
chmod 755 /opt/collegeadmission/backendenv

# Configure application data directory
chown 10001:10001 /opt/appdatas
chmod 750 /opt/appdatas

echo "Application Server setup completed."