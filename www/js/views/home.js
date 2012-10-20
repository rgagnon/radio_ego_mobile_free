window.HomePage = Backbone.View.extend({

    initialize:function () {
        this.template = _.template(tpl.get('home'));
    },

    render:function (eventName) {
        $(this.el).html(this.template(this.collection.toJSON()));
        this.listView = new AudioListView({el: $('ul#audio_list', this.el), collection: this.collection});
        this.listView.render();
        return this;
    }
});

window.AudioListView = Backbone.View.extend({

    initialize:function () {
        this.collection.bind("reset", this.render, this);
    },

    render:function (eventName) {
        $(this.el).empty();
        _.each(this.collection.models, function (audio) {
            $(this.el).append(new AudioListItemView({model:audio}).render().el);
        }, this);
        $('#audio_list').listview('refresh');
        return this;
    }
});

window.AudioListItemView = Backbone.View.extend({

    tagName:"li",

    initialize:function () {
        this.template = _.template(tpl.get('audio-list-item'));
        this.model.bind("change", this.render, this);
        this.model.bind("destroy", this.close, this);
    },

    render:function (eventName) {
        $(this.el).html(this.template(this.model.toJSON()));
        return this;
    }

});