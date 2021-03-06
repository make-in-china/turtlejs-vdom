
/// <reference path='VNode.ts'/>

interface IVNodeMethod{
    (nodeName: string, nodeType: ENodeType.DocumentType): VMDOM.VDocumentType&IVNodeMethod;
}
function isVDocType(node: VMDOM.VNode): node is VMDOM.VDocumentType {
    return node.nodeType === ENodeType.DocumentType
}
namespace VMDOM{
    @register('html',ENodeType.DocumentType)
    export class VDocumentType extends VMDOM.VNode{
        nodeType:ENodeType.DocumentType=ENodeType.DocumentType
        nodeName="html"
        get name():'html'{return 'html'};
        cloneNode():VDocumentType&IVNodeMethod{
            return $$$("",ENodeType.DocumentType);
        }
        toCreateJS():string{
            return `("",${ENodeType.DocumentType})`;
        }
        toJS():string{
            return this.toCreateJS()+'.$';
        }
        /**转换为真实dom节点后对虚拟dom的操作转接到真实dom */
        protected emulation():void{}
        toHTMLString():string[]{
            return ['<!DOCTYPE html>'];
        }
    }
}