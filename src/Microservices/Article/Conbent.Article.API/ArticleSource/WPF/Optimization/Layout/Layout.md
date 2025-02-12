#ConbentDesktopProject 
#### Description

The term "layout pass" describes the process of measuring and arranging the members of a [Panel](https://learn.microsoft.com/en-us/dotnet/api/system.windows.controls.panel)-derived object's collection of children, and then drawing them onscreen. The layout pass is a mathematically-intensive process—the larger the number of children in the collection, the greater the number of calculations required. For example, each time a child [UIElement](https://learn.microsoft.com/en-us/dotnet/api/system.windows.uielement) object in the collection changes its position, it has the potential to trigger a new pass by the layout system. Because of the close relationship between object characteristics and layout behavior, it's important to understand the type of events that can invoke the layout system. Your application will perform better by reducing as much as possible any unnecessary invocations of the layout pass.

The layout system completes two passes for each child member in a collection: a measure pass, and an arrange pass. Each child object provides its own overridden implementation of the [Measure](https://learn.microsoft.com/en-us/dotnet/api/system.windows.uielement.measure) and [Arrange](https://learn.microsoft.com/en-us/dotnet/api/system.windows.uielement.arrange) methods in order to provide its own specific layout behavior. At its simplest, layout is a recursive system that leads to an element being sized, positioned, and drawn onscreen.
- A child [UIElement](https://learn.microsoft.com/en-us/dotnet/api/system.windows.uielement) object begins the layout process by first having its core properties measured.
- The object's [FrameworkElement](https://learn.microsoft.com/en-us/dotnet/api/system.windows.frameworkelement) properties that are related to size, such as [Width](https://learn.microsoft.com/en-us/dotnet/api/system.windows.frameworkelement.width), [Height](https://learn.microsoft.com/en-us/dotnet/api/system.windows.frameworkelement.height), and [Margin](https://learn.microsoft.com/en-us/dotnet/api/system.windows.frameworkelement.margin), are evaluated.
- [Panel](https://learn.microsoft.com/en-us/dotnet/api/system.windows.controls.panel)-specific logic is applied, such as the [Dock](https://learn.microsoft.com/en-us/dotnet/api/system.windows.controls.dockpanel.dock) property of the [DockPanel](https://learn.microsoft.com/en-us/dotnet/api/system.windows.controls.dockpanel), or the [Orientation](https://learn.microsoft.com/en-us/dotnet/api/system.windows.controls.stackpanel.orientation) property of the [StackPanel](https://learn.microsoft.com/en-us/dotnet/api/system.windows.controls.stackpanel).
- Content is arranged, or positioned, after all child objects have been measured.
- The collection of child objects is drawn to the screen.

The layout pass process is invoked again if any of the following actions occur:
- A child object is added to the collection.
- A [LayoutTransform](https://learn.microsoft.com/en-us/dotnet/api/system.windows.frameworkelement.layouttransform) is applied to the child object.
- The [UpdateLayout](https://learn.microsoft.com/en-us/dotnet/api/system.windows.uielement.updatelayout) method is called for the child object
- When a change occurs to the value of a dependency property that is marked with metadata affecting the measure or arrange passes.

#### Source Link
https://learn.microsoft.com/en-us/dotnet/desktop/wpf/advanced/optimizing-performance-layout-and-design?view=netframeworkdesktop-4.8