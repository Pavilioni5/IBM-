# Kubernetes Namespace Isolation using Minikube

![Kubernetes](https://img.shields.io/badge/Kubernetes-v1.35-blue?logo=kubernetes)
![Minikube](https://img.shields.io/badge/Minikube-Local%20Cluster-green)
![Docker](https://img.shields.io/badge/Docker-Container-blue?logo=docker)
![License](https://img.shields.io/badge/License-MIT-yellow)

## 📖 Project Overview

This project demonstrates **Kubernetes Namespace Isolation** using **Minikube**. The application is deployed into separate namespaces (**dev**, **test**, and **prod**) to simulate isolated environments for software development, testing, and production.

The project showcases the complete Kubernetes deployment workflow, including namespace management, deployments, services, verification, and troubleshooting.

---

## 🎯 Objectives

- Understand Kubernetes architecture.
- Create isolated namespaces.
- Deploy NGINX applications.
- Expose applications using Kubernetes Services.
- Verify deployments and pods.
- Learn troubleshooting techniques.
- Understand namespace isolation.

---

## 🏗️ Architecture

```text
                   Developer
                       │
                   kubectl CLI
                       │
               ┌─────────────────┐
               │    Minikube      │
               │ Kubernetes Node  │
               └─────────────────┘
                       │
        ┌──────────────┼──────────────┐
        │              │              │
      dev            test           prod
        │              │              │
   Deployment     Deployment     Deployment
        │              │              │
       Pods           Pods           Pods
        │              │              │
      Service        Service        Service
```

---

# 📂 Project Structure

```text
Kubernetes-Namespace-Isolation/
│
├── namespaces/
│   ├── dev.yaml
│   ├── test.yaml
│   └── prod.yaml
│
├── deployments/
│   ├── nginx-dev.yaml
│   ├── nginx-test.yaml
│   └── nginx-prod.yaml
│
├── services/
│   ├── nginx-dev-service.yaml
│   ├── nginx-test-service.yaml
│   └── nginx-prod-service.yaml
│
└── README.md
```

---

# 🛠️ Technology Stack

- Kubernetes
- Minikube
- Docker Desktop
- kubectl
- Git
- GitHub
- VS Code
- Ubuntu (WSL)

---

# 📋 Prerequisites

- Docker Desktop
- Minikube
- kubectl
- Git
- Visual Studio Code
- WSL (Ubuntu)

---

# 🚀 Environment Setup

### Start Minikube

```bash
minikube start
```

### Verify Cluster

```bash
kubectl cluster-info
kubectl get nodes
```

Expected Output

```text
NAME       STATUS
minikube   Ready
```

---

# 📦 Create Namespaces

```bash
kubectl apply -f namespaces/
```

Verify

```bash
kubectl get namespaces
```

---

# 🚀 Deploy Applications

```bash
kubectl apply -f deployments/
```

Verify

```bash
kubectl get deployments -A
```

---

# 🌐 Create Services

```bash
kubectl apply -f services/
```

Verify

```bash
kubectl get svc -A
```

---

# 🔍 Verification Commands

View all resources

```bash
kubectl get all -A
```

Check namespaces

```bash
kubectl get namespaces
```

Check Pods

```bash
kubectl get pods -n dev
kubectl get pods -n test
kubectl get pods -n prod
```

Check Deployments

```bash
kubectl get deployments -A
```

Describe Pod

```bash
kubectl describe pod <pod-name> -n dev
```

View Events

```bash
kubectl get events -n dev
```

---

# 🏷️ Kubernetes Components

### Namespace

Provides logical isolation between environments.

### Pod

Smallest deployable unit in Kubernetes.

### ReplicaSet

Maintains the desired number of pod replicas.

### Deployment

Manages ReplicaSets and application updates.

### Service

Provides a stable network endpoint for accessing pods.

### Labels & Selectors

Used to associate Services with the correct Pods.

---

# 🔒 Namespace Isolation

This project uses three namespaces:

| Namespace | Purpose |
|-----------|---------|
| dev | Development |
| test | Testing |
| prod | Production |

Each namespace has its own:

- Deployments
- Pods
- Services

Resources remain isolated from one another.

---

# 📝 Commands Used

```bash
minikube start

kubectl cluster-info

kubectl get nodes

kubectl get namespaces

kubectl apply -f namespaces/

kubectl apply -f deployments/

kubectl apply -f services/

kubectl get all -A

kubectl get deployments -A

kubectl get pods -A

kubectl get svc -A

kubectl describe pod <pod>

kubectl rollout restart deployment <deployment> -n dev
```

---

# 🛠️ Troubleshooting

### Cluster Connection Refused

```bash
minikube start
```

---

### No Resources Found

Reapply manifests.

```bash
kubectl apply -f namespaces/
kubectl apply -f deployments/
kubectl apply -f services/
```

---

### Pod Stuck in ContainerCreating

```bash
kubectl describe pod <pod-name> -n dev
kubectl get events -n dev
```

---

### Verify Cluster

```bash
kubectl get all -A
```
---