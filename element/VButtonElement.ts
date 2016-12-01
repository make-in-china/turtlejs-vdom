/// <reference path="../node/Attribute_Property.ts"/>
interface IVNodeMethod{
    (nodeName: "button", nodeType?: 1): VMElement.VButtonElement&IVNodeMethod
}
namespace VMElement{
    export class VButtonElement extends VHtmlElement{
        nodeName="BUTTON"
        formTarget:string
        name:string
        value:string
        title:string
        lang:string
        accessKey:string
        webkitdropzone:string
        id:string
        cloneNode(deep:boolean=false):VButtonElement&IVNodeMethod{
            let newNode=super.cloneNode(deep);
            for(const name of ["formTarget","name","value","title","lang","accessKey","webkitdropzone","id"]){
                if(this[name]!==""){
                    newNode[name]=this[name];
                }
            }
                return <VButtonElement&IVNodeMethod>newNode;
        }
    }
    VAP.decorate(VButtonElement,["formTarget","name","value","title","lang","accessKey","webkitdropzone","id"]);
}