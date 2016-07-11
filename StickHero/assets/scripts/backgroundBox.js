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
        first: 0,// 当前在最前的background编号
        last: 0,
        num: 0,// box下的元素数目
        children: null,
        deviation: 0,// 更新队列时背景移动可能产生的误差
    },

    move: function() {
        for (var i = 0; i < this.num; i++){
            this.children[i].getComponent('background').speed = -10;
        }
    },
    
    stop: function() {
        for (var i = 0; i < this.num; i++){
            this.children[i].getComponent('background').speed = 0;
        }
    },
    
    updateSequence: function() {
        this.children[this.first].x = this.children[this.last].x + this.children[this.last].width - this.deviation;
        this.last = this.first;
        this.first = (++this.first) % this.num;
    },

    // use this for initialization
    onLoad: function () {
        this.children = this.node.getChildren();
    },

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
