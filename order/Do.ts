
/// <reference path='RepeatBlockOrder.ts'/>
namespace Order {
    interface IOrderDataDo extends IOrderDataBlock{
        isFirst:boolean
    }
    @register
    export class Do extends RepeatBlockOrder {
        static orderName = "do"
        data:IOrderDataDo
        constructor(node: VComment, condition: string) {
            super(node, condition,'do');
            this.data.isFirst=true;
        }
        static run(data:IOrderDataDo){
            super.run(data,canRepeat);
        }
    }
    function canRepeat(this:void,data:IOrderDataDo):boolean{
        if(data.isFirst){
            data.isFirst=false;
            return true
        }else{
            return parseBool(exec(data.placeholder, data.condition));
        }
    }
}
