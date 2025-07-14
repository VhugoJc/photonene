variable "instance_type" {
  default = "t2.micro"
}

variable "key_name" {
  default = "aws-node-key"
}

variable "public_key_path" {
  default = "~/.ssh/aws-node-key.pub"
}

variable "app_port" {
  default = 3000
}
