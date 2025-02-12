#ConbentWebProject 
## Description

The table below shows the time it takes to update the [ListBox](https://learn.microsoft.com/en-us/dotnet/api/system.windows.controls.listbox) (with UI virtualization turned off) when one item is added. The number in the first row represents the elapsed time when the CLR List object is bound to ListBox element's ItemsSource. The number in the second row represents the elapsed time when an ObservableCollection is bound to the ListBox element's ItemsSource

|**Data binding the ItemsSource**|**Update time for 1 item (ms)**|
|---|---|
|To a CLR [List<T>](https://learn.microsoft.com/en-us/dotnet/api/system.collections.generic.list-1) object|1656|
|To an [ObservableCollection<T>](https://learn.microsoft.com/en-us/dotnet/api/system.collections.objectmodel.observablecollection-1)|20|

#### Source Link
https://learn.microsoft.com/en-us/dotnet/desktop/wpf/advanced/optimizing-performance-data-binding?view=netframeworkdesktop-4.8