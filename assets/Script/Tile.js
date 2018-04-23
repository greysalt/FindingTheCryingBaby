var Global = require("Global")

cc.Class({
    extends: cc.Component,

    properties: {
        numLabel: {
            default: null,
            type: cc.Label
        },
        game: {
            default: null,
            serializable: false
        },
        bao_cry: {
            default: null,
            type: cc.SpriteFrame
        },
        bao_1: {
            default: null,
            type: cc.SpriteFrame
        },
        bao_2: {
            default: null,
            type: cc.SpriteFrame
        },
        bao_3: {
            default: null,
            type: cc.SpriteFrame
        },
        bao_4: {
            default: null,
            type: cc.SpriteFrame
        },
        bao_5: {
            default: null,
            type: cc.SpriteFrame
        },
        bao_6: {
            default: null,
            type: cc.SpriteFrame
        },
        bao_7: {
            default: null,
            type: cc.SpriteFrame
        },
        bao_8: {
            default: null,
            type: cc.SpriteFrame
        },
        jia: {
            default: null,
            type: cc.SpriteFrame
        },

        type: 1
    },
    onLoad () {
      var self = this      
      // 添加触摸事件
      this.node.on(cc.Node.EventType.TOUCH_START,function(event){
        if(self.game.poped === false) {
           if(self.type === 'cry') {
                Global.score += 100
                self.game.scoreDisplay.string = '得分：' + Global.score
                self.game.level += 1
                self.game.popup('Good Job !')
            } else if (self.type === 'jia') {
                self.game.popup('发现了 嫌弃佳\n然而并没什么*用')
            } else {
                Global.score -= 100
                self.game.scoreDisplay.string = '得分：' + Global.score
                self.game.popup('好像不对哦~')
            } 
        } else {
            cc.log('nothing')
        }
      })
    },
    newTile : function (width) {
      switch (this.type) {
        case 'cry':
            this.node.getComponent(cc.Sprite).spriteFrame = this.bao_cry
            break;
        case 'jia':
            this.node.getComponent(cc.Sprite).spriteFrame = this.jia
            break;
        case 1:
            this.node.getComponent(cc.Sprite).spriteFrame = this.bao_1
            break;
        case 2:
            this.node.getComponent(cc.Sprite).spriteFrame = this.bao_2
            break;
        case 3:
            this.node.getComponent(cc.Sprite).spriteFrame = this.bao_3
            break;
        case 3:
            this.node.getComponent(cc.Sprite).spriteFrame = this.bao_3
            break;
        case 4:
            this.node.getComponent(cc.Sprite).spriteFrame = this.bao_4
            break;
        case 5:
            this.node.getComponent(cc.Sprite).spriteFrame = this.bao_5
            break;
        case 6:
            this.node.getComponent(cc.Sprite).spriteFrame = this.bao_6
            break;
        case 7:
            this.node.getComponent(cc.Sprite).spriteFrame = this.bao_7
            break;
        case 8:
            this.node.getComponent(cc.Sprite).spriteFrame = this.bao_8
            break;
      }
      this.node.width = 0.95*width
      this.node.height = 0.95*width 
    }

});
