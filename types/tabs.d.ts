// Type definitions for bcui 3.3.1
// Project:https://gitee.com/hejc/bcui
// Definitions by: yangdan
// Definitions: https://github.com/yangdan8/bcui.git
import Vue, { VNode } from 'vue';

export declare class Tabs extends Vue {
  /**
   * 当前激活 tab 面板的 name，可以使用 v-model 双向绑定数据
   * @default 默认为第一项的 name
   */
  value?: string;
  /**
   * 页签的基本样式，可选值为 line 和 card
   * @default line
   */
  type?: 'line' | 'card';
  /**
   * 尺寸，可选值为 default 和 small，仅在 type="line" 时有效
   * @default default
   */
  size?: 'default' | 'small';
  /**
   * 是否可以关闭页签，仅在 type="card" 时有效
   * @default false
   */
  closable?: boolean;
  /**
   * 是否使用 CSS3 动画
   * @default true
   */
  animated?: boolean;
  /**
   * Tabs 内的表单类组件是否自动获得焦点
   * @default false
   */
  'capture-focus'?: boolean;
  /**
   * 关闭前的函数，返回 Promise 可阻止标签关闭
   */
  'before-remove'?: (index: number) => {};
  /**
   * 当嵌套使用tabs时，指定name区分层级
   */
  name?: string;
  /**
   * tab 被点击时触发
   */
  $emit(eventName: 'on-click', name: string): this;
  /**
   * tab 被关闭时触发
   */
  $emit(eventName: 'on-tab-remove', name: string): this;
  /**
   * slot插槽对象
   */
  $slots: {
    /**
     * 附加内容
     */
    extra: VNode[];
  };
}

export declare class TabPane extends Vue {
  /**
   * 用于标识当前面板，对应 value，默认为其索引值
   */
  name?: string | number;
  /**
   * 选项卡头显示文字，支持 Render 函数。
   * @default 空
   */
  label?: string | (() => void);
  /**
   * 选项卡图标
   */
  icon?: string;
  /**
   * 是否禁用该选项卡
   * @default false
   */
  disabled?: boolean;
  /**
   * 是否可以关闭页签，仅在 type="card" 时有效
   * @default null
   */
  closable?: boolean;
  /**
   * 当嵌套使用tabs时，设置该属性指向对应tabs的name字段
   */
  tab?: string;
  /**
   * 在tabpane使用v-if时，并不会按照预先的顺序渲染，这时可设置index，并从小到大排序(需大于0)
   */
  index?: number;
}
