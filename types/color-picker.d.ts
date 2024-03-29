// Type definitions for bcui 3.3.1
// Project:https://gitee.com/hejc/bcui
// Definitions by: yangdan
// Definitions: https://github.com/yangdan8/bcui.git
import Vue, { VNode } from 'vue';

export declare class ColorPicker extends Vue {
  /**
   * 绑定的值，可使用 v-model 双向绑定
   */
  value?: string;
  /**
   * 是否禁用
   * @default false
   */
  disabled?: boolean;
  /**
   * 是否可以输入色值
   * @default false
   */
  editable?: boolean;
  /**
   * 是否支持透明度选择
   * @default false
   */
  alpha?: boolean;
  /**
   * 是否支持色彩选择
   * @default true
   */
  hue?: boolean;
  /**
   * 是否支持透明度选择
   * @default false
   */
  recommend?: boolean;
  /**
   * 自定义颜色预设
   */
  colors?: string[];
  /**
   * 颜色的格式，可选值为 hsl、hsv、hex、rgb
   * @default 开启 alpha 时为 rgb，其它为 hex
   */
  format?: 'hsl' | 'hsv' | 'hex' | 'rgb';
  /**
   * 尺寸，可选值为large、small、default或者不设置
   */
  size?: '' | 'large' | 'small' | 'default';
  /**
   * 当绑定值变化时触发
   * @default 当前值
   */
  $emit(eventName: 'on-change', value: string): this;
  /**
   * 面板中当前显示的颜色发生改变时触发
   * @default 当前显示的颜色值
   */
  $emit(eventName: 'on-active-change', value: string): this;
  /**
   * 下拉框展开或收起时触发
   */
  $emit(eventName: 'on-open-change', value: boolean): this;
}
