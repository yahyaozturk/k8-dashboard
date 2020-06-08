#!/bin/ash

kubectl proxy --port=9090 --kubeconfig=config &
nginx -g "daemon off;"