namespace Conbent.EventBusRabbitMQ;

public class EventBusOptions
{
    public string SubscriptionClientName { get; set; } = "default";
    public int RetryCount { get; set; } = 10;
}
