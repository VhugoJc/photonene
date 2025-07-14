# PhotoNene Infrastructure

This repository contains the Terraform infrastructure code for deploying the PhotoNene application on AWS.

## 🏗️ Architecture

The infrastructure consists of:

- **EC2 Instance**: Ubuntu Server 22.04 LTS running the Node.js application
- **Security Group**: Configured to allow HTTP traffic (port 3000) and SSH access (port 22)
- **Key Pair**: For secure SSH access to the instance
- **Auto Deployment**: User data script that automatically clones, builds, and starts the application

## 📋 Prerequisites

Before you begin, ensure you have:

1. **AWS CLI** configured with appropriate credentials
2. **Terraform** installed (version 1.0 or later)
3. **SSH Key Pair** generated for EC2 access
4. **AWS Account** with appropriate permissions

## 🚀 Quick Start

### 1. Clone the Repository

```bash
git clone https://github.com/VhugoJc/photonene.git
cd photonene/infra
```

### 2. Configure Variables

Create a `terraform.tfvars` file with your specific values:

```hcl
instance_type     = "t2.micro"
key_name          = "your-key-name"
public_key_path   = "~/.ssh/your-key.pub"
app_port          = 3000
```

### 3. Initialize Terraform

```bash
terraform init
```

### 4. Plan the Deployment

```bash
terraform plan
```

### 5. Deploy the Infrastructure

```bash
terraform apply
```

### 6. Access Your Application

After deployment, get the public IP from the output:

```bash
terraform output instance_public_ip
```

Visit: `http://[PUBLIC_IP]:3000`

## 📁 File Structure

```
infra/
├── main.tf              # Main infrastructure resources
├── variables.tf         # Variable definitions
├── output.tf           # Output values
├── provider.tf         # AWS provider configuration
├── user_data.sh        # EC2 initialization script
├── terraform.tfvars    # Variable values (not in version control)
└── .gitignore          # Git ignore rules
```

## 🔧 Configuration

### Variables

| Variable | Description | Default | Required |
|----------|-------------|---------|----------|
| `instance_type` | EC2 instance type | `t2.micro` | No |
| `key_name` | AWS key pair name | `aws-node-key` | No |
| `public_key_path` | Path to SSH public key | `~/.ssh/aws-node-key.pub` | No |
| `app_port` | Application port | `3000` | No |

### Security Groups

The security group allows:
- **Inbound**: Port 3000 (HTTP) and 22 (SSH) from anywhere
- **Outbound**: All traffic (required for package installation)

## 🔐 Security Considerations

⚠️ **Important Security Notes:**

1. **SSH Access**: Currently allows SSH from anywhere (`0.0.0.0/0`). Consider restricting to your IP:
   ```hcl
   cidr_blocks = ["YOUR_IP/32"]
   ```

2. **Application Access**: The app is accessible from anywhere. Consider using an Application Load Balancer with proper security groups for production.

3. **Sensitive Files**: Never commit `terraform.tfvars` or `terraform.tfstate` files to version control.

## 🚀 Deployment Process

The EC2 instance automatically:

1. Updates the system packages
2. Installs Node.js (v22) via NVM
3. Clones the PhotoNene repository
4. Installs dependencies
5. Builds the Next.js application
6. Starts the application with PM2

## 📊 Monitoring

The application runs under PM2 process manager. To monitor:

```bash
ssh -i ~/.ssh/your-key.pem ubuntu@[PUBLIC_IP]
pm2 status
pm2 logs nodeapp
```

## 🧹 Cleanup

To destroy the infrastructure:

```bash
terraform destroy
```

## 🔧 Troubleshooting

### Common Issues

1. **Key Pair Issues**: Ensure your SSH key exists and has correct permissions (600)
2. **Region Mismatch**: Verify the AMI ID is correct for your AWS region
3. **Port Access**: Check security group rules if you can't access the application

### Logs

Check the EC2 instance logs:
```bash
ssh -i ~/.ssh/your-key.pem ubuntu@[PUBLIC_IP]
sudo tail -f /var/log/cloud-init-output.log
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 📞 Support

For questions or issues, please open an issue in the GitHub repository.

---

**Note**: This infrastructure is designed for development/testing purposes. For production use, consider implementing additional security measures, monitoring, and high availability configurations.
