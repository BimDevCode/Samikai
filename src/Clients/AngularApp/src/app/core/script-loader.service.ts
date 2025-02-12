import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ScriptLoaderService {
  private scripts: { [src: string]: HTMLScriptElement } = {};
  loadScript(src: string): Promise<void> {
    if (this.scripts[src]) {
      // The script is already loaded
      return Promise.resolve();
    }

    return new Promise((resolve, reject) => {
      const script = document.createElement('script');
      script.src = src;
      script.onload = () => {
        this.scripts[src] = script;
        resolve();
      };
      script.onerror = () => reject(new Error(`Failed to dddddddddddddd load ${src}`));
      try {
        document.body.appendChild(script);
      } catch (error) {
      }
    });
  }

}
