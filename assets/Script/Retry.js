var Global = require('Global')

cc.Class({
    extends: cc.Component,
    properties: {
    	click_audio:cc.AudioClip
    },
    toScene: function () {
    		cc.audioEngine.playEffect(this.click_audio)
        Global.score = 0
        cc.director.loadScene('WelcomeScene')
    }
});