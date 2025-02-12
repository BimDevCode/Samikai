using Conbent.UserInteraction.API.Models;

namespace Conbent.UserInteraction.API.Infrastructure.EntityConfigurations;

class InteractiveUserEntityTypeConfiguration
    : IEntityTypeConfiguration<InteractiveUser>
{
    public void Configure(EntityTypeBuilder<InteractiveUser> builder)
    {
        builder.ToTable("InteractiveUser");

        builder.Property(cb => cb.Name)
            .HasMaxLength(100);
    }
}
