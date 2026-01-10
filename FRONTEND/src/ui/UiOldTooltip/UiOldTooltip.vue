<template>
  <component :is="tagName" class="tooltip-wrapper">
    <slot name="target"
          :close="close"
          :enter="enter"
          :open="open"
          :on="on"
    />

    <div v-show="triggered && opened"
         class="tooltip"
         :class="summaryClass"
         ref="tooltip">
      <div class="content">
        <slot :close="close" />
      </div>
      <span v-show="closeable"
            class="close"
            @click="close"
      ></span>
    </div>
  </component>
</template>

<script>
import Timer from './Timer.js';
import { isEmptyObject } from '../../shared/objects/isEmptyObject.ts';
import { TooltipPosition } from './TooltipPosition.js';

export default {
  name: 'Tooltip',
  props: {
    tagName: {
      type: String,
      default: 'div',
    },
    closeable: {
      type: Boolean,
      default: false,
    },
    tooltipClass: {
      type: String,
    },
    center: {
      type: Boolean,
      default: false,
    },
    sideways: {
      type: Boolean,
      default: false,
    },
    openDelay: {
      type: Number,
      default: 0,
    },
    hideDelay: {
      type: Number,
      default: 0,
    },
    // Триггеры
    byHover: {
      type: Boolean,
      default: false,
    },
    byClick: {
      type: Boolean,
      default: false,
    },
    byFocus: {
      type: Boolean,
      default: false,
    },
    opened: {
      type: Boolean,
      default: true,
    },
  },
  computed: {
    on() {
      const result = {};

      if (this.byClick) {
        result.click = this.enter;
      }

      if (this.byFocus) {
        result.focus = this.enter;
        result.blur  = this.leave;
      }

      if (this.byHover) {
        result.pointerenter = this.enter;
        result.pointerleave = this.leave;
      }

      return result;
    },
    summaryClass() {
      return [
        this.tooltipClass,
        this.positionClass,
      ];
    },
  },
  data() {
    return {
      triggered: false,
      positionClass: '',
    };
  },
  methods: {
    async open() {
      this.$refs.tooltip.style.visibility = 'hidden';
      this.triggered = true;
      await this.$nextTick();
      this.clearTimers();
      this.updatePosition();
      this.$refs.tooltip.style.visibility = '';
    },
    close() {
      this.clearTimers();
      this.triggered = false;
    },
    clearTimers() {
      this.$options.openTimer.clearTimeout();
      this.$options.hideTimer.clearTimeout();
    },
    enter() {
      this.$options.hideTimer.clearTimeout();

      if (!this.triggered) {
        this.$options.openTimer.setTimeoutIfAbsent(
            this.open,
            this.openDelay
        );
      }
    },
    leave() {
      this.$options.openTimer.clearTimeout();

      if (this.triggered) {
        this.$options.hideTimer.setTimeoutIfAbsent(
            this.close,
            this.hideDelay
        );
      }
    },
    clickOutside(e) {
      if (!this.byClick)
        return;

      if (this.triggered && !this.$el.contains(e.target)) {
        this.close();
      }
    },
    updatePosition() {
      const {
        classes,
        styles,
      } = new TooltipPosition(this.$el, this.$refs.tooltip)
          .calculate(this.sideways, this.center);

      this.positionClass = classes;

      Object.assign(this.$refs.tooltip.style, styles);
    },
  },
  watch: {
    opened(value) {
      if (!isEmptyObject(this.on))
        return;

      if (value) {
        this.open();
      } else {
        this.close();
      }
    },
  },
  created() {
    this.$options.openTimer = new Timer();
    this.$options.hideTimer = new Timer();

    document.addEventListener('click', this.clickOutside, true);
    window.addEventListener('resize', this.updatePosition);
    window.addEventListener('orientationchange ', this.updatePosition);
  },
  destroyed() {
    this.clearTimers();
  },
};
</script>

<style lang="scss" scoped>
@import './mixins.scss';

$pointer-offset: -5.5px;
$pointer-width :  40px;
$pointer-height:  6px;

.tooltip-wrapper {
  position:       relative;

  .tooltip {
    --background-color: #888C94;

    position:       absolute;
    z-index:        1;
    display:        flex;
    box-sizing:     border-box;
    padding:        var(--input-padding);
    border-radius:  var(--option-dialog-border-radius);
    background:     var(--background-color);
    margin:         0;
    width:          max-content;
    max-width:      400px;
    min-width:      40px;

    font-family:    var(--text-font-family);
    font-size:      var(--text-font-size);
    line-height:    var(--text-line-height);
    font-weight:    500;
    letter-spacing: 0.01em;
    filter: drop-shadow(0px 0px 20px rgba(28, 41, 61, 0.05)) drop-shadow(0px 12px 20px rgba(28, 41, 61, 0.06));
    color:  #ffffff;

    &.error {
      --background-color: #FFCACA;
      color: var(--text-color);
    }

    &.inform {
      --background-color: #FFFFFF;
      padding: 20px;
      color:   var(--text-color);
    }

    &.popover {
      --background-color: #fff;
      filter: drop-shadow(0px 0px 32px rgba(28, 41, 61, 0.15)) drop-shadow(0px 32px 32px rgba(28, 41, 61, 0.06));
      border: 0;
      color:  var(--text-color);
    }

    & > .close {
      @include icon(16px, 16px);
      //background-image: url('./icons/close.svg');
      margin-left:      8px;
      opacity:          0.5;
    }

    &::after {
      content:    "";
      position:   absolute;
      background: var(--background-color);
    }

    // Основное положение клювика
    &.top, &.top-left, &.top-right {
      &::after {
        clip-path: path('M40 -9.05991e-06L5.24537e-07 -9.69579e-06L11.9361 -1.05597e-05C12.9416 -1.09486e-05 13.9103 0.378725 14.6492 1.06078L18.6434 4.74779C19.4096 5.45498 20.5904 5.45498 21.3566 4.74779L25.3508 1.06078C26.0897 0.378725 27.0584 -9.71446e-06 28.0639 -9.62655e-06L40 -9.05991e-06Z');
        bottom:    $pointer-offset;
        width:     $pointer-width;
        height:    $pointer-height;
      }
    }

    &.bottom, &.bottom-left, &.bottom-right {
      &::after {
        clip-path: path('M-5.24537e-07 6.00001L40 6.00001L28.0639 6.00001C27.0584 6.00001 26.0897 5.62128 25.3508 4.93922L21.3566 1.25221C20.5904 0.545022 19.4096 0.545021 18.6434 1.25221L14.6492 4.93922C13.9103 5.62127 12.9416 6.00001 11.9361 6.00001L-5.24537e-07 6.00001Z');
        top:       $pointer-offset;
        width:     $pointer-width;
        height:    $pointer-height;
      }
    }

    &.left, &.left-top, &.left-bottom {
      &::after {
        clip-path: path('M-9.05991e-06 -5.24537e-07L-9.69579e-06 40L-1.07603e-05 28.0639C-1.085e-05 27.0584 0.378725 26.0897 1.06078 25.3508L4.74779 21.3566C5.45498 20.5904 5.45498 19.4096 4.74779 18.6434L1.06078 14.6492C0.378725 13.9103 -9.73418e-06 12.9416 -9.68179e-06 11.9361L-9.05991e-06 -5.24537e-07Z');
        right:     $pointer-offset;
        width:     $pointer-height;
        height:    $pointer-width;
      }
    }

    &.right, &.right-top, &.right-bottom {
      &::after {
        clip-path: path('M6.00001 40L6.00001 5.24537e-07L6.00001 11.9361C6.00001 12.9416 5.62128 13.9103 4.93922 14.6492L1.25221 18.6434C0.545022 19.4096 0.545021 20.5904 1.25221 21.3566L4.93922 25.3508C5.62127 26.0897 6.00001 27.0584 6.00001 28.0639L6.00001 40Z');
        left:      $pointer-offset;
        width:     $pointer-height;
        height:    $pointer-width;
      }
    }

    &.top::after,
    &.bottom::after {
      left:      50%;
      transform: translateX(-50%);
    }

    &.top-left::after,
    &.bottom-left::after {
      left: 0;
    }

    &.top-right::after,
    &.bottom-right::after {
      right: 0;
    }

    &.left::after,
    &.right::after {
      top:       50%;
      transform: translateY(-50%);
    }

    &.left-top::after,
    &.right-top::after {
      top: 0;
    }

    &.left-bottom::after,
    &.right-bottom::after {
      bottom: 0;
    }
  }
}
</style>