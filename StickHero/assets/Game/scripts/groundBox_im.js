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
        first: null,
        last: null,
        maxWidth: 0,
        minWidth: 0,
        maxSpeed: 0,
        minSpeed: 0,
    },

    levelUp: function(){
        if (this.maxWidth > 30){
            this.maxWidth--;
        }
        if (this.maxSpeed < 30){
            this.maxSpeed++;
        }
    },

    move: function() {
        this.first.speed = -10;
        this.last.speed = -10;
    },
    
    stop: function() {
        this.first.speed = 0;
        this.last.speed = 0;
    },
    
    updateSequence: function() {
        this.last.ifFirst = 1;
        this.first.ifFirst = 0;
        var temp = this.last;
        this.last = this.first;
        this.first = temp;
    },

    nextGroundPos: function(){
        return this.last.node.x;
    },
    
    nextGroundWidth: function(){
        return this.last.node.width;
    },
    
    hit: function(stickLength){
        if (this.last.child[1].x + this.last.node.x < stickLength &&
            this.last.child[1].x + this.last.child[1].width + this.last.node.x > stickLength){
                return true;
            }
        else return false;
    },

    nextGroundMoveIn: function(){
        this.last.moveIn(this.first.node.x + this.first.node.width);
    },

    // use this for initialization
    onLoad: function () {
        this.first = this.node.getChildren()[0].getComponent('ground_im');
        this.last = this.node.getChildren()[1].getComponent('ground_im');
    },

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
