#ConbentDesktopProject 
### Description

The [TextBlock](https://learn.microsoft.com/en-us/dotnet/api/system.windows.controls.textblock) element is derived from [UIElement](https://learn.microsoft.com/en-us/dotnet/api/system.windows.uielement). The [Run](https://learn.microsoft.com/en-us/dotnet/api/system.windows.documents.run) element is derived from [TextElement](https://learn.microsoft.com/en-us/dotnet/api/system.windows.documents.textelement), which is less costly to use than a [UIElement](https://learn.microsoft.com/en-us/dotnet/api/system.windows.uielement)-derived object. When possible, use [Run](https://learn.microsoft.com/en-us/dotnet/api/system.windows.documents.run) rather than [TextBlock](https://learn.microsoft.com/en-us/dotnet/api/system.windows.controls.textblock) for displaying text content in a [FlowDocument](https://learn.microsoft.com/en-us/dotnet/api/system.windows.documents.flowdocument).

The following markup sample illustrates two ways of setting text content within a [FlowDocument](https://learn.microsoft.com/en-us/dotnet/api/system.windows.documents.flowdocument)
#### Code
```
<FlowDocument>

  <!-- Text content within a Run (more efficient). -->
  <Paragraph>
    <Run>Line one</Run>
  </Paragraph>

  <!-- Text content within a TextBlock (less efficient). -->
  <Paragraph>
    <TextBlock>Line two</TextBlock>
  </Paragraph>

</FlowDocument>
```
#ProgramLanguageXAML 

#### Source Link
https://learn.microsoft.com/en-us/dotnet/desktop/wpf/advanced/optimizing-performance-text?view=netframeworkdesktop-4.8