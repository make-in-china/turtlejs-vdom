
/// <reference path='RepeatBlockOrder.ts'/>
namespace Order {
    
    export interface IOrderDataWhile extends IOrderDataBlock{
        condition:string
    }
    @register
    export class While extends RepeatBlockOrder {
        static orderName = "while"
        data:IOrderDataWhile
        constructor(node: VComment, condition: string) {
            super(node, condition,'while');
            this.data.condition=condition;
        }
        run(){
            While.run(this.data);
        }
        static run(data:IOrderDataWhile){
            super.run(data,canRepeat);
        }
    }
    
    function canRepeat(this:void,data:IOrderDataWhile):boolean{
        return parseBool(exec(data.placeholder, data.condition));
    }
}
