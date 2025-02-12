#ConbentWebProject 
#### Description
To Catch And Log Errors that occurs in async method (calls only if we have failure)  

#### Code
```
public static void LogexceptionAsync(this Task task)
{
   task.ContinueWith(
	   (t) => HandleException(t),
	   CancellationToken.None,
	   TaskContinuationOptions.OnlyOnFaulted,
	   TaskScheduler.Current);
}

private static void HandleException(Task t)
{
   foreach (Exception ex in t.Exception.InnerExceptions)
   {
	   // Topo: og caught exceptions 
   }
}
```
#ProgramLanguageCSharp 

