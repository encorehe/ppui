// Type definitions for bcui 3.3.1
// Project:https://gitee.com/hejc/bcui
// Definitions by: yangdan
// Definitions: https://github.com/yangdan8/bcui.git
import Vue from 'vue';

export declare class InputNumber extends Vue {
  /**
   * 最大值，默认值Infinity
   */
  max?: number;
  /**
   * 最小值，默认值-Infinity
   */
  min?: number;
  /**
   * 当前值，可以使用 v-model 双向绑定数据，默认值1
   */
  value?: number;
  /**
   * 每次改变的步伐，可以是小数，默认值1
   */
  step?: number;
  /**
   * 输入框尺寸，可选值为large、small、default或者不填
   */
  size?: '' | 'large' | 'small' | 'default';
  /**
   * 设置禁用状态，默认值false
   */
  disabled?: boolean;
  /**
   * 输入框占位符
   * @default 请选择
   */
  placeholder?: string;
  /**
   * 指定输入框展示值的格式
   */
  formatter?: () => void;
  /**
   * 指定从 formatter 里转换回数字的方式，和 formatter 搭配使用
   */
  parser?: () => void;
  /**
   * 是否设置为只读
   * @default false
   */
  readonly?: boolean;
  /**
   * 是否可编辑
   * @default true
   */
  editable?: boolean;
  /**
   * 数值精度
   */
  precision?: number;
  /**
   * 给表单元素设置 id，详见 Form 用法。
   */
  'element-id'?: string;
  /**
   * 是否实时响应数据，设置为 false 时，只会在失焦时更改数据
   * @default true
   */
  'active-change'?: boolean;
  /**
   * 数值改变时的回调，返回当前值，默认值当前值
   */
  $emit(eventName: 'on-change', value: number): this;
  /**
   * 聚焦时触发
   */
  $emit(eventName: 'on-focus', event: KeyboardEvent): this;
  /**
   * 失焦时触发
   */
  $emit(eventName: 'on-blur', event: KeyboardEvent): this;
}
