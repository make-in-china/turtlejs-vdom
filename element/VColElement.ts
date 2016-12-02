/// <reference path="../node/Attribute_Property.ts"/>
interface IVNodeMethod{
    (nodeName: "col", nodeType?: 1): VMElement.VColElement&IVNodeMethod
}
namespace VMElement{
    @VAP.setA_P(["span","align","vAlign","width"])
    export class  VColElement extends VHtmlElement{
        nodeName="COL";
        __closeSelf__=true;
        span:string
        align:string
        vAlign:string
        width:string
        
    }
    
}