variable "aws_region" {
  description = "AWS region where infrastructure will be deployed"
  type        = string
  default     = "us-east-2"
}

variable "project_name" {
  description = "Name of the project"
  type        = string
  default     = "college-admission"
}

variable "environment" {
  description = "Deployment environment"
  type        = string
  default     = "dev"
}

variable "key_pair_name" {
  description = "Existing AWS EC2 key pair name"
  type        = string
  default     = "omfinal"
}

variable "ssh_allowed_cidr" {
  description = "Public IP CIDR allowed to SSH into EC2 instances"
  type        = string
}

variable "vpc_cidr" {
  description = "CIDR block for the project VPC"
  type        = string
  default     = "10.0.0.0/16"
}

variable "public_subnet_cidr" {
  description = "CIDR block for the public subnet"
  type        = string
  default     = "10.0.1.0/24"
}

variable "availability_zone" {
  description = "AWS availability zone"
  type        = string
  default     = "us-east-2a"
}

variable "jenkins_controller_instance_type" {
  description = "EC2 instance type for Jenkins Controller"
  type        = string
  default     = "t3.small"
}

variable "jenkins_agent_instance_type" {
  description = "EC2 instance type for Jenkins Agent"
  type        = string
  default     = "t3.medium"
}

variable "application_instance_type" {
  description = "EC2 instance type for Application Server"
  type        = string
  default     = "t3.medium"
}

variable "monitoring_instance_type" {
  description = "EC2 instance type for Monitoring Server"
  type        = string
  default     = "t3.small"
}

variable "root_volume_size" {
  description = "Root EBS volume size in GB"
  type        = number
  default     = 30
}

variable "root_volume_type" {
  description = "Root EBS volume type"
  type        = string
  default     = "gp3"
}

variable "common_tags" {
  description = "Common tags applied to AWS resources"
  type        = map(string)

  default = {
    Project     = "CollegeAdmissionSystem"
    Environment = "dev"
    ManagedBy   = "Terraform"
  }
}