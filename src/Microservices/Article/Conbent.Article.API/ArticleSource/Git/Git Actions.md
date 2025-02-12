#ConbentWebProject 
#### Code 
Yaml
```
name: .NET Microservice CI/CD

on:
  push:
    branches:
      - main

jobs:
  build:
    runs-on: ubuntu-latest

    steps:
      - name: Checkout Repository
        uses: actions/checkout@v2

      - name: Setup .NET Core SDK
        uses: actions/setup-dotnet@v1
        with:
          dotnet-version: '5.x' # You can specify the desired .NET Core version

      - name: Restore Dependencies
        run: dotnet restore

      - name: Build
        run: dotnet build --configuration Release

      - name: Run Tests
        run: dotnet test --verbosity normal

  deploy:
    runs-on: ubuntu-latest

    needs: build

    steps:
      - name: Checkout Repository
        uses: actions/checkout@v2

      - name: Setup Azure Web App
        uses: azure/webapps-deploy@v2
        with:
          app-name: 'your-app-name' # Replace with your Azure App Service name
          publish-profile: ${{ secrets.AZURE_WEBAPP_PUBLISH_PROFILE }} # Store your Azure publish profile as a secret in your repository settings
          package: .

```
#ProgramLanguageTerminalCommand



#### Description
This workflow will trigger on every push to the `main` branch, build the .NET Core application, run tests, and then deploy the application to Azure App Service:

This YAML file defines two jobs:
1. **build**: This job is responsible for building and testing the .NET Core application. It runs on an Ubuntu environment and performs the following steps:
    - Checks out the repository.
    - Sets up the .NET Core SDK.
    - Restores dependencies using `dotnet restore`.
    - Builds the application in Release mode using `dotnet build`.
    - Runs tests using `dotnet test`.
2. **deploy**: This job is responsible for deploying the application to Azure App Service. It runs on an Ubuntu environment and depends on the `build` job to complete successfully. It performs the following steps:
    - Checks out the repository.
    - Sets up the Azure Web App deployment action.
    - Deploys the application to the specified Azure App Service using the provided publish profile.
