
interface Node {
    insertBefore2<T extends INode|Node>(newNode: T, node?: T): T;
}
// interface IVNode extends INode {
//     /**private */__data:string;
//     /**private */__: Object;
//     __closeSelf__?: boolean;
//     __events__: [string, EventListenerOrEventListenerObject | undefined, boolean][];
//     __isClose__: boolean;
//     __domNode__: Node;
//     nodeType: number;
//     nodeName: string;
//     childNodes: VNodeList;
//     children: VHTMLCollection;
//     // parentNode: IVNode | null;
//     style: VStyle;
//     createElement(name: string): IVElement;
//     createTextNode(value: string): IVText;
//     createComment(value: string): IVComment;
//     append(name: string, nodeType: number): IVNode;
//     appendChild(vNode: IVNode): IVNode;
//     removeChild(vNode: IVNode): IVNode;
//     _(name: string, value?): IVNode | null;
//     setAttribute(name: string, value): IVNode;
//     hasAttribute(name: string): boolean;
//     removeAttribute(name: string): void;
//     removeAttributeNode(item: Object): void;
//     getAttribute(name: string): string|null;
//     insertBefore(newNode: IVNode, node: IVNode): IVNode;
//     insertBefore2(newNode: IVNode, node: IVNode): IVNode;
//     addEventListener(name: string, fn?: EventListenerOrEventListenerObject, useCapture?: boolean): void;
//     removeEventListener(name: string, fn?: EventListenerOrEventListenerObject, useCapture?: boolean): void;
//     cloneNode(): IVNode;
//     text(...agrs): IVNode;
//     text2(fn: Function): IVNode;
//     toHTMLString(): string[];
//     toJS(): string;
//     toDOM(): Node;
//     previousSibling:IVNode|null
//     nextSibling:IVNode|null
// }