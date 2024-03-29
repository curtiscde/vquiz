export default {
  user: {
    isAuthenticated: false,
    token: null,
    fetchingProfile: false,
    profile: {},
  },
  quizzes: {
    fetching: false,
    fetched: false,
    data: [],
  },
  quiz: {},
  ui: {
    snackbar: {
      open: false,
      message: null,
    },
  },
};
