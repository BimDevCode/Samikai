#!/bin/bash

# Login to ACR
az acr login --name conbentcontainer

# Define the login server
ACR_LOGIN_SERVER=conbentcontainer.azurecr.io

# Tag and push PostgreSQL image
docker tag postgres:latest $ACR_LOGIN_SERVER/postgres:latest
docker push $ACR_LOGIN_SERVER/postgres:latest

# Tag and push Redis image
docker tag redis:latest $ACR_LOGIN_SERVER/redis:latest
docker push $ACR_LOGIN_SERVER/redis:latest

# Build, tag, and push conbent.article.api image
docker build -t conbent.article.api:latest -f src/Microservices/Article/Conbent.Article.API/Dockerfile .
docker tag conbent.article.api:latest $ACR_LOGIN_SERVER/conbent.article.api:latest
docker push $ACR_LOGIN_SERVER/conbent.article.api:latest

# Build, tag, and push conbent.identity.api image
docker build -t conbent.identity.api:latest -f src/Microservices/Accounts/Identity.API/Dockerfile .
docker tag conbent.identity.api:latest $ACR_LOGIN_SERVER/conbent.identity.api:latest
docker push $ACR_LOGIN_SERVER/conbent.identity.api:latest

# Build, tag, and push angular-app image
docker build -t angular-app:latest -f src/Clients/AngularApp/Dockerfile .
docker tag angular-app:latest $ACR_LOGIN_SERVER/angular-app:latest
docker push $ACR_LOGIN_SERVER/angular-app:latest
# chmod +x deploy-and-pull.sh
# ./deploy-and-pull.sh
