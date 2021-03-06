
interface VNodeNames{
    "title":VMDOM.VTitleElement
}
namespace VMDOM{
    @mergeClass({title:'',lang:'',accessKey:'',webkitdropzone:'',id:''})
    export class VTitleElement extends VHTMLElement{
        nodeName:"TITLE"="TITLE"
        title:string
        lang:string
        accessKey:string
        webkitdropzone:string
        id:string
    }
    
}