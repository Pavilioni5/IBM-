export const yamlManifests = {
  dev: {
    namespace: {
      filename: "namespaces/dev-namespace.yaml",
      raw: `apiVersion: v1
kind: Namespace

metadata:
  name: dev`,
      annotations: [
        { field: "apiVersion: v1", desc: "Core Kubernetes v1 API endpoint for basic cluster objects." },
        { field: "kind: Namespace", desc: "Defines a virtual cluster partition to isolate names, quotas, and RBAC rules." },
        { field: "metadata.name: dev", desc: "The identifier for the development environment namespace." }
      ]
    },
    deployment: {
      filename: "deployments/nginx-dev.yaml",
      raw: `apiVersion: apps/v1
kind: Deployment

metadata:
  name: nginx-deployment
  namespace: dev

spec:
  replicas: 2

  selector:
    matchLabels:
      app: nginx

  template:
    metadata:
      labels:
        app: nginx

    spec:
      containers:
      - name: nginx
        image: nginx:1.25

        ports:
        - containerPort: 80`,
      annotations: [
        { field: "apiVersion: apps/v1", desc: "Apps API group controlling Deployments, StatefulSets, and DaemonSets." },
        { field: "namespace: dev", desc: "Scopes this Deployment exclusively inside the dev namespace." },
        { field: "replicas: 2", desc: "Instructs ReplicaSet controller to maintain exactly 2 running pod instances." },
        { field: "selector.matchLabels", desc: "Tells Deployment which pods it manages via app=nginx key-value pair." },
        { field: "image: nginx:1.25", desc: "Pinned NGINX v1.25 container image for development stability." },
        { field: "containerPort: 80", desc: "Exposes port 80 inside the pod network interface." }
      ]
    },
    service: {
      filename: "services/nginx-dev-service.yaml",
      raw: `apiVersion: v1
kind: Service

metadata:
  name: nginx-service
  namespace: dev

spec:
  selector:
    app: nginx

  ports:
    - protocol: TCP
      port: 80
      targetPort: 80

  type: ClusterIP`,
      annotations: [
        { field: "kind: Service", desc: "Provides an internal virtual IP and DNS name for load balancing." },
        { field: "namespace: dev", desc: "Matches pods labeled app=nginx strictly inside the dev namespace." },
        { field: "type: ClusterIP", desc: "Default internal-only service type; inaccessible outside cluster without tunnels." },
        { field: "port vs targetPort", desc: "Port 80 on Service routes directly to targetPort 80 on container." }
      ]
    },
    quota: {
      filename: "quotas/dev-quota.yaml",
      raw: `apiVersion: v1
kind: ResourceQuota

metadata:
  name: dev-quota
  namespace: dev

spec:
  hard:
    pods: "5"
    requests.cpu: "500m"
    requests.memory: "512Mi"
    limits.cpu: "1"
    limits.memory: "1Gi"`,
      annotations: [
        { field: "kind: ResourceQuota", desc: "Enforces aggregate resource ceilings for CPU, Memory, and Pod counts." },
        { field: "pods: 5", desc: "Limits dev namespace to a maximum of 5 concurrent active Pods." },
        { field: "limits.cpu: 1", desc: "Restricts cumulative CPU limit to 1 vCPU core." },
        { field: "limits.memory: 1Gi", desc: "Restricts cumulative RAM usage to 1 Gigabyte." }
      ]
    },
    netpol: {
      filename: "netpol/dev-netpol.yaml",
      raw: `apiVersion: networking.k8s.io/v1
kind: NetworkPolicy

metadata:
  name: dev-network-policy
  namespace: dev

spec:
  podSelector:
    matchLabels:
      app: nginx

  policyTypes:
  - Ingress

  ingress:
  - from:
    - namespaceSelector:
        matchLabels:
          kubernetes.io/metadata.name: dev
    ports:
    - protocol: TCP
      port: 80`,
      annotations: [
        { field: "kind: NetworkPolicy", desc: "Zero-Trust firewalls restricting ingress/egress network flows." },
        { field: "namespaceSelector.matchLabels", desc: "Allows ingress traffic ONLY from Pods residing in the dev namespace." },
        { field: "ports: TCP/80", desc: "Permits HTTP port 80 traffic while blocking cross-namespace requests." }
      ]
    }
  },
  test: {
    namespace: {
      filename: "namespaces/test-namespace.yaml",
      raw: `apiVersion: v1
kind: Namespace

metadata:
  name: test`,
      annotations: [
        { field: "metadata.name: test", desc: "Dedicated namespace for QA integration and automated test builds." }
      ]
    },
    deployment: {
      filename: "deployments/nginx-test.yaml",
      raw: `apiVersion: apps/v1
kind: Deployment

metadata:
  name: nginx-deployment
  namespace: test

spec:
  replicas: 1

  selector:
    matchLabels:
      app: nginx

  template:
    metadata:
      labels:
        app: nginx

    spec:
      containers:
      - name: nginx
        image: nginx:latest

        ports:
        - containerPort: 80`,
      annotations: [
        { field: "namespace: test", desc: "QA testing environment deployment scope." },
        { field: "replicas: 1", desc: "Single replica allocated to conserve cluster resources during test cycles." },
        { field: "image: nginx:latest", desc: "Uses latest NGINX build to catch upstream breaking changes." }
      ]
    },
    service: {
      filename: "services/nginx-test-service.yaml",
      raw: `apiVersion: v1
kind: Service

metadata:
  name: nginx-service
  namespace: test

spec:
  selector:
    app: nginx

  ports:
  - protocol: TCP
    port: 80
    targetPort: 80

  type: ClusterIP`,
      annotations: [
        { field: "name: nginx-service", desc: "Same service name as dev, but fully isolated in test namespace." }
      ]
    },
    quota: {
      filename: "quotas/test-quota.yaml",
      raw: `apiVersion: v1
kind: ResourceQuota

metadata:
  name: test-quota
  namespace: test

spec:
  hard:
    pods: "3"
    requests.cpu: "250m"
    requests.memory: "256Mi"
    limits.cpu: "500m"
    limits.memory: "512Mi"`,
      annotations: [
        { field: "limits.cpu: 500m", desc: "Limits test namespace to 0.5 CPU core to preserve host resources." }
      ]
    },
    netpol: {
      filename: "netpol/test-netpol.yaml",
      raw: `apiVersion: networking.k8s.io/v1
kind: NetworkPolicy

metadata:
  name: test-network-policy
  namespace: test

spec:
  podSelector:
    matchLabels:
      app: nginx

  policyTypes:
  - Ingress

  ingress:
  - from:
    - namespaceSelector:
        matchLabels:
          kubernetes.io/metadata.name: test
    ports:
    - protocol: TCP
      port: 80`,
      annotations: [
        { field: "policyTypes: Ingress", desc: "Isolates test workloads from external cross-namespace requests." }
      ]
    }
  },
  prod: {
    namespace: {
      filename: "namespaces/prod-namespace.yaml",
      raw: `apiVersion: v1
kind: Namespace

metadata:
  name: prod`,
      annotations: [
        { field: "metadata.name: prod", desc: "Production environment isolation boundary for live workloads." }
      ]
    },
    deployment: {
      filename: "deployments/nginx-prod.yaml",
      raw: `apiVersion: apps/v1
kind: Deployment

metadata:
  name: nginx-deployment
  namespace: prod

spec:
  replicas: 3

  selector:
    matchLabels:
      app: nginx

  template:
    metadata:
      labels:
        app: nginx

    spec:
      containers:
      - name: nginx
        image: nginx:latest

        ports:
        - containerPort: 80`,
      annotations: [
        { field: "replicas: 3", desc: "High availability setup with 3-way redundant Pod distribution." },
        { field: "namespace: prod", desc: "Production workloads isolated from dev/test experiments." }
      ]
    },
    service: {
      filename: "services/nginx-prod-service.yaml",
      raw: `apiVersion: v1
kind: Service

metadata:
  name: nginx-service
  namespace: prod

spec:
  selector:
    app: nginx

  ports:
  - protocol: TCP
    port: 80
    targetPort: 80

  type: ClusterIP`,
      annotations: [
        { field: "ClusterIP", desc: "Ensures production workload endpoints are protected internally." }
      ]
    },
    quota: {
      filename: "quotas/prod-quota.yaml",
      raw: `apiVersion: v1
kind: ResourceQuota

metadata:
  name: prod-quota
  namespace: prod

spec:
  hard:
    pods: "10"
    requests.cpu: "2"
    requests.memory: "2Gi"
    limits.cpu: "4"
    limits.memory: "4Gi"`,
      annotations: [
        { field: "limits.cpu: 4", desc: "Production-grade allocation: up to 4 vCPU cores and 4GB RAM." }
      ]
    },
    netpol: {
      filename: "netpol/prod-netpol.yaml",
      raw: `apiVersion: networking.k8s.io/v1
kind: NetworkPolicy

metadata:
  name: prod-network-policy
  namespace: prod

spec:
  podSelector:
    matchLabels:
      app: nginx

  policyTypes:
  - Ingress

  ingress:
  - from:
    - namespaceSelector:
        matchLabels:
          kubernetes.io/metadata.name: prod
    ports:
    - protocol: TCP
      port: 80`,
      annotations: [
        { field: "metadata.name: prod-network-policy", desc: "Protects production database and HTTP services from dev/test probing." }
      ]
    }
  }
};
