
interface VNodeNames{
    "select":VMDOM.VSelectElement
}

namespace VMDOM{
    @mergeClass({autofocus:'',disabled:'',multiple:'',name:'',required:'',size:''})
    export class  VSelectElement extends VHTMLElement{
        nodeName:"SELECT"="SELECT";
        autofocus:string
        disabled:string
        multiple:string
        name:string
        required:string
        size:string
        
        /**转换为真实dom节点后对虚拟dom的操作转接到真实dom */
        protected emulation():void{
            this.setBridgeGetSet("value");
        }
    }
    
}