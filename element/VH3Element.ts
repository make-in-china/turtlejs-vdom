/// <reference path="../node/Attribute_Property.ts"/>
interface IVNodeMethod{
    (nodeName: "h3", nodeType?: 1): VMElement.VH3Element&IVNodeMethod
}
namespace VMElement{
    @VAP.setA_P(["align"])
    export class  VH3Element extends VHtmlElement{
        nodeName="H3";
        align:string
        
    }
    
}