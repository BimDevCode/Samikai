# Get the ACR login server
$ACR_LOGIN_SERVER="conbentcontainer.azurecr.io"

# Get the ACR username
$ACR_USERNAME=$(az acr credential show --name conbentcontainer --query "username" --output tsv)

# Get the ACR password
$ACR_PASSWORD=$(az acr credential show --name conbentcontainer --query "passwords[0].value" --output tsv)

# Create a Kubernetes secret for ACR


kubectl create secret docker-registry acr-secret --docker-server=$ACR_LOGIN_SERVER --docker-username=$ACR_USERNAME --docker-password=$ACR_PASSWORD 
