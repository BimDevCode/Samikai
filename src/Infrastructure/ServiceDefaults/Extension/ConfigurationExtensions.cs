using System;
using Microsoft.Extensions.Configuration;

// ReSharper disable once CheckNamespace
namespace Conbent.Service.Defaults.Extension;

public static class ConfigurationExtensions
{
    public static string GetRequiredValue(this IConfiguration configuration, string name) =>
        configuration[name] ?? throw new InvalidOperationException($"Configuration missing value for: {(configuration is IConfigurationSection s ? s.Path + ":" + name : name)}");
}
