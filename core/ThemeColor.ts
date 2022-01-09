
import { SensenWindow } from "./Window";
declare let window: SensenWindow;




window.UiThemeColorChange = (name: 'light' | 'dark')=>{

    const doc = document.querySelector(':root')


    if(doc){

        doc.setAttribute('theme-color', name);
        
        localStorage.setItem('@ian-ui-theme', name);
        
    }

    else{ throw (`Impossible de changer le theme en ${ name }`) }
    
}


window.UiThemeColorToggle = ()=>{

    const doc = document.querySelector(':root')

    const current = localStorage.getItem('@ian-ui-theme') || 'light';

    
    window.UiThemeColorChange( (current == 'light') ? 'dark' : 'light' )
    
}


window.UiThemeColorInit = ()=>{

    const name = localStorage.getItem('@ian-ui-theme') || 'light';

    window.UiThemeColorChange(name as 'light' | 'dark');

}


window.UiThemeSplashScreen = (message: string = 'Chargement...') =>{


    const w = document.createElement('div');

    const m = document.createElement('div');

    const logo = document.createElement('img');

    m.textContent = message||'';
    logo.setAttribute('src', '/assets/images/app-logo.png')

    w.classList.add('splashscreen')
    m.classList.add('splashscreen-title')
    logo.classList.add('splashscreen-logo')

    w.appendChild(logo);
    w.appendChild(m);
    document.body.appendChild(w);

    globalThis.addEventListener('load', ()=>{

        let t = setTimeout(()=>{
            clearTimeout(t)

            w.addEventListener('transitionend', ()=>{
                try{ if(w){ w.parentNode.removeChild(w); } }
                catch(s){}
            })
            w.classList.add('hide')
        }, 1962)
        
    })

}



/**
 * For tranditional Browser
 */
// globalThis.addEventListener('DOMContentLoaded', ()=>{
    
//     UiThemeColorInit()

//     UiThemeSplashScreen()

// });




const SensenThemeColor = {

    Set: window.UiThemeColorChange,

    Toggle: window.UiThemeColorToggle,

    Init: window.UiThemeColorInit,

    SplashScreen: window.UiThemeSplashScreen,

}


export default SensenThemeColor