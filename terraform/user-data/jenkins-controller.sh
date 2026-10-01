#!/bin/bash

set -e

exec > >(tee /var/log/user-data.log) 2>&1

echo "Starting Jenkins Controller setup..."

# Update Ubuntu packages
apt-get update -y
apt-get upgrade -y

# Install required packages
apt-get install -y \
    ca-certificates \
    curl \
    gnupg \
    unzip \
    git \
    fontconfig \
    openjdk-21-jre

# Install Docker
install -m 0755 -d /etc/apt/keyrings

curl -fsSL https://download.docker.com/linux/ubuntu/gpg \
    -o /etc/apt/keyrings/docker.asc

chmod a+r /etc/apt/keyrings/docker.asc

echo \
  "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.asc] https://download.docker.com/linux/ubuntu \
  $(. /etc/os-release && echo "${UBUNTU_CODENAME:-$VERSION_CODENAME}") stable" \
  > /etc/apt/sources.list.d/docker.list

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

# Install current Jenkins LTS repository signing key
install -m 0755 -d /etc/apt/keyrings

curl -fsSL https://pkg.jenkins.io/debian-stable/jenkins.io-2026.key \
    -o /etc/apt/keyrings/jenkins-keyring.asc

chmod 644 /etc/apt/keyrings/jenkins-keyring.asc

# Add Jenkins LTS repository
echo "deb [signed-by=/etc/apt/keyrings/jenkins-keyring.asc] https://pkg.jenkins.io/debian-stable binary/" \
    > /etc/apt/sources.list.d/jenkins.list

# Refresh package information
apt-get update -y

# Install Jenkins
apt-get install -y jenkins

# Enable and start Jenkins
systemctl enable jenkins
systemctl start jenkins

# Allow Jenkins and ubuntu users to use Docker
usermod -aG docker jenkins
usermod -aG docker ubuntu

# Create Jenkins-related directories
mkdir -p /opt/jenkins
mkdir -p /var/lib/jenkins

# Set Jenkins directory ownership
chown -R jenkins:jenkins /opt/jenkins
chown -R jenkins:jenkins /var/lib/jenkins

# Set permissions for Jenkins directory
chmod 755 /opt/jenkins

# Restart Jenkins to apply Docker group membership
systemctl restart jenkins

# Verify installation
echo "Checking Java..."
java -version

echo "Checking Docker..."
docker --version

echo "Checking Docker Compose..."
docker compose version

echo "Checking Jenkins service..."
systemctl is-active jenkins

echo "Checking Docker group..."
getent group docker

echo "Jenkins Controller setup completed successfully."