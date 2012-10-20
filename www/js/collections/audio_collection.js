window.AudioCollection = Backbone.Collection.extend({
    model:RadioEgoAudio,
    url:"http://api.radioego.com/audios.json"
});
