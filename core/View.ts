import { CompilateVariables, Compilator, CompilatorNodeVariables, CompilatorRecordsRefsVariables } from "./Framework";
import { SensenRouter } from "./Router";
import type { SensenTViewControllersDependencies, SensenTViewControllersDependenciesType, SensenTViewDependencyProps, SensenTViewProps, SensenTViewTheme } from "./View.type";
import type { SensenTViewController } from "./ViewController.type";



import { SensenWindow } from "./Window";
declare let window: SensenWindow;




window.View = {};






export class SensenView{

    slug: string;

    source: string;

    controller: (dependencies: SensenTViewControllersDependencies ) => void;

    mounted: (dependencies: { [K: string] : any } ) => void;

    unmounted: (dependencies: { [K: string] : any } ) => void;

    dependencies: { [K: string] : any } ;

    root: HTMLElement;


    input: HTMLElement;

    router: SensenRouter;
    



    constructor(props: SensenTViewProps){

        this.slug = props.slug;

        this.source = props.source;

        this.controller = props.controller || (()=>{});

        this.mounted = props.mounted || (()=>{});

        this.unmounted = props.unmounted || (()=>{});
        
    }





    cleanRoot(){

        if(this.root){
            
            this.root.innerHTML = ''

        }

        return this;
        
    }
    




    render(input: HTMLElement, router: SensenRouter){


        window.View = this;

        
        const dependencies = router.config.viewControllersDependencies;
        
        //root : HTMLElement, dependencies?: SensenTViewControllersDependencies
        
        

        /**
         * Get All Dependencies
         */
        
        const _dependencies: SensenTViewControllersDependencies = {}

        if(typeof dependencies == 'object'){

            const _dependenciesArgs: SensenTViewDependencyProps = {
            
                view: this,

                router,
                
                input,
    
            }

            const _dependenciesArray : Array<{ 0: string, 1: SensenTViewControllersDependenciesType }> = Object.entries(dependencies || {})
    


            if(_dependenciesArray.length){
    
                _dependenciesArray.forEach(dep=>{

                    if('trigger' in dep[1] && typeof dep[1]['trigger'] == 'function'){
                        
                        _dependencies[ dep[0] ] = dep[1].trigger(_dependenciesArgs)

                    }

                    else{

                        // _dependencies[ dep[0] ] = (()=>{})

                    }
                    
                    // _dependencies[ dep[0] ] = 'trigger' in dep[1] ? dep[1].trigger(_dependenciesArgs) : (()=>{})
                    
                })
                
            }
    
        }

        _dependencies.router = router;

        _dependencies.view = this;

        _dependencies.props = window.$SensenRLP.retrives();

        _dependencies.template = (fragment: string)=>{

            const sampled = _dependencies.props[`@Theme.${ fragment }`] || '';

            const dom = (new DOMParser()).parseFromString(sampled, 'text/html')
                
            const out : SensenTViewTheme = {

                raw: sampled,

                element: dom.body as HTMLElement
                
            }

            return out

        }


        /**
         * Sharing
         */
        this.dependencies = _dependencies
        


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
    
        Compilator(this.input)
        
        

        /**
         * Init Controller with dependencies
         */

        if('controller' in this){

            this.controller(_dependencies);
            
        }




        /**
         * Parsing
         */
        this.setContent( this.input )




        // console.log('Render View ', window.$SensenRLP.retrives(),  _dependencies)

        
        return this;
        
    }
    




    setContent(element: HTMLElement){

        // console.log('Parse :', element, this.root )

        if(this.root){

            this.cleanRoot().root.appendChild(element)
            
        }
             
        return this;       
        
    }
    








    setVariable(name: string, value: any, persist: boolean = false) : this{

        const defaultDictionary = window.$SensenRLP.retrives() || {}

        const dictionary: { [K: string] : any } = {}; 
        
        
        Object.entries( defaultDictionary ).map(dic=>{
            
            dictionary[ dic[0] ] = dic[1];
            
        })
        
        

        dictionary[name] = value;


        if(window.$SensenNodeRefVariables[ name ]){
            
            const check = window.$SensenNodeRefVariables[ name ];

            const target = this.input.querySelector(`[sensen-ref="${ check.ref }"]`)


            if(target){


                if(check.content){

                    /** Element Content */
                    target.innerHTML = CompilateVariables(check.content, dictionary)
                    
                }

                if(check.attribute){

                    /** Element Content */
                    target.setAttribute(

                        check.attribute.name,

                        check.attribute.value.replace(
                
                            check.records[1].match[0], 
                            
                            (value || check.records[1].syntax[1]).trim() 
                            
                        )
                        
                    )
                    
                }

                /** * Update */
                CompilatorNodeVariables(target as HTMLElement, dictionary)

            }
            

        }



        if(persist){

            window.$SensenRLP.push(name, value)
            
        }
        
        
        
        return this;
    
    }

    
    
    
}