// Type definitions for bcui 3.3.1
// Project:https://gitee.com/hejc/bcui
// Definitions by: yangdan
// Definitions: https://github.com/yangdan8/bcui.git
import Vue from 'vue';

export declare class Affix extends Vue {
  /**
   * 距离窗口顶部达到指定偏移量后触发
   * @default 0
   */
  'offset-top'?: number;
  /**
   * 距离窗口底部达到指定偏移量后触发
   */
  'offset-bottom'?: number;
  /**
   * 在固定状态发生改变时触发
   * @param value true | false
   */
  $emit(eventName: 'on-change', value: boolean): this;
}
