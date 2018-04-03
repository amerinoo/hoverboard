import { Element } from '../../../@polymer/polymer/polymer-element.js';
import { afterNextRender } from '../../../@polymer/polymer/lib/utils/render-status.js';
import '../../../@polymer/paper-icon-button/paper-icon-button.js';
import '../../../good-map/good-map.js';
import '../mixins/redux-mixin.js';
import './hoverboard-icons.js';
import './shared-styles.js';

class MapBlock extends ReduxMixin(Element) {
  static get template() {
    return `
    <style is="custom-style" include="shared-styles flex flex-alignment positioning"></style>

    <style>

      :host {
        margin: 32px auto;
        display: block;
        position: relative;
      }

      .description-card {
        margin: 0 -16px;
        padding: 16px;
        background-color: var(--default-primary-color);
        color: var(--text-primary-color);
      }

      .bottom-info {
        margin-top: 24px;
      }

      .directions {
        --paper-icon-button: {
          width: 48px;
          height: 48px;
          color: var(--text-primary-color);
        };
      }

      @media (min-width: 640px) {
        :host {
          margin: 64px auto 72px;
        }

        .map-container {
          height: 640px;
          overflow: hidden;
        }

        good-map {
          display: block;
          height: 664px;
        }

        .description-card {
          margin: 0;
          padding: 24px;
          max-width: 320px;
          transform: translateY(80px);
        }

        .address {
          font-size: 12px;
        }
      }

    </style>

    <template is="dom-if" if="[[viewport.isTabletPlus]]">
      <div class="map-container">
        <good-map id="map" api-key="{\$ googleMapApiKey \$}" latitude="{\$ location.mapCenter.latitude \$}" longitude="{\$ location.mapCenter.longitude \$}" zoom="{\$ location.pointer.zoom \$}" map-options="[[options]]"></good-map>
      </div>
    </template>

    <div class="container" layout="" vertical="" end-justified="" fit\$="[[viewport.isTabletPlus]]">
      <div class="description-card" layout="" vertical="" justified="">
        <div>
          <h2>{\$ mapBlock.title \$}</h2>
          <p>{\$ location.description \$}</p>
        </div>
        <div class="bottom-info" layout="" horizontal="" justified="" center="">
          <span class="address">{\$ location.address \$}</span>
          <a href="https://www.google.com/maps/dir/?api=1&amp;destination={\$ location.pointer.latitude \$},{\$ location.pointer.longitude \$}" target="_blank" rel="noopener noreferrer">
            <paper-icon-button class="directions" icon="hoverboard:directions"></paper-icon-button>
          </a>
        </div>
      </div>
    </div>
`;
  }

  static get is() {
    return 'map-block';
  }

  static get properties() {
    return {
      viewport: {
        type: Object,
        statePath: 'ui.viewport',
        observer: '_viewportChanged',
      },
      options: {
        type: Object,
        value: () => (
          {
            disableDefaultUI: true,
            disableDoubleClickZoom: true,
            scrollwheel: false,
            draggable: false,
            styles: [{
              stylers: [{
                lightness: 40,
              }, {
                visibility: 'on',
              }, {
                gamma: 0.9,
              }, {
                weight: 0.4,
              }],
            }, {
              elementType: 'labels',
              stylers: [{
                visibility: 'on',
              }],
            }, {
              featureType: 'water',
              stylers: [{
                color: '#5dc7ff',
              }],
            }, {
              featureType: 'road',
              stylers: [{
                visibility: 'off',
              }],
            }],
          }
        ),
      },
    };
  }

  _viewportChanged({ isTabletPlus }) {
    isTabletPlus && afterNextRender(this, () => {
      const map = this.shadowRoot.querySelector('#map');
      map.addEventListener('google-map-ready', (e) => {
        new google.maps.Marker({
          position: {
            lat: parseFloat('{$ location.pointer.latitude $}'),
            lng: parseFloat('{$ location.pointer.longitude $}'),
          },
          map: e.detail,
        });
      });
    });
  }
}

window.customElements.define(MapBlock.is, MapBlock);
