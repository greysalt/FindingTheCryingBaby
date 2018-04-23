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
        level: 1,
        poped: false
    },

    onLoad: function () {
        //生成初始方块
        this.setTiles(3, 3, 450/3)
        this.setRandom(3, 3, 450/3, 'cry')
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
            this.setRandom(level+2, level+2, 450/(level+2), 'cry')  
        } else {
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
