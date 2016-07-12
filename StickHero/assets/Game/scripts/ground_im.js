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
        ifEntering: 0,// 判读当前是否在进入状态(从画面外划入)
        posX: 0,// 将要到达的位置
        child: null,// 棍子
        Player: {
            default: null,
            type: cc.Node
        },
    },

    // use this for initialization
    onLoad: function () {
        this.windowWidth = this.node.parent.parent.parent.width;
        this.child = this.node.getChildren();
    },

    moveIn: function(startPos){
        this.ifEntering = 1;
        this.initStick();
        this.speed = -10;
        this.node.x = this.windowWidth;
        this.node.width = this.node.parent.getComponent("groundBox_im").minWidth + 
                            cc.random0To1() * this.node.parent.getComponent("groundBox_im").maxWidth;
        this.child[1].x = cc.random0To1() * (this.node.width - this.child[1].width);
        this.posX = startPos + cc.random0To1() * (this.windowWidth - startPos - this.node.width);
    },
    
    initStick: function(){
        this.child[0].rotation = 0;
        this.child[0].height = 0;
    },

    // called every frame, uncomment this function to activate update callback
    update: function (dt) {
        this.node.x += this.speed;
        if (this.ifEntering){
            if (this.node.x < this.posX){
                this.speed = 0;
                this.ifEntering = 0;
                this.Player.getComponent('player_im').nextStopPos = this.node.x + this.node.width;
                this.child[0].x = this.node.width;
            }
        }
    },
});
