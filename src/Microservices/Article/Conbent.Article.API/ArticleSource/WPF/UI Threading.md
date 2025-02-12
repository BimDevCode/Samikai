#ConbentWebProject 
#### Description
The trick to building responsive, user-friendly applications is to maximize the [Dispatcher](https://learn.microsoft.com/en-us/dotnet/api/system.windows.threading.dispatcher)throughput by keeping the work items small.

The [Dispatcher](https://learn.microsoft.com/en-us/dotnet/api/system.windows.threading.dispatcher) class provides the methods for registering work items: [Dispatcher.InvokeAsync](https://learn.microsoft.com/en-us/dotnet/api/system.windows.threading.dispatcher.invokeasync), [Dispatcher.BeginInvoke](https://learn.microsoft.com/en-us/dotnet/api/system.windows.threading.dispatcher.begininvoke), and [Dispatcher.Invoke](https://learn.microsoft.com/en-us/dotnet/api/system.windows.threading.dispatcher.invoke). These methods schedule a delegate for execution. `Invoke` is a synchronous call – that is, it doesn't return until the UI thread actually finishes executing the delegate. `InvokeAsync` and `BeginInvoke` are asynchronous and return immediately.

1. **UI Thread**:
    - The UI thread is the main thread responsible for running the WPF application and handling user interface-related tasks such as rendering visuals, processing input events, and updating UI controls.
    - All UI elements and their associated properties should be accessed and manipulated only from the UI thread to prevent cross-threading issues.
2. **Dispatcher**:
    - The `Dispatcher` class in WPF provides a convenient way to marshal method calls onto the UI thread. It represents the message loop for an application.
    - The `Dispatcher` maintains a queue of work items called "DispatcherQueue" that need to be processed by the UI thread.
    - You can use the `Dispatcher.Invoke` or `Dispatcher.BeginInvoke` methods to execute code on the UI thread asynchronously or synchronously, respectively.
3. **Multithreading**:
    - While the UI thread is responsible for handling UI-related tasks, background threads can be used to perform time-consuming or blocking operations such as file I/O, network requests, or complex computations.
    - However, you should be cautious when interacting with UI elements from background threads to avoid cross-threading exceptions. Use the `Dispatcher` to marshal UI updates back to the UI thread when necessary.
4. **Async/Await**:
    - Asynchronous programming with `async/await` is well-supported in WPF applications.
    - You can use `async/await` to perform non-blocking asynchronous operations while keeping the UI responsive.
    - When awaiting asynchronous operations, the continuation after the `await` keyword is captured and posted back to the original context, typically the UI thread.
5. **DispatcherPriority**:
    - The `DispatcherPriority` enum defines different priority levels for work items queued on the dispatcher.
    - Higher priority tasks such as input events and UI updates are processed before lower priority tasks.
    - You can specify the priority level when using `Dispatcher.Invoke` or `Dispatcher.BeginInvoke` to control the order of execution of queued work items.
6. **Threading Models**:
    - WPF supports various threading models, including STA (Single-Threaded Apartment) and MTA (Multithreaded Apartment).
    - The default threading model for WPF applications is STA, where the UI thread is the STA thread.

#### Source Link
https://learn.microsoft.com/en-us/dotnet/desktop/wpf/advanced/threading-model?view=netframeworkdesktop-4.8