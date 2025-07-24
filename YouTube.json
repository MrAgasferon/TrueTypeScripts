(function () {
  'use strict';

  const INSTANCE = 'https://inv.nadeko.net';

  function YTPComponent(object) {
    this.render = () => this._render || (this._render = $('<div class="content__body"></div>'));

    this.start = () => {
      Lampa.Controller.add('content', {
        toggle: () => {
          Lampa.Controller.collectionSet(this.render(), this.render());
          Lampa.Controller.collectionFocus(false, this.render());
        },
        back: this.back.bind(this)
      });
      this.loadSearch();
      Lampa.Controller.toggle('content');
    };

    this.back = () => Lampa.Activity.backward();

    this.loadSearch = () => {
      const query = encodeURIComponent(object.search || object.movie.title);
      const url = `${INSTANCE}/api/v1/search?q=${query}`;
      new Lampa.Reguest().native(url, this.parse.bind(this), this.error.bind(this), false, { dataType: 'json' });
    };

    this.parse = (json) => {
      const items = json || [];
      if (!items.length) {
        this.render().html('<div style="padding:2em">Ничего не найдено</div>');
        return;
      }
      items.forEach(v => {
        const title = v.title;
        const videoId = v.videoId;
        const btn = $(`<div class="selector" style="padding:1em">${title}</div>`);
        btn.on('hover:enter', () => {
          Lampa.Player.play({
            title: title,
            url: `${INSTANCE}/latest_version?id=${videoId}&itag=22`,
            isonline: true
          });
        });
        this.render().append(btn);
      });
    };

    this.error = () => {
      this.render().html('<div style="padding:2em">Ошибка при загрузке YouTube</div>');
    };

    this.pause = () => {};
    this.stop = () => {};
    this.destroy = () => {};
  }

  function startPlugin() {
    Lampa.Component.add('ytinvidious', YTPComponent);

    Lampa.Manifest.plugins = {
      type: 'video',
      version: '1.0.0',
      name: 'YouTube (Invidious)',
      description: 'Просмотр YouTube через Invidious без блокировок'
    };

    Lampa.Lang.add({
      ytinvidious_watch: { ru: 'YouTube' }
    });

    Lampa.Listener.follow('search', e => {
      if (e.type === 'complite') {
        const btn = $(`<div class="full-start__button selector view--online" data-subtitle="YouTube">
          <svg width="16" height="16" viewBox="0 0 24 24"><path fill="currentColor" d="M10 16.5V7.5L16 12L10 16.5Z"/></svg>
          <span>YouTube</span>
        </div>`);
        btn.on('hover:enter', () => {
          Lampa.Activity.replace({
            component: 'ytinvidious',
            search: e.data.query
          });
        });
        e.object.activity.render().find('.view--search').after(btn);
      }
    });
  }

  if (!window.ytinvidious_plugin_loaded) {
    window.ytinvidious_plugin_loaded = true;
    startPlugin();
  }
})();
