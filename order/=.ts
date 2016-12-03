
/// <reference path='VOrder.ts'/>
namespace Order {
    /**运行并插入返回的节点 */
    export interface IOrderDataEqual extends IOrderData{
        condition:string
    }
    @register
    export class Equal extends VOrder {
        static orderName = "="
        data:IOrderDataEqual
        constructor(node:VComment,condition:string){
            super(node,condition);
            this.data.condition=condition;
        }
        run(){
            Equal.run(this.data);
        }
        static run(this:void,data:IOrderDataEqual){
            let v=exec(data.placeholder,data.condition);
            if(v instanceof VNode){
                replaceNodeByNode(data.placeholder,v);
                return;
            }
            replaceNodeByNode(data.placeholder,$$$(''+v,ENodeType.Text));
        }
    }
}
