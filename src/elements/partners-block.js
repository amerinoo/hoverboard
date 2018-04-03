import { Element } from '../../../@polymer/polymer/polymer-element.js';
import '../../../plastic-image/plastic-image.js';
import '../../../@polymer/paper-button/paper-button.js';
import '../../../@polymer/iron-icon/iron-icon.js';
import '../mixins/redux-mixin.js';
import './shared-styles.js';
import './hoverboard-icons.js';

class PartnersBlock extends ReduxMixin(Element) {
  static get template() {
    return `
    <style is="custom-style" include="shared-styles flex flex-alignment"></style>

    <style>

      :host {
        display: block;
      }

      .block-title {
        margin: 24px 0 8px;
      }

      .logos-wrapper {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        grid-gap: 16px;
      }

      .logo-item {
        padding: 24px;
      }

      .logo-img {
        height: 60px;
        width: 100%;
      }

      .cta-button {
        margin-top: 24px;
        color: var(--default-primary-color);
      }

      @media (min-width: 640px) {
        .logos-wrapper {
          grid-template-columns: repeat(4, 1fr);
        }
      }

      @media (min-width: 812px) {
        .logos-wrapper {
          grid-template-columns: repeat(5, 1fr);
        }
      }

    </style>

    <div class="container">
      <h1 class="container-title">{\$ partnersBlock.title \$}</h1>

      <template is="dom-repeat" items="[[partners]]" as="block">
          <h4 class="block-title">[[block.title]]</h4>
          <div class="logos-wrapper">
            <template is="dom-repeat" items="[[block.logos]]" as="logo">
              <a class="logo-item card" href\$="[[logo.url]]" title\$="[[logo.name]]" target="_blank" rel="noopener noreferrer" layout="" horizontal="" center-center="">
                <plastic-image class="logo-img" srcset="[[logo.logoUrl]]" sizing="contain" lazy-load="" preload="" fade=""></plastic-image>
              </a>
            </template>
          </div>
      </template>

      <paper-button class="cta-button animated icon-right" on-tap="_addPotentialPartner">
        <span>{\$ partnersBlock.button \$}</span>
        <iron-icon icon="hoverboard:arrow-right-circle"></iron-icon>
      </paper-button>
    </div>
`;
  }

  static get is() {
    return 'partners-block';
  }

  static get properties() {
    return {
      partners: {
        type: Object,
        statePath: 'partners',
      },
    };
  }

  connectedCallback() {
    super.connectedCallback();
    partnersActions.fetchPartners();
  }

  _addPotentialPartner() {
    dialogsActions.openDialog(DIALOGS.SUBSCRIBE, {
      title: '{$ partnersBlock.form.title $}',
      submitLabel: '{$ partnersBlock.form.submitLabel $}',
      firstFieldLabel: '{$ partnersBlock.form.fullName $}',
      secondFieldLabel: '{$ partnersBlock.form.companyName $}',
      submit: subscribeActions.addPartner });
  }
}

window.customElements.define(PartnersBlock.is, PartnersBlock);
