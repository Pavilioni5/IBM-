export const commandsList = [
  // Cluster Lifecycle
  { command: "minikube start", category: "Cluster Lifecycle", description: "Boots local Kubernetes cluster on Docker driver." },
  { command: "minikube status", category: "Cluster Lifecycle", description: "Checks control plane, kubelet, and API server status." },
  { command: "kubectl cluster-info", category: "Cluster Lifecycle", description: "Displays Control Plane and CoreDNS endpoint URLs." },
  { command: "kubectl get nodes", category: "Cluster Lifecycle", description: "Lists all cluster nodes with roles, age, and version." },
  { command: "minikube dashboard", category: "Cluster Lifecycle", description: "Launches visual web dashboard for Kubernetes cluster." },
  { command: "minikube stop", category: "Cluster Lifecycle", description: "Gracefully shuts down the local Minikube VM/container." },
  { command: "minikube delete", category: "Cluster Lifecycle", description: "Deletes cluster state and frees local Docker storage." },

  // Namespace Management
  { command: "kubectl apply -f namespaces/", category: "Namespace Management", description: "Creates all 3 namespaces (dev, test, prod) declaratively." },
  { command: "kubectl get namespaces", category: "Namespace Management", description: "Lists all cluster namespaces and their active status." },
  { command: "kubectl get ns", category: "Namespace Management", description: "Shorthand command to list namespaces." },
  { command: "kubectl describe ns dev", category: "Namespace Management", description: "Shows details, quotas, and status of dev namespace." },
  { command: "kubectl delete ns test", category: "Namespace Management", description: "Deletes test namespace and all encapsulated workloads." },

  // Security & Guardrails
  { command: "kubectl apply -f quotas/", category: "Security & Guardrails", description: "Enforces CPU, Memory, and Pod limit quotas across namespaces." },
  { command: "kubectl apply -f netpol/", category: "Security & Guardrails", description: "Applies Zero-Trust NetworkPolicies blocking cross-namespace traffic." },
  { command: "kubectl get resourcequotas -A", category: "Security & Guardrails", description: "Lists resource quotas and usage limits across all namespaces." },
  { command: "kubectl get netpol -A", category: "Security & Guardrails", description: "Lists active Zero-Trust NetworkPolicies across all namespaces." },
  { command: "kubectl describe resourcequota dev-quota -n dev", category: "Security & Guardrails", description: "Displays current hard caps vs active usage for CPU/RAM in dev." },
  { command: "kubectl describe netpol dev-network-policy -n dev", category: "Security & Guardrails", description: "Inspects ingress firewall rules for dev namespace." },

  // Deployments
  { command: "kubectl apply -f deployments/nginx-dev.yaml", category: "Deployments", description: "Deploys 2 NGINX replicas in dev namespace." },
  { command: "kubectl apply -f deployments/nginx-test.yaml", category: "Deployments", description: "Deploys 1 NGINX replica in test namespace." },
  { command: "kubectl apply -f deployments/nginx-prod.yaml", category: "Deployments", description: "Deploys 3 NGINX replicas in prod namespace." },
  { command: "kubectl apply -f deployments/", category: "Deployments", description: "Applies all deployment manifests across environments simultaneously." },
  { command: "kubectl get deployments -A", category: "Deployments", description: "Lists deployments across all cluster namespaces (-A)." },
  { command: "kubectl get deploy -n dev", category: "Deployments", description: "Lists deployments in the dev namespace specifically." },
  { command: "kubectl describe deployment nginx-deployment -n dev", category: "Deployments", description: "Inspects events, strategy, and pod template for dev deployment." },

  // Services & Networking
  { command: "kubectl apply -f services/", category: "Services & Networking", description: "Deploys ClusterIP services across dev, test, and prod." },
  { command: "kubectl get svc -A", category: "Services & Networking", description: "Lists ClusterIP services and virtual IPs across all namespaces." },
  { command: "kubectl describe service nginx-service -n dev", category: "Services & Networking", description: "Verifies endpoint wiring (maps selector app=nginx to pod IPs)." },
  { command: "minikube service nginx-service -n dev", category: "Services & Networking", description: "Opens temporary host tunnel to reach ClusterIP service in browser." },
  { command: "kubectl port-forward svc/nginx-service 8080:80 -n dev", category: "Services & Networking", description: "Forwards local port 8080 directly to dev ClusterIP service." },
  { command: "curl http://127.0.0.1:41865", category: "Services & Networking", description: "Tests HTTP response from Minikube service tunnel." },

  // Scaling & Workload Management
  { command: "kubectl scale deployment nginx-deployment --replicas=5 -n dev", category: "Scaling & Workloads", description: "Scales dev replicas up to 5 without altering test or prod." },
  { command: "kubectl scale deployment nginx-deployment --replicas=2 -n test", category: "Scaling & Workloads", description: "Scales test deployment from 1 to 2 replicas." },
  { command: "kubectl scale deployment nginx-deployment --replicas=5 -n prod", category: "Scaling & Workloads", description: "Scales prod deployment from 3 to 5 replicas." },
  { command: "kubectl scale deployment nginx-deployment --replicas=2 -n dev", category: "Scaling & Workloads", description: "Scales dev deployment back down to 2 replicas." },
  { command: "kubectl get replicaset -A", category: "Scaling & Workloads", description: "Lists underlying ReplicaSet controllers and pod counts." },

  // Rolling Updates & Rollback
  { command: "kubectl set image deployment/nginx-deployment nginx=nginx:1.25 -n dev", category: "Rolling Updates", description: "Updates image tag in dev deployment imperatively." },
  { command: "kubectl rollout status deployment/nginx-deployment -n dev", category: "Rolling Updates", description: "Monitors real-time zero-downtime rolling update progress." },
  { command: "kubectl rollout history deployment/nginx-deployment -n dev", category: "Rolling Updates", description: "Views revision history of rollouts in dev namespace." },
  { command: "kubectl rollout undo deployment/nginx-deployment -n dev", category: "Rolling Updates", description: "Rolls back dev deployment to immediately previous revision." },
  { command: "kubectl rollout restart deployment/nginx-deployment -n dev", category: "Rolling Updates", description: "Triggers a zero-downtime pod restart cycle." },

  // Verification & Debugging
  { command: "kubectl get all -A", category: "Verification & Debugging", description: "Displays all pods, services, deployments, and replicasets cluster-wide." },
  { command: "kubectl get pods -n dev --show-labels", category: "Verification & Debugging", description: "Lists dev pods along with their assigned labels." },
  { command: "kubectl describe pod <pod-name> -n dev", category: "Verification & Debugging", description: "Troubleshoots pod events, container states, and image pulls." },
  { command: "kubectl logs -f <pod-name> -n dev", category: "Verification & Debugging", description: "Streams live stdout/stderr log output from specified pod." },
  { command: "kubectl exec -it <pod-name> -n dev -- /bin/sh", category: "Verification & Debugging", description: "Opens interactive shell inside running container." },
  { command: "kubectl get events -n dev --sort-by='.metadata.creationTimestamp'", category: "Verification & Debugging", description: "Lists namespace event stream sorted by timestamp." }
];

export const commandCategories = [
  "All",
  "Cluster Lifecycle",
  "Namespace Management",
  "Security & Guardrails",
  "Deployments",
  "Services & Networking",
  "Scaling & Workloads",
  "Rolling Updates",
  "Verification & Debugging"
];
