
interface VNodeNames{
    "frame":VMDOM.VFrameElement
}
namespace VMDOM{
    @mergeClass({name:'',scrolling:'',frameBorder:'',marginHeight:'',marginWidth:'',title:'',lang:'',accessKey:'',webkitdropzone:'',id:''})
    export class VFrameElement extends VHTMLElement{
        nodeName:"FRAME"="FRAME"
        name:string
        scrolling:string
        frameBorder:string
        marginHeight:string
        marginWidth:string
        title:string
        lang:string
        accessKey:string
        webkitdropzone:string
        id:string
        constructor(){
            super();
            this.vmData.closeSelf=true;
        }
        
    }
    
}