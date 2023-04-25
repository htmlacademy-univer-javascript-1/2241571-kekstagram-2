import {photoDescriptions} from './data.js';
import {showPictures} from './miniatures.js'
import {openForm} from './form.js';
import './picture-scale.js';
import {filterEditor} from './picture-effects.js';

showPictures(photoDescriptions);
openForm();
filterEditor();
