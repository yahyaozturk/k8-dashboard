package main

//
// Kubeview API scraping service and client host
// Ben Coleman, July 2019, v1
//

import (
	"fmt"
	"log"
	"net/http"
	"os"
	"path/filepath"
	"strings"
	"flag"

	"github.com/gorilla/mux"
	"k8s.io/client-go/kubernetes"
	"k8s.io/client-go/tools/clientcmd"

)

var (
	healthy   = true                // Simple health flag
	version   = "0.0.0"             // App version number, set at build time with -ldflags "-X main.version=1.2.3"
	buildInfo = "No build details"  // Build details, set at build time with -ldflags "-X main.buildInfo='Foo bar'"
	clientset *kubernetes.Clientset // Clientset is global because I don't care
)

//
// Main entry point, will start HTTP service
//
func main() {
	log.SetOutput(os.Stdout) // Personal preference on log output
	log.Printf("### Kubeview v%v starting...", version)

	// Port to listen on, change the default as you see fit
	//serverPort := envhelper.GetEnvInt("PORT", 8000)
	//inCluster := envhelper.GetEnvBool("IN_CLUSTER", false)

	serverPort := 8000

	log.Println("### Connecting to Kubernetes...")

	var kubeconfig *string
	if home := homeDir(); home != "" {
		kubeconfig = flag.String("kubeconfig", filepath.Join(home, ".kube", "config"), "(optional) absolute path to the kubeconfig file")
	} else {
		kubeconfig = flag.String("kubeconfig", "", "absolute path to the kubeconfig file")
	}
	flag.Parse()

	// use the current context in kubeconfig
	config, err := clientcmd.BuildConfigFromFlags("", *kubeconfig)
	if err != nil {
		panic(err.Error())
	}

	// create the clientset
	clientset, err = kubernetes.NewForConfig(config)
	if err != nil {
		panic(err.Error())
	}

	// Use gorilla/mux for routing
	router := mux.NewRouter()

	// Add middleware for logging and CORS
	router.Use(starterMiddleware)

	// Application API routes here
	router.HandleFunc("/healthz", routeHealthCheck)
	router.HandleFunc("/api/status", routeStatus)

	router.HandleFunc("/api/v1/namespaces", getNamespaces)
	router.HandleFunc("/api/v1/namespaces/{name}", getNamespaceDetails)

	router.HandleFunc("/api/v1/nodes", getNodes)
	router.HandleFunc("/api/v1/nodes/{name}", getNodeDetails)

	router.HandleFunc("/api/v1/events", getEvents)
	router.HandleFunc("/api/v1/namespaces/{namespace}/events", getEventByNamespace)
	router.HandleFunc("/api/v1/namespaces/{namespace}/events/{name}", getEventDetails)

	router.HandleFunc("/api/v1/pods", getPods)
	router.HandleFunc("/api/v1/namespaces/{namespace}/pods", getPodByNamespace)
	router.HandleFunc("/api/v1/namespaces/{namespace}/pods/{name}", getPodDetails)

	router.HandleFunc("/apis/apps/v1/deployments", getDeployments)
	router.HandleFunc("/apis/apps/v1/namespaces/{namespace}/deployments", getDeploymentByNamespace)
	router.HandleFunc("/apis/apps/v1/namespaces/{namespace}/deployments/{name}", getDeploymentDetails)

	router.HandleFunc("/apis/apps/v1/statefulsets", getStatefulsets)
	router.HandleFunc("/apis/apps/v1/namespaces/{namespace}/statefulsets", getStatefulsetByNamespace)
	router.HandleFunc("/apis/apps/v1/namespaces/{namespace}/statefulsets/{name}", getStatefulsetDetails)

	router.HandleFunc("/apis/apps/v1/daemonsets", getDaemonsets)
	router.HandleFunc("/apis/apps/v1/namespaces/{namespace}/daemonsets", getDaemonsetByNamespace)
	router.HandleFunc("/apis/apps/v1/namespaces/{namespace}/daemonsets/{name}", getDaemonsetDetails)

	router.HandleFunc("/apis/batch/v1/jobs", getJobs)
	router.HandleFunc("/apis/batch/v1/namespaces/{namespace}/jobs", getJobByNamespace)
	router.HandleFunc("/apis/batch/v1/namespaces/{namespace}/jobs/{name}", getJobDetails)

	router.HandleFunc("/apis/batch/v1beta1/cronjobs", getCronJobs)
	router.HandleFunc("/apis/batch/v1beta1/namespaces/{namespace}/cronjobs", getCronJobByNamespace)
	router.HandleFunc("/apis/batch/v1beta1/namespaces/{namespace}/cronjobs/{name}", getCronJobDetails)

	router.HandleFunc("/api/v1/persistentvolumes", getPVs)
	router.HandleFunc("/api/v1/persistentvolumes/{name}", getPVDetails)

	// Start server
	log.Printf("### Server listening on %v\n", serverPort)
	err = http.ListenAndServe(fmt.Sprintf(":%d", serverPort), router)
	if err != nil {
		panic(err.Error())
	}
}

//
// Log all HTTP requests with client address, method and request URI
// Plus a cheap and dirty CORS enabler
//
func starterMiddleware(next http.Handler) http.Handler {
	return http.HandlerFunc(func(resp http.ResponseWriter, req *http.Request) {
		resp.Header().Set("Access-Control-Allow-Origin", "*")
		log.Println("###", strings.Split(req.RemoteAddr, ":")[0], req.Method, req.RequestURI)
		next.ServeHTTP(resp, req)
	})
}

func homeDir() string {
	if h := os.Getenv("HOME"); h != "" {
		return h
	}
	return os.Getenv("USERPROFILE") // windows
}