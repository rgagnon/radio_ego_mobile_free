window.AudioPage = Backbone.View.extend({

    events: {
        'click .play': 'play',
        'click .pause': 'pause'
    },

    initialize:function () {
        this.template = _.template(tpl.get('audio'));
        $('.play').live('click',  this.play);
        $('.pause').live('click', this.pause);
        this.media = new Media('http://www.radioego.com/files/' + this.model.get('user_id') + '/' + this.model.get('id') + '.mp3');
    },

    render:function (eventName) {
        $(this.el).html(this.template(this.model.toJSON()));
        return this;
    },


    play: function() {
    	// this.audio.src = 'http://www.radioego.com/files/1589/12110.mp3'
    	// window.audio.src = 'http://www.radioego.com/files/' + this.model.get('user_id') + '/' + this.model.get('id') + '.mp3';
        this.media.play();
    },

    pause: function() {
        this.media.pause();
    },

    onSuccess: function() {
            console.log("playAudio():Audio Success");
    }
});
