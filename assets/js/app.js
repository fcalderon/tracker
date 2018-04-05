import 'phoenix_html';
import React from 'react';
import store from './store';
import tracker_init from './tracker/tracker';

$(function() {
  tracker_init(store);
});
