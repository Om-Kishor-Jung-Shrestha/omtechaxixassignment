# ==========================================
# Get Latest Ubuntu 24.04 LTS AMI
# ==========================================

data "aws_ami" "ubuntu" {
  most_recent = true

  owners = ["099720109477"]

  filter {
    name   = "name"
    values = ["ubuntu/images/hvm-ssd-gp3/ubuntu-noble-24.04-amd64-server-*"]
  }

  filter {
    name   = "virtualization-type"
    values = ["hvm"]
  }

  filter {
    name   = "root-device-type"
    values = ["ebs"]
  }

  filter {
    name   = "architecture"
    values = ["x86_64"]
  }
}

# ==========================================
# 1. Jenkins Controller
# ==========================================

resource "aws_instance" "jenkins_controller" {
  ami                    = data.aws_ami.ubuntu.id
  instance_type          = var.jenkins_controller_instance_type
  subnet_id              = aws_subnet.public.id
  vpc_security_group_ids = [aws_security_group.common.id]
  key_name               = var.key_pair_name

  associate_public_ip_address = true

  root_block_device {
    volume_size           = var.root_volume_size
    volume_type           = var.root_volume_type
    delete_on_termination = true
    encrypted             = true
  }

  user_data = file("${path.module}/user-data/jenkins-controller.sh")

  tags = {
    Name        = "${var.project_name}-jenkins-controller"
    Role        = "JenkinsController"
    Environment = var.environment
  }
}

# ==========================================
# 2. Jenkins Agent
# ==========================================

resource "aws_instance" "jenkins_agent" {
  ami                    = data.aws_ami.ubuntu.id
  instance_type          = var.jenkins_agent_instance_type
  subnet_id              = aws_subnet.public.id
  vpc_security_group_ids = [aws_security_group.common.id]
  key_name               = var.key_pair_name

  associate_public_ip_address = true

  root_block_device {
    volume_size           = var.root_volume_size
    volume_type           = var.root_volume_type
    delete_on_termination = true
    encrypted             = true
  }

  user_data = file("${path.module}/user-data/jenkins-agent.sh")

  tags = {
    Name        = "${var.project_name}-jenkins-agent"
    Role        = "JenkinsAgent"
    Environment = var.environment
  }
}

# ==========================================
# 3. Application Server
# ==========================================

resource "aws_instance" "application" {
  ami                    = data.aws_ami.ubuntu.id
  instance_type          = var.application_instance_type
  subnet_id              = aws_subnet.public.id
  vpc_security_group_ids = [aws_security_group.common.id]
  key_name               = var.key_pair_name

  associate_public_ip_address = true

  root_block_device {
    volume_size           = var.root_volume_size
    volume_type           = var.root_volume_type
    delete_on_termination = true
    encrypted             = true
  }

  user_data = file("${path.module}/user-data/application-host.sh")

  tags = {
    Name        = "${var.project_name}-application"
    Role        = "Application"
    Environment = var.environment
  }
}

# ==========================================
# 4. Monitoring Server
# ==========================================

resource "aws_instance" "monitoring" {
  ami                    = data.aws_ami.ubuntu.id
  instance_type          = var.monitoring_instance_type
  subnet_id              = aws_subnet.public.id
  vpc_security_group_ids = [aws_security_group.common.id]
  key_name               = var.key_pair_name

  associate_public_ip_address = true

  root_block_device {
    volume_size           = var.root_volume_size
    volume_type           = var.root_volume_type
    delete_on_termination = true
    encrypted             = true
  }

  user_data = file("${path.module}/user-data/monitoring-host.sh")

  tags = {
    Name        = "${var.project_name}-monitoring"
    Role        = "Monitoring"
    Environment = var.environment
  }
}