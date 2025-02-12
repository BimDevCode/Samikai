# Use the official Microsoft .NET Core runtime base image
FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS base
WORKDIR /app
EXPOSE 80
EXPOSE 8080
#install debugger for NET Core
RUN apt-get update
RUN apt-get install -y unzip
RUN curl -sSL https://aka.ms/getvsdbgsh | /bin/sh /dev/stdin -v latest -l ~/vsdbg

# Use the official Microsoft .NET Core SDK image to build the project file
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /src
# COPY ["src/Conbent.UserInteraction.API.csproj", "src/Microservices/Accounts/UserInteraction.API/"]


COPY ["src/Microservices/Gateways/Conbent.AngularClientGateway/Conbent.AngularClientGateway.csproj", "Microservices/Gateways/Conbent.AngularClientGateway/"]
RUN dotnet restore "Microservices/Gateways/Conbent.AngularClientGateway/Conbent.AngularClientGateway.csproj" && \
    dotnet dev-certs https --clean && \
    dotnet dev-certs https

COPY /src /src
WORKDIR "/src/Microservices/Gateways/Conbent.AngularClientGateway/"

RUN dotnet build "./Conbent.AngularClientGateway.csproj" -c Debug -o /app/build

# Publish the application
FROM build AS publish
WORKDIR /src
RUN dotnet publish "Microservices/Gateways/Conbent.AngularClientGateway/Conbent.AngularClientGateway.csproj" -c Debug -o /app/publish

# Build the final image
FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENV ASPNETCORE_ENVIRONMENT=Development
ENV DOTNET_USE_POLLING_FILE_WATCHER=true
# Set the ASPNETCORE_URLS environment variable to use HTTPS
ENV ASPNETCORE_URLS="https://+:7109"

# Expose the port the app runs on
# Angular Client 
EXPOSE 5211
EXPOSE 4224
# Proxy
EXPOSE 7109
# Redis
EXPOSE 6379
# Article API
EXPOSE 7069
# Identity Server
EXPOSE 5223
# User Reaction
EXPOSE 5203
# RabbitMQ Management 
EXPOSE 5672
# RabbitMQ Management 
EXPOSE 15672 

ENTRYPOINT ["dotnet", "Conbent.AngularClientGateway.dll"]

#docker build -f src/Microservices/Article/Conbent.Article.API/Dockerfile -t article-api .