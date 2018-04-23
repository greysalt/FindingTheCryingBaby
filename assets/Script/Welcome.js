// Learn cc.Class:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {
        baby: {
        	default: null,
        	type: cc.Node
        }
    },

    onLoad () {   	
    	var action = cc.repeatForever(
    					cc.sequence(
    						cc.moveBy(0.8, cc.p(0, -10)).easing(cc.easeInOut(2)),
    						cc.moveBy(0.8, cc.p(0, 10)).easing(cc.easeInOut(2))
    					)
    				)

    	this.baby.runAction(action)
    }
});
