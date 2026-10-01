#!/bin/bash

set -e

exec > >(tee /var/log/user-data.log) 2>&1

echo "Starting Monitoring Server setup..."

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

# Enable Docker
systemctl enable docker
systemctl start docker

# Create monitoring directory
mkdir -p /opt/monitoring

# Create directories for Grafana and Loki data
mkdir -p /opt/monitoring/grafana
mkdir -p /opt/monitoring/loki

# Set directory permissions
chmod 755 /opt/monitoring

echo "Monitoring Server setup completed."