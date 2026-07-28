export const galleryItems = [
  {
    id: "pods-overview",
    title: "All Namespaces Pod Overview",
    category: "Pods",
    badge: "kubectl get pods -A",
    description: "Terminal output demonstrating concurrent running pods in dev (2), test (1), and prod (3) namespaces.",
    codeSnippet: `NAMESPACE     NAME                                READY   STATUS    RESTARTS   AGE
dev           nginx-deployment-5fd577784b-6jblg   1/1     Running   0          12m
dev           nginx-deployment-5fd577784b-kh2gh   1/1     Running   0          12m
test          nginx-deployment-59f86b59ff-tn4jn   1/1     Running   0          18m
prod          nginx-deployment-59f86b59ff-ctq4l   1/1     Running   0          15m
prod          nginx-deployment-59f86b59ff-hx45x   1/1     Running   0          15m
prod          nginx-deployment-59f86b59ff-z2q7n   1/1     Running   0          15m`
  },
  {
    id: "deployments-overview",
    title: "Cluster Deployments Matrix",
    category: "Deployments",
    badge: "kubectl get deployments -A",
    description: "Verification showing nginx-deployment active across all 3 logical environment partitions.",
    codeSnippet: `NAMESPACE     NAME               READY   UP-TO-DATE   AVAILABLE   AGE
dev           nginx-deployment   2/2     2            2           126m
kube-system   coredns            1/1     1            1           10d
prod          nginx-deployment   3/3     3            3           6m31s
test          nginx-deployment   1/1     1            1           13m`
  },
  {
    id: "namespaces-list",
    title: "Namespace Isolation Registry",
    category: "Namespaces",
    badge: "kubectl get namespaces",
    description: "Active namespaces including system namespaces (kube-system, kube-public) and isolated environment slices.",
    codeSnippet: `NAME              STATUS   AGE
default           Active   10d
dev               Active   10d
kube-node-lease   Active   10d
kube-public       Active   10d
kube-system       Active   10d
prod              Active   10d
test              Active   10d`
  },
  {
    id: "terminal-scaling",
    title: "Dev Namespace Independent Scaling",
    category: "Terminal",
    badge: "kubectl scale deployment --replicas=5",
    description: "Live terminal log showing dev deployment scaling up to 5 pods while keeping test and prod unchanged.",
    codeSnippet: `$ kubectl scale deployment nginx-deployment --replicas=5 -n dev
deployment.apps/nginx-deployment scaled

$ kubectl get pods -n dev
NAME                                READY   STATUS    RESTARTS   AGE
nginx-deployment-5fd577784b-6jblg   1/1     Running   0          14m
nginx-deployment-5fd577784b-kh2gh   1/1     Running   0          14m
nginx-deployment-5fd577784b-p72x8   1/1     Running   0          4s
nginx-deployment-5fd577784b-w91mn   1/1     Running   0          4s
nginx-deployment-5fd577784b-y48zk   1/1     Running   0          4s`
  },
  {
    id: "browser-tunnel",
    title: "Minikube Service Host Tunnel",
    category: "Browser",
    badge: "minikube service nginx-service -n dev",
    description: "Accessing ClusterIP internal service via temporary host tunnel on port 41865.",
    codeSnippet: `❗  Services [dev/nginx-service] have type "ClusterIP" not meant to be exposed,
    however for local development minikube allows you to access this !
🔗  Starting tunnel for service nginx-service.
│ dev │ nginx-service │ http://127.0.0.1:41865 │

HTTP/1.1 200 OK
Server: nginx/1.25.0
Content-Type: text/html`
  },
  {
    id: "minikube-dashboard",
    title: "Minikube Web Dashboard",
    category: "Minikube Dashboard",
    badge: "minikube dashboard",
    description: "Graphical UI rendering workload graphs, pod CPU/memory utilization, and namespace filters.",
    codeSnippet: `🔌  Enabling dashboard ...
🤔  Verifying dashboard health ...
🚀  Launching Dashboard in default browser ...
http://127.0.0.1:44321/api/v1/namespaces/kubernetes-dashboard/services/http:kubernetes-dashboard:/proxy/`
  }
];

export const galleryCategories = ["All", "Pods", "Deployments", "Namespaces", "Terminal", "Browser", "Minikube Dashboard"];
