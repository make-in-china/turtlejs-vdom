
interface IVNodeMethod{
    (nodeName: "colgroup", nodeType?: 1): VMDOM.VColgroupElement&IVNodeMethod
}
namespace VMDOM{
    @mergeClass({span:'',align:'',vAlign:'',width:''})
    export class  VColgroupElement extends VHtmlElement{
        nodeName:"COLGROUP"="COLGROUP";
        span:string
        align:string
        vAlign:string
        width:string
        
    }
    
}