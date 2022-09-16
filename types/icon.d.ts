// Type definitions for bcui 3.3.1
// Project:https://gitee.com/hejc/bcui
// Definitions by: yangdan
// Definitions: https://github.com/yangdan8/bcui.git
import Vue from 'vue';

export declare class Icon extends Vue {
  /**
   * 图标的名称
   */
  type?: string;
  /**
   * 图标的大小，单位是 px
   */
  size?: number | string;
  /**
   * 图标的颜色
   */
  color?: string;
}
