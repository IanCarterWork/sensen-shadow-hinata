# sensen-hinata
A Sensen core for your HTML template runtime

## Installation
Install via NPM:

```bash
npm install sensen-hinata

```

## Usage

#### javascript

```javascript
Create your js file and add edit this code. 
Replace root element id by your id.


import Sensen from "sensen-hinata/core/Framework";

const SensenJSApp = ()=>{
    
    AppRouter.root = document.querySelector('#root');

    AppRouter.render()
    
}


Run your app with Sensen.JS function

Sensen.JS(SensenJSApp);

```