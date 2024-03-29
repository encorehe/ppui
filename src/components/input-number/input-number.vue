<template>
    <div :class="wrapClassess">
        <div v-if="pread" class="pread-text">
            <slot name="pread"></slot>
        </div>
    <div :class="wrapClasses">
        <div :class="handlerClasses">
            <a
                @click="up"
                :class="upClasses">
                <span :class="innerUpClasses" @click="preventDefault"></span>
            </a>
            <a
                @click="down"
                :class="downClasses">
                <span :class="innerDownClasses" @click="preventDefault"></span>
            </a>
        </div>
        <div :class="inputWrapClasses">
            <input
                type="number"
                :id="elementId"
                :class="inputClasses"
                :disabled="itemDisabled"
                autocomplete="off"
                spellcheck="false"
                :autofocus="autofocus"
                @focus="focus"
                @blur="blur"
                @keydown.stop="keyDown"
                @mouseup="preventDefault"
                @change="change"
                :readonly="readonly || !editable"
                :name="name"
                :value="formatterValue"
                :placeholder="placeholder">
        </div>
    </div>
        <div v-if="append" class="gray-bg-btn">
            <slot name="append"></slot>
        </div>
    </div>
</template>
<script>
    import { oneOf, findComponentUpward } from '../../utils/assist';
    import Emitter from '../../mixins/emitter';
    import mixinsForm from '../../mixins/form';

    const prefixCls = 'ivu-input-number';
    const iconPrefixCls = 'ivu-icon';

    function addNum (num1, num2) {
        let sq1, sq2, m;
        try {
            sq1 = num1.toString().split('.')[1].length;
        }
        catch (e) {
            sq1 = 0;
        }
        try {
            sq2 = num2.toString().split('.')[1].length;
        }
        catch (e) {
            sq2 = 0;
        }
//        if (sq1 === 0 || sq2 === 0) {
//            return num1 + num2;
//        } else {
//            m = Math.pow(10, Math.max(sq1, sq2));
//            return (num1 * m + num2 * m) / m;
//        }
        m = Math.pow(10, Math.max(sq1, sq2));
        return (Math.round(num1 * m) + Math.round(num2 * m)) / m;
    }

    export default {
        name: 'InputNumber',
        mixins: [ Emitter, mixinsForm ],
        props: {
            max: {
                type: Number,
                default: Infinity
            },
            min: {
                type: Number,
                default: -Infinity
            },
            step: {
                type: Number,
                default: 1
            },
            activeChange: {
                type: Boolean,
                default: true
            },
            value: [String, Number],
            size: {
                validator (value) {
                    return oneOf(value, ['small', 'large', 'default']);
                },
                default () {
                    return !this.$IVIEW || this.$IVIEW.size === '' ? 'default' : this.$IVIEW.size;
                }
            },
            disabled: {
                type: Boolean,
                default: false
            },
            autofocus: {
                type: Boolean,
                default: false
            },
            readonly: {
                type: Boolean,
                default: false
            },
            editable: {
                type: Boolean,
                default: true
            },
            name: {
                type: String
            },
            precision: {
                type: Number
            },
            elementId: {
                type: String
            },
            formatter: {
                type: Function
            },
            parser: {
                type: Function
            },
            placeholder: {
                type: String,
                default: ''
            }
        },
        data () {
            return {
                pread: false,
                append: false,
                focused: false,
                upDisabled: false,
                downDisabled: false,
                currentValue: this.value,
                isAddPrecision: true
            };
        },
        computed: {
            wrapClassess(){
                let str = '';
                if(this.append || this.pread) str = 'input-number-wrappera';
                return str
            },
            wrapClasses () {
                return [
                    `${prefixCls}`,
                    {
                        [`${prefixCls}-${this.size}`]: !!this.size,
                        [`${prefixCls}-disabled`]: this.itemDisabled,
                        [`${prefixCls}-focused`]: this.focused
                    }
                ];
            },
            handlerClasses () {
                return `${prefixCls}-handler-wrap`;
            },
            upClasses () {
                return [
                    `${prefixCls}-handler`,
                    `${prefixCls}-handler-up`,
                    {
                        [`${prefixCls}-handler-up-disabled`]: this.upDisabled
                    }
                ];
            },
            innerUpClasses () {
                return `${prefixCls}-handler-up-inner ${iconPrefixCls} ${iconPrefixCls}-ios-arrow-up`;
            },
            downClasses () {
                return [
                    `${prefixCls}-handler`,
                    `${prefixCls}-handler-down`,
                    {
                        [`${prefixCls}-handler-down-disabled`]: this.downDisabled
                    }
                ];
            },
            innerDownClasses () {
                return `${prefixCls}-handler-down-inner ${iconPrefixCls} ${iconPrefixCls}-ios-arrow-down`;
            },
            inputWrapClasses () {
                return `${prefixCls}-input-wrap`;
            },
            inputClasses () {
                return `${prefixCls}-input`;
            },
            precisionValue () {
                // can not display 1.0
                if(!this.currentValue) return this.currentValue;
                this.currentValue =  Number(this.currentValue);
                return this.precision && this.isAddPrecision? this.currentValue.toFixed(this.precision) : this.currentValue;
            },
            formatterValue () {
                if (this.formatter && this.precisionValue !== null) {
                    return this.formatter(this.precisionValue);
                } else {
                    return this.precisionValue;
                }
            }
        },
        methods: {
            preventDefault (e) {
                e.preventDefault();
            },
            up (e) {
                const targetVal = Number(e.target.value);
                if (this.upDisabled && isNaN(targetVal)) {
                    return false;
                }
                this.changeStep('up', e);
            },
            down (e) {
                const targetVal = Number(e.target.value);
                if (this.downDisabled && isNaN(targetVal)) {
                    return false;
                }
                this.changeStep('down', e);
            },
            changeStep (type, e) {
                if (this.itemDisabled || this.readonly) {
                    return false;
                }

                const targetVal = Number(e.target.value);
                let val = Number(this.currentValue);
                const step = Number(this.step);
                if (isNaN(val)) {
                    return false;
                }

                // input a number, and key up or down
                if (!isNaN(targetVal)) {
                    if (type === 'up') {
                        if (addNum(targetVal, step) <= this.max) {
                            val = targetVal;
                        } else {
                            return false;
                        }
                    } else if (type === 'down') {
                        if (addNum(targetVal, -step) >= this.min) {
                            val = targetVal;
                        } else {
                            return false;
                        }
                    }
                }

                if (type === 'up') {
                    val = addNum(val, step);
                } else if (type === 'down') {
                    val = addNum(val, -step);
                }
                this.setValue(val);
            },
            setValue (val) {
                // 如果 step 是小数，且没有设置 precision，是有问题的
                if (val && !isNaN(this.precision)) val = Number(Number(val).toFixed(this.precision));

                const {min, max} = this;
                if (val!==null && val !== '') {
                    if (val > max) {
                        val = max;
                    } else if (val < min) {
                        val = min;
                    }
                }

                this.$nextTick(() => {
                    this.currentValue = val;
                    this.$emit('input', val);
                    this.$emit('on-change', val);
                    this.dispatch('FormItem', 'on-form-change', val);
                });
            },
            focus (event) {
                this.focused = true;
                this.isAddPrecision= false;
                this.$emit('on-focus', event);
            },
            blur () {
                this.focused = false;
                this.isAddPrecision= true;
                let { currentValue,min } = this;
                if(!currentValue && min && min != -Infinity) this.setValue('');
                this.$emit('on-blur');
                if (!findComponentUpward(this, ['DatePicker', 'TimePicker', 'Cascader', 'Search'])) {
                    this.dispatch('FormItem', 'on-form-blur', this.currentValue);
                }
            },
            throttle(method,delay){
                    let timer=null;
                    return function(){
                        var context=this, args=arguments;
                        clearTimeout(timer);
                        timer=setTimeout(function(){
                            method.apply(context,args);
                        },delay);
                    }
            },
            keyDown (e) {
                this.isAddPrecision= false;
                if (e.keyCode === 38) {
                    e.preventDefault();
                    this.up(e);
                } else if (e.keyCode === 40) {
                    e.preventDefault();
                    this.down(e);
                }
            },
            change (event) {
                const that = this;
                let cab = function () {
                    // console.log(11);
                    // if (event.type == 'change' && that.activeChange) return;
                    // if (event.type == 'input' && !that.activeChange) return;
                    let val = event.target.value.trim();
                    if (that.parser) {
                        val = this.parser(val);
                    }
                    const isEmptyString = val.length === 0;
                    if(isEmptyString){
                        that.setValue(null);
                        return;
                    }
                    if (event.type == 'input' && val.match(/^\-?\.?$|\.$/)) return; // prevent fire early if decimal. If no more input the change event will fire later
                    val = Number(val);
                    if (!isNaN(val)) {
                        that.currentValue = val;
                        that.setValue(val);
                    } else {
                        event.target.value = that.currentValue;
                    }
                };
                this.throttle(cab(),1000);

            },
            changeVal (val) {
                val = Number(val);
                if (!isNaN(val)) {
                    const step = this.step;
                    this.upDisabled = val + step > this.max;
                    this.downDisabled = val - step < this.min;
                } else {
                    this.upDisabled = true;
                    this.downDisabled = true;
                }
            }
        },
        mounted () {
            let { currentValue,min } = this;
            // console.log(currentValue,min);
            if(!currentValue && min && min != -Infinity) this.setValue('');
            if(this.$slots.append) this.append = true;
            if(this.$slots.pread) this.pread = true;
        },
        watch: {
            value (val) {
                this.currentValue = val;
            },
            currentValue (val) {
                this.changeVal(val);
            },
            min () {
                this.changeVal(this.currentValue);
            },
            max () {
                this.changeVal(this.currentValue);
            }
        }
    };
</script>
<style lang="less">
    .input-number-wrappera {
        display: inline-flex;
        &>.ivu-input-number{
            flex:1;
        }
        .gray-bg-btn{
            display: inline-block;
            padding: 9px 12px;
            font-size: inherit;
            font-weight: normal;
            line-height: 1;
            color: #515a6e;
            text-align: center;
            background-color: #f8f8f9;
            border: 1px solid #dcdee2;
            border-radius: 4px;
            margin-left: -4px;
        }
        .pread-text { line-height: 32px;padding-right: 5px; }
    }
    /deep/ #spin {
        display: none;
    }

    /* 谷歌 */
     input::-webkit-outer-spin-button,
    input::-webkit-inner-spin-button {
        -webkit-appearance: none;
           }

    /* 火狐 */
     input[type="number"]{
             -moz-appearance: textfield;
             }
</style>
