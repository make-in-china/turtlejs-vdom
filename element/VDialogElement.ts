/// <reference path="../Attribute_Property.ts"/>
interface IVNodeMethod{
    (nodeName: "dialog", nodeType?: 1): VMElement.VDialogElement&IVNodeMethod;
}
namespace VMElement{
    export class  VDialogElement extends VHtmlElement{
        nodeName="DIALOG";
        open:string
    }
    VAP.decorate(<any>VDialogElement,["open"]);
}