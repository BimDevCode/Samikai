#ConbentWebProject 
## Description

If you have a choice between binding an IList or an [IEnumerable](https://learn.microsoft.com/en-us/dotnet/api/system.collections.ienumerable) to an [ItemsControl](https://learn.microsoft.com/en-us/dotnet/api/system.windows.controls.itemscontrol) object, choose the IList object. Binding IEnumerable to an ItemsControl  forces WPF to create a wrapper IList object, which means your performance is impacted by the unnecessary overhead of a second object.

#### Source Link
https://learn.microsoft.com/en-us/dotnet/desktop/wpf/advanced/optimizing-performance-data-binding?view=netframeworkdesktop-4.8