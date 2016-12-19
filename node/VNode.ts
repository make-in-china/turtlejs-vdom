
/// <reference path='.d.ts'/>
/// <reference path='VNamedNodeMap.ts'/>
/// <reference path='VStyle.ts'/>
/// <reference path='../../lib/HashObject.ts'/>
/// <reference path='../../lib/ClassList.ts'/>
/// <reference path='../../lib/Lib.ts'/>
/// <reference path='../../lib/TypeHelper.ts'/>
/// <reference path='VNodeList.ts'/>
/// <reference path='VHTMLCollection.ts'/>
/// <reference path='VNodeVMData.ts'/>
interface Node {
    __vdomNode__: VMDOM.VNode&IVNodeMethod
}

const enum ENodeType{
    Element=1,
    Text=3,
    Comment=8,
    Document=9,
    DocumentType=10,
    DocumentFragment=11,
    PlaceHolder=100
}

interface IVNodeMethod{
    // (): VNode&IVNodeMethod;
    (nodeName: string, nodeType: ENodeType): VMDOM.VNode&IVNodeMethod;
}

namespace VMDOM{
    export let emptyTextNodeRE = /^\s*$/;
    export let stringNode = {
        SCRIPT: /^\/script[>\s]/i,
        TEMPLATE: /^\/template[>\s]/i,
        STYLE: /^\/style[>\s]/i,
        TITLE: /^\/title[>\s]/i,
        TEXTAREA: /^\/textarea[>\s]/i,
        XMP: /^\/xmp[>\s]/i
    };
    export abstract class VNode implements INode{
        vmData:VNodeVMData=new VNodeVMData();
        abstract nodeType: ENodeType;
        abstract nodeName: string;
        abstract toJS(space?:number):string;
        abstract toCreateJS(space?:number):string;
        readonly childNodes: VNodeList=new VNodeList;
        parentNode: VNode&IVNodeMethod | null;
        
        /**
         * 用自身做环境调用函数,并返回父
         */
        __(fn:(node:VNode)=>void): VElement&IVNodeMethod{
            fn.call(this)
            return <VElement&IVNodeMethod>this.parentNode;
        }
        
        /**
         * 用自身做环境调用函数,并返回自身
         */
        ___(this:VNode&IVNodeMethod,fn:(node:VNode)=>void): VNode&IVNodeMethod{
            fn.call(this)
            return this;
        }
        /**
         * 添加子节点，并返回子节点
         */
        $$(this: VNode&IVNodeMethod, vNode: VNode&IVNodeMethod): VNode&IVNodeMethod{
            this.appendChild(vNode);
            return vNode;
        }
        /**
         * 添加子节点，并返回自身
         */
        $$$(this: VNode&IVNodeMethod, vNode: VNode&IVNodeMethod): VNode&IVNodeMethod{
            this.appendChild(vNode);
            return this;
        }
        /**
         * 返回父节点，如果无，返回自己
         */
        get $(): VElement&IVNodeMethod{
            let p=this.parentNode;
            this.vmData.isClose=true;
            if(p){
                return <VElement&IVNodeMethod>p;
            }else{
                throw new Error("parentNode is Null");
            }
        }
        addEventListener(type: string, listener?: EventListenerOrEventListenerObject, useCapture?: boolean): void
        {

        }
        dispatchEvent(evt: Event): boolean
        {   
            return false;
        }
        removeEventListener(type: string, listener?: EventListenerOrEventListenerObject, useCapture?: boolean): void
        {
            
        }
        addText(this: VNode&IVNodeMethod, ...args:string[]): VNode&IVNodeMethod {
            let s = args.join('\r\n');
            let t = this(s, 3);
            this.appendChild(t);
            return this;
        }
        addText2(this: VNode&IVNodeMethod,fn: Function): VNode&IVNodeMethod{
            // let t = newVNode($t.getFunctionComment(fn), 3, this.nodeName === 'PRE');
            let t = this(getFunctionComment(fn), 3);
            this.appendChild(t);
            return this;
        }

        /**
         * 添加子节点，并返回子节点
         */
        append(this: VNode, name: string, nodeType: ENodeType): VNode&IVNodeMethod {
            return this.doAppendChild($$$(name, nodeType));
        }

        /**
         * 添加子节点，并返回子节点
         */
        appendChild(this: VNode, vNode: VNode&IVNodeMethod): VNode&IVNodeMethod {
            let idx =Array.prototype.indexOf.call(this.childNodes,vNode);
            if (idx === -1) {
                return this.doAppendChild( vNode);
            } else {
                return vNode;
            }
        }

        /**
         * 添加子节点，并返回子节点
         */
        protected doAppendChild(this: VNode, vNode: VNode&IVNodeMethod) {

            Array.prototype.push.call(this.childNodes,vNode);
            let p = vNode.parentNode;
            if (p) {
                p.removeChild(vNode);
            }
            vNode.parentNode = <VNode&IVNodeMethod>this;
            return vNode;
        }
        insertBefore(this:  VNode&IVNodeMethod, newNode:  VNode&IVNodeMethod, refChild:  VNode&IVNodeMethod):  VNode&IVNodeMethod {
            //添加到childNodes里
            let chds = this.childNodes;
            let idx:number = indexOf.call(chds,refChild);
            if (idx === -1) {
                return newNode;
            }
            let p2 = newNode.parentNode;
            if (p2) {
                p2.removeChild(newNode);
            }
            splice.call(chds,idx, 0, newNode);
            newNode.parentNode = this;
            return newNode;
        }
        insertBefore2(this:  VNode&IVNodeMethod, newNode:  VNode&IVNodeMethod, node:  VNode&IVNodeMethod):  VNode&IVNodeMethod{
            return this.insertBefore(newNode,node);
        }
        remove(){
            let p=this.parentNode;
            if(p){
                p.removeChild(<any>this);
            }
        }
        removeChild(this:  VNode&IVNodeMethod, vNode: VNode&IVNodeMethod): VNode&IVNodeMethod {
            if (!vNode || this.childNodes.length === 0) {
                return vNode;
            }
            removeItem(this.childNodes, vNode);
            vNode.parentNode = null;
            return vNode;
        }
        getData(this: VNode): string {
            return this.vmData.data;
        }
        abstract cloneNode(deep:boolean): VNode&IVNodeMethod 
        
        abstract toHTMLString():string[];
        // createElement(name: string): IVElement;
        // createTextNode(value: string): IVText;
        // createComment(value: string): IVComment;
        // addEventListener(name: string, fn?: EventListenerOrEventListenerObject, useCapture?: boolean): void;
        // removeEventListener(name: string, fn?: EventListenerOrEventListenerObject, useCapture?: boolean): void;
        toJSString(space:number=0):string{
            return "$$$"+this.toJS(space).replace(/^\s*/,'');
        }
        beDOM():Node{
            if (this.vmData.domNode) {
                return this.vmData.domNode;
            }
            let elem=this.doBeDOM();
            this.copyPropertyToNode(elem);
            this.vmData.domNode = elem;
            this.connectParent(elem);
            this.emulation();
            elem.__vdomNode__ = <any>this;
            return elem;
        }
        protected doBeDOM(): Node{
            let toHelp = document.createElement('__Turtle__');//用于创建
            toHelp.innerHTML = this.vmData.data;
            let elem = toHelp.removeChild(toHelp.childNodes[0]);
            return elem;
        }
        private copyPropertyToNode(elem:Node){
            debugger;
            for (let i in this) {
                switch (i) {
                    case '__':
                    case '__events__':
                    case '__isClose__':
                    case 'vmData.domNode':
                    // case "__closeSelf__":
                    case '__proto__':
                    case 'children':
                    case 'childNodes':
                    case 'nodeType':
                    case 'nodeName':
                    case 'parentNode':
                    case "style":
                    case "classList":
                    case "className":
                    case 'attributes':
                        break;
                    default:
                        if (!this.hasOwnProperty(i)) {
                            continue;
                        }
                        let desc = Object.getOwnPropertyDescriptor(this, i);
                        if (desc) {
                            if (!(i in elem)) {
                                Object.defineProperty(elem, i, desc);
                            } else {
                                elem[i] = this[i];
                            }
                        } else {
                            elem[i] = this[i];
                        }
                }
            }
        }
        /**与真实DOM交互 */
        protected connectParent<T extends IVNodeMethod>(this: VNode, elem: Node) {
            let p:VNode|null = this.parentNode;
            if (p && p.vmData.domNode) {
                let pE = p.vmData.domNode;
                if (pE.childNodes.length === 0) {
                    pE.appendChild(elem);
                } else {
                    let node: VNode | null = this;
                    while (true) {
                        /*
                            * 向前找
                            */
                        node = node.previousSibling;
                        if (node) {
                            let elem2 = node.vmData.domNode;
                            if (elem2) {
                                if (elem2.parentNode) {
                                    pE.insertBefore2(elem, elem2);
                                    pE.insertBefore2(elem2, elem);
                                    break;
                                }
                            }
                        } else {
                            node = this;
                            while (true) {
                                /*
                                    * 向后找
                                    */
                                node = node.nextSibling;
                                if (node) {
                                    let elem2 = node.vmData.domNode;
                                    if (elem2) {
                                        if (elem2.parentNode) {
                                            pE.insertBefore2(elem, elem2);
                                            break;
                                            // } else {
                                            // console.log(elem2.innerHTML);
                                            // debugger;
                                            /*这里怎么处理好呢*/
                                        }
                                    }
                                } else {
                                    pE.appendChild(elem);
                                    break;
                                }

                            }
                            break;
                        }
                    }
                }
            }
        }
        protected createHomologyFunction(name:string) {
            return function (this:VNode&IVNodeMethod) {
                let objects:Node[] = [], 
                    toDOMs:INode[] = [];
                for (let i = 0; i < arguments.length; i++) {
                    //获取对象
                    let o:INode = <INode>arguments[i].valueOf();
                    //如果valueOf的值不是自己
                    if (o === arguments[i]&&o instanceof VNode) {
                        toDOMs.push(o);
                        //转换为真实Node
                        objects.push(o.beDOM());
                    }else{
                        objects.push(<any>o);
                    }

                }
                //仍然调用虚拟dom的函数
                this.__proto__[name].apply(this, arguments);
                //调用真实dom的函数
                let ret = (<Node>this.vmData.domNode)[name].apply(this.vmData.domNode, objects);
                //返回值父子关系修正
                for (let i = 0; i < toDOMs.length; i++) {
                    let chds = toDOMs[i].childNodes;
                    for (let j = 0; j < chds.length; j++) {
                        let node:VNode=<VNode>chds[j];
                        let chds2 = node.childNodes;
                        if (chds2.length !== (<Node>this.vmData.domNode).childNodes.length) {
                            for (let k = 0; k < chds2.length; k++) {
                                if ((<Node>(<VNode>chds2[k]).vmData.domNode).parentNode === null) {
                                    (<any>this).connectParent(chds2[k], (<VNode>chds2[k]).vmData.domNode);
                                }
                            }
                        }
                    }
                }
                return ret;
            }
        }
        protected createBridgeFunction(name:string){
            return function (this:VNode) {
                return (<Node>this.vmData.domNode)[name].apply(this.vmData.domNode, arguments);
            }
        }
        protected setBridgeGet(name:string){
            Object.defineProperty(this, name, {
                get: function (this:VNode) {
                    return (<Node>this.vmData.domNode)[name];
                }
            });
        }
        protected setBridgeGetSet(name:string){
            Object.defineProperty(this, name, {
                get: function (this:VNode) {
                    return (<Node>this.vmData.domNode)[name];
                },
                set: function (this:VNode,v) {
                    (<Node>this.vmData.domNode)[name]=v;
                }
            });
        }
        /**转换为真实dom节点后对虚拟dom的操作转接到真实dom */
        protected abstract emulation():void;
        get previousSibling():VNode&IVNodeMethod|null{
            let p = this.parentNode;
            if (!p) {
                return null;
            }
            let chds = p.childNodes;
            let idx:number =Array.prototype.indexOf.call(chds,this);
            let node = chds[idx - 1];
            return node ? node : null;
        }
        get nextSibling():VNode&IVNodeMethod|null{
            let p = this.parentNode;
            if (!p) {
                return null;
            }
            let chds = p.childNodes;
            let idx:number = Array.prototype.indexOf.call(chds,this);
            let node = chds[idx + 1];
            return node ? node : null;
        }
    }

    let functionCommentRE = /\/\*([\s\S]*?)\*\//g
    export function getFunctionComment(fn: Function) {
        let s: RegExpExecArray = <RegExpExecArray>functionCommentRE.exec(fn.toString());
        return s[1];
    }
}
interface IBindClassToFunction{
    [index:number]:(node:IVNodeMethod & VMDOM.VNode,nodeName: any)=>void
}
let bindClassToFunctionHelper:IBindClassToFunction=<any>{
    [ENodeType.DocumentType](node:IVNodeMethod & VMDOM.VNode,nodeName: string){
        node.__proto__=VMDOM.VDocumentType.prototype;
        VMDOM.VDocumentType.call(node);
    },
    [ENodeType.Comment](node:IVNodeMethod & VMDOM.VNode,nodeName: string){
        node.__proto__=VMDOM.VComment.prototype;
        VMDOM.VComment.call(node,nodeName);
    },
    [ENodeType.Text](node:IVNodeMethod & VMDOM.VNode,nodeName: string){
        node.__proto__=VMDOM.VText.prototype;
        VMDOM.VText.call(node,nodeName);
    },
    [ENodeType.Document](node:IVNodeMethod & VMDOM.VNode,nodeName: string){
        node.__proto__=VMDOM.VDocument.prototype;
        VMDOM.VDocument.call(node);
    }
}
function bindClassToFunction(node:IVNodeMethod & VMDOM.VNode,nodeName: string, nodeType?: ENodeType|undefined){
    if(nodeType!==undefined){
        let fn=bindClassToFunctionHelper[nodeType];
        if(fn){
            fn(node,nodeName);
            return '';
        }
    }
    if(nodeType===undefined||nodeType===ENodeType.Element){
        if(nodeName[0]==='#'){
            switch(nodeName){
                case "#text":
                    node.__proto__=VMDOM.VText.prototype;
                    (<any>VMDOM.VText).call(node,nodeName);
                    break;
                case "#comment":
                    node.__proto__=VMDOM.VComment.prototype;
                    (<any>VMDOM.VComment).call(node,nodeName);
                    break;
                case "#document":
                    node.__proto__=VMDOM.VDocument.prototype;
                    (<any>VMDOM.VDocument).call(node);
                    break;
                case "#document-fragment":
                    //未实现
                    break;
            }
        }else{
            nodeName=nodeName.toLowerCase();
            let name="V"+nodeName[0].toUpperCase()+nodeName.substr(1).toLowerCase()+"Element";
            if(VMDOM.hasOwnProperty(name)){
                node.__proto__=VMDOM[name].prototype;
                VMDOM[name].call(node);
            }else{
                throw new Error(`unknown nodeName:${nodeName}`);
            }
        }
        
    }else{
        throw new Error(`unknown nodeType:${nodeType}`);
    }
}
function getVNodeMethod():VMDOM.VNode&IVNodeMethod{
    let VNode=<any>function(nodeName: string, nodeType?: ENodeType|undefined):IVNodeMethod & VMDOM.VNode{
        let fn=getVNodeMethod()
        bindClassToFunction(fn,nodeName,nodeType);
        VNode.appendChild(fn);
        return fn;
    }
    delete VNode.name;
    delete VNode.arguments;
    return VNode;
}
let VNodeHelp:IVNodeMethod=<any>function(nodeName: string, nodeType?: ENodeType|undefined):VMDOM.VNode&IVNodeMethod{
    let that=getVNodeMethod()
    bindClassToFunction(that,nodeName,nodeType);
    return that;
};
