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
        windowWidth: 0,
    },

    // use this for initialization
    onLoad: function () {
        this.windowWidth = this.node.parent.parent.width;
    },

    // called every frame, uncomment this function to activate update callback
    update: function (dt) {
        this.node.x += this.speed;
        if (this.node.x < 0){
            this.speed = -this.speed;
        }
        else if (this.node.x > this.windowWidth){
            this.speed = -this.speed;
        }
    },
});
