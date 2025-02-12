#ConbentWebProject 
## Description

There is a significant performance impact when you data bind to a single CLR object with thousands of properties. You can minimize this impact by dividing the single object into multiple CLR objects with fewer properties.

The table shows the binding and rendering times for data binding to a single large CLR object versus multiple smaller objects.

|**Data binding 1000 TextBlock objects**|**Binding time (ms)**|**Render time -- includes binding (ms)**|
|---|---|---|
|To a CLR object with 1000 properties|950|1200|
|To 1000 CLR objects with one property|115|314|

#### Source Link
https://learn.microsoft.com/en-us/dotnet/desktop/wpf/advanced/optimizing-performance-data-binding?view=netframeworkdesktop-4.8