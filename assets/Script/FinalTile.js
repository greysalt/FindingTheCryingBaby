cc.Class({
    extends: cc.Component,
    properties: {
    },
    onLoad () {
        this.node.on(cc.Node.EventType.TOUCH_START,function(event){
            cc.director.loadScene('EndScene')
        })  
    },

});
