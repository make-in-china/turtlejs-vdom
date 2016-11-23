/// <reference path="../Attribute_Property.ts"/>
interface IVNodeMethod{
    (nodeName: "tr", nodeType?: 1): VMElement.VTrElement&IVNodeMethod
}

namespace VMElement{
    export class  VTrElement extends VHtmlElement{
        nodeName="TR";
        align:string
        vAlign:string
        bgColor:string
        cloneNode(deep:boolean=false):VTrElement&IVNodeMethod{
            let newNode=super.cloneNode(deep);
            for(const name of ["align","vAlign","bgColor"]){
                if(this[name]!==""               $1
                }){
                    newNode[name]=this[name];
                }
            }
                return <VTrElement&IVNodeMethod>newNode;
        }
    }
    VAP.decorate(<any>VTrElement,["align","vAlign","bgColor"]);
}