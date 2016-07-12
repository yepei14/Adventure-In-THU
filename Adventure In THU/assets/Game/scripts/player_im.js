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
        audioID: 0,
        score: 0,
        bgAudio: {
            default: null,
            url: cc.AudioClip
        },
        hitAudio: {
            default: null,
            url: cc.AudioClip
        },
        dropAudio: {
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
        dead: {
            default: null,
            type: cc.Node
        },
        scoreDisplay: {
            default: null,
            type: cc.Label
        }
    },

    forward: function(stickLength){
        this.state = 1;
        this.speed = 10;
        if (stickLength < this.groundBox.nextGroundPos() || stickLength > this.nextStopPos){
            this.nextStopPos = stickLength + this.node.width / 2;
            this.fall = 1;
        }
        else if (this.groundBox.hit(stickLength)){ // 击中红点
                    this.score++;
                    cc.audioEngine.playEffect(this.hitAudio, false);
                }
    },

    // use this for initialization
    onLoad: function () {
        this.backgroundBox = this.node.parent.getChildren()[0].getComponent('backgroundBox_im');
        this.groundBox = this.node.parent.getChildren()[1].getComponent('groundBox_im');
        this.nextStopPos = this.groundBox.nextGroundPos() + this.groundBox.nextGroundWidth();
        this.audioID = cc.audioEngine.playEffect(this.bgAudio, true);
    },
    
    // called every frame, uncomment this function to activate update callback
    update: function (dt) {
        if (this.state == 1){
            this.node.x += this.speed;
            if (this.node.x > this.nextStopPos){
                if (!this.fall){
                    // 成功到达下一楼顶
                    this.backgroundBox.move();
                    this.groundBox.move();
                    this.speed = -10;
                    this.score++;
                    this.scoreDisplay.string = this.score.toString();
                    this.groundBox.levelUp();
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
                cc.eventManager.removeListener(this.stick1.getComponent('stick_im').mouselistenerID);
                cc.eventManager.removeListener(this.stick2.getComponent('stick_im').mouselistenerID);
                this.dead.getComponent("dead").deadMusic();
                this.state = 0;
                this.dead.getComponent("dead").show = 1;
            }
        }
    },
});
