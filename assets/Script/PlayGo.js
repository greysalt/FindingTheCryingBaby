cc.Class({
    extends: cc.Component,
    properties: {
    	click_audio:cc.AudioClip
    },
    toScene: function () {
    		cc.audioEngine.playEffect(this.click_audio)
        cc.director.loadScene('MainScene')
    }
});
