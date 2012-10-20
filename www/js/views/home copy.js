window.HomePage = Backbone.View.extend({

    initialize:function () {

      console.log('INIT HomeView');
        this.collection.bind("reset", this.render, this);
        this.template = _.template(tpl.get('home'));
        this.el = $('ul#audio_list', this.el);
    },

    render: function(){
      $(this.el).html(this.template(this.collection.toJSON()));
      this.addAll()
      return this;
    },

     addAll: function(){
        console.log('INIT HomeView-addAll');
        $(this.el).empty();
        _.each(this.collection.models, function (audio) {
            $(this.el).append(new AudioListItemView({model: audio}).render().el);
            }, this);
        $('#audio_list').listview('refresh');
    },

    addOne: function(audioItem){
        var audio_item_View = new AudioListItemView({model: audioItem});
        $(this.el).append(audio_item_View.render().el); 
    }

});

window.AudioListItemView = Backbone.View.extend({

    tagName:"li",

    initialize:function () {

    	console.log('INIT AudioItemListView');
        this.template = _.template(tpl.get('audio-list-item'));
    },

    render:function (eventName) {
        $(this.el).html(this.template(this.model));
        return this;
    }
});