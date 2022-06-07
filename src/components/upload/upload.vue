<template>
    <div :class="[prefixCls]">
        <div
            :class="classes"
            @click="handleClick"
            @drop.prevent="onDrop"
            @paste="handlePaste"
            @dragover.prevent="dragOver = true"
            @dragleave.prevent="dragOver = false">
            <input
                ref="input"
                type="file"
                :class="[prefixCls + '-input']"
                @change="handleChange"
                :multiple="multiple"
                :accept="isAccept">
            <slot></slot>
        </div>
        <slot name="tip"></slot>
        <upload-list
            v-if="showUploadList"
            :files="fileList"
            :listItemDel="listItemDel"
            @on-file-remove="handleRemove"
            @on-file-preview="handlePreview"></upload-list>
    </div>
</template>
<script>
    import UploadList from './upload-list.vue';
    import getMimeTypes from './mimeType'
    import ajax from './ajax';
    import { oneOf } from '../../utils/assist';
    import Emitter from '../../mixins/emitter';
    import mixinsForm from '../../mixins/form';

    const prefixCls = 'ivu-upload';

    export default {
        name: 'Upload',
        mixins: [ Emitter, mixinsForm ],
        components: { UploadList },
        props: {
            action: {
                type: String,
                required: true
            },
            headers: {
                type: Object,
                default () {
                    return {};
                }
            },
            multiple: {
                type: Boolean,
                default: false
            },
            data: {
                type: Object
            },
            getData:{
                type:Function
            },
            name: {
                type: String,
                default: 'file'
            },
            withCredentials: {
                type: Boolean,
                default: false
            },
            showUploadList: {
                type: Boolean,
                default: true
            },
            type: {
                type: String,
                validator (value) {
                    return oneOf(value, ['select', 'drag']);
                },
                default: 'select'
            },
            format: {
                type: Array,
                default () {
                    return [];
                }
            },
            accept: {
                type: String
            },
            maxSize: {
                type: Number
            },
            maxNum:{
                type:Number,
                default:0
            },
            beforeUpload: Function,
            onProgress: {
                type: Function,
                default () {
                    return {};
                }
            },
            onSuccess: {
                type: Function,
                default () {
                    return {};
                }
            },
            onError: {
                type: Function,
                default () {
                    return {};
                }
            },
            onRemove: {
                type: Function,
                default () {
                    return {};
                }
            },
            onPreview: {
                type: Function,
                default () {
                    return {};
                }
            },
            onExceededSize: {
                type: Function,
                default () {
                    return {};
                }
            },
            onFormatError: {
                type: Function,
                default () {
                    return {};
                }
            },
            onMaxNumError: {
                type: Function,
                default () {
                    return {};
                }
            },
            defaultFileList: {
                type: Array,
                default() {
                    return [];
                }
            },
            paste: {
                type: Boolean,
                default: false
            },
            disabled: {
                type: Boolean,
                default: false
            },
            listItemDel:{
                type: Boolean,
                default: true
            }
        },
        data () {
            return {
                prefixCls: prefixCls,
                dragOver: false,
                fileList: [],
                errFile:[],
                postFiles:[],
                tempIndex: 1,
                isAccept: ''
            };
        },
        computed: {
            classes () {
                return [
                    `${prefixCls}`,
                    {
                        [`${prefixCls}-select`]: this.type === 'select',
                        [`${prefixCls}-drag`]: this.type === 'drag',
                        [`${prefixCls}-dragOver`]: this.type === 'drag' && this.dragOver
                    }
                ];
            }

        },
        methods: {
            setFileList(fileList){
                this.fileList = fileList;
            },
            handleClick () {
                if (this.itemDisabled) return;
                this.$refs.input.click();
            },
            handleChange (e) {
                const files = e.target.files;
                if (!files) {
                    return;
                }
                let { maxNum } = this;
                //判断最大上传次数
                if(maxNum && files.length>maxNum) {
                    return this.onMaxNumError(files);
                }
                this.postFiles = [];
                this.errFile=[];
                this.uploadFiles(files);
                this.$refs.input.value = null;
            },
            onDrop (e) {
                this.dragOver = false;
                if (this.itemDisabled) return;
                this.uploadFiles(e.dataTransfer.files);
            },
            handlePaste (e) {
                if (this.itemDisabled) return;
                if (this.paste) {
                    this.uploadFiles(e.clipboardData.files);
                }
            },
            uploadFiles (files) {
                let postFiles = Array.prototype.slice.call(files);
                if (!this.multiple) postFiles = postFiles.slice(0, 1);
                if (postFiles.length === 0) return;
                if (this.beforeUpload) {
                    return this.beforeUpload(files);
                }
                this.postFiles = postFiles;
                postFiles.forEach(file => {
                    this.upload(file);
                });
            },
            upload (file) {
                let isCheckFormat = this.checkFormat(file);
                let isCheckSize = this.checkSize(file);
                debugger
                if(!isCheckFormat || !isCheckSize) {
                    this.errFile.push(file);
                    return false;
                }
                if (!this.beforeUpload) {
                    return this.post(file);
                }
                let errFile = this.errFile;
                let successFile = [];
                this.postFiles.forEach(item => {
                    let findx = null;
                    if(errFile && errFile.length>0) findx = errFile.find(items => items.name == item.name && items.size == item.size);
                    if(!findx) successFile.push(item);
                })
                const before = this.beforeUpload(file,successFile);
                if (before && before.then) {
                    before.then(processedFile => {
                        if (Object.prototype.toString.call(processedFile) === '[object File]') {
                            this.post(processedFile);
                        } else {
                            this.post(file);
                        }
                    }, () => {
                        // this.$emit('cancel', file);
                    });
                } else if (before !== false) {
                    this.post(file);
                } else {
                    // this.$emit('cancel', file);
                }
            },
            checkFormat(file){
                //检查格式
                let isCheck = true;
                if (this.format.length) {
                    const _file_format = file.name.split('.').pop().toLocaleLowerCase();
                    debugger
                    const checked = this.format.some(item => item.toLocaleLowerCase() === _file_format);
                    if (!checked) {
                        this.onFormatError(file, this.fileList);
                        isCheck = false;
                    }
                }
                debugger
                return isCheck;
            },
            checkSize(file){
                //检查文件大小
                let isCheck = true;
                if (this.maxSize) {
                    if (file.size > this.maxSize * 1024*1024) {
                        this.onExceededSize(file, this.fileList);
                        isCheck = false;
                    }
                }
                return isCheck;
            },
            post (file) {
                // check format
                // if (this.format.length) {
                //     const _file_format = file.name.split('.').pop().toLocaleLowerCase();
                //     const checked = this.format.some(item => item.toLocaleLowerCase() === _file_format);
                //     if (!checked) {
                //         this.onFormatError(file, this.fileList);
                //         return false;
                //     }
                // }


                this.handleStart(file);
                let formData = new FormData();
                formData.append(this.name, file);

                ajax({
                    headers: this.headers,
                    withCredentials: this.withCredentials,
                    file: file,
                    data: this.getData(file),
                    filename: this.name,
                    action: this.action,
                    onProgress: e => {
                        this.handleProgress(e, file);
                    },
                    onSuccess: res => {
                        this.handleSuccess(res, file);
                    },
                    onError: (err, response) => {
                        this.handleError(err, response, file);
                    }
                });
            },
            handleStart (file) {
                file.uid = Date.now() + this.tempIndex++;
                const _file = {
                    status: 'uploading',
                    name: file.name,
                    size: file.size,
                    percentage: 0,
                    uid: file.uid,
                    showProgress: true
                };

                this.fileList.push(_file);
            },
            getFile (file) {
                const fileList = this.fileList;
                let target;
                fileList.every(item => {
                    target = file.uid === item.uid ? item : null;
                    return !target;
                });
                return target;
            },
            handleProgress (e, file) {
                const _file = this.getFile(file);
                this.onProgress(e, _file, this.fileList);
                _file.percentage = e.percent || 0;
            },
            handleSuccess (res, file) {
                const _file = this.getFile(file);

                if (_file) {
                    _file.status = 'finished';
                    _file.response = res;

                    this.onSuccess(res, _file, this.fileList);
                    this.dispatch('FormItem', 'on-form-change', _file);

                    setTimeout(() => {
                        _file.showProgress = false;
                    }, 1000);
                }
            },
            handleError (err, response, file) {
                const _file = this.getFile(file);
                const fileList = this.fileList;

                _file.status = 'fail';

                fileList.splice(fileList.indexOf(_file), 1);

                this.onError(err, response, file);
            },
            handleRemove(file) {
                const fileList = this.fileList;
                fileList.splice(fileList.indexOf(file), 1);
                this.onRemove(file, fileList);
            },
            handlePreview(file,type) {
                if (file.status === 'finished') {
                    this.onPreview(file,type);
                }
            },
            clearFiles() {
                this.fileList = [];
            }
        },
        watch: {
            defaultFileList: {
                immediate: true,
                handler(fileList) {
                    this.fileList = fileList.map(item => {
                        item.status = 'finished';
                        item.percentage = 100;
                        item.uid = Date.now() + this.tempIndex++;
                        return item;
                    });
                }
            },
            format: {
                immediate: true,
                handler(v) {
                    let str = '';
                    if(v&&v.length>0) {
                        str = getMimeTypes(v);
                    }
                    if(this.accept) str+=this.accept+',';
                    this.isAccept = str;
                }
            }
        },
    };
</script>
