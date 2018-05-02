cc.Class({
    extends: cc.Component,

    properties: {
    },
    onLoad () {
        var action = cc.repeatForever(cc.rotateBy(12, 360))
        this.node.runAction(action)
    }

});
