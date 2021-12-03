<template>
    <Upload
            multiple
            type="drag"
            paste
            accept=".png,.gif,.jpg,.jpeg"
            :on-format-error="handleFormatError"
            :beforeUpload="beforeUpload"
            :format="['png','gif','jpg']"
            action="//jsonplaceholder.typicode.com/posts/">
        <div style="padding: 20px 0">
            <Icon type="ios-cloud-upload" size="52" style="color: #3399ff"></Icon>
            <p>Click or drag files here to upload</p>
        </div>
    </Upload>
</template>
<script>
    export default {
        methods: {
            handleFormatError(file) {
                debugger
            },
            beforeUpload(file,fileList){
                debugger
            }
        },
    }
</script>
