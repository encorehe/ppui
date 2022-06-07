<template>
    <Upload
            multiple
            type="drag"
            paste
            accept=".png,.gif,.jpg,.jpeg,.pdf"
            :on-max-num-error="handleMaxNumError"
            :on-format-error="handleFormatError"
            :getData="getData"
            header="{sellerUserId: 64,user_token: 44d3522b-4f77-411a-8dca-2a9691e7f6a7}"
            :format="['png','gif','jpg','jpeg','pdf']"
            action="http://api.swydev111.315wy.cn/file/commonFile/uploadImages">
        <div style="padding: 20px 0">
            <Icon type="ios-cloud-upload" size="52" style="color: #3399ff"></Icon>
            <p>Click or drag files here to upload</p>
        </div>
    </Upload>
</template>
<script>
    export default {
        methods: {
            getData(){
                return {fileName: '20200203042029_LjvTK.jpeg',source: 'PC',fileParentType: '3',fileParentId: -1}
            },
            handleFormatError(file) {

            },
            handleMaxNumError(fileList){
                return alert('message');
            },
            beforeUpload(file,fileList){
                console.log(file);
            }
        },
    }
</script>
