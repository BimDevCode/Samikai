# Use the official Microsoft .NET Core runtime base image
FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS base
WORKDIR /app

#install debugger for NET Core
RUN apt-get update
RUN apt-get install -y unzip
RUN curl -sSL https://aka.ms/getvsdbgsh | /bin/sh /dev/stdin -v latest -l ~/vsdbg

# Use the official Microsoft .NET Core SDK image to build the project file
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /src
# COPY ["src/Conbent.UserInteraction.API.csproj", "src/Microservices/Accounts/UserInteraction.API/"]

COPY ["src/Microservices/Accounts/UserInteraction.API/Conbent.UserInteraction.API.csproj", "Microservices/Accounts/UserInteraction.API/"]
COPY ["src/Infrastructure/ServiceDefaults/Conbent.Service.Defaults.csproj", "Infrastructure/ServiceDefaults/"]
COPY ["src/Infrastructure/EventBusRabbitMQ/Conbent.EventBusRabbitMQ.csproj", "Infrastructure/EventBusRabbitMQ/"]
COPY ["src/Infrastructure/EventBus/Conbent.EventBus.csproj", "Infrastructure/EventBus/"]
COPY ["src/Infrastructure/IntegrationEventLogEF/Conbent.IntegrationEventLogEF.csproj", "Infrastructure/IntegrationEventLogEF/"]
COPY ["src/Infrastructure/Shared/ActivityExtensions.cs", "Infrastructure/Shared/"]
COPY ["src/Infrastructure/Shared/MigrateDbContextExtensions.cs", "Infrastructure/Shared/"]

RUN dotnet restore "Microservices/Accounts/UserInteraction.API/Conbent.UserInteraction.API.csproj" && \
dotnet dev-certs https --clean && \
dotnet dev-certs https
COPY /src /src
WORKDIR "/src/Microservices/Accounts/UserInteraction.API"

RUN dotnet build "./Conbent.UserInteraction.API.csproj" -c Debug -o /app/build

# Publish the application
FROM build AS publish
WORKDIR /src
RUN dotnet publish "Microservices/Accounts/UserInteraction.API/Conbent.UserInteraction.API.csproj" -c Debug -o /app/publish

# Build the final image
FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENV ASPNETCORE_ENVIRONMENT=Development
ENV DOTNET_USE_POLLING_FILE_WATCHER=true
ENV ASPNETCORE_URLS="http://+:5203"
# Angular Client 
EXPOSE 5211
EXPOSE 4224
# Proxy
EXPOSE 7109
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
ENTRYPOINT ["dotnet", "Conbent.UserInteraction.API.dll"]

#docker build -f src/Microservices/Accounts/UserInteraction.API/Dockerfile -t user-reaction-api .