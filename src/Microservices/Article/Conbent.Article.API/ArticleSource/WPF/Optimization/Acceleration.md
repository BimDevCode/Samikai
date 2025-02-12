#ConbentDesktopProject  
#### Description
In WPF, graphical acceleration refers to leveraging the graphics processing unit (GPU) to enhance rendering performance and improve the user experience. This can be achieved by utilizing features such as hardware acceleration and specifying the graphical tier.
## Software Rendering Pipeline

The WPF software rendering pipeline is entirely CPU bound. WPF takes advantage of the SSE and SSE2 instruction sets in the CPU to implement an optimized, fully-featured software rasterizer. Fallback to software is seamless any time application functionality cannot be rendered using the hardware rendering pipeline.

The biggest performance issue you will encounter when rendering in software mode is related to fill rate, which is defined as the number of pixels that you are rendering. If you are concerned about performance in software rendering mode, try to minimize the number of times a pixel is redrawn. For example, if you have an application with a blue background, which then renders a slightly transparent image over it, you will render all of the pixels in the application twice. As a result, it will take twice as long to render the application with the image than if you had only the blue background.
### Graphics Rendering Tiers

It may be very difficult to predict the hardware configuration that your application will be running on. However, you might want to consider a design that allows your application to seamlessly switch features when running on different hardware, so that it can take full advantage of each different hardware configuration.

To achieve this, WPF provides functionality to determine the graphics capability of a system at runtime. Graphics capability is determined by categorizing the video card as one of three rendering capability tiers. WPF exposes an API that allows an application to query the rendering capability tier. Your application can then take different code paths at run time depending on the rendering tier supported by the hardware.

RenderCapability Responsible for that.
- **RenderCapability.IsPixelShaderVersionSupported** - Gets a value that indicates whether the specified pixel shader version is supported.
- **RenderCapability.IsShaderEffectSoftwareRenderingSupported** - Gets a value that indicates whether the system can render bitmap effects in software.
- **RenderCapability.Tier** - Gets a value that indicates the rendering tier for the current thread.
- **RenderCapability.TierChanged** - Occurs when the rendering tier has changed for the Dispatcher object of the current thread.

The graphical tier in WPF categorizes the level of graphical hardware acceleration available on the system. There are three tiers:
- **Rendering Tier 0** - No graphics hardware acceleration. The DirectX version level is less than version 7.0.
- **Rendering Tier 1** - Partial graphics hardware acceleration. The DirectX version level is greater than or equal to version 7.0, and lesser than version 9.0.
- **Rendering Tier 2** - Most graphics features use graphics hardware acceleration. The DirectX version level is greater than or equal to version 9.0.

By default, WPF applications run in Tier 2 if the system supports it. However, you can specify the desired graphical tier explicitly to optimize performance.

#### Code
```
RenderOptions.ProcessRenderMode = RenderMode.SoftwareOnly;  
```
#ProgramLanguageCSharp 

