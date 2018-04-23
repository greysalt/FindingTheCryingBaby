cc.Class({
    extends: cc.Component,
    properties: {
    },
    toScene: function () {
        cc.director.loadScene('WelcomeScene')
    }
});