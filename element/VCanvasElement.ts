
interface IVNodeMethod{
    (nodeName: "canvas", nodeType?: 1): VMDOM.VCanvasElement&IVNodeMethod
}
namespace VMDOM{
    @mergeClass({width:'',height:''})
    export class  VCanvasElement extends VHtmlElement{
        nodeName:"CANVAS"="CANVAS";
        width:string
        height:string
        
    }
    
}