/// <reference path="Attribute_Property.ts"/>
interface IVNodeMethod{
    (name: "map", nodeType: 1): VMapElement&IVNodeMethod;
}
class  VMapElement extends VElement{
    name:string
}
VAP.decorate(<any>VMapElement,["name"]);