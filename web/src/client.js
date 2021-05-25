import * as sapper from '@sapper/app';

// styles for highlight.js syntax highlighting in markdown renderings
import 'highlight.js/styles/github.css';

sapper.start({
  target: document.querySelector('body'),
});
