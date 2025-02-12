#ConbentWebProject 
#### Description
When we create Thread we corrupt minimum 1MB.
One Thread, One Stack.
We should not use this class (Except its a Client Machine Code Case) unless: 
1. We need to set a stack size, apartment state or culture for a new thread. 
2. We need immediately execute a new thread. 
3. We need a task running in foreground mode. 
4. We need a thread to have a particular priority. 
5. We have a task that might run a long time.

**Use Multithreading when** (applicable for major Client Machine Code Cases):
1. **CPU-Bound Operations**: When performing CPU-bound operations that are computationally intensive and benefit from parallel execution across multiple CPU cores, such as mathematical calculations, data processing, or image/video processing.
2. **Low-Level Synchronization**: When fine-grained control over thread synchronization and coordination is required, such as implementing custom locking mechanisms, thread-safe data structures, or inter-thread communication using synchronization primitives like mutexes, semaphores, or monitors.
3. **Background Processing**: When executing background tasks or worker threads that run asynchronously in the background, such as processing batch jobs, performing periodic cleanup tasks, or handling long-running background computations.
4. **User Interface (UI) Responsiveness**: When ensuring UI responsiveness in GUI applications by offloading long-running or blocking tasks to background threads, preventing the UI thread from becoming unresponsive and improving the overall user experience.




