import '../../../polymer-redux/polymer-redux.js';
import '../../../redux/dist/redux.min.js';
import '../../scripts/redux/constants.js';
import '../../scripts/redux/actions.js';
import '../../scripts/redux/reducer.js';
/* eslint-disable no-undef */

const initialState = {
  ui: {
    isDrawerOpened: false,
    viewport: {
      isPhone: true,
      isTabletPlus: false,
    },
    videoDialog: {
      opened: false,
      disableControls: false,
      youtubeId: '',
      title: '',
    },
    heroSettings: {},
  },
  routing: {
    route: 'home',
  },
  dialogs: {
    [DIALOGS.SPEAKER]: {
      isOpened: false,
      data: {},
    },
    [DIALOGS.SESSION]: {
      isOpened: false,
      data: {},
    },
    [DIALOGS.SUBSCRIBE]: {
      isOpened: false,
      data: {},
    },
    [DIALOGS.SIGNIN]: {
      isOpened: false,
      data: {},
    },
  },
  tickets: [],
  partners: [],
  videos: [],
  blog: {},
  speakers: {},
  sessions: {
    list: {},
    featured: {},
  },
  schedule: {},
  gallery: [],
  team: [],
  user: {
    signedIn: false,
  },
  subscribed: false,
  toast: {},
  notifications: {
    status: NOTIFICATIONS_STATUS.DEFAULT,
  },
};

const appReducer = (state = initialState, action) => {
  return {
    ui: uiReducer(state.ui, action),
    routing: routingReducer(state.routing, action),
    dialogs: dialogsReducer(state.dialogs, action),
    tickets: ticketsReducer(state.tickets, action),
    partners: partnersReducer(state.partners, action),
    videos: videosReducer(state.videos, action),
    blog: blogReducer(state.blog, action),
    speakers: speakersReducer(state.speakers, action),
    sessions: sessionsReducer(state.sessions, action),
    schedule: scheduleReducer(state.schedule, action),
    gallery: galleryReducer(state.gallery, action),
    team: teamReducer(state.team, action),
    user: userReducer(state.user, action),
    subscribed: subscribeReducer(state.subscribed, action),
    toast: toastReducer(state.toast, action),
    notifications: notificationsReducer(state.notifications, action),
  };
};

const store = Redux.createStore(
  appReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

ReduxMixin = PolymerRedux(store);
