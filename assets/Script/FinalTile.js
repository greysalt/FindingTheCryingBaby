cc.Class({
    extends: cc.Component,
    properties: {
    	click_audio2: cc.AudioClip
    },
    onLoad () {
        var audio = this.click_audio2
        this.node.on(cc.Node.EventType.TOUCH_START,function(event){
            cc.audioEngine.playEffect(audio);
            cc.director.loadScene('EndScene')
        })  
    },

});
