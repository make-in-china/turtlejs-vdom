
class JavaScriptStatement{
    type:string
    parent:JavaScriptStatement|null=null
    children:JavaScriptStatement[]=[]
    isBlock:boolean=false
    constructor(type:string){
        this.type=type
    }
    push(child:JavaScriptStatement){
        this.children.push(child);
        child.parent=this;
    }
    parentPush(next:JavaScriptStatement){
        if(this.parent)this.parent.push(next);
    }
    childrenToString():string{
        let ret="";
        for(const statement of this.children){
           ret+=statement.type+statement.childrenToString();
        }
        return ret;
    }
    // setParentClose(){
    //     if(this.parent)this.parent.isClose=true;
    // }
}