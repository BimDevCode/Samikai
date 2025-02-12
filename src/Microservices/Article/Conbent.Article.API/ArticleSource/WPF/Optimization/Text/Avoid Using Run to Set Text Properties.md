#ConbentDesktopProject 
### Description

In general, using a [Run](https://learn.microsoft.com/en-us/dotnet/api/system.windows.documents.run) within a [TextBlock](https://learn.microsoft.com/en-us/dotnet/api/system.windows.controls.textblock) is more performance intensive than not using an explicit [Run](https://learn.microsoft.com/en-us/dotnet/api/system.windows.documents.run) object at all. If you are using a [Run](https://learn.microsoft.com/en-us/dotnet/api/system.windows.documents.run) in order to set text properties, set those properties directly on the [TextBlock](https://learn.microsoft.com/en-us/dotnet/api/system.windows.controls.textblock) instead.

The following markup sample illustrates these two ways of setting a text property, in this case, the [FontWeight](https://learn.microsoft.com/en-us/dotnet/api/system.windows.controls.textblock.fontweight) property

The following table shows the cost of displaying 1000 [TextBlock](https://learn.microsoft.com/en-us/dotnet/api/system.windows.controls.textblock) objects with and without an explicit [Run](https://learn.microsoft.com/en-us/dotnet/api/system.windows.documents.run).

|**TextBlock type**|**Creation time (ms)**|**Render time (ms)**|
|---|---|---|
|Run setting text properties|146|540|
|TextBlock setting text properties|43|453|
### Code
```
<!-- Run is used to set text properties. -->
<TextBlock>
  <Run FontWeight="Bold">Hello, world</Run>
</TextBlock>

<!-- TextBlock is used to set text properties, which is more efficient. -->
<TextBlock FontWeight="Bold">
  Hello, world
</TextBlock>
```
#ProgramLanguageXAML 

#### Source Link
https://learn.microsoft.com/en-us/dotnet/desktop/wpf/advanced/optimizing-performance-text?view=netframeworkdesktop-4.8