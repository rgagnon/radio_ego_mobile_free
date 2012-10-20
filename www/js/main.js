var AppRouter = Backbone.Router.extend({
                                       
     routes:{
       "":"home",
       "audios/:id":"audio"
     },
     
     initialize:function () {
       $('.back').live('click', function(event) {
                       window.history.back();
                       return false;
                       });
       this.firstPage = true;
       console.log('INIT Router');
       this.createAudio();
     
     },
     
     home:function () {
       this.audiolist = new AudioCollection();
       this.homepage = new HomePage({collection: this.audiolist});
       this.audiolist.fetch();
       this.changePage(this.homepage);
     },
     
     audio:function (id) {

        var re_audio = new RadioEgoAudio({id: id});
        self = this;
        re_audio.fetch({
            success: function(data) {
                self.changePage(new AudioPage({model: data}).render());
            }
        });
     },

    createAudio: function() {
      window.audio = new Audio();
    },

     changePage:function (page) {
        $(page.el).attr('data-role', 'page');
        page.render();
        $('body').append($(page.el));
        $.mobile.defaultPageTransition = 'slide'
        var transition = $.mobile.defaultPageTransition;
        // We don't want to slide the first page
        if (this.firstPage) {
            transition = 'none';
            this.firstPage = false;
        }
        $.mobile.changePage($(page.el), {changeHash:false, transition: transition});
    }
 });

$(document).ready(function () {
                  tpl.loadTemplates(['home', 'audio-list-item', 'audio'],
                                    function () {
                                    app = new AppRouter();
                                    Backbone.history.start({pushState: false});
                                    });
                  });
