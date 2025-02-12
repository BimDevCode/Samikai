#ConbentDesktopProject 
#### Description
The [NavigationWindow](https://learn.microsoft.com/en-us/dotnet/api/system.windows.navigation.navigationwindow) object derives from [Window](https://learn.microsoft.com/en-us/dotnet/api/system.windows.window) and extends it with content navigation support, primarily by aggregating [NavigationService](https://learn.microsoft.com/en-us/dotnet/api/system.windows.navigation.navigationservice) and the journal. You can update the client area of [NavigationWindow](https://learn.microsoft.com/en-us/dotnet/api/system.windows.navigation.navigationwindow) by specifying either a uniform resource identifier (URI) or an object. The following sample shows both methods:

#### Cases
When you navigate using a uniform resource identifier (URI), the journal stores only the uniform resource identifier (URI) reference. This means that each time you revisit the page, it is dynamically reconstructed, which may be time consuming depending on the complexity of the page. In this case, the journal storage cost is low, but the time to reconstitute the page is potentially high.

When you navigate using an object, the journal stores the entire visual tree of the object. This means that each time you revisit the page, it renders immediately without having to be reconstructed. In this case, the journal storage cost is high, but the time to reconstitute the page is low.

#### Code
```
private void buttonGoToUri(object sender, RoutedEventArgs args)
{
    navWindow.Source = new Uri("NewPage.xaml", UriKind.RelativeOrAbsolute);
}

private void buttonGoNewObject(object sender, RoutedEventArgs args)
{
    NewPage nextPage = new NewPage();
    nextPage.InitializeComponent();
    navWindow.Content = nextPage;
}
```
#ProgramLanguageCSharp 

