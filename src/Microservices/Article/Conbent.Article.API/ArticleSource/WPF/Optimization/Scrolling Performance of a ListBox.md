#ConbentDesktopProject 
#### Description
If a [ListBox](https://learn.microsoft.com/en-us/dotnet/api/system.windows.controls.listbox) contains many items, the user interface response can be slow when a user scrolls the [ListBox](https://learn.microsoft.com/en-us/dotnet/api/system.windows.controls.listbox) by using the mouse wheel or dragging the thumb of a scrollbar. You can improve the performance of the [ListBox](https://learn.microsoft.com/en-us/dotnet/api/system.windows.controls.listbox) when the user scrolls by setting the `VirtualizingStackPanel.VirtualizationMode` attached property to [VirtualizationMode.Recycling](https://learn.microsoft.com/en-us/dotnet/api/system.windows.controls.virtualizationmode#system-windows-controls-virtualizationmode-recycling).
#### Code
```
<StackPanel>

  <StackPanel.Resources>
    <src:LotsOfItems x:Key="data"/>
  </StackPanel.Resources>

  <ListBox Height="150" ItemsSource="{StaticResource data}" 
             VirtualizingStackPanel.VirtualizationMode="Recycling" />

</StackPanel>
```
#ProgramLanguageXAML 

#### Source Link
https://learn.microsoft.com/en-us/dotnet/desktop/wpf/controls/how-to-improve-the-scrolling-performance-of-a-listbox?view=netframeworkdesktop-4.8