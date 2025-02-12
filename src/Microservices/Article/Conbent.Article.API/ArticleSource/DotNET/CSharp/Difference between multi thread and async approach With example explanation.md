#ConbentWebProject 
#### Description

**Multithreading**:
- **Concurrency Model**: Multithreading involves the execution of multiple threads concurrently within a single process. Each thread has its own execution context, including a stack, instruction pointer, and program counter.
- **Parallelism**: Multithreading enables parallelism by executing multiple threads simultaneously on multiple CPU cores, allowing tasks to run concurrently and potentially speeding up execution.
- **Blocking vs. Non-blocking**: Multithreading typically uses blocking I/O operations, where threads wait synchronously for I/O operations to complete before continuing execution.

**Asynchronous Programming (Async)**:
- **Concurrency Model**: Asynchronous programming involves executing tasks asynchronously without blocking the calling thread. It relies on non-blocking I/O operations and continuations to handle concurrency.
- **Parallelism**: Asynchronous programming allows concurrency by freeing up the calling thread to perform other tasks while waiting for I/O operations to complete. It may leverage multithreading under the hood to execute asynchronous tasks.
- **Blocking vs. Non-blocking**: Asynchronous programming uses non-blocking I/O operations, where tasks are initiated asynchronously, and the calling thread is not blocked while waiting for their completion.

#### **Key Differences**:

If our main thread does not frees up after creating additional thread its multithreading
If our main thread frees up after creating additional thread its asynchronous
One thread, one stack
For async approach, .net will copy all context (for WPF) and local variables to new thread - this will also consume resources.
If the calling method is not asynchronous, it is multithreaded!
In this case, to avoid additional copying context and creating state machine at compile time, better use Threads - Task.Run
In Async To avoid copying context to new thread use .ConfigureAwait(false)
In Thread To avoid copying context to new thread use ExecutionContext.SuppressFlow()
#### Cases
**Use Async when** (applicable for Client and Server Machine Code Cases):
1. **I/O-Bound Operations**: When performing I/O-bound operations, such as network requests, file I/O, database queries, or web service calls. Async allows you to initiate these operations without blocking the calling thread, improving responsiveness and resource utilization.
2. **Non-blocking Operations**: When dealing with non-blocking operations that may take an indeterminate amount of time to complete, such as waiting for user input, processing asynchronous notifications, or handling events in GUI applications.
3. **Concurrency with Resource Efficiency**: When achieving concurrency with resource efficiency by allowing threads to perform other tasks while waiting for asynchronous operations to complete, reducing resource contention and improving overall system performance.

**Use Multithreading when** (applicable for major Client Machine Code Cases):
1. **CPU-Bound Operations**: When performing CPU-bound operations that are computationally intensive and benefit from parallel execution across multiple CPU cores, such as mathematical calculations, data processing, or image/video processing.
2. **Parallel Algorithms**: When designing and implementing parallel algorithms or workflows that can be divided into independent subtasks that execute concurrently on multiple threads, improving performance and throughput.
3. **Low-Level Synchronization**: When fine-grained control over thread synchronization and coordination is required, such as implementing custom locking mechanisms, thread-safe data structures, or inter-thread communication using synchronization primitives like mutexes, semaphores, or monitors.
4. **Background Processing**: When executing background tasks or worker threads that run asynchronously in the background, such as processing batch jobs, performing periodic cleanup tasks, or handling long-running background computations.
5. **User Interface (UI) Responsiveness**: When ensuring UI responsiveness in GUI applications by offloading long-running or blocking tasks to background threads, preventing the UI thread from becoming unresponsive and improving the overall user experience.

#### Source Link
https://www.youtube.com/watch?v=mtTZu8CXaGE