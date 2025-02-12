#!/bin/bash

# Login to ACR
az acr login --name conbentcontainer

# Define the login server
ACR_LOGIN_SERVER=conbentcontainer.azurecr.io

# Pull PostgreSQL image
docker pull $ACR_LOGIN_SERVER/postgres:latest

# Pull Redis image
docker pull $ACR_LOGIN_SERVER/redis:latest

# Pull conbent.article.api image
docker pull $ACR_LOGIN_SERVER/conbent.article.api:latest

# Pull conbent.identity.api image
docker pull $ACR_LOGIN_SERVER/conbent.identity.api:latest

# Pull angular-app image
docker pull $ACR_LOGIN_SERVER/angular-app:latest