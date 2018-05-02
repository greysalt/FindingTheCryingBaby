var Global = require('Global')

cc.Class({
    extends: cc.Component,

    properties: {
        tilePre : {
            default: null,
            type: cc.Prefab
        },
        tileBoxFinal : {
            default: null,
            type: cc.Prefab
        },
        popUpPre: {
            default: null,
            type: cc.Prefab
        },
        tileBg : {
            default: null,
            type: cc.Node
        },
        scoreDisplay: {
            default: null,
            type: cc.Label
        },
        levelDisplay: {
            default: null,
            type: cc.Label
        },
        bgMusic:cc.AudioClip,
        level: 4,
        poped: false,
        interval: null
    },

    onDestroy: function () {
        //停止背景音乐
        cc.audioEngine.stopMusic(this.bgMusic,true);
    },

    onLoad: function () {
        //播放背景音乐
        cc.audioEngine.playMusic(this.bgMusic,true);

        //生成初始方块
        this.setTiles(3, 3, 450/3)
        this.setRandom(3, 3, 450/3, 'cry1')
        this.scoreDisplay.string = '得分：0'
        this.startTimer()
    },

    setTiles: function (row, col, width) {
        var tileBox = new cc.Node('tileBox' + this.level)
        tileBox.parent = this.node
        for (var i=0; i<row; i++) {
            for (var j=0; j<col; j++){
                var tile = cc.instantiate(this.tilePre)
                tile.parent = tileBox
                // this.tileBg.addChild(tile) // 等价
                //tile.getComponent('Tile').numLabel.string = i + '-' + j
                var tileComp = tile.getComponent('Tile')
                //根据level执行不同tile生成规则
                switch (this.level) {
                    case 1:
                        tileComp.type = 1
                        break
                    case 2:
                        tileComp.type = 1
                        break
                    case 3:
                        tileComp.type = 1 + Math.round(Math.random())
                        break
                    case 4:
                        tileComp.type = 1 + Math.round(Math.random()*7)
                        break
                    case 5:
                        tileComp.type = 1 + Math.round(Math.random()*7)
                        break
                    case 6:
                        tileComp.type = 1 + Math.round(Math.random()*7)
                        break
                }
                tileComp.newTile(width)
                tile.setPosition( ((1-row) / 2 + j) * width, ((1-col) / 2 + i) * width )
                // 将game组件的实例传入tile组件
                tile.getComponent('Tile').game = this
            }   
        }    
    },

    // 设置特殊tile
    setRandom: function (row, col, width, type) {
        var num = Math.floor(Math.random() * row * col)
        var tileBox = this.node.getChildByName('tileBox' + this.level)
        var tilePick = tileBox.children[num].getComponent('Tile')
        tilePick.type = type 
        tilePick.newTile(width)
    },

    // tile位置随机变换
    shuffleTile: function (self) {
	    	const num = 30
	    	var arr = self.creatRandom(num, 1, 49)
	    	
	    	var tileBox = self.node.getChildByName('tileBox' + self.level)
	    	var tile1 = tileBox.children[arr[0]]
	    	var x1 = tile1.x
	    	var y1 = tile1.y
	    	for (let i=0; i<num-1; i++) {
	    			var tile = tileBox.children[arr[i]]
	    			var tileNext = tileBox.children[arr[i+1]]
	    			tile.runAction(cc.moveTo(1, tileNext.x, tileNext.y).easing(cc.easeInOut(3)))  		
	    	}
	    	var tileLast = tileBox.children[arr[num-1]]
	    	tileLast.runAction(cc.moveTo(1, x1, y1).easing(cc.easeInOut(3)))
    },
    
    //生成范围内不重复的随机数数组
    creatRandom: function(num, min, max) {
        let arr = [], res = [], newArr;
        for (let i=min; i<max; i++) {
            arr.push(i)
        }
        for (let j=0; j<(max-min); j++) {
            var el = arr.splice(Math.floor(Math.random() * arr.length), 1)
            res.push(el[0])
        }
        res.length = num
        return res
    },

    // 更新tile
    newLevel: function () {
        this.node.getChildByName('tileBox' + (this.level-1)).destroy()

        this.levelDisplay.string = '关卡 ' + this.level

        if (this.level <= 5) {   
            var level = this.level
            this.setTiles(level+2, level+2, 450/(level+2))
            
            if (this.level >= 3) {
                this.setRandom(level+2, level+2, 450/(level+2), 'jia')
            }
            
            if(this.level >= 4) {
                this.setRandom(level+2, level+2, 450/(level+2), 'cry2')
            } else {
               this.setRandom(level+2, level+2, 450/(level+2), 'cry1')  
            }
        } else if (this.level === 6) {
        	this.setTiles(7, 7, 450/7)
        	this.setRandom(7, 7, 450/7, 'cry2')
        	this.interval = setInterval(this.shuffleTile, 1500, this)             	 
        
        } else if (this.level > 6) {
        	var tileBox = cc.instantiate(this.tileBoxFinal)
            tileBox.parent = this.node
        }
    },

    //开始计时
    startTimer: function () {
        Global.time = new Date().getTime()
    },

    //弹出信息框
    popup: function (msg) {
        
    	if (msg === 'Good Job !') {
    		clearInterval(this.interval)
    	}
        this.poped = true
        var pop = cc.instantiate(this.popUpPre)
        pop.opacity = 0
        pop.parent = this.node
        pop.getComponent('PopUp').msg.string = msg || 'nothing happened'

        // 动效完成后的回调
        var finished = cc.callFunc(function () {
            pop.destroy()
            this.poped = false
            if (msg === 'Good Job !') {
                this.newLevel()
            }
        },this) 

        var action = cc.sequence(
                cc.spawn(
                        cc.fadeIn(0.3).easing(cc.easeOut(2)), 
                        cc.moveBy(0.3,cc.p(0,30)).easing(cc.easeOut(2))
                ),
                cc.delayTime(1),
                cc.spawn(
                        cc.fadeOut(0.3).easing(cc.easeIn(2)), 
                        cc.moveBy(0.3,cc.p(0,30)).easing(cc.easeIn(2))
                ),
                finished
            )

        pop.runAction(action)

    }

});
