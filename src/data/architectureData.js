export const architectureData = {
  cluster: {
    name: "minikube",
    k8sVersion: "v1.35.1",
    driver: "docker",
    dockerVersion: "29.2.1",
    os: "Ubuntu 22.04 LTS (WSL2)"
  },
  namespaces: [
    {
      id: "dev",
      name: "Development (ns/dev)",
      color: "emerald",
      badgeColor: "bg-emerald-500/10 text-emerald-400 border-emerald-500/30",
      accentBorder: "border-emerald-500/50",
      replicas: 2,
      scaledReplicas: 5,
      image: "nginx:1.25",
      serviceType: "ClusterIP",
      clusterIp: "10.96.52.172",
      dnsName: "nginx-service.dev.svc.cluster.local",
      purpose: "Active development iteration with pinned version stability.",
      pods: [
        { name: "nginx-deployment-5fd577784b-6jblg", ip: "10.244.0.8", status: "Running", restarts: 0 },
        { name: "nginx-deployment-5fd577784b-kh2gh", ip: "10.244.0.9", status: "Running", restarts: 0 }
      ]
    },
    {
      id: "test",
      name: "Testing (ns/test)",
      color: "amber",
      badgeColor: "bg-amber-500/10 text-amber-400 border-amber-500/30",
      accentBorder: "border-amber-500/50",
      replicas: 1,
      scaledReplicas: 2,
      image: "nginx:latest",
      serviceType: "ClusterIP",
      clusterIp: "10.106.42.240",
      dnsName: "nginx-service.test.svc.cluster.local",
      purpose: "QA & automated integration verification namespace.",
      pods: [
        { name: "nginx-deployment-59f86b59ff-tn4jn", ip: "10.244.0.12", status: "Running", restarts: 0 }
      ]
    },
    {
      id: "prod",
      name: "Production (ns/prod)",
      color: "rose",
      badgeColor: "bg-rose-500/10 text-rose-400 border-rose-500/30",
      accentBorder: "border-rose-500/50",
      replicas: 3,
      scaledReplicas: 5,
      image: "nginx:latest",
      serviceType: "ClusterIP",
      clusterIp: "10.110.18.99",
      dnsName: "nginx-service.prod.svc.cluster.local",
      purpose: "High availability production deployment with 3-way pod redundancy.",
      pods: [
        { name: "nginx-deployment-59f86b59ff-ctq4l", ip: "10.244.0.15", status: "Running", restarts: 0 },
        { name: "nginx-deployment-59f86b59ff-hx45x", ip: "10.244.0.16", status: "Running", restarts: 0 },
        { name: "nginx-deployment-59f86b59ff-z2q7n", ip: "10.244.0.17", status: "Running", restarts: 0 }
      ]
    }
  ],
  isolationRules: [
    { title: "Scoped Resource Names", desc: "Every namespace can use the exact same Service name ('nginx-service') without naming collisions." },
    { title: "DNS FQDN Resolution", desc: "Pod communication across namespaces requires full DNS syntax (<service>.<namespace>.svc.cluster.local)." },
    { title: "ReplicaSet Isolation", desc: "Scaling dev from 2 -> 5 replicas has 0 impact on ReplicaSets in test or prod namespaces." },
    { title: "Zero-Downtime Rollouts", desc: "Upgrading NGINX in dev creates a new ReplicaSet in dev while prod continues uninterrupted." }
  ]
};
