/// <reference path="../node/Attribute_Property.ts"/>
interface IVNodeMethod{
    (nodeName: "fieldset", nodeType?: 1): VMElement.VFieldsetElement&IVNodeMethod
}
namespace VMElement{
    @mergeClass({disabled:'',name:''})
    export class  VFieldsetElement extends VHtmlElement{
        nodeName="FIELDSET"
        disabled:string
        name:string
        
    }
    
}