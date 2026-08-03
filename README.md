# IBM Kubernetes Namespace Isolation & Security Guardrails

![Kubernetes](https://img.shields.io/badge/Kubernetes-v1.35.1-blue?logo=kubernetes)
![Minikube](https://img.shields.io/badge/Minikube-v1.38.1-green?logo=kubernetes)
![Docker](https://img.shields.io/badge/Docker-29.2.1-blue?logo=docker)
![Platform](https://img.shields.io/badge/Platform-WSL2%20Ubuntu-orange?logo=linux)
![Live Portal](https://img.shields.io/badge/Live%20Portal-Vercel-000000?logo=vercel)

🌐 **Live Documentation Portal**: [https://ibm-six-xi.vercel.app/](https://ibm-six-xi.vercel.app/)

---

## 📖 Project Overview

This project demonstrates **multi-environment namespace isolation and enterprise security guardrails** in Kubernetes using a local **Minikube** cluster. A single NGINX application is deployed independently into three isolated namespaces — **dev**, **test**, and **prod** — simulating a production-grade software delivery pipeline on shared infrastructure.

Beyond basic namespace partitioning, this repository implements **Enterprise-Grade Kubernetes Security & Guardrails**:
- 🛡️ **ResourceQuotas & LimitRanges**: Caps CPU cores, RAM, and Pod counts per environment to prevent noisy neighbor resource starvation.
- 🔒 **Zero-Trust NetworkPolicies**: Restricts ingress traffic to namespace Pods so `dev` workloads cannot query or probe `prod` services over internal cluster DNS.

---

## 🎯 Key Objectives

- Provision and manage isolated environments (`dev`, `test`, `prod`) on a single cluster.
- Enforce strict hardware caps via **ResourceQuotas** (CPU, Memory, Pod limits).
- Enforce **Zero-Trust NetworkPolicies** to block unauthorized cross-namespace traffic.
- Deploy, scale, and perform zero-downtime rolling updates independently per namespace.
- Expose workloads securely via internal `ClusterIP` Services.
- Interactive documentation portal built with **React, Vite, and Tailwind CSS**.

---

## 🏗️ Architecture

```text
                        Developer
                            │
                        kubectl CLI
                            │
                  ┌───────────────────┐
                  │      Minikube      │
                  │  Kubernetes Node   │
                  │  (Docker driver)   │
                  └───────────────────┘
                            │
         ┌──────────────────┼──────────────────┐
         │                  │                  │
        dev                test               prod
   (1 CPU / 1GB)     (0.5 CPU / 512MB)   (4 CPU / 4GB)
         │                  │                  │
    ResourceQuota      ResourceQuota      ResourceQuota
    NetworkPolicy      NetworkPolicy      NetworkPolicy
         │                  │                  │
    Deployment          Deployment         Deployment
    (2 replicas)        (1 replica)        (3 replicas)
         │                  │                  │
       Pods                Pods               Pods
         │                  │                  │
   Service (ClusterIP) Service (ClusterIP) Service (ClusterIP)
```

---

## 📂 Project Structure

```text
IBM/
│
├── namespaces/                 # Virtual Environment Partition Manifests
│   ├── dev-namespace.yaml
│   ├── test-namespace.yaml
│   └── prod-namespace.yaml
│
├── quotas/                     # Hardware Resource Quota Caps (CPU, RAM, Pods)
│   ├── dev-quota.yaml
│   ├── test-quota.yaml
│   └── prod-quota.yaml
│
├── netpol/                     # Zero-Trust Ingress Firewall Policies
│   ├── dev-netpol.yaml
│   ├── test-netpol.yaml
│   └── prod-netpol.yaml
│
├── deployments/                # Workload Deployment Declarations
│   ├── nginx-dev.yaml
│   ├── nginx-test.yaml
│   └── nginx-prod.yaml
│
├── services/                   # ClusterIP Service Load Balancers
│   ├── nginx-dev-service.yaml
│   ├── nginx-test-service.yaml
│   └── nginx-prod-service.yaml
│
├── src/                        # Interactive Documentation Portal Source
├── index.html
├── package.json
└── README.md
```

---

## 🔒 Namespace Environment & Security Matrix

| Namespace | Replicas | CPU Quota | Memory Quota | Pod Ceiling | NetworkPolicy | Container Image | Service Type |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| `dev` | 2 | `1 vCPU` | `1 GiB` | 5 Pods | Ingress (dev-only) | `nginx:1.25` | `ClusterIP` |
| `test` | 1 | `500m CPU` | `512 MiB` | 3 Pods | Ingress (test-only) | `nginx:latest` | `ClusterIP` |
| `prod` | 3 | `4 vCPU` | `4 GiB` | 10 Pods | Zero-Trust (prod-only) | `nginx:latest` | `ClusterIP` |

---

## 🛠️ Technology Stack

| Tool | Version Used | Role |
| :--- | :--- | :--- |
| **Kubernetes** | `v1.35.1` | Container Orchestration Engine |
| **Minikube** | `v1.38.1` | Local Single-Node Kubernetes Cluster |
| **Docker Engine** | `29.2.1` | Container Runtime |
| **kubectl** | `v1.35.2` | CLI Control Plane Client |
| **React + Vite** | `v5.4.10` | Interactive Web Documentation Portal |
| **Tailwind CSS** | `v3.4.14` | Dark Theme UI Component Styling |
| **OS** | `Ubuntu 22.04 LTS` | WSL2 Linux Environment |

---

## 🚀 Environment Setup & Deployment Pipeline

### 1. Start Minikube Cluster
```bash
minikube start --driver=docker
```

### 2. Provision Namespaces
```bash
kubectl apply -f namespaces/
kubectl get namespaces
```

### 3. Enforce ResourceQuotas & NetworkPolicies
```bash
kubectl apply -f quotas/
kubectl apply -f netpol/
kubectl get resourcequotas,netpol -A
```

### 4. Deploy Applications & Services
```bash
kubectl apply -f deployments/
kubectl apply -f services/
kubectl get all -A
```

### 5. Access Application via Tunnel
```bash
minikube service nginx-service -n dev
```

---

## 📝 Quick Command Reference

```bash
# Cluster lifecycle
minikube start
minikube status
kubectl cluster-info
kubectl get nodes

# Security & Guardrails
kubectl apply -f quotas/
kubectl apply -f netpol/
kubectl get resourcequotas -A
kubectl get netpol -A
kubectl describe resourcequota dev-quota -n dev
kubectl describe netpol dev-network-policy -n dev

# Deployments & Scaling
kubectl apply -f deployments/
kubectl get deployments -A
kubectl scale deployment nginx-deployment --replicas=5 -n dev
kubectl rollout status deployment/nginx-deployment -n dev
kubectl rollout history deployment/nginx-deployment -n dev

# Services & Debugging
kubectl get svc -A
kubectl describe service nginx-service -n dev
kubectl get pods -n dev --show-labels
kubectl describe pod <pod-name> -n dev
kubectl logs -f <pod-name> -n dev
```

---

## 🌐 Live Web Portal Development

To run the interactive web documentation portal locally:

```bash
# Install dependencies
npm install

# Start Vite local development server
npm run dev

# Build production bundle
npm run build
```