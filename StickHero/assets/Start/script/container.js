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
        bgAudioID: 0,
        bgAudio: {
            default: null,
            url: cc.AudioClip
        },
    },

    impossibleClicked: function(){
        cc.audioEngine.stopEffect(this.bgAudioID);
        cc.director.loadScene('Impossible');
    },
    
    easyClicked: function(){
        cc.audioEngine.stopEffect(this.bgAudioID);
        cc.director.loadScene('Easy');
    },

    // use this for initialization
    onLoad: function () {
        this.bgAudioID = cc.audioEngine.playEffect(this.bgAudio, true);
    },

    // called every frame, uncomment this function to activate update callback
    update: function (dt) {

    },
});
