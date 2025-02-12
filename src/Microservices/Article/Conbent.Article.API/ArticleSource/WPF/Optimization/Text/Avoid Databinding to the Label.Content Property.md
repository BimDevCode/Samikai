#ConbentDesktopProject 
### Description

Imagine a scenario where you have a [Label](https://learn.microsoft.com/en-us/dotnet/api/system.windows.controls.label) object that is updated frequently from a [String](https://learn.microsoft.com/en-us/dotnet/api/system.string) source. When data binding the [Label](https://learn.microsoft.com/en-us/dotnet/api/system.windows.controls.label) element's [Content](https://learn.microsoft.com/en-us/dotnet/api/system.windows.controls.contentcontrol.content) property to the [String](https://learn.microsoft.com/en-us/dotnet/api/system.string) source object, you may experience poor performance. Each time the source [String](https://learn.microsoft.com/en-us/dotnet/api/system.string) is updated, the old [String](https://learn.microsoft.com/en-us/dotnet/api/system.string) object is discarded and a new [String](https://learn.microsoft.com/en-us/dotnet/api/system.string) is recreated—because a [String](https://learn.microsoft.com/en-us/dotnet/api/system.string) object is immutable, it cannot be modified. This, in turn, causes the [ContentPresenter](https://learn.microsoft.com/en-us/dotnet/api/system.windows.controls.contentpresenter) of the [Label](https://learn.microsoft.com/en-us/dotnet/api/system.windows.controls.label) object to discard its old content and regenerate the new content to display the new [String](https://learn.microsoft.com/en-us/dotnet/api/system.string).

The solution to this problem is simple. If the [Label](https://learn.microsoft.com/en-us/dotnet/api/system.windows.controls.label) is not set to a custom [ContentTemplate](https://learn.microsoft.com/en-us/dotnet/api/system.windows.controls.contentcontrol.contenttemplate) value, replace the [Label](https://learn.microsoft.com/en-us/dotnet/api/system.windows.controls.label) with a [TextBlock](https://learn.microsoft.com/en-us/dotnet/api/system.windows.controls.textblock) and data bind its [Text](https://learn.microsoft.com/en-us/dotnet/api/system.windows.controls.textblock.text) property to the source string.

|**Data bound property**|**Update time (ms)**|
|---|---|
|Label.Content|835|
|TextBlock.Text|242|

#### Source Link
https://learn.microsoft.com/en-us/dotnet/desktop/wpf/advanced/optimizing-performance-text?view=netframeworkdesktop-4.8