export default class SensenTheme {
    constructor(theme) {
        this.Fragments = {};
        this.Payloads = [];
        this.Assets = {
            CSS: [],
            JS: [],
        };
        this.Theme = theme;
    }
    async Async(path) {
        return new Promise((resolve, reject) => {
            fetch(`./sensen/themes/${(this.Theme ? `${this.Theme}/` : '')}${path}.html`)
                .then(r => r.text())
                .then(data => resolve(data))
                .catch(er => reject(er));
        });
    }
    Define(name, payload) {
        if (typeof payload == 'string') {
            switch (typeof payload) {
                case 'string':
                    this.Fragments[name] = payload;
                    break;
            }
        }
        if (payload instanceof Promise) {
            this.Payloads.push(new Promise((resolve, reject) => {
                payload
                    .then(data => {
                    this.Fragments[name] = data;
                    window.$SensenRLP.push(`@Theme.${name}`, data);
                    return resolve(data);
                })
                    .catch(er => {
                    reject(er);
                    throw (`Sensen Theme say ${er}`);
                });
            }));
        }
        return this;
    }
    Asset(type, path) {
        switch (type) {
            case '-css':
                this.Assets.CSS.push(path);
                break;
            case '-js':
                this.Assets.JS.push(path);
                break;
        }
        return this;
    }
    LoadCSS(path) {
        const d = document.createElement('link');
        d.addEventListener('load', () => {
            console.log('Asset :', path, 'loaded');
        });
        d.addEventListener('error', () => {
            console.log('Asset :', path, 'failed');
        });
        d.setAttribute('type', 'text/css');
        d.setAttribute('rel', 'StyleSheet');
        d.setAttribute('sensen-assets', '-css');
        d.setAttribute('href', path);
        document.head.appendChild(d);
        return d;
    }
    LoadJS(path) {
        const d = document.createElement('script');
        d.addEventListener('load', () => {
            console.log('Asset :', path, 'loaded');
        });
        d.addEventListener('error', () => {
            console.log('Asset :', path, 'failed');
        });
        d.setAttribute('type', 'text/javascript');
        d.setAttribute('sensen-assets', '-js');
        d.setAttribute('src', path);
        document.head.appendChild(d);
        return d;
    }
    async Use() {
        return new Promise(async (resolve, reject) => {
            try {
                /**
                 * Insertions des Assets
                 */
                if (this.Assets.CSS.length) {
                    this.Assets.CSS.map(path => this.LoadCSS(path));
                }
                if (this.Assets.JS.length) {
                    this.Assets.JS.map(path => this.LoadJS(path));
                }
                /**
                 * Traitement des fragments
                 */
                const fragmentsArray = Object.entries(this.Fragments);
                if (fragmentsArray.length) {
                    fragmentsArray.map(e => {
                        window.$SensenRLP.push(`@Theme(${this.Theme}).${e[0]}`, e[1]);
                    });
                    if (this.Payloads.length) {
                        // Object.values( this.Payloads ).map(promise=>)
                        await Promise.all(this.Payloads).then(fragment => {
                            console.warn('load fragment', fragment);
                        })
                            .then(() => {
                            resolve(this);
                        });
                    }
                    else {
                        resolve(this);
                    }
                    // resolve(this);
                }
                else {
                    resolve(this);
                }
            }
            catch (er) {
                reject(er);
            }
        });
    }
}
