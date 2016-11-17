
/// <reference path='VOrder.ts'/>
class While extends VOrder {
    name = "while"
    isLogic = true
    parse(info: ICommentOrderInfo, node: IComment,orderStack:VOrder[]):void {
        return this.addOrderToNode(info, node ,orderStack, () => {
            let d = new VWhileOrderData(this.name, node, info.condition, function () {
                let p: INode = <INode>node.parentNode;
                if (d.isBreak || !parseBool(VOrderHelper.exec(node, d.condition))) {
                    //全部删除
                    removeBlockBetween(node, <INode>d.endNode);
                    p.removeChild(node);
                    p.removeChild(<INode>d.endNode);
                } else {
                    let nodes = cloneBetween(node, <INode>d.endNode);
                    p.insertBefore2(createBreakElement(nodes, d), node);
                }
            });
            return d;
        });
    }
}

function createBreakElement(nodes,order:VOrder) {
    let breakElement: IHTMLBreakElement = $node('__break__');
    for (let i = 0; i < nodes.length; i++) {
        breakElement.appendChild(nodes[i]);
    }
    breakElement.source = order;
    return breakElement;
}