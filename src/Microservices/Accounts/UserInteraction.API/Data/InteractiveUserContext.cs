using Conbent.UserInteraction.API.Infrastructure.EntityConfigurations;
using Conbent.UserInteraction.API.Models;
using System.Reflection;

namespace Conbent.UserInteraction.API.Data;

public class InteractiveUserContext(DbContextOptions<InteractiveUserContext> options) : DbContext(options)
{
    public required DbSet<InteractiveUser> Users { get; set; }
    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);
        modelBuilder.ApplyConfigurationsFromAssembly(Assembly.GetExecutingAssembly());

        //modelBuilder.HasPostgresExtension("vector");
        modelBuilder.ApplyConfiguration(new InteractiveUserEntityTypeConfiguration());

        // Add the outbox table to this context
        modelBuilder.UseIntegrationEventLogs();
    }
 
}
