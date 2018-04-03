import { Element } from '../../../../@polymer/polymer/polymer-element.js';
import { IronOverlayBehavior } from '../../../../@polymer/iron-overlay-behavior/iron-overlay-behavior.js';
import '../../mixins/redux-mixin.js';
import '../shared-styles.js';
import '../hoverboard-icons.js';
import { mixinBehaviors } from '../../../../@polymer/polymer/lib/legacy/class.js';

class SigninDialog extends ReduxMixin(
  mixinBehaviors([IronOverlayBehavior], Element)
) {
  static get template() {
    return `
    <style is="custom-style" include="shared-styles flex flex-alignment"></style>

    <style>
        :host {
            margin: 0 auto;
            display: block;
            padding: 24px 32px;
            background: #fff;
            box-shadow: var(--box-shadow);

        }

        .dialog-content {
            margin: 0 auto;
        }

        .provider-label {
            margin-left: 24px;
            line-height: 20px;
        }

        paper-button {
            height: 50px;
            margin: 8px 0;
            color: var(--secondary-text-color);
            display: block;
        }

        .icon-google {
            padding-top: 3px;
            --iron-icon-height: 25px;
            --iron-icon-width: 25px;
        }

        .icon-twitter {
            color: var(--twitter-color);
        }

        .icon-facebook {
            color: var(--facebook-color);
        }

    </style>

    <div class="dialog-content" layout="" vertical="" start="">
        {% for provider in signInProviders.providersData %}
            <paper-button on-tap="_signIn" provider-url="{\$ provider.url \$}" ga-on="click" ga-event-category="attendees" ga-event-action="sign-in" ga-event-label="signIn dialog - {\$ provider.name \$}" layout="" horizontal="" center-center="">
                <iron-icon class="icon-{\$ provider.name \$}" icon="hoverboard:{\$ provider.name \$}"></iron-icon>
                <span class="provider-label" provider-url="{\$ provider.url \$}">{\$ provider.label \$}</span>
            </paper-button>
        {% endfor %}
    </div>
`;
  }

  static get is() {
          return 'signin-dialog';
      }

  static get properties() {
      return {
          subscribed: {
              type: Boolean,
              statePath: 'subscribed',
          },
      };
  }

  constructor() {
      super();
      this.addEventListener('iron-overlay-canceled', this._close);
  }

  _close() {
      dialogsActions.closeDialog(DIALOGS.SIGNIN);
  }

  _signIn(event) {
      const providerUrl = event.target.getAttribute('provider-url');
      userActions.signIn(providerUrl);
  }
}

window.customElements.define(SigninDialog.is, SigninDialog);
