'use strict';

import hljs from 'highlight.js';

import {Observable as $} from 'rx-lite';

const outlineList = document.querySelector('ul#outline');

const addListItem = (tagName, content, className, parent) => {
  const el = document.createElement(tagName);
  el.textContent = content;
  el.setAttribute('class', className);
  parent.appendChild(el);
};

$.fromEvent(window, 'load')
  .map(() => console.log(123123))
  .map(() => [].slice.call(document.querySelectorAll('h2, h3'))
      .map((el, i) => {
        const elId = `${el.tagName}-${i}`;
        el.setAttribute('id', elId);
        const linkEl = document.createElement('a');
        linkEl.setAttribute('href', `#${elId}`);
        linkEl.textContent = el.textContent;
        const itemEl = document.createElement('li');
        itemEl.appendChild(linkEl);
        itemEl.setAttribute('class', `item-${el.tagName}`);
        outlineList.appendChild(itemEl);
      }
    )
  )
  .subscribe();

hljs.initHighlightingOnLoad();
