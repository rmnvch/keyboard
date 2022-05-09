import Backspace from '../img/Backspace.svg';
import CapsLock from '../img/CapsLock.svg';
import SpaceBar from "../img/Space.svg";
import Enter from "../img/Enter.svg";
import Meta from "../img/Meta.svg";
import Alt from "../img/Alt.svg";
import ArrowDown from "../img/ArrowDown.svg";
import ArrowUp from "../img/ArrowUp.svg";
import ArrowLeft from "../img/ArrowLeft.svg";
import ArrowRight from "../img/ArrowRight.svg";

export const Keyboard = {
    
    elements: {
        main: null,
        layout: null,
        keys: [],
        langIndication: null,
        display: null,
    },

    props: {
        value: '',
        capsLock: false,
        lang: localStorage['lang'] || 'EN',
        carret: null,   
    },

    init(display) {
        this.elements.main = document.createElement('div');
        this.elements.layout = document.createElement('div');
        this.elements.langIndication = document.createElement('div');
        
        this.elements.main.classList.add('keyboard', 'container');
        this.elements.layout.classList.add('keyboard__layout');
        this.elements.langIndication.classList.add('keyboard__lang');

        this.elements.langIndication.textContent = localStorage['lang'] || 'EN';
        
        const keysFragment = this._createKeys(this.props.lang);
        
        this.elements.layout.append(keysFragment);
        this.elements.main.append(this.elements.langIndication);
        this.elements.main.append(this.elements.layout);
        
        document.body.append(this.elements.main);

        this.elements.display = display;

        this.elements.display.addEventListener('blur', () => {
            this.props.value = this.elements.display.value 
        });

        this.elements.display.addEventListener('keydown', (event) => {
        
          for(let key of this.elements.keys) {

              if(event.key === key.dataset.key) {
                key.classList.add('keyboard__key--keyDown')}
          } 
        })

        this.elements.display.addEventListener('keyup', (event) => {
        
            for(let key of this.elements.keys) {
  
                if(event.key === key.dataset.key) {
  
                  setTimeout(()=> {
                    key.classList.remove('keyboard__key--keyDown')
                  }, 200)  
                }
            } 
          })
        
        this._updateKeysProp();
    },

    _createKeys(lang) {
        
        const fragment = document.createDocumentFragment('div'); 

        const EN_lang = [
            '`', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '=', 'Backspace', 'Delete', 
            'Tab', 'q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', '[', ']', '\\',  
            'CapsLock', 'a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', ';', "'", 'Enter', 
            'ShiftL', 'z', 'x', 'c', 'v', 'b', 'n', 'm', ',', '.', '/', 'ArrowUp', 'Shift', 
            'Control', 'Meta', 'Alt', ' ', 'Alt', 'Control', 'ArrowLeft', 'ArrowDown', 'ArrowRight'
        ];

        const RU_lang = [
            'ё', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '=', 'Backspace', 'Delete', 
            'Tab', 'й', 'ц', 'у', 'к', 'е', 'н', 'г', 'ш', 'щ', 'з', 'х', 'ъ', '\\', 
            'CapsLock', 'ф', 'ы', 'в', 'а', 'п', 'р', 'о', 'л', 'д', 'ж', 'э', 'Enter', 
            'ShiftL', 'я', 'ч', 'с', 'м', 'и', 'т', 'ь', 'б', 'ю', '.', 'ArrowUp', 'Shift', 
            'Control', 'Meta', 'Alt', ' ', 'Alt', 'Control', 'ArrowLeft', 'ArrowDown', 'ArrowRight'
        ];

        let currentLang;

        switch(lang) {
            case "EN": 
                currentLang = EN_lang
                break;

            case "RU":
                currentLang = RU_lang
                break;
        };
     
        for(let i = 0; i <  currentLang.length; i++) {
            
            const keyEl = document.createElement('button');
            
            keyEl.classList.add('keyboard__key');

            keyEl.setAttribute("type", "button");
            keyEl.setAttribute('data-char', currentLang[i].charCodeAt());
            keyEl.setAttribute('data-key', currentLang[i]);


            switch(currentLang[i]) {
                
                case 'Backspace':
                    
                    keyEl.classList.add('keyboard__key--wide');

                    const iconBackSpace = this._createKeyIcon();
                    iconBackSpace.setAttribute('src', Backspace);
                    keyEl.append(iconBackSpace);

                    keyEl.addEventListener("click", () => {

                        if (this.elements.display.selectionEnd === this.props.value.length) { 
                            this.props.value = this.props.value.substring(0, this.props.value.length - 1);
                            this.props.carret = null
                        }
                        else {
                            let start = this.props.value.substring(0, this.elements.display.selectionEnd); 
                            let end = this.props.value.substring(this.elements.display.selectionEnd, this.props.value.length );
                            this.props.value = start.substring(0, start.length - 1) + end;
                            
                            this.props.carret = this.props.value.length - end.length;
                        }
                        this._onKeyClick();
                    });
                break;

                case 'Tab':
                    keyEl.classList.add('keyboard__key--wide');
                    
                    keyEl.append(this._createFakeCildEl('Tab'))

                    keyEl.addEventListener("click", () => {
                        this.props.value += '  ';
                        this._onKeyClick();
                    });

                break;

                case 'CapsLock':
                    keyEl.classList.add('keyboard__key--wide', "keyboard__key--activatable");

                    const iconCaps = this._createKeyIcon();
                    iconCaps.setAttribute('src', CapsLock);
                    keyEl.append(iconCaps);

                    keyEl.addEventListener("click", () => {
                        this._toggleCapsLock();
                        keyEl.classList.toggle("keyboard__key--active", this.props.capsLock);
                    });
                break;

                case 'Enter':
                    keyEl.classList.add('keyboard__key--wide');
                    
                    const iconEnter = this._createKeyIcon();
                    iconEnter.setAttribute('src', Enter);
                    keyEl.append(iconEnter);

                    keyEl.addEventListener("click", () => {

                        if (this.elements.display.selectionEnd === this.props.value.length) { 
                           this.props.value += '\n';
                           this.props.carret = null
                       }
                       else {
                           let start = this.props.value.substring(0, this.elements.display.selectionEnd); 
                           let end = this.props.value.substring(this.elements.display.selectionEnd, this.props.value.length );
                           this.props.value = start + "\n" + end;
                           
                           this.props.carret = this.props.value.length - end.length;
                       }
                       this._onKeyClick();
                   });
                break;

                case ' ':
                    keyEl.classList.add('keyboard__key--extra-wide');
                    
                    const iconSpace = this._createKeyIcon();
                    iconSpace.setAttribute('src', SpaceBar);
                    keyEl.append(iconSpace);

                    
                    keyEl.addEventListener("click", () => {

                        if (this.elements.display.selectionEnd === this.props.value.length) { 
                           this.props.value += ' ';
                           this.props.carret = null
                       }
                       else {
                           let start = this.props.value.substring(0, this.elements.display.selectionEnd); 
                           let end = this.props.value.substring(this.elements.display.selectionEnd, this.props.value.length );
                           this.props.value = start + " " + end;
                           
                           this.props.carret = this.props.value.length - end.length;
                       }
                       this._onKeyClick();
                   });
                    
                break;

                case 'ArrowRight':
                    
                    keyEl.classList.add('keyboard__key--dark');

                    const iconRight = this._createKeyIcon();
                    iconRight.setAttribute('src', ArrowRight);
                    keyEl.append(iconRight);

                    keyEl.addEventListener("click", () => {
                        
                        if(this.elements.display.selectionEnd === this.props.value.length) return;
                        
                        this.elements.display.selectionStart += 1;
                        
                        this._onKeyClick();
                    });
                break;

                case 'ArrowDown':
                    
                    keyEl.classList.add('keyboard__key--dark');

                    const iconDown = this._createKeyIcon();
                    iconDown.setAttribute('src', ArrowDown);
                    keyEl.append(iconDown);

                    keyEl.addEventListener("click", () => {
                        let test = this.elements.display.value.substr(0, this.elements.display.selectionStart).split("\n").length
                        console.log(test);
                        console.log(this.props.value.length)
                    });
                break;

                case 'ArrowLeft':
                    
                    keyEl.classList.add('keyboard__key--dark');

                    const iconLeft = this._createKeyIcon();
                    iconLeft.setAttribute('src', ArrowLeft);
                    keyEl.append(iconLeft);

                    keyEl.addEventListener("click", () => {
                        if(this.elements.display.selectionEnd === 0) return;
                        
                        this.elements.display.selectionEnd -= 1;

                        this._onKeyClick();
                    });
                break;

                case 'ArrowUp':
                    
                    keyEl.classList.add('keyboard__key--dark');

                    const iconUp = this._createKeyIcon();
                    iconUp.setAttribute('src', ArrowUp);
                    keyEl.append(iconUp);

                    keyEl.addEventListener("click", () => {
                    });
                break;

                case 'Meta':

                    const iconMeta = this._createKeyIcon();
                    iconMeta.setAttribute('src', Meta);
                    keyEl.append(iconMeta);

                    keyEl.addEventListener("click", () => {
                    });
                break;

                case 'Alt':

                    const iconAlt = this._createKeyIcon();
                    iconAlt.setAttribute('src', Alt);
                    keyEl.append(iconAlt);

                    keyEl.classList.add('keyboard__key--wide');

                    keyEl.addEventListener('click' , () => {
                        this._changeLang(this.props.lang);
                    })

                break;

                case 'Control':
                    keyEl.append(this._createFakeCildEl('Ctrl'))

                    keyEl.addEventListener("click", () => {
                    });
                break;

                case 'Shift':
                    keyEl.append(this._createFakeCildEl('Shift'))
                    keyEl.classList.add('keyboard__key--wide')
                    keyEl.addEventListener("click", () => {
                    });
                break;

                case 'ShiftL':
                    keyEl.append(this._createFakeCildEl('Shift'))
                    keyEl.classList.add('keyboard__key--wide')
                    keyEl.addEventListener("click", () => {
                    });
                break;

                case 'Delete':
                    keyEl.append(this._createFakeCildEl('Delete'));

                    keyEl.addEventListener("click", () => {

                         if (this.elements.display.selectionEnd === this.props.value.length) { 
                            this.props.value = this.props.value.slice(0, this.props.value.length - 1);
                            this.props.carret = null
                        }
                        else {
                            let start = this.props.value.substring(0, this.elements.display.selectionEnd); 
                            let end = this.props.value.substring(this.elements.display.selectionEnd, this.props.value.length );
                            this.props.value = start + end.slice(1, start.length);
                            
                            this.props.carret = this.props.value.length - end.length + 1;
                        }
                        this._onKeyClick();

                    });
                break;
                
                default:
                    keyEl.textContent = currentLang[i];

                    keyEl.addEventListener('click', () => {

                        if (this.elements.display.selectionEnd === this.props.value.length) { 
                            this.props.value += this.props.capsLock ? currentLang[i].toUpperCase() : currentLang[i].toLowerCase();
                            this.props.carret = null
                        }
                        else {
                            let start = this.props.value.substring(0, this.elements.display.selectionEnd); 
                            let end = this.props.value.substring(this.elements.display.selectionEnd, this.props.value.length );
                            this.props.value = this.props.capsLock ? (start + currentLang[i].toUpperCase() + end) : (start + currentLang[i].toLowerCase() + end) ;
                            
                            this.props.carret = this.props.value.length - end.length;
                        }

                        // this.props.value += this.props.capsLock ? currentLang[i].toUpperCase() : currentLang[i].toLowerCase();
                        this._onKeyClick();
                    })  
            }

            this.props.capsLock = false;
            
            fragment.append(keyEl);
            
            if (['\\', 'delete', 'Enter', 'Shift'].includes(currentLang[i])) {
                fragment.append(document.createElement('br'));
            }

            this.props.lang = lang;
            this.elements.langIndication.textContent = lang;

        }
        return fragment;
    },
    
    _onKeyClick() {
        this.elements.display.focus();

        this.elements.display.value = this.props.value;

        if(this.props.carret) {
            this.elements.display.selectionEnd = this.props.carret
        }
        this.props.carret = null;
    },

    _updateKeysProp() {
        this.elements.keys = this.elements.layout.querySelectorAll(".keyboard__key");
    },

    _createKeyIcon() {
        const img = document.createElement('img');
        img.classList.add('keyboard__icon');
        return img;
    },

    _createFakeCildEl(inner) {
        const el = document.createElement('span');
        el.textContent = inner;
        return el;
    },


    _toggleCapsLock() {

        Keyboard.props.capsLock = !Keyboard.props.capsLock;

        for (const key of this.elements.keys) {
            if (key.childElementCount === 0) {

                key.textContent = this.props.capsLock ? key.textContent.toUpperCase() : key.textContent.toLowerCase();
            }
        }

        
    },

    _changeLang(){

        this.elements.layout.innerHTML = '';
        let newLang;

        switch(this.elements.langIndication.textContent) {
            case 'EN': 
            newLang = this._createKeys('RU');
            break;

            case 'RU':
            newLang = this._createKeys('EN');
           break;
        }

        this.elements.keys = document.querySelectorAll('.keyboard__key');

        this.elements.layout.append(newLang);

        localStorage.setItem('lang', this.elements.langIndication.textContent);
        
        this._updateKeysProp();
    },
}
