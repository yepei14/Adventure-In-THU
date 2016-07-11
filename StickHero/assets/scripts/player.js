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
        speed: -10,
        speedY: 0,
        state: 0, // player的状态，0为静止，1为移动，-1为死亡
        fall: 0, // 判断player是否会下落
        nextStopPos: 0,
        groundBox: null,
        backgroundBox: null,
        dead: null,
        audioID: 0,
        bgAudio: {
            default: null,
            url: cc.AudioClip
        },
        dropAudio: {
            default: null,
            url: cc.AudioClip
        },
        deadAudio: {
            default: null,
            url: cc.AudioClip
        },
        stick1: {
            default: null,
            type: cc.Node
        },
        stick2: {
            default: null,
            type: cc.Node
        },
    },

    forward: function(stickLength){
        this.state = 1;
        this.speed = 10;
        if (stickLength < this.groundBox.nextGroundPos() || stickLength > this.nextStopPos){
            this.nextStopPos = stickLength + this.node.width / 2;
            this.fall = 1;
        }
    },

    // use this for initialization
    onLoad: function () {
        this.backgroundBox = this.node.parent.getChildren()[0].getComponent('backgroundBox');
        this.groundBox = this.node.parent.getChildren()[1].getComponent('groundBox');
        this.dead = this.node.parent.getChildren()[3].getComponent('Dead');
        this.nextStopPos = this.groundBox.nextGroundPos() + this.groundBox.nextGroundWidth();
        this.audioID = cc.audioEngine.playEffect(this.bgAudio, true);
    },
    
    // called every frame, uncomment this function to activate update callback
    update: function (dt) {
        if (this.state == 1){
            this.node.x += this.speed;
            if (this.node.x > this.nextStopPos){
                if (!this.fall){
                    this.backgroundBox.move();
                    this.groundBox.move();
                    this.speed = -10;
                }
                else{
                    // 如果死亡
                    this.speed = 0;
                    this.speedY = -50;
                    this.state = -1;
                }
            }
            else if (this.node.x < 100){
                this.backgroundBox.stop();
                this.groundBox.stop();
                this.groundBox.updateSequence();
                this.groundBox.nextGroundMoveIn();
                this.state = 0;
            }
        }
        else if (this.state == -1){
            // 如果死亡
            this.node.y += this.speedY;
            if (this.node.y < 0){
                cc.audioEngine.playEffect(this.dropAudio, false);
                cc.audioEngine.stopEffect(this.audioID);
                cc.audioEngine.playEffect(this.deadAudio, false);
                cc.eventManager.removeListener(this.stick1.getComponent('stick').mouselistenerID);
                cc.eventManager.removeListener(this.stick2.getComponent('stick').mouselistenerID);
                this.state = 0;
                this.dead.show = 1;
            }
        }
    },
});
