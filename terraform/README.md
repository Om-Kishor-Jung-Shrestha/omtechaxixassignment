# College Admission System - AWS DevOps Project

## Project Overview

This project automates the infrastructure deployment of a College Admission System using Terraform and AWS.

## AWS Region

us-east-2 (Ohio)

## Infrastructure

Four EC2 instances:

1. Jenkins Controller - t3.small
2. Jenkins Agent - t3.medium
3. Application Server - t3.medium
4. Monitoring Server - t3.small

## Networking

- VPC
- Public Subnet
- Internet Gateway
- Public Route Table
- Common Security Group

## Operating System

Ubuntu 24.04 LTS

## Storage

- 30 GB gp3 EBS volume per instance

## Application Technology

- React Frontend
- Express Backend
- Docker
- Docker Compose
- MongoDB Atlas
- Upstash Redis

## CI/CD

- Jenkins
- GitHub
- Docker Hub

## Monitoring

- Grafana
- Loki

## Terraform Commands

Format files:

```bash
terraform fmt -recursive