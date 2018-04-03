import { Element } from '../../../@polymer/polymer/polymer-element.js';
import '../../../@polymer/iron-icon/iron-icon.js';
import '../../../@polymer/paper-button/paper-button.js';
import '../mixins/redux-mixin.js';
import './shared-animations.js';
import './hoverboard-icons.js';
class AboutBlock extends ReduxMixin(Element) {
  static get template() {
    return `
    <style is="custom-style" include="shared-styles flex flex-alignment flex-reverse fade-animations"></style>

    <style>
      :host {
        display: block;
        position: relative;
      }

      .container {
        overflow: hidden;
      }

      .statistics-row:first-of-type {
        margin-bottom: 16px;
      }

      .statistics-row:last-of-type {
        margin-top: 16px;
      }

      .block-cta paper-button {
        margin: 0;
        color: var(--default-primary-color);
      }

      .block-subtitle {
        color: var(--secondary-text-color);
      }

      .icon-label {
        color: var(--secondary-text-color);
        margin-top: 8px;
      }

      .count-info {
        padding: 16px 0;
      }

      .numbers {
        margin-left: 16px;
        font-size: 32px;
        vertical-align: middle;
        color: var(--default-primary-color);
      }

      .icon iron-icon {
        color: var(--dark-primary-color);
      }

      .description-block {
        min-width: 300px;
        animation-duration: 1s;
        animation-fill-mode: both;
        animation-name: fadeInUp;
      }

      .attendees-count {
        animation-duration: 1.5s;
        animation-delay: 1.5s;
        animation-fill-mode: both;
        animation-name: fadeInAttendeesCount;
      }

      .days-count {
        animation-duration: 1.5s;
        animation-delay: 1.5s;
        animation-fill-mode: both;
        animation-name: fadeInDaysCount;
      }

      .sessions-count {
        animation-duration: 1.5s;
        animation-delay: 1.5s;
        animation-fill-mode: both;
        animation-name: fadeInSessionsCount;
      }

      .tracks-count {
        animation-duration: 1.5s;
        animation-delay: 1.5s;
        animation-fill-mode: both;
        animation-name: fadeInTracksCount;
      }

      @media (min-width: 868px) {
        .container {
          margin: 48px auto;
        }

        .description-block {
          margin-right: 64px;
          padding-right: 16px;
        }

        .statistics-block {
          margin-left: 64px;
          padding-left: 16px;
        }

        .numbers {
          font-size: 50px;
        }
      }

    </style>

    <div class="container" flex="" layout="" horizontal="" center="" wrap-reverse="">

      <div class="description-block" flex="">
        <h1 class="container-title">{\$ aboutBlock.title \$}</h1>

        <p class="block-subtitle"> {\$ aboutBlock.callToAction.featuredSessions.description \$} </p>
        <a class="block-cta" href="{\$ aboutBlock.callToAction.featuredSessions.link \$}" ga-on="click" ga-event-category="video" ga-event-action="watch" ga-event-label="about block - {\$ aboutBlock.callToAction.featuredSessions.label \$}" target="_blank" rel="noopener noreferrer">
          <paper-button class="animated icon-right">
            <span class="cta-label">{\$ aboutBlock.callToAction.featuredSessions.label \$}</span>
            <iron-icon icon="hoverboard:arrow-right-circle"></iron-icon>
          </paper-button>
        </a>
        <p class="block-subtitle"> {\$ aboutBlock.callToAction.howItWas.description \$} </p>
        <div class="block-cta">
          <paper-button class="animated icon-right" on-tap="_playVideo" ga-on="click" ga-event-category="video" ga-event-action="watch" ga-event-label="about block - {\$ aboutBlock.callToAction.howItWas.label \$}">
            <span class="cta-label">{\$  aboutBlock.callToAction.howItWas.label \$}</span>
            <iron-icon icon="hoverboard:arrow-right-circle"></iron-icon>
          </paper-button>
        </div>
      </div>

      <div class="statistics-block" flex="" vertical="">

        <div class="statistics-row" flex="" layout="" horizontal="" justified="">

          <div class="count-info attendees-count" layout="" horizontal="">
                        <span class="icon" layout="" vertical="" center="">
                            <iron-icon class="big-icon" icon="hoverboard:people"></iron-icon>
                            <span class="icon-label">{\$ aboutBlock.statisticsBlock.attendees.label \$}</span>
                        </span>
            <span class="numbers">{\$ aboutBlock.statisticsBlock.attendees.number \$}</span>
          </div>

          <div class="count-info days-count" layout="" horizontal="">
                        <span class="icon" layout="" vertical="" center="">
                            <iron-icon class="big-icon" icon="hoverboard:calendar"></iron-icon>
                            <span class="icon-label">{\$ aboutBlock.statisticsBlock.days.label \$}</span>
                        </span>
            <span class="numbers">{\$ aboutBlock.statisticsBlock.days.number \$}</span>
          </div>
        </div>

        <div class="statistics-row" flex="" layout="" horizontal="" justified="">
          <div class="count-info sessions-count" layout="" horizontal="">
                        <span class="icon" layout="" vertical="" center="">
                            <iron-icon class="big-icon" icon="hoverboard:microphone"></iron-icon>
                            <span class="icon-label">{\$ aboutBlock.statisticsBlock.sessions.label \$}</span>
                        </span>
            <span class="numbers">{\$ aboutBlock.statisticsBlock.sessions.number \$}</span>
          </div>

          <div class="count-info tracks-count" layout="" horizontal="">
                        <span class="icon" layout="" vertical="" center="">
                            <iron-icon class="big-icon" icon="hoverboard:tracks"></iron-icon>
                            <span class="icon-label">{\$ aboutBlock.statisticsBlock.tracks.label \$}</span>
                        </span>
            <span class="numbers">{\$ aboutBlock.statisticsBlock.tracks.number \$}</span>
          </div>
        </div>

      </div>

    </div>
`;
  }

  static get is() {
    return 'about-block';
  }

  _playVideo() {
    uiActions.toggleVideoDialog({
      title: '{$  aboutBlock.callToAction.howItWas.title $}',
      youtubeId: '{$  aboutBlock.callToAction.howItWas.youtubeId $}',
      disableControls: true,
      opened: true,
    });
  }
}

window.customElements.define(AboutBlock.is, AboutBlock);
