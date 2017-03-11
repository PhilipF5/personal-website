import { Injectable } from '@angular/core';

@Injectable()
export class ThemeService {
    
    theme = "light";

    constructor() {
        switch (this.theme) {
            case "light":
                document.body.style.backgroundColor = "white";
                break;
            case "dark":
                document.body.style.backgroundColor = "#2D3031";
                break;
        }
    }

}
