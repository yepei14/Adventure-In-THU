cc.Class({
    extends: cc.Component,

    properties: {
        // foo: {
        //    default: null,
        //    url: cc.Texture2D,  // optional, default is typeof default
        //    serializable: true, // optional, default is true
        //    visible: true,      // optional, default is true
        //    displayName: 'Foo', // optional
        //    readonly: false,    // optional, default is false
        // },
        // ...
        speed: 0,
        ifFirst: 0,// 判断本地面是否是第一个地面（可以产生棍子）
        windowWidth: 0,// 游戏窗口宽度
        maxWidth: 500,// 地面最长长度
        minWidth: 100,// 地面最短长度
        ifEntering: 0,// 判读当前是否在进入状态(从画面外划入)
        posX: 0,// 将要到达的位置
        child: null,// 棍子
        Player: {
            default: null,
            type: cc.Node
        }
    },

    // use this for initialization
    onLoad: function () {
        this.windowWidth = this.node.parent.parent.parent.width;
        this.child = this.node.getChildren()[0];
    },

    moveIn: function(startPos){
        this.ifEntering = 1;
        this.initStick();
        this.speed = -10;
        this.node.x = this.windowWidth;
        this.node.width = this.minWidth + cc.random0To1() * this.maxWidth;
        this.posX = startPos + cc.random0To1() * (this.windowWidth - startPos - this.node.width);
    },
    
    initStick: function(){
        this.child.rotation = 0;
        this.child.height = 0;
    },

    // called every frame, uncomment this function to activate update callback
    update: function (dt) {
        this.node.x += this.speed;
        if (this.ifEntering){
            if (this.node.x < this.posX){
                this.speed = 0;
                this.ifEntering = 0;
                this.Player.getComponent('player').nextStopPos = this.node.x + this.node.width;
                this.child.x = this.node.width;
            }
        }
    },
});
