# Kubernetes Namespace Isolation using Minikube

![Kubernetes](https://img.shields.io/badge/Kubernetes-v1.35-blue?logo=kubernetes)
![Minikube](https://img.shields.io/badge/Minikube-v1.38.1-green?logo=kubernetes)
![Docker](https://img.shields.io/badge/Docker-29.2.1-blue?logo=docker)
![Platform](https://img.shields.io/badge/Platform-WSL2%20Ubuntu-orange?logo=linux)
![License](https://img.shields.io/badge/License-MIT-yellow)

## 📖 Project Overview

This project demonstrates **namespace-based environment isolation in Kubernetes**, using a local **Minikube** cluster. A single NGINX application is deployed independently into three isolated namespaces — **dev**, **test**, and **prod** — to simulate a realistic multi-environment software delivery pipeline.

Each namespace runs its own **Deployment**, **ReplicaSet**, **Pods**, and **Service**, completely isolated from the others despite sharing the same underlying cluster. The project walks through the full lifecycle: provisioning the cluster, creating namespaces, deploying workloads, exposing them via Services, scaling, performing rolling updates, and verifying/troubleshooting the result — all using standard `kubectl` workflows.

---

## 🎯 Objectives

- Understand core Kubernetes architecture and object model.
- Create and manage isolated namespaces (`dev`, `test`, `prod`).
- Deploy the same application independently across multiple namespaces.
- Expose applications internally using `ClusterIP` Services.
- Scale Deployments up and down and observe ReplicaSet behavior.
- Perform rolling updates and inspect rollout history.
- Verify, inspect, and troubleshoot cluster resources.
- Demonstrate that namespaces provide true resource isolation.

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
         │                  │                  │
    Deployment          Deployment         Deployment
    (2 replicas)        (1 replica)        (3 replicas)
         │                  │                  │
      ReplicaSet         ReplicaSet         ReplicaSet
         │                  │                  │
       Pods                Pods               Pods
         │                  │                  │
   Service (ClusterIP)  Service (ClusterIP) Service (ClusterIP)
```

---

## 📂 Project Structure

```text
Kubernetes-Namespace-Isolation/
│
├── namespaces/
│   ├── dev-namespace.yaml
│   ├── test-namespace.yaml
│   └── prod-namespace.yaml
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

## 🛠️ Technology Stack

| Tool | Version Used |
|------|--------------|
| Kubernetes | v1.35.1 |
| Minikube | v1.38.1 |
| Docker Engine | 29.2.1 |
| kubectl (client) | v1.35.2 |
| Kustomize | v5.7.1 |
| OS | Ubuntu 22.04 on WSL2 |

---

## 📋 Prerequisites

Before starting, ensure the following are installed and working:

- Docker (Docker Engine / Docker Desktop with WSL2 integration)
- Minikube
- kubectl
- Git
- A code editor such as Visual Studio Code
- WSL (Ubuntu) if running on Windows

---

## 🚀 Environment Setup

### 1. Start Minikube

```bash
minikube start
```

Minikube boots a single-node Kubernetes cluster using the Docker driver:

```text
😄  minikube v1.38.1 on Ubuntu 22.04 (kvm/amd64)
✨  Using the docker driver based on existing profile
👍  Starting "minikube" primary control-plane node in "minikube" cluster
🐳  Preparing Kubernetes v1.35.1 on Docker 29.2.1 ...
🌟  Enabled addons: default-storageclass, storage-provisioner
🏄  Done! kubectl is now configured to use "minikube" cluster
```

### 2. Verify the Cluster

```bash
kubectl cluster-info
kubectl get nodes
```

Expected output:

```text
NAME       STATUS   ROLES           AGE   VERSION
minikube   Ready    control-plane   10d   v1.35.1
```

---

## 📦 Step 1 — Create Namespaces

Namespace manifests live in `namespaces/` and define three isolated environments: `dev`, `test`, and `prod`.

```bash
kubectl apply -f namespaces/
```

Verify:

```bash
kubectl get namespaces
```

```text
NAME              STATUS   AGE
default           Active   10d
dev               Active   10d
kube-node-lease   Active   10d
kube-public       Active   10d
kube-system       Active   10d
prod              Active   10d
test              Active   10d
```

---

## 🚀 Step 2 — Deploy the Application

Each environment uses its own Deployment manifest, allowing independent replica counts and image versions per namespace:

| Namespace | Manifest | Replicas | Image |
|-----------|----------|----------|-------|
| dev | `nginx-dev.yaml` | 2 | `nginx:1.25` |
| test | `nginx-test.yaml` | 1 | `nginx:latest` |
| prod | `nginx-prod.yaml` | 3 | `nginx:latest` |

```bash
kubectl apply -f deployments/nginx-dev.yaml
kubectl apply -f deployments/nginx-test.yaml
kubectl apply -f deployments/nginx-prod.yaml
```

Verify across all namespaces:

```bash
kubectl get deployments -A
```

```text
NAMESPACE     NAME               READY   UP-TO-DATE   AVAILABLE   AGE
dev           nginx-deployment   2/2     2            2           126m
kube-system   coredns            1/1     1            1           10d
prod          nginx-deployment   3/3     3            3           6m31s
test          nginx-deployment   1/1     1            1           13m
```

---

## 🌐 Step 3 — Expose the Application with Services

Each namespace has a matching `ClusterIP` Service that routes traffic to pods labeled `app=nginx`:

```bash
kubectl apply -f services/nginx-dev-service.yaml
kubectl apply -f services/nginx-test-service.yaml
kubectl apply -f services/nginx-prod-service.yaml
```

Verify:

```bash
kubectl get svc -A
```

```text
NAMESPACE   NAME            TYPE        CLUSTER-IP       PORT(S)
dev         nginx-service   ClusterIP   10.96.52.172     80/TCP
test        nginx-service   ClusterIP   10.106.42.240    80/TCP
prod        nginx-service   ClusterIP   <cluster-ip>     80/TCP
```

Inspect endpoint wiring (confirms the Service selector correctly targets the Pods):

```bash
kubectl describe service nginx-service -n dev
```

```text
Selector:     app=nginx
Type:         ClusterIP
Endpoints:    10.244.0.9:80,10.244.0.8:80
```

---

## 📈 Scaling Deployments

Each namespace's replica count can be adjusted independently without affecting the others.

```bash
kubectl scale deployment nginx-deployment --replicas=5 -n dev
kubectl scale deployment nginx-deployment --replicas=2 -n test
kubectl scale deployment nginx-deployment --replicas=5 -n prod
```

Scaling `dev` up to 5 and back down to 2 replicas, for example, is captured in the Deployment's event history:

```text
Events:
  ScalingReplicaSet  Scaled up replica set nginx-deployment-59f86b59ff from 2 to 5
  ScalingReplicaSet  Scaled down replica set nginx-deployment-59f86b59ff from 5 to 2
```

---

## 🔄 Rolling Updates

Updating the `dev` Deployment's manifest (e.g., changing the image from `nginx:latest` to `nginx:1.25`) and re-applying it triggers a zero-downtime rolling update:

```bash
kubectl apply -f deployments/nginx-dev.yaml
kubectl rollout status deployment/nginx-deployment -n dev
```

```text
Waiting for deployment "nginx-deployment" rollout to finish: 1 out of 2 new replicas have been updated...
Waiting for deployment "nginx-deployment" rollout to finish: 1 old replicas are pending termination...
deployment "nginx-deployment" successfully rolled out
```

Kubernetes creates a **new ReplicaSet** (`nginx-deployment-5fd577784b`) for the updated pod template while gracefully scaling down the old one (`nginx-deployment-59f86b59ff`) — this is the standard `RollingUpdate` strategy (25% max unavailable, 25% max surge).

View revision history:

```bash
kubectl rollout history deployment/nginx-deployment -n dev
```

```text
REVISION  CHANGE-CAUSE
1         <none>
2         <none>
```

> 💡 **Tip:** Use `kubectl apply -f <file> --record` or add `kubectl.kubernetes.io/change-cause` annotations to capture meaningful change-cause messages in rollout history.

---

## 🔍 Verification Commands

View all resources across every namespace:

```bash
kubectl get all -A
```

Check namespaces:

```bash
kubectl get namespaces
```

Check pods per environment:

```bash
kubectl get pods -n dev
kubectl get pods -n test
kubectl get pods -n prod
```

Check deployments cluster-wide:

```bash
kubectl get deployments -A
```

Describe a specific pod (useful for debugging scheduling, image pull, or readiness issues):

```bash
kubectl describe pod <pod-name> -n dev
```

Stream logs from a running pod:

```bash
kubectl logs -f <pod-name> -n dev
```

View namespace-scoped events:

```bash
kubectl get events -n dev
```

---

## 🌍 Accessing the Application Locally

Since the Services are `ClusterIP` (internal-only by design), Minikube can still open a temporary local tunnel for development access:

```bash
minikube service nginx-service -n dev
```

```text
❗  Services [dev/nginx-service] have type "ClusterIP" not meant to be exposed,
    however for local development minikube allows you to access this !
🔗  Starting tunnel for service nginx-service.
│ dev │ nginx-service │ http://127.0.0.1:41865 │
```

> ⚠️ **Note (WSL environments):** On headless WSL setups without a GUI browser installed, Minikube's auto-open step will fail with an `xdg-open` error even though the tunnel itself works fine. Simply copy the printed URL (e.g., `http://127.0.0.1:41865`) into a browser on the Windows host, or use `curl` from within WSL to confirm connectivity:
> ```bash
> curl http://127.0.0.1:41865
> ```

---

## 🏷️ Kubernetes Components Used

| Component | Purpose |
|-----------|---------|
| **Namespace** | Provides logical isolation of resources between environments. |
| **Pod** | Smallest deployable unit; runs one or more containers. |
| **ReplicaSet** | Ensures a specified number of identical pod replicas are running. |
| **Deployment** | Manages ReplicaSets, enables scaling and declarative rolling updates. |
| **Service (ClusterIP)** | Provides a stable, internal network endpoint for accessing pods. |
| **Labels & Selectors** | Associate Services and Deployments with the correct Pods (`app=nginx`). |

---

## 🔒 Namespace Isolation

This project provisions three logically separated environments on the **same physical cluster**:

| Namespace | Purpose | Replicas | Image |
|-----------|---------|----------|-------|
| `dev` | Development / active iteration | 2 | `nginx:1.25` |
| `test` | QA / integration testing | 1 | `nginx:latest` |
| `prod` | Production-like environment | 3 | `nginx:latest` |

Each namespace maintains its own:

- Deployments and ReplicaSets
- Pods (with independent lifecycles and restart counts)
- Services and ClusterIP addresses

Resources in one namespace (e.g., `dev`) are **not visible or addressable** from another (e.g., `prod`) unless explicitly connected via fully qualified DNS names (`<service>.<namespace>.svc.cluster.local`), which demonstrates true isolation on a shared cluster.

---

## 📝 Quick Command Reference

```bash
# Cluster lifecycle
minikube start
minikube status
kubectl cluster-info
kubectl get nodes

# Namespace management
kubectl apply -f namespaces/
kubectl get namespaces

# Deployments
kubectl apply -f deployments/
kubectl get deployments -A
kubectl scale deployment nginx-deployment --replicas=<n> -n <namespace>
kubectl rollout status deployment/nginx-deployment -n <namespace>
kubectl rollout history deployment/nginx-deployment -n <namespace>

# Services
kubectl apply -f services/
kubectl get svc -A
kubectl describe service nginx-service -n <namespace>
minikube service nginx-service -n <namespace>

# Verification & debugging
kubectl get all -A
kubectl get pods -n <namespace> --show-labels
kubectl describe pod <pod-name> -n <namespace>
kubectl logs -f <pod-name> -n <namespace>
kubectl get events -n <namespace>
```

---

## 🛠️ Troubleshooting

### Cluster connection refused / stopped

```bash
minikube status
minikube start
```

### No resources found

Re-apply all manifests:

```bash
kubectl apply -f namespaces/
kubectl apply -f deployments/
kubectl apply -f services/
```

### Pod stuck in `ContainerCreating`

```bash
kubectl describe pod <pod-name> -n <namespace>
kubectl get events -n <namespace>
```

Common causes: image pull delays, insufficient node resources, or volume mount issues.

### `minikube service` fails with `xdg-open: no method available`

This happens on headless/WSL environments with no GUI browser installed. The tunnel still starts successfully — copy the printed `http://127.0.0.1:<port>` URL into a browser manually, or use `curl`/`wget` to verify the service responds.

### Service has no endpoints

Confirm the Service's `selector` matches the Pod's `labels` exactly:

```bash
kubectl get pods -n <namespace> --show-labels
kubectl describe service nginx-service -n <namespace>
```

---

## ✅ Key Learnings

- Namespaces provide strong logical isolation between environments on a single Kubernetes cluster, without needing separate clusters per environment.
- Deployments abstract away Pod and ReplicaSet management, enabling declarative scaling and safe rolling updates.
- `ClusterIP` Services are the default and most secure Service type for internal-only communication between workloads.
- `kubectl describe` and `kubectl get events` are the primary tools for diagnosing scheduling, image, and networking issues.
- Minikube's local tunnel is a convenient way to reach internal (`ClusterIP`) services during development, even though it isn't intended for production-style exposure.

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).