#See https://aka.ms/customizecontainer to learn how to customize your debug container and how Visual Studio uses this Dockerfile to build your images for faster debugging.
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

COPY ["src/Microservices/Article/Conbent.Article.API/Conbent.Article.API.csproj", "Microservices/Article/Conbent.Article.API/"]

COPY ["src/Infrastructure/ServiceDefaults/Conbent.Service.Defaults.csproj", "Infrastructure/ServiceDefaults/"]
COPY ["src/Infrastructure/EventBusRabbitMQ/Conbent.EventBusRabbitMQ.csproj", "Infrastructure/EventBusRabbitMQ/"]
COPY ["src/Infrastructure/EventBus/Conbent.EventBus.csproj", "Infrastructure/EventBus/"]
COPY ["src/Infrastructure/IntegrationEventLogEF/Conbent.IntegrationEventLogEF.csproj", "Infrastructure/IntegrationEventLogEF/"]
COPY ["src/Infrastructure/Conbent.CommonInfrastructure/Conbent.CommonInfrastructure.csproj", "Infrastructure/Conbent.CommonInfrastructure/"]
COPY ["src/Microservices/Article/Conbent.Article.Infrastructure/Conbent.Article.Infrastructure.csproj", "Microservices/Article/Conbent.Article.Infrastructure/"]
COPY ["src/Microservices/Article/Conbent.Article.Core/Conbent.Article.Core.csproj", "Microservices/Article/Conbent.Article.Core/"]
COPY ["src/Infrastructure/Shared/ActivityExtensions.cs", "Infrastructure/Shared/"]
COPY ["src/Infrastructure/Shared/MigrateDbContextExtensions.cs", "Infrastructure/Shared/"]


RUN dotnet restore "Microservices/Article/Conbent.Article.API/Conbent.Article.API.csproj" && \
    dotnet dev-certs https --clean && \
    dotnet dev-certs https

COPY /src /src
WORKDIR "/src/Microservices/Article/Conbent.Article.API/"

RUN dotnet build "./Conbent.Article.API.csproj" -c Debug -o /app/build

# Publish the application
FROM build AS publish
WORKDIR /src
RUN dotnet publish "Microservices/Article/Conbent.Article.API/Conbent.Article.API.csproj" -c Debug -o /app/publish

# Build the final image
FROM base AS final
COPY ["src/Microservices/Article/Conbent.Article.API/ArticleSource", "ArticleSource"]

WORKDIR /app
COPY --from=publish /app/publish .
ENV ASPNETCORE_ENVIRONMENT=Development
ENV DOTNET_USE_POLLING_FILE_WATCHER=true
# Set the ASPNETCORE_URLS environment variable to use HTTPS
ENV ASPNETCORE_URLS="https://+:7069"

# Expose the port the app runs on
# Angular Client 
EXPOSE 5211
EXPOSE 4224
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
# Proxy
EXPOSE 7109

COPY /cert/conbentapp.pfx /cert/conbentapp.pfx
ENV ASPNETCORE_Kestrel__Certificates__Default__Password=ConbentPassword
# ENV ASPNETCORE_Kestrel__Certificates__Default__Path=/src/cert/conbentapp.pfx #windows
#mac
ENV ASPNETCORE_Kestrel__Certificates__Default__Path=/cert/conbentapp.pfx 

ENTRYPOINT ["dotnet", "Conbent.Article.API.dll"]

#docker build -f src/Microservices/Article/Conbent.Article.API/Dockerfile -t article-api .