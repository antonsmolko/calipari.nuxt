/* eslint semi: ["error"] */

export default class Mosaic {
  constructor (el, options) {
    this._o = {};
    this._options = options;
    this._$el = el;
    this._baseWidth = 0;
    this._refitTimeout = false;
    this._items = [];

    this._defaultsOptions = {
      maxRowHeight: 400, // The maximum desired height of rows
      refitOnResize: true, // Whether to rebuild the mosaic when the window is resized or not
      refitOnResizeDelay: 1000, // Milliseconds to wait after a resize event to refit the mosaic. Useful when creating huge mosaics that can take some CPU time on the user's browser. Leave it to false to refit the mosaic in realtime.
      defaultAspectRatio: 1, // The aspect ratio to use when none has been specified, or can't be calculated
      maxRowHeightPolicy: 'skip', // Sometimes some of the remaining items cannot be fitted on a row without surpassing the maxRowHeight. For those cases, choose one of the available settings for maxRowHeightPolicy: "skip": Does not renders the unfitting items. "crop": caps the desired height to the specified maxRowHeight, resulting in those items not keeping their aspect ratios. "oversize": Renders the items respecting their aspect ratio but surpassing the specified maxRowHeight
      maxRows: false, // In some scenarios you might need fine control about the maximum number of rows of the mosaic. If specified, the mosaic won't have more than this number of rows. If responsiveWidthThreshold is specified, maxRows are not considered when the threshold has been reached.
      highResImagesWidthThreshold: 350, // The item width on which to start using the the provided high resolution image instead of the normal one. High resolution images are specified via the "data-high-res-image-src" or "data-high-res-background-image-url" html element properties of each item.
      outerMargin: 0, // A margin size in pixels for the outher edge of the whole mosaic
      innerGap: 0, // A gap size in pixels to leave a space between elements
      responsiveWidthThreshold: false, // The minimum width for which to keep building the mosaic. If specified, when the width is less than this, the mosaic building logic is not applied, and one item per row is always shown. This might help you avoid resulting item sizes that are too small and might break complex html/css inside them, specially when aiming for great responsive mosaics.
      maxItemsToShowWhenResponsiveThresholdSurpassed: false, // If set (and also responsiveWidthThreshold is set), only this amount of items will be shown when the responsiveWidthThreshold is met
      showTailWhenNotEnoughItemsForEvenOneRow: false // If this is set to true, when there are not enough items to fill even a single row, they will be shown anyway even if they do not complete the row horizontally. If left to false, no mosaic will be shown in such occasions.
    };
  }

  init () {
    this._$el.classList.add('mosaic-gallery');
    this.options = this._o = this.extend({}, this._defaultsOptions, this._options);

    this._items = this.getItems();

    if (this._o.outerMargin) {
      this._$el.style.padding = this.getPx(this._o.outerMargin);
    }

    if (this._o.innerGap) {
      this._$el.style.marginBottom = this.getPx(this._o.innerGap * -1);
    }

    this._items.forEach((item) => {
      if (item.hasAttribute('width')) {
        item.style.width = this.getPx(item.getAttribute('width'));
      }
      if (item.hasAttribute('height')) {
        item.style.height = this.getPx(item.hasAttribute('height'));
      }
    });

    this.fit();

    if (this._o.refitOnResize) {
      window.onresize = () => {
        if (this._$el.hasAttribute('mosaic-hidden')) {
          return;
        }

        if (this._o.refitOnResizeDelay) {
          if (this._refitTimeout) {
            clearTimeout(this._refitTimeout);
          }

          this._refitTimeout = setTimeout(() => this.fit(), this._o.refitOnResizeDelay);
        } else {
          this.fit();
        }
      };
    }
  }

  extend (out) {
    out = out || {};

    for (let i = 1; i < arguments.length; i++) {
      if (!arguments[i]) {
        continue;
      }

      for (const key in arguments[i]) {
        if (Object.prototype.hasOwnProperty.call(arguments[i], key)) {
          out[key] = arguments[i][key];
        }
      }
    }

    return out;
  };

  getItems () {
    const nodeListItems = this._$el.querySelectorAll('div:not([data-no-mosaic=true]), a:not([data-no-mosaic=true]), img:not([data-no-mosaic=true]), video:not([data-no-mosaic=true])');
    return this.getArrayFromNodeList(nodeListItems);
  }

  getArrayFromNodeList (nodeList) {
    return Array.prototype.slice.call(nodeList);
  }

  fit () {
    this.retrieveBaseWidth();

    if (this.isBelowResponsiveWidthThreshold()) {
      let items = this._items;

      if (this._o.maxItemsToShowWhenResponsiveThresholdSurpassed) {
        items.slice(this._o.maxItemsToShowWhenResponsiveThresholdSurpassed).forEach(item => item.remove());
        items = items.slice(0, this._o.maxItemsToShowWhenResponsiveThresholdSurpassed);
      }

      items.forEach((item) => {
        const height = this.getItemHeightForGivenWidth(item, this._baseWidth);

        item.style.width = this.getPx(this._baseWidth);

        item.style.height = item.hasAttribute('data-only-force-height-when-necessary') ? 'auto' : this.getPx(height);

        if (this._o.innerGap) {
          item.style.marginBottom = this.getPx(this._o.innerGap);
        }
      });

      return;
    }

    let items;
    let height;
    let itemsToUse = 1;
    let startIndex = 0;
    let isAnyFitted = false;
    let row = 1;

    while (true) {
      items = this.getItemsSubset(startIndex, itemsToUse);

      if (this.isLastItemsSubset(startIndex, itemsToUse)) {
        if (items.length) {
          this.fitItems(items);
        }
        break;
      }

      height = this.calculateHeightToFit(items);

      if (height > this._o.maxRowHeight) {
        itemsToUse += 1;
        continue;
      }

      this.fitItems(items);

      startIndex += itemsToUse;
      itemsToUse = 1;
      isAnyFitted = true;

      if (!this.isBelowResponsiveWidthThreshold() && this._o.maxRows && row === this._o.maxRows) {
        this.getItemsSubset(startIndex).forEach(item => item.classList.add('mosaic-hidden'));

        return;
      }

      row += 1;
    }

    if (!isAnyFitted) {
      if (this._o.showTailWhenNotEnoughItemsForEvenOneRow) {
        this._o.maxRowHeightPolicy = 'tail';
      }

      this.fitItems(this._items);
    }
  }

  retrieveBaseWidth () {
    const value = parseFloat(getComputedStyle(this._$el, null).width.replace('px', ''));
    this._baseWidth = isFinite(value) ? value : 0;
  }

  isBelowResponsiveWidthThreshold () {
    return this._o.responsiveWidthThreshold && this._baseWidth < this._o.responsiveWidthThreshold;
  }

  getItemAspectRatio (item) {
    if (item.hasAttribute('data-aspect-ratio')) {
      return item.dataset.aspectRatio;
    }

    if (this.getItemWidth(item) && this.getItemHeight(item)) {
      const aspectRatio = this.getItemWidth(item) / this.getItemHeight(item);
      item.dataset.aspectRatio = aspectRatio.toString();

      return aspectRatio;
    }

    return this._o.defaultAspectRatio;
  }

  getItemWidth (item) {
    if (item.offsetWidth) {
      return item.offsetWidth;
    }
    if (item.hasAttribute('width')) {
      return item.getAttribute('width');
    }
  }

  getItemHeight (item) {
    if (item.offsetHeight) {
      return item.offsetHeight;
    }
    if (item.hasAttribute('height')) {
      return item.getAttribute('height');
    }
  }

  getItemsSubset (start, numberOf) {
    const items = this._items;

    if (!numberOf) {
      numberOf = items.length - start;
    }

    if (start > items.length) {
      return false;
    }

    if (start + numberOf > items.length) {
      numberOf = items.length - start;
    }

    return items.slice(start, start + numberOf);
  }

  isLastItemsSubset (start, numberOf) {
    const items = this._items;

    return (start > items.length) || (start + numberOf > items.length);
  }

  fitItems (items) {
    let isDoNothing = false;
    let isTail;
    let height = this.calculateHeightToFit(items);
    const itemsSize = items.length - 1;

    if (height > this._o.maxRowHeight) {
      switch (this._o.maxRowHeightPolicy) {
        case 'skip':
          items.forEach(item => item.classList.add('mosaic-hidden'));
          return;
        case 'crop':
          height = this._o.maxRowHeight;
          break;
        case 'oversize':
          isDoNothing = true;
          break;
        case 'tail':
          height = this._o.maxRowHeight;
          isTail = true;
          break;
      }
    }

    items.forEach(item => item.classList.remove('mosaic-hidden'));

    let accumulatedWidth = 0;

    items.forEach((item, idx) => {
      this.setItemSizeByGivenHeight(
        item,
        height,
        isDoNothing && item.getAttribute('data-only-force-height-when-necessary')
      );

      accumulatedWidth += item.offsetWidth;

      if (this._o.innerGap) {
        item.style.marginRight = idx < itemsSize ? this.getPx(this._o.innerGap) : 0;
        item.style.marginBottom = this.getPx(this._o.innerGap);
      }
    });

    if (!isTail && accumulatedWidth !== (this._baseWidth - (itemsSize * this._o.innerGap))) {
      const lastItem = items[itemsSize];
      const difference = (this._baseWidth - (itemsSize * this._o.innerGap)) - accumulatedWidth;
      const width = lastItem.offsetWidth;

      lastItem.style.width = this.getPx(width + difference);
    }
  }

  calculateHeightToFit (items) {
    let sumAspectRatio = 0;

    items.forEach((item) => {
      sumAspectRatio += parseFloat(this.getItemAspectRatio(item));
    });

    return (this._baseWidth - (this._o.innerGap * (items.length - 1))) / sumAspectRatio;
  }

  setItemSizeByGivenHeight (item, height, isDoNotSetHeight) {
    const width = Math.floor(this.getItemWidthForGivenHeight(item, height));

    item.style.width = this.getPx(width);

    item.style.height = isDoNotSetHeight ? 'auto' : this.getPx(Math.floor(height));

    this.handleHighResForItem(item);
  }

  getItemWidthForGivenHeight (item, height) {
    return height * this.getItemAspectRatio(item);
  }

  getItemHeightForGivenWidth (item, width) {
    return width / this.getItemAspectRatio(item);
  }

  handleHighResForItem (item) {
    if (!this._o.highResImagesWidthThreshold) {
      return;
    }

    const width = item.offsetWidth;

    if (width > this._o.highResImagesWidthThreshold) {
      let itemsWithHighResData;
      let dataAttr = 'data-high-res-background-image-url';

      itemsWithHighResData = this.getAllIncludingSelfByData(item, `[${dataAttr}]`);

      itemsWithHighResData.forEach((item) => {
        item.style.backgroundImage = `url("${item.getAttribute(dataAttr)}")`;
        item.classList.add('highRes');
      });

      dataAttr = 'data-high-res-image-src';

      itemsWithHighResData = this.getAllIncludingSelfByData(item, `[${dataAttr}]`);

      itemsWithHighResData.forEach((item) => {
        item.setAttribute('data-src', item.getAttribute(dataAttr));
        item.classList.add('highRes');
      });
    }
  }

  getAllIncludingSelfByData (item, dataAttr) {
    const nodeList = item.querySelectorAll(dataAttr);
    const items = this.getArrayFromNodeList(nodeList);

    if (item.hasAttribute(dataAttr)) {
      items.push(item);
    }

    return items;
  }

  getPx (value) {
    return `${value}px`;
  }
}
