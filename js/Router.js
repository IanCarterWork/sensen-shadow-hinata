import { SensenView } from "./View.js";
export class SensenRouter {
    constructor(config) {
        this.config = config;
        this.routes = {};
    }
    add(view) {
        this.routes[view.slug] = view;
        return this;
    }
    render() {
        window.addEventListener('hashchange', () => {
            const slug = (location.hash || '').substr(1);
            this.navigate(slug);
        });
        if (location.hash) {
            console.log('Go to view', location.hash.substr(1));
            this.navigate(location.hash.substr(1));
        }
        else if (this.config.default) {
            console.log('Go to default view', this.config.default);
            this.navigate(this.config.default);
        }
        else {
            alert('Router UnBoot, \nAjouter une route par default ');
        }
        return this;
    }
    parseSlug(slug) {
        const ex = slug.split('?');
        return {
            name: ex[0],
            search: ex[1] || ''
        };
    }
    navigate(slug) {
        const pslug = this.parseSlug(slug);
        /**
         * Unmount last View
         */
        if (window.View instanceof SensenView) {
            if ('unmounted' in window.View) {
                window.View.unmounted(window.View.dependencies);
            }
        }
        return new Promise((resolve, reject) => {
            this.view = this.routes[pslug.name] || null;
            if (this.view) {
                fetch(`./sensen/views/${pslug.name}.html`)
                    .then(r => {
                    if (r.status == 404) {
                        console.log('Vue introuvable', slug);
                        return;
                    }
                    return r.text();
                })
                    .then(html => {
                    const element = new DOMParser().parseFromString(html, 'text/html');
                    const fragment = document.createElement('div');
                    window.$SensenRLP.clean();
                    window.$SensenNodeRefVariables = {};
                    document.documentElement.setAttribute('sensen-view', slug);
                    Object.values(element.body.children).map(c => fragment.appendChild(c));
                    this.view.render(fragment, this);
                    resolve(element);
                    location.hash = slug;
                    if ('mounted' in this.view) {
                        this.view.mounted(this.view.dependencies);
                    }
                })
                    .catch(er => {
                    reject(er);
                    throw (`SensenJS Router say :\n${er}`);
                });
            }
            else {
                throw (`SensenJS Router say route < \n${slug} > not found`);
            }
        });
    }
}
