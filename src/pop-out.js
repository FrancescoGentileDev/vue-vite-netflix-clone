/* eslint-disable no-unused-vars */
/* Published under The MIT License     *
 * Copyright (c) 2022 Russell Beswick  *
 * https://github.com/besworks/pop-out */

class PopOutElement extends HTMLElement {
  constructor() {
    super();
    
    this.attachShadow({ mode : 'open' });
    this.shadowRoot.innerHTML = this.template;
    this.wrapper = this.shadowRoot.querySelector('#wrapper');
    this.pstamp = this.shadowRoot.querySelector('template').content;
    this.addEventListener('mousemove', event => this.expand());
    this.addEventListener('mouseenter', event => this.expand());
    this.addEventListener('mouseleave', event => this.retract());
    this.addEventListener('touchstart', event => this.expand());
    this.addEventListener('touchend', event => this.retract());
    this.addEventListener('contextmenu', event => event.preventDefault());
  }

  get template() {
    return `
      <style>
        :host {
          display: block;
          cursor: zoom-in;
          user-select: none;
          --scale-amount: 1.5;
          --scale-speed: 0.2s;
          --scale-timing: ease;
          --shadow-in: drop-shadow(0 0 0.2rem #00000033);
          --shadow-out: drop-shadow(0 0 1rem #00000088);
        }
        
        :host([active]) {
          z-index: 10; 
        }
        
        #placeholder {
          pointer-events: none;
        }
        
        #wrapper {
          display: inline-block;
          filter: var(--shadow-in);
        }
        
        :host([active]) #wrapper {
          transition-property: transform, filter;
          transition-timing-function: var(--scale-timing);
          transition-duration: var(--scale-speed);
        }
        
        #wrapper[out] {
          transform: scale(var(--scale-amount));
          filter: var(--shadow-out)
        }
        
        .fixed { position: fixed; }
        .static { position: static; }
      </style>
      <template>
        <div id="placeholder" class="static"></div>
      </template>
      <div id="wrapper" class="static">
        <slot></slot>
      </div>
    `;
  }
  
  out = false;
  
  get slotted() {
    return this.firstElementChild;
  }
  
  get placeholder() {
    return this.shadowRoot.querySelector('#placeholder');
  }
  
  get stamp() {
    return document.importNode(this.pstamp, true);
  }
  
  get delay() {
    let d = parseFloat(getComputedStyle(this.wrapper)?.getPropertyValue('transition-duration'));
    if (!d) { d = 0; } // handle if not using transitions
    else if (d < 1 && d > 0) { d = d * 1000 } // handle values as 1000ms or 1.0s
    return d;
  }
  
  setPosition(x, y, w, h) {
    if (x == 'auto') { y = w = h = x; }
    else { x+='px'; y+='px'; w+='px'; h+='px'; }
    this.wrapper.style.left = x;
    this.wrapper.style.top = y;
    this.wrapper.style.width = w;
    this.wrapper.style.height = h;
  }
  
  setSize(w, h) {
    this.placeholder.style.width = w + 'px';
    this.placeholder.style.height = h + 'px';
  }
  
  expand() {
    if (this.out || this.parentElement.scrolling) { return; }
    this.out = true;
    this.setAttribute('active', '');
    let r = this.getBoundingClientRect();
    this.shadowRoot.insertBefore(this.stamp, this.wrapper);
    this.wrapper.className = 'fixed';
    this.setSize(r.width, r.height);
    this.setPosition(r.left, r.top, r.width, r.height);
    requestAnimationFrame(af => {
      this.wrapper.setAttribute('out', '');
    });
  }
  
  retract(now) {
    if (!this.out) { return; }
    this.wrapper.removeAttribute('out');
    
    let after = () => {
      this.removeAttribute('active');
      this.placeholder?.remove();
      this.wrapper.className = 'static';
      this.setPosition('auto');
      this.out = false;
    };
    
    if (now) { after(); }
    else { setTimeout(ts => requestAnimationFrame(after), this.delay); }
  }

  toggle() {
    if (this.out) { this.retract(); }
    else { this.expand(); }
  }
}

class OverScrollElement extends HTMLElement {
  constructor() {
    super();
    
    this.attachShadow({ mode : 'open' });
    this.shadowRoot.innerHTML = this.template;
    this.addEventListener('wheel', event => this.#handleScroll(event), true);  
    this.addEventListener('touchmove', event => this.#handleTouch(event), true);
    this.addEventListener('touchstart', event => this.#setPosition(event), true);
    this.addEventListener('touchend', event => this.#setPosition(), true);
  }

  #start = null;
  scrolling = false;

  #setPosition(event) {
    if (event?.touches?.length) {
      this.#start = event.touches[0].clientX;
    } else { this.#start = null; }
  }

  #handleTouch(event) {
    if (this.#start != null && event?.touches?.length) {
      let x = event.touches[0]?.clientX;
      event.deltaX = this.#start - x;
      this.#start = x;
      this.#handleScroll(event);
    } else {
      this.#setPosition();
    }
  }

  get active() {
    return this.querySelector('pop-out[active]');
  }

  #handleScroll(event) {
    this.scrolling = true;
    this.active?.retract(true);
    requestAnimationFrame(ts => {
      this.scrollBy({ left: event.deltaX, top: event.deltaY });
      setTimeout(ts => this.scrolling = false, 200);
    });
  }
  
  get template() {
    return `
      <style>
        * { box-sizing: border-box; }
        
        :host {
          display: flex;
          gap: 1rem;
          align-items: center;
        }
        
        :host(:not([vertical])) {
          flex-flow: row nowrap;
          overflow-x: scroll;
          overflow-y: clip;
        }
        
        :host([vertical]) {
          display: inline-flex;
          flex-flow: column nowrap;
          overflow-x: clip;
          overflow-y: scroll;
        }
      </style>
      <slot></slot>
    `;
  }
}

customElements.define('pop-out', PopOutElement);
customElements.define('over-scroll', OverScrollElement);

export { PopOutElement, OverScrollElement }
