// Type definitions for bcui 3.3.1
// Project:https://gitee.com/hejc/bcui
// Definitions by: yangdan
// Definitions: https://github.com/yangdan8/bcui.git
import Vue, { VNode } from 'vue';

export declare class Alert extends Vue {
  /**
   * 警告提示样式，可选值为info、success、warning、error
   * @default info
   */
  type?: 'info' | 'success' | 'warning' | 'error';
  /**
   * 是否可关闭
   * @default false
   */
  closable?: boolean;
  /**
   * 是否显示图标
   * @default false
   */
  'show-icon'?: boolean;
  /**
   * 关闭时触发
   */
  $emit(eventName: 'on-close', event: HTMLElement): this;
  /**
   * slot插槽对象
   */
  $slots: {
    /**
     * 警告提示内容
     */
    '': VNode[];
    /**
     * 警告提示辅助性文字介绍
     */
    desc: VNode[];
    /**
     * 自定义图标内容
     */
    icon: VNode[];
    /**
     * 自定义关闭内容
     */
    close: VNode[];
  };
}
