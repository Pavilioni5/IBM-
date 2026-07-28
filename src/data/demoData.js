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
    title: "Inspect Isolated Namespaces",
    command: "kubectl get namespaces",
    output: `NAME              STATUS   AGE
default           Active   10d
dev               Active   10d
kube-system       Active   10d
prod              Active   10d
test              Active   10d`,
    talkingPoints: [
      "Highlights the 3 custom environments: dev, test, prod.",
      "Explains that standard Kubernetes system namespaces run alongside."
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
    title: "Demonstrate Independent Scaling",
    command: "kubectl scale deployment nginx-deployment --replicas=5 -n dev\nkubectl get pods -n dev",
    output: `deployment.apps/nginx-deployment scaled

NAME                                READY   STATUS    RESTARTS   AGE
nginx-deployment-5fd577784b-6jblg   1/1     Running   0          14m
nginx-deployment-5fd577784b-kh2gh   1/1     Running   0          14m
nginx-deployment-5fd577784b-p72x8   1/1     Running   0          4s
nginx-deployment-5fd577784b-w91mn   1/1     Running   0          4s
nginx-deployment-5fd577784b-y48zk   1/1     Running   0          4s`,
    talkingPoints: [
      "Key Viva Proof: Dev scaled from 2 -> 5 replicas instantly.",
      "Test (1) and Prod (3) pod counts remain completely unaffected."
    ]
  },
  {
    number: 5,
    title: "Trigger Rolling Update & Access Tunnel",
    command: "kubectl apply -f deployments/nginx-dev.yaml\nminikube service nginx-service -n dev",
    output: `deployment.apps/nginx-deployment configured
Waiting for rollout to finish: 1 out of 2 new replicas updated...
deployment "nginx-deployment" successfully rolled out

│ dev │ nginx-service │ http://127.0.0.1:41865 │`,
    talkingPoints: [
      "Shows zero-downtime rolling update with old ReplicaSet scale-down.",
      "Opens local tunnel to verify HTTP NGINX welcome page."
    ]
  }
];
