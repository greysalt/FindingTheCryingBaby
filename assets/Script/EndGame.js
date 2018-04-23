var Global = require('Global')

cc.Class({
    extends: cc.Component,

    properties: {
    	scoreDisplay: {
    		default: null,
    		type: cc.Label
    	},
    	timeDisplay: {
    		default: null,
    		type: cc.Label
    	}
    },

    onLoad () {
    	this.stopTimer()
        this.scoreDisplay.string = Global.score + 100
    },
    //结束计时
    stopTimer: function () {
        if (Global.time > 0) {
            var endTime = new Date().getTime()
            var usedTime = endTime - Global.time
            
            var minutes = Math.floor(usedTime / (1000*60))
            var level1 = usedTime % (1000*60)
            var seconds = Math.floor(level1 / 1000)
            var ms = level1 % 1000

            Global.time = minutes + "'" + seconds + '"' + ms
            this.timeDisplay.string = Global.time 
        } else {
            this.timeDisplay.string = 0 
        }
        

    }

});
