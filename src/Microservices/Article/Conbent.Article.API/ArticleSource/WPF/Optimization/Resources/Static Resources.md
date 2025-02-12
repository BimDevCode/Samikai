#ConbentDesktopProject 
#### Description

A static resource provides a value for any XAML property attribute by looking up a reference to an already defined resource. Lookup behavior for that resource is analogous to compile-time lookup.

A dynamic resource, on the other hand, will create a temporary expression during the initial compilation and thus defer lookup for resources until the requested resource value is actually required in order to construct an object. Lookup behavior for that resource is analogous to run-time lookup, which imposes a performance impact. Use static resources whenever possible in your application, using dynamic resources only when necessary.
#### Code
```
<StackPanel.Resources>
  <SolidColorBrush x:Key="myBrush" Color="Teal"/>
</StackPanel.Resources>

<!-- StaticResource reference -->
<Label Foreground="{StaticResource myBrush}">Label 1</Label>

<!-- DynamicResource reference -->
<Label Foreground="{DynamicResource {x:Static SystemColors.ControlBrushKey}}">Label 2</Label>
```
#ProgramLanguageXAML 

## Source Link
https://learn.microsoft.com/en-us/dotnet/desktop/wpf/advanced/optimizing-performance-application-resources?view=netframeworkdesktop-4.8
