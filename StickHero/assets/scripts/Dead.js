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
        speed: -5,
        show: 0,
    },

    setInputControl: function () {
        var self = this;
        cc.eventManager.addListener({
            event: cc.EventListener.MOUSE,
            // 鼠标按下事件
            onMouseUp: function(event) {
                cc.director.loadScene('Game');
            },
        }, self.node);
    },

    // use this for initialization
    onLoad: function () {

    },

    // called every frame, uncomment this function to activate update callback
    update: function (dt) {
        if (this.show){
            this.node.y += this.speed;
            if (this.node.y < 480){
                this.show = 0;
                this.setInputControl();
            }
        }
    },
});
