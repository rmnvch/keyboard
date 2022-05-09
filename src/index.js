import './assets/style/style.css'
import { createTextareaEl } from './assets/modules/textarea.js';
import { Keyboard } from './assets/modules/keyboard.js';


document.addEventListener("DOMContentLoaded", () => {

    const display = createTextareaEl();
   
    document.body.append(display.wrapper);
    
    Keyboard.init(display.textarea);
   
});