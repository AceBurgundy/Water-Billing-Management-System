/**
 * Returns the full path from the template file to where a function was called;
 * @param {'import.meta'} importMeta - the import.meta of a function. Simply pass `import.meta`
 * @throws {Error} if importMeta is null
 * @return {string} the full path
 */
export const getFullPath = importMeta => {
  if (!importMeta) {
    throw new Error('Missing import.meta. Simply pass `import.meta` as the argument');
  }

  const scriptSrc = new URL(importMeta.url).pathname;
  return scriptSrc.startsWith('/') ? scriptSrc.slice(1) : scriptSrc;
};

const shouldNotAttachToWindow = [
  'It is not recommended to attach events to the window element.',
  'Add an id, and attach the event to the id instead.'
].join(' ');

/**
 * Throws if any events are attached to the window
 *
 * This is because the Component removes the event just as how javascript
 * removes events after an element has been removed.
 *
 * Thats why removing an element where the script is attached to the window,
 * would cause unexpected behaviour if the same listener has been reattached again.
 *
 * @param {function} scripts - a callback function which attaches scripts to the document
 * @throws if a script has been attached to the window
 */
function warnScriptsAttachedToWindow(scripts) {
  const discouragedWindowEvents = [
    'window.on',
    'window.addeventlistener'
  ];

  const attachedToWindow = discouragedWindowEvents.some(
    eventType => scripts.toString().trim().toLowerCase().includes(eventType)
  );

  if (attachedToWindow) {
    throw new Error(shouldNotAttachToWindow);
  }
}

export default class Component {
  constructor() {
    this.template = null;
    this.scripts = null;

    /**
     * Sets the template for the template
     *
     * @throws {Error} if template is null
     * @throws {Error} if template is not a string
     * @throws {Error} if template is an empty string
     * @throws {Error} if scripts is not a callback function
     */
    const validate = () => {
      if (typeof this.template !== 'string') {
        throw new Error('Template must be a string');
      }

      if (this.template === '') {
        throw new Error('Template is required for a component');
      }

      if (!this.scripts) {
        return;
      }

      warnScriptsAttachedToWindow(this.scripts);

      if (typeof this.scripts !== 'function') {
        throw new Error('Script argument must be a function or a callback function');
      }
    };

    /**
     * Attaches the script and returns the template string by calling the toString() method.
     *
     * @throws from validate(); if template is null
     * @throws from validate(); if template is not a string
     * @throws from validate(); if template is an empty string
     * @throws from validate(); if scripts is not a callback function
     * @returns {string} the html template which can be inserted into an element
     */
    this.render = () => {
      validate();

      setTimeout(() => {
        if (this.scripts) this.scripts();
      }, 0);

      return this.template;
    };
  }

  toString = () => this.render();
}
