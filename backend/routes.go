package main

//
// Route handlers for the API, does the actual k8s data scraping
// Ben Coleman, July 2019, v1
//

import (
	"encoding/json"
	"log"
	"net/http"
	"os"
	"runtime"

	"github.com/gorilla/mux"

	metav1 "k8s.io/apimachinery/pkg/apis/meta/v1"
)

type status struct {
	Healthy    bool   `json:"healthy"`
	Version    string `json:"version"`
	BuildInfo  string `json:"buildInfo"`
	Hostname   string `json:"hostname"`
	OS         string `json:"os"`
	Arch       string `json:"architecture"`
	CPU        int    `json:"cpuCount"`
	GoVersion  string `json:"goVersion"`
	ClientAddr string `json:"clientAddress"`
	ServerHost string `json:"serverHost"`
}

//
// Simple health check endpoint, returns 204 when healthy
//
func routeHealthCheck(resp http.ResponseWriter, req *http.Request) {
	if healthy {
		resp.WriteHeader(http.StatusNoContent)
		return
	}
	resp.WriteHeader(http.StatusServiceUnavailable)
}

//
// Return status information data
//
func routeStatus(resp http.ResponseWriter, req *http.Request) {

	hostname, err := os.Hostname()
	if err != nil {
		hostname = "hostname not available"
	}

	currentStatus := status{
		Healthy:    healthy,
		Version:    version,
		BuildInfo:  buildInfo,
		Hostname:   hostname,
		GoVersion:  runtime.Version(),
		OS:         runtime.GOOS,
		Arch:       runtime.GOARCH,
		CPU:        runtime.NumCPU(),
		ClientAddr: req.RemoteAddr,
		ServerHost: req.Host,
	}

	response, err := json.Marshal(currentStatus)
	if err != nil {
		http.Error(resp, "Failed to get status", http.StatusInternalServerError)
	}
	resp.Write(response)
}

//
// Return list of all namespaces in cluster
//
func getNamespaces(resp http.ResponseWriter, req *http.Request) {
	
	resource, err := clientset.CoreV1().Namespaces().List(metav1.ListOptions{})
	if err != nil {
		log.Println("### Kubernetes API error", err.Error())
		http.Error(resp, err.Error(), http.StatusInternalServerError)
	}

	response, _ := json.Marshal(resource)
	resp.Write(response)	
}



func getNamespaceDetails(resp http.ResponseWriter, req *http.Request) {

	params := mux.Vars(req)
	name := params["name"]
	
	resource, err := clientset.CoreV1().Namespaces().Get(name, metav1.GetOptions{})
	if err != nil {
		log.Println("### Kubernetes API error", err.Error())
		http.Error(resp, err.Error(), http.StatusInternalServerError)
	}

	response, _ := json.Marshal(resource)
	resp.Write(response)	
}

func getPVs(resp http.ResponseWriter, req *http.Request) {
	
	resource, err := clientset.CoreV1().PersistentVolumes().List(metav1.ListOptions{})
	if err != nil {
		log.Println("### Kubernetes API error", err.Error())
		http.Error(resp, err.Error(), http.StatusInternalServerError)
	}

	response, _ := json.Marshal(resource)
	resp.Write(response)	
}



func getPVDetails(resp http.ResponseWriter, req *http.Request) {

	params := mux.Vars(req)
	name := params["name"]
	
	resource, err := clientset.CoreV1().PersistentVolumes().Get(name, metav1.GetOptions{})
	if err != nil {
		log.Println("### Kubernetes API error", err.Error())
		http.Error(resp, err.Error(), http.StatusInternalServerError)
	}

	response, _ := json.Marshal(resource)
	resp.Write(response)	
}

func getNodes(resp http.ResponseWriter, req *http.Request) {
	
	resource, err := clientset.CoreV1().Nodes().List(metav1.ListOptions{})
	if err != nil {
		log.Println("### Kubernetes API error", err.Error())
		http.Error(resp, err.Error(), http.StatusInternalServerError)
	}

	response, _ := json.Marshal(resource)
	resp.Write(response)

}

func getNodeDetails(resp http.ResponseWriter, req *http.Request) {

	params := mux.Vars(req)
	name := params["name"]

	resource, err := clientset.CoreV1().Nodes().Get(name,metav1.GetOptions{})
	if err != nil {
		log.Println("### Kubernetes API error", err.Error())
		http.Error(resp, err.Error(), http.StatusInternalServerError)
	}

	response, _ := json.Marshal(resource)
	resp.Write(response)
}

func getPods(resp http.ResponseWriter, req *http.Request) {

	resource, err := clientset.CoreV1().Pods(metav1.NamespaceAll).List(metav1.ListOptions{})
	if err != nil {
		log.Println("### Kubernetes API error", err.Error())
		http.Error(resp, err.Error(), http.StatusInternalServerError)
	}

	response, _ := json.Marshal(resource)
	resp.Write(response)
}

func getPodByNamespace(resp http.ResponseWriter, req *http.Request) {

	params := mux.Vars(req)
	namespace := params["namespace"]

	resource, err := clientset.CoreV1().Pods(namespace).List(metav1.ListOptions{})
	if err != nil {
		log.Println("### Kubernetes API error", err.Error())
		http.Error(resp, err.Error(), http.StatusInternalServerError)
	}

	response, _ := json.Marshal(resource)
	resp.Write(response)
}

func getPodDetails(resp http.ResponseWriter, req *http.Request) {

	params := mux.Vars(req)
	namespace := params["namespace"]
	name := params["name"]

	resource, err := clientset.CoreV1().Pods(namespace).Get(name,metav1.GetOptions{})
	if err != nil {
		log.Println("### Kubernetes API error", err.Error())
		http.Error(resp, err.Error(), http.StatusInternalServerError)
	}

	response, _ := json.Marshal(resource)
	resp.Write(response)
}

func getEvents(resp http.ResponseWriter, req *http.Request) {

	resource, err := clientset.CoreV1().Events(metav1.NamespaceAll).List(metav1.ListOptions{})
	if err != nil {
		log.Println("### Kubernetes API error", err.Error())
		http.Error(resp, err.Error(), http.StatusInternalServerError)
	}

	response, _ := json.Marshal(resource)
	resp.Write(response)
}

func getEventByNamespace(resp http.ResponseWriter, req *http.Request) {

	params := mux.Vars(req)
	namespace := params["namespace"]

	resource, err := clientset.CoreV1().Events(namespace).List(metav1.ListOptions{})
	if err != nil {
		log.Println("### Kubernetes API error", err.Error())
		http.Error(resp, err.Error(), http.StatusInternalServerError)
	}

	response, _ := json.Marshal(resource)
	resp.Write(response)
}

func getEventDetails(resp http.ResponseWriter, req *http.Request) {

	params := mux.Vars(req)
	namespace := params["namespace"]
	name := params["name"]

	resource, err := clientset.CoreV1().Events(namespace).Get(name,metav1.GetOptions{})
	if err != nil {
		log.Println("### Kubernetes API error", err.Error())
		http.Error(resp, err.Error(), http.StatusInternalServerError)
	}

	response, _ := json.Marshal(resource)
	resp.Write(response)
}

func getDeployments(resp http.ResponseWriter, req *http.Request) {

	resource, err := clientset.AppsV1().Deployments(metav1.NamespaceAll).List(metav1.ListOptions{})
	if err != nil {
		log.Println("### Kubernetes API error", err.Error())
		http.Error(resp, err.Error(), http.StatusInternalServerError)
	}

	response, _ := json.Marshal(resource)
	resp.Write(response)
}

func getDeploymentByNamespace(resp http.ResponseWriter, req *http.Request) {

	params := mux.Vars(req)
	namespace := params["namespace"]

	resource, err := clientset.AppsV1().Deployments(namespace).List(metav1.ListOptions{})
	if err != nil {
		log.Println("### Kubernetes API error", err.Error())
		http.Error(resp, err.Error(), http.StatusInternalServerError)
	}

	response, _ := json.Marshal(resource)
	resp.Write(response)
}

func getDeploymentDetails(resp http.ResponseWriter, req *http.Request) {

	params := mux.Vars(req)
	namespace := params["namespace"]
	name := params["name"]

	resource, err := clientset.AppsV1().Deployments(namespace).Get(name,metav1.GetOptions{})
	if err != nil {
		log.Println("### Kubernetes API error", err.Error())
		http.Error(resp, err.Error(), http.StatusInternalServerError)
	}

	response, _ := json.Marshal(resource)
	resp.Write(response)
}


func getStatefulsets(resp http.ResponseWriter, req *http.Request) {

	resource, err := clientset.AppsV1().StatefulSets(metav1.NamespaceAll).List(metav1.ListOptions{})
	if err != nil {
		log.Println("### Kubernetes API error", err.Error())
		http.Error(resp, err.Error(), http.StatusInternalServerError)
	}

	response, _ := json.Marshal(resource)
	resp.Write(response)
}

func getStatefulsetByNamespace(resp http.ResponseWriter, req *http.Request) {

	params := mux.Vars(req)
	namespace := params["namespace"]

	resource, err := clientset.AppsV1().StatefulSets(namespace).List(metav1.ListOptions{})
	if err != nil {
		log.Println("### Kubernetes API error", err.Error())
		http.Error(resp, err.Error(), http.StatusInternalServerError)
	}

	response, _ := json.Marshal(resource)
	resp.Write(response)
}

func getStatefulsetDetails(resp http.ResponseWriter, req *http.Request) {

	params := mux.Vars(req)
	namespace := params["namespace"]
	name := params["name"]

	resource, err := clientset.AppsV1().StatefulSets(namespace).Get(name,metav1.GetOptions{})
	if err != nil {
		log.Println("### Kubernetes API error", err.Error())
		http.Error(resp, err.Error(), http.StatusInternalServerError)
	}

	response, _ := json.Marshal(resource)
	resp.Write(response)
}

func getDaemonsets(resp http.ResponseWriter, req *http.Request) {

	resource, err := clientset.AppsV1().DaemonSets(metav1.NamespaceAll).List(metav1.ListOptions{})
	if err != nil {
		log.Println("### Kubernetes API error", err.Error())
		http.Error(resp, err.Error(), http.StatusInternalServerError)
	}

	response, _ := json.Marshal(resource)
	resp.Write(response)
}

func getDaemonsetByNamespace(resp http.ResponseWriter, req *http.Request) {

	params := mux.Vars(req)
	namespace := params["namespace"]

	resource, err := clientset.AppsV1().DaemonSets(namespace).List(metav1.ListOptions{})
	if err != nil {
		log.Println("### Kubernetes API error", err.Error())
		http.Error(resp, err.Error(), http.StatusInternalServerError)
	}

	response, _ := json.Marshal(resource)
	resp.Write(response)
}

func getDaemonsetDetails(resp http.ResponseWriter, req *http.Request) {

	params := mux.Vars(req)
	namespace := params["namespace"]
	name := params["name"]

	resource, err := clientset.AppsV1().DaemonSets(namespace).Get(name,metav1.GetOptions{})
	if err != nil {
		log.Println("### Kubernetes API error", err.Error())
		http.Error(resp, err.Error(), http.StatusInternalServerError)
	}

	response, _ := json.Marshal(resource)
	resp.Write(response)
}


func getJobs(resp http.ResponseWriter, req *http.Request) {

	resource, err := clientset.BatchV1().Jobs(metav1.NamespaceAll).List(metav1.ListOptions{})
	if err != nil {
		log.Println("### Kubernetes API error", err.Error())
		http.Error(resp, err.Error(), http.StatusInternalServerError)
	}

	response, _ := json.Marshal(resource)
	resp.Write(response)
}

func getJobByNamespace(resp http.ResponseWriter, req *http.Request) {

	params := mux.Vars(req)
	namespace := params["namespace"]

	resource, err := clientset.BatchV1().Jobs(namespace).List(metav1.ListOptions{})
	if err != nil {
		log.Println("### Kubernetes API error", err.Error())
		http.Error(resp, err.Error(), http.StatusInternalServerError)
	}

	response, _ := json.Marshal(resource)
	resp.Write(response)
}

func getJobDetails(resp http.ResponseWriter, req *http.Request) {

	params := mux.Vars(req)
	namespace := params["namespace"]
	name := params["name"]

	resource, err := clientset.BatchV1().Jobs(namespace).Get(name,metav1.GetOptions{})
	if err != nil {
		log.Println("### Kubernetes API error", err.Error())
		http.Error(resp, err.Error(), http.StatusInternalServerError)
	}

	response, _ := json.Marshal(resource)
	resp.Write(response)
}

func getCronJobs(resp http.ResponseWriter, req *http.Request) {

	resource, err := clientset.BatchV1beta1().CronJobs(metav1.NamespaceAll).List(metav1.ListOptions{})
	if err != nil {
		log.Println("### Kubernetes API error", err.Error())
		http.Error(resp, err.Error(), http.StatusInternalServerError)
	}

	response, _ := json.Marshal(resource)
	resp.Write(response)
}

func getCronJobByNamespace(resp http.ResponseWriter, req *http.Request) {

	params := mux.Vars(req)
	namespace := params["namespace"]

	resource, err := clientset.BatchV1beta1().CronJobs(namespace).List(metav1.ListOptions{})
	if err != nil {
		log.Println("### Kubernetes API error", err.Error())
		http.Error(resp, err.Error(), http.StatusInternalServerError)
	}

	response, _ := json.Marshal(resource)
	resp.Write(response)
}

func getCronJobDetails(resp http.ResponseWriter, req *http.Request) {

	params := mux.Vars(req)
	namespace := params["namespace"]
	name := params["name"]

	resource, err := clientset.BatchV1beta1().CronJobs(namespace).Get(name,metav1.GetOptions{})
	if err != nil {
		log.Println("### Kubernetes API error", err.Error())
		http.Error(resp, err.Error(), http.StatusInternalServerError)
	}

	response, _ := json.Marshal(resource)
	resp.Write(response)
}