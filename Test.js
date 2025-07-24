(function(){
    'use strict';

    const INSTANCE = 'https://inv.nadeko.net'; // ← можно заменить на другой живой Invidious-инстанс

    function addYoutubeBalancer(){
        let network = new Lampa.Reguest();

        let source = {
            name: 'YouTube',
            url: '',

            search: function(params, callback){
                const query = encodeURIComponent(params.query);
                const url = `${INSTANCE}/api/v1/search?q=${query}`;

                network.silent(url, function(data){
                    let results = [];

                    data.forEach(item => {
                        if(item.type === 'video'){
                            results.push({
                                title: item.title,
                                text: item.title,
                                quality: { 'HD': `${INSTANCE}/latest_version?id=${item.videoId}&itag=22` },
                                method: 'play',
                                url: `${INSTANCE}/latest_version?id=${item.videoId}&itag=22`
                            });
                        }
                    });

                    callback(results);
                }, function(){
                    callback([]);
                });
            },

            play: function(item, callback){
                callback({
                    url: item.url,
                    quality: item.quality
                });
            }
        };

        Lampa.LampaBalancer.add('youtube', source);
    }

    function startPlugin(){
        addYoutubeBalancer();

        Lampa.Manifest.plugins = Lampa.Manifest.plugins || {};
        Lampa.Manifest.plugins['youtube_balancer'] = {
            type: 'video',
            version: '1.0.0',
            name: 'YouTube (Balancer)',
            description: 'Поиск и просмотр YouTube через Invidious'
        };
    }

    if (!window.youtube_balancer_plugin_loaded){
        window.youtube_balancer_plugin_loaded = true;
        startPlugin();
    }

})();
