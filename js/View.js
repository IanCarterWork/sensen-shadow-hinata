import { CompilateVariables, Compilator, CompilatorNodeVariables, CompilatorRecordsRefsVariables } from "./Framework";
window.View = {};
export class SensenView {
    constructor(props) {
        this.slug = props.slug;
        this.source = props.source;
        this.controller = props.controller || (() => { });
        this.mounted = props.mounted || (() => { });
        this.unmounted = props.unmounted || (() => { });
    }
    cleanRoot() {
        if (this.root) {
            this.root.innerHTML = '';
        }
        return this;
    }
    render(input, router) {
        window.View = this;
        const dependencies = router.config.viewControllersDependencies;
        //root : HTMLElement, dependencies?: SensenTViewControllersDependencies
        /**
         * Get All Dependencies
         */
        const _dependencies = {};
        if (typeof dependencies == 'object') {
            const _dependenciesArgs = {
                view: this,
                router,
                input,
            };
            const _dependenciesArray = Object.entries(dependencies || {});
            if (_dependenciesArray.length) {
                _dependenciesArray.forEach(dep => {
                    if ('trigger' in dep[1] && typeof dep[1]['trigger'] == 'function') {
                        _dependencies[dep[0]] = dep[1].trigger(_dependenciesArgs);
                    }
                    else {
                        // _dependencies[ dep[0] ] = (()=>{})
                    }
                    // _dependencies[ dep[0] ] = 'trigger' in dep[1] ? dep[1].trigger(_dependenciesArgs) : (()=>{})
                });
            }
        }
        _dependencies.router = router;
        _dependencies.view = this;
        _dependencies.props = window.$SensenRLP.retrives();
        _dependencies.template = (fragment) => {
            const sampled = _dependencies.props[`@Theme.${fragment}`] || '';
            const dom = (new DOMParser()).parseFromString(sampled, 'text/html');
            const out = {
                raw: sampled,
                element: dom.body
            };
            return out;
        };
        /**
         * Sharing
         */
        this.dependencies = _dependencies;
        /**
         * States
         */
        this.router = router;
        this.input = input;
        this.root = router.root;
        /**
         * Compilate
         */
        CompilatorRecordsRefsVariables(this.input);
        Compilator(this.input);
        /**
         * Init Controller with dependencies
         */
        if ('controller' in this) {
            this.controller(_dependencies);
        }
        /**
         * Parsing
         */
        this.setContent(this.input);
        // console.log('Render View ', window.$SensenRLP.retrives(),  _dependencies)
        return this;
    }
    setContent(element) {
        // console.log('Parse :', element, this.root )
        if (this.root) {
            this.cleanRoot().root.appendChild(element);
        }
        return this;
    }
    setVariable(name, value, persist = false) {
        const defaultDictionary = window.$SensenRLP.retrives() || {};
        const dictionary = {};
        Object.entries(defaultDictionary).map(dic => {
            dictionary[dic[0]] = dic[1];
        });
        dictionary[name] = value;
        if (window.$SensenNodeRefVariables[name]) {
            const check = window.$SensenNodeRefVariables[name];
            const target = this.input.querySelector(`[sensen-ref="${check.ref}"]`);
            if (target) {
                if (check.content) {
                    /** Element Content */
                    target.innerHTML = CompilateVariables(check.content, dictionary);
                }
                if (check.attribute) {
                    /** Element Content */
                    target.setAttribute(check.attribute.name, check.attribute.value.replace(check.records[1].match[0], (value || check.records[1].syntax[1]).trim()));
                }
                /** * Update */
                CompilatorNodeVariables(target, dictionary);
            }
        }
        if (persist) {
            window.$SensenRLP.push(name, value);
        }
        return this;
    }
}
