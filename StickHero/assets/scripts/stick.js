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
        ifRotating: 0,
        rotationSpeed: 2,
        Player: {
            default: null,
            type: cc.Node
        },
        growAudio: {
            default: null,
            url: cc.AudioClip
        },
        landAudio:{
            default: null,
            url: cc.AudioClip
        },
        mouselistenerID: 0,
    },

    setInputControl: function () {
        var self = this;
        this.mouselistenerID = cc.eventManager.addListener({
            event: cc.EventListener.MOUSE,
            // 鼠标按下事件
            onMouseDown: function(event) {
                if (self.node.parent.getComponent("ground").ifFirst){
                    self.speed = 10;
                }
            },
            // 鼠标释放事件
            onMouseUp: function(event) {
                if (self.node.parent.getComponent("ground").ifFirst){
                    self.speed = 0;
                    self.ifRotating = 1;
                }
            }
        }, self.node);
    },

    // use this for initialization
    onLoad: function () {
        this.node.height = 0;
        this.node.x = this.node.parent.width;
        this.node.y = this.node.parent.height;
        this.setInputControl();
    },

    // called every frame, uncomment this function to activate update callback
    update: function (dt) {
        this.node.height += this.speed;
        if (this.speed > 0){
            cc.audioEngine.playEffect(this.growAudio, false);
        }
        if (this.ifRotating){
            this.node.rotation += this.rotationSpeed;
            if (this.node.rotation >= 90){
                cc.audioEngine.playEffect(this.landAudio, false);
                this.ifRotating = 0;
                this.Player.getComponent("player").forward(this.node.parent.x + this.node.parent.width + this.node.height);
            }
        }
    },
});
