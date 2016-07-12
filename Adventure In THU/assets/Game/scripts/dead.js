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
        floorLimit: 480,
        audioID: 0,
        deadAudio: {
            default: null,
            url: cc.AudioClip,
        }
    },

    setInputControl: function () {
        var self = this;
        cc.eventManager.addListener({
            event: cc.EventListener.MOUSE,
            // 鼠标放开事件
            onMouseUp: function(event) {
                cc.audioEngine.stopEffect(self.audioID);
                cc.director.loadScene('Start');
            },
        }, self.node);
    },

    // use this for initialization
    onLoad: function () {

    },

    deadMusic: function(){
        this.audioID = cc.audioEngine.playEffect(this.deadAudio, false);
    },

    // called every frame, uncomment this function to activate update callback
    update: function (dt) {
        if (this.show){
            this.node.y += this.speed;
            if (this.node.y < this.floorLimit){
                this.show = 0;
                this.setInputControl();
            }
        }
    },
});
