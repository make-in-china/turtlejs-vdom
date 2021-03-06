
interface VNodeNames{
    "link":VMDOM.VLinkElement 
}

namespace VMDOM{
    @mergeClass({disabled:'',href:'',crossOrigin:'',rel:'',media:'',hreflang:'',type:'',charset:'',rev:'',target:'',integrity:''})
    export class  VLinkElement extends VHTMLElement{
        nodeName:"LINK"="LINK";
        disabled:string
        href:string
        crossOrigin:string
        rel:string
        media:string
        hreflang:string
        type:string
        charset:string
        rev:string
        target:string
        integrity:string
        
        constructor(){
            super();
            this.vmData.closeSelf=true;
        }
    }
    
}