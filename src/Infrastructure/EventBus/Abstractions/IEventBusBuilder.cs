using Microsoft.Extensions.DependencyInjection;

namespace Conbent.EventBus.Abstractions;

public interface IEventBusBuilder
{
    public IServiceCollection Services { get; }
}
