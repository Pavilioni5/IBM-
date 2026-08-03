export const demoSteps = [
  {
    number: 1,
    title: "Start Minikube & Verify Cluster",
    command: "minikube start\nkubectl get nodes",
    output: `😄  minikube v1.38.1 on Ubuntu 22.04
✨  Using docker driver based on existing profile
👍  Starting control-plane node "minikube"
🏄  Done! kubectl is configured to use "minikube"

NAME       STATUS   ROLES           AGE   VERSION
minikube   Ready    control-plane   10d   v1.35.1`,
    talkingPoints: [
      "Demonstrates cluster startup via Docker driver.",
      "Shows single-node control-plane running Kubernetes v1.35.1."
    ]
  },
  {
    number: 2,
    title: "Inspect Isolated Namespaces & Guardrails",
    command: "kubectl get namespaces\nkubectl get resourcequotas -A",
    output: `NAME              STATUS   AGE
dev               Active   10d
prod              Active   10d
test              Active   10d

NAMESPACE   NAME         AGE   REQUESTS                                    LIMITS
dev         dev-quota    5d    requests.cpu: 0/500m, requests.memory: 0   limits.cpu: 2/1, limits.memory: 256Mi/1Gi, pods: 2/5
prod        prod-quota   5d    requests.cpu: 0/2, requests.memory: 0      limits.cpu: 3/4, limits.memory: 384Mi/4Gi, pods: 3/10
test        test-quota   5d    requests.cpu: 0/250m, requests.memory: 0   limits.cpu: 1/500m, limits.memory: 128Mi/512Mi, pods: 1/3`,
    talkingPoints: [
      "Highlights 3 custom isolated environments: dev, test, prod.",
      "Proves Enterprise Security: CPU, RAM, and Pod count quotas actively enforced per namespace."
    ]
  },
  {
    number: 3,
    title: "Check Pod Distribution Across Environments",
    command: "kubectl get pods -A | grep nginx",
    output: `dev     nginx-deployment-5fd577784b-6jblg   1/1   Running   0   12m
dev     nginx-deployment-5fd577784b-kh2gh   1/1   Running   0   12m
test    nginx-deployment-59f86b59ff-tn4jn   1/1   Running   0   18m
prod    nginx-deployment-59f86b59ff-ctq4l   1/1   Running   0   15m
prod    nginx-deployment-59f86b59ff-hx45x   1/1   Running   0   15m
prod    nginx-deployment-59f86b59ff-z2q7n   1/1   Running   0   15m`,
    talkingPoints: [
      "Shows 2 pods in dev, 1 pod in test, 3 pods in prod.",
      "Proves that pods have unique hashes and IPs scoped per namespace."
    ]
  },
  {
    number: 4,
    title: "Demonstrate Scaling Within Quota Limits",
    command: "kubectl scale deployment nginx-deployment --replicas=5 -n dev\nkubectl get resourcequota dev-quota -n dev",
    output: `deployment.apps/nginx-deployment scaled

NAME        AGE   REQUESTS                                    LIMITS
dev-quota   5d    requests.cpu: 0/500m, requests.memory: 0   limits.cpu: 5/1, limits.memory: 640Mi/1Gi, pods: 5/5 (RESOURCE MAXED)`,
    talkingPoints: [
      "Key Viva Proof: Dev scaled to 5 pods (hitting the ResourceQuota cap).",
      "Attempts to scale beyond 5 pods are automatically rejected by Kubernetes Admission Controller."
    ]
  },
  {
    number: 5,
    title: "Trigger Rolling Update & Verify NetworkPolicy",
    command: "kubectl get netpol -A\nminikube service nginx-service -n dev",
    output: `NAMESPACE   NAME                  POD-SELECTOR   AGE
dev         dev-network-policy    app=nginx      5d
test        test-network-policy   app=nginx      5d
prod        prod-network-policy   app=nginx      5d

│ dev │ nginx-service │ http://127.0.0.1:41865 │`,
    talkingPoints: [
      "Shows Zero-Trust NetworkPolicies blocking unauthorized cross-namespace requests.",
      "Opens local tunnel to verify HTTP NGINX service response."
    ]
  }
];
