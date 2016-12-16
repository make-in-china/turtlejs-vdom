/// <reference path="../node/Attribute_Property.ts"/>
interface IVNodeMethod{
    (nodeName: "caption", nodeType?: 1): VMDOM.VCaptionElement&IVNodeMethod
}
namespace VMDOM{
    @mergeClass({align:''})
    export class  VCaptionElement extends VHtmlElement{
        nodeName="CAPTION";
        align:string
        
    }
    
}