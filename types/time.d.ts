// Type definitions for bcui 3.3.1
// Project:https://gitee.com/hejc/bcui
// Definitions by: yangdan
// Definitions: https://github.com/yangdan8/bcui.git
import Vue from 'vue';

export declare class Time extends Vue {
  /**
   * 需要对比的时间，可以是时间戳或 Date 类型
   */
  time?: number |Date |string;
  /**
   * 类型，可选值为 relative、date 或 datetime
   * @default relative
   */
  type?: 'relative'|'date'|'datetime';
  /**
   * 自动更新的间隔，单位：秒
   * @default 60
   */
  interval?: number;
  /**
   * 填写该值，点击会定位锚点
   * @default false
   */
  hash?: string;
}
