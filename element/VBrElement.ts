/// <reference path="../node/Attribute_Property.ts"/>
interface IVNodeMethod{
    (nodeName: "br", nodeType?: 1): VMElement.VBrElement&IVNodeMethod
}
namespace VMElement{
    @VAP.setA_P(["clear"])
    export class  VBrElement extends VHtmlElement{
        nodeName="BR";
        __closeSelf__=true;
        clear:string;
        
    }
    
}