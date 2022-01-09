export class ThemeFragment {
    constructor(payload) {
        this.Payload = payload;
    }
    static Async(path) {
        return new Promise((resolve, reject) => {
            fetch(`./template/${path}.html`)
                .then(r => r.text())
                .then(data => resolve(data))
                .catch(er => reject(er));
        });
    }
}
export default class SensenTheme {
    constructor() {
        this.Fragments = {};
        this.Payloads = [];
    }
    async AddFragment(name, payload) {
        if (payload instanceof ThemeFragment) {
            switch (typeof payload.Payload) {
                case 'string':
                    this.Fragments[name] = payload.Payload;
                    break;
            }
        }
        if (payload instanceof Promise) {
            this.Payloads.push(new Promise((resolve, reject) => {
                payload
                    .then(data => {
                    this.Fragments[name] = data;
                    window.$SensenRLP.push(`@Theme.${name}`, data);
                    // console.warn('Load Theme Fragment < ', name, ' >\n',  data)
                    return resolve(data);
                })
                    .catch(er => {
                    reject(er);
                    throw (`Sensen Theme say ${er}`);
                });
            })
            // payload
            // .then(data=> {
            //     console.warn('Load Theme Fragment < ', name, ' >\n',  data)
            //     this.Fragments[ name ] = data;
            // })
            // .catch(er=>{ throw (`Sensen Theme say ${ er }`)})
            );
        }
        return this;
    }
    async Use() {
        return new Promise(async (resolve, reject) => {
            try {
                const fragmentsArray = Object.entries(this.Fragments);
                if (fragmentsArray.length) {
                    fragmentsArray.map(e => {
                        window.$SensenRLP.push(`@Theme.${e[0]}`, e[1]);
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
