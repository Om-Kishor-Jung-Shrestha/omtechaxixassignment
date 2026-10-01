output "jenkins_controller_public_ip" {
  description = "Public IP address of Jenkins Controller"
  value       = aws_instance.jenkins_controller.public_ip
}

output "jenkins_controller_public_dns" {
  description = "Public DNS name of Jenkins Controller"
  value       = aws_instance.jenkins_controller.public_dns
}

output "jenkins_controller_instance_id" {
  description = "Instance ID of Jenkins Controller"
  value       = aws_instance.jenkins_controller.id
}

output "jenkins_agent_public_ip" {
  description = "Public IP address of Jenkins Agent"
  value       = aws_instance.jenkins_agent.public_ip
}

output "application_public_ip" {
  description = "Public IP address of Application Server"
  value       = aws_instance.application.public_ip
}

output "monitoring_public_ip" {
  description = "Public IP address of Monitoring Server"
  value       = aws_instance.monitoring.public_ip
}

output "monitoring_grafana_url" {
  description = "Grafana dashboard URL"
  value       = "http://${aws_instance.monitoring.public_ip}:3000"
}

output "jenkins_url" {
  description = "Jenkins web interface URL"
  value       = "http://${aws_instance.jenkins_controller.public_ip}:8080"
}

output "application_url" {
  description = "Application URL"
  value       = "http://${aws_instance.application.public_ip}"
}