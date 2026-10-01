# ==========================================
# Common Security Group for All EC2 Instances
# ==========================================

resource "aws_security_group" "common" {
  name        = "${var.project_name}-common-sg"
  description = "Common security group for all College Admission System EC2 instances"
  vpc_id      = aws_vpc.main.id

  # ==========================================
  # SSH Access
  # Port 22
  # ==========================================

  ingress {
    description = "SSH access from anywhere"
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  # ==========================================
  # HTTP - Nginx
  # Port 80
  # ==========================================

  ingress {
    description = "Public HTTP access for Nginx"
    from_port   = 80
    to_port     = 80
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  # ==========================================
  # HTTPS - Nginx
  # Port 443
  # ==========================================

  ingress {
    description = "Public HTTPS access for Nginx"
    from_port   = 443
    to_port     = 443
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  # ==========================================
  # Jenkins Web UI
  # Port 8080
  # ==========================================

  ingress {
    description = "Jenkins web interface"
    from_port   = 8080
    to_port     = 8080
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  # ==========================================
  # Grafana Dashboard
  # Port 3000
  # ==========================================

  ingress {
    description = "Grafana monitoring dashboard"
    from_port   = 3000
    to_port     = 3000
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  # ==========================================
  # Loki
  # Port 3100
  # ==========================================

  ingress {
    description = "Loki log aggregation"
    from_port   = 3100
    to_port     = 3100
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  # ==========================================
  # Jenkins Agent Communication
  # Port 50000
  # ==========================================

  ingress {
    description = "Jenkins inbound agent communication"
    from_port   = 50000
    to_port     = 50000
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  # ==========================================
  # Outbound Traffic
  # ==========================================

  egress {
    description = "Allow outbound traffic"
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }

  # ==========================================
  # Tags
  # ==========================================

  tags = {
    Name        = "${var.project_name}-common-sg"
    Project     = "CollegeAdmissionSystem"
    Environment = var.environment
    ManagedBy   = "Terraform"
  }
}