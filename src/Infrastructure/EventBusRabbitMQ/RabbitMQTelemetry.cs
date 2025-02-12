using System.Diagnostics;
using OpenTelemetry.Context.Propagation;

namespace Conbent.EventBusRabbitMQ;

public class RabbitMqTelemetry
{
    public static readonly string ActivitySourceName = "EventBusRabbitMQ";
    public ActivitySource ActivitySource { get; } = new(ActivitySourceName);
    public TextMapPropagator Propagator { get; } = Propagators.DefaultTextMapPropagator;
}
