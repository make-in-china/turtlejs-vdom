
interface IVNodeMethod{
    (nodeName: "h2", nodeType?: 1): VMDOM.VH2Element&IVNodeMethod
}
namespace VMDOM{
    @mergeClass({align:''})
    export class  VH2Element extends VHtmlElement{
        nodeName:"H2"="H2";
        align:string
        
    }
    
}