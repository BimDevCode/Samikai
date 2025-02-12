#ConbentDesktopProject 
### Description

A [TextDecoration](https://learn.microsoft.com/en-us/dotnet/api/system.windows.textdecoration) object is a visual ornamentation that you can add to text; however, it can be performance intensive to instantiate. If you make extensive use of [Hyperlink](https://learn.microsoft.com/en-us/dotnet/api/system.windows.documents.hyperlink) elements, consider showing an underline only when triggering an event, such as the [MouseEnter](https://learn.microsoft.com/en-us/dotnet/api/system.windows.contentelement.mouseenter#system-windows-contentelement-mouseenter) event. For more information, see [Specify Whether a Hyperlink is Underlined](https://learn.microsoft.com/en-us/dotnet/desktop/wpf/advanced/how-to-specify-whether-a-hyperlink-is-underlined?view=netframeworkdesktop-4.8).

The following markup sample shows a Hyperlink defined with and without an underline:
### Code

```
<!-- Hyperlink with default underline. -->
<Hyperlink NavigateUri="http://www.msn.com">
  MSN Home
</Hyperlink>

<Run Text=" | " />

<!-- Hyperlink with no underline. -->
<Hyperlink Name="myHyperlink" TextDecorations="None"
           MouseEnter="OnMouseEnter"
           MouseLeave="OnMouseLeave"
           NavigateUri="http://www.msn.com">
  My MSN
</Hyperlink>
```
#ProgramLanguageXAML 

The following table shows the performance cost of displaying 1000 [Hyperlink](https://learn.microsoft.com/en-us/dotnet/api/system.windows.documents.hyperlink) elements with and without an underline.

| **Hyperlink**     | **Creation time (ms)** | **Render time (ms)** |
| ----------------- | ---------------------- | -------------------- |
| With underline    | 289                    | 1130                 |
| Without underline | 299                    | 776                  |

#### Source Link
https://learn.microsoft.com/en-us/dotnet/desktop/wpf/advanced/optimizing-performance-text?view=netframeworkdesktop-4.8