export const timelineSteps = [
  {
    step: "01",
    title: "Clone Repository & Environment Check",
    command: "git clone https://github.com/Pavilioni5/IBM-\ncd IBM-\ndocker --version\nkubectl version --client",
    explanation: "Ensures Git workspace, Docker Engine, and kubectl CLI binaries are properly installed on WSL2 Ubuntu.",
    badge: "Prerequisites"
  },
  {
    step: "02",
    title: "Start Minikube Cluster",
    command: "minikube start --driver=docker",
    explanation: "Provisions single-node Kubernetes control plane (v1.35.1) running inside containerized driver.",
    badge: "Cluster Boot"
  },
  {
    step: "03",
    title: "Verify Control Plane Health",
    command: "kubectl cluster-info\nkubectl get nodes",
    explanation: "Confirms control plane readiness and verifies 'minikube' single-node worker is in Ready state.",
    badge: "Verification"
  },
  {
    step: "04",
    title: "Provision Isolated Namespaces",
    command: "kubectl apply -f namespaces/\nkubectl get namespaces",
    explanation: "Creates dev, test, and prod virtual namespace boundaries declaratively from manifest files.",
    badge: "Namespace Creation"
  },
  {
    step: "05",
    title: "Enforce ResourceQuotas & NetworkPolicies",
    command: "kubectl apply -f quotas/\nkubectl apply -f netpol/\nkubectl get resourcequotas,netpol -A",
    explanation: "Applies CPU/RAM resource limits and Zero-Trust ingress firewalls across all 3 namespaces.",
    badge: "Security Guardrails"
  },
  {
    step: "06",
    title: "Deploy Application Workloads",
    command: "kubectl apply -f deployments/\nkubectl get deployments -A",
    explanation: "Spins up NGINX deployments independently in dev (2 replicas), test (1 replica), and prod (3 replicas).",
    badge: "Deploy Workloads"
  },
  {
    step: "07",
    title: "Expose Workloads with Services",
    command: "kubectl apply -f services/\nkubectl get svc -A",
    explanation: "Attaches ClusterIP virtual endpoints to app=nginx pod labels within each respective namespace.",
    badge: "Service Wiring"
  },
  {
    step: "08",
    title: "Access Workloads via Tunnel",
    command: "minikube service nginx-service -n dev",
    explanation: "Creates local host tunnel (e.g., http://127.0.0.1:41865) to bypass ClusterIP boundary for testing.",
    badge: "Local Access"
  }
];
