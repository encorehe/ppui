<template>
    <Upload
            multiple
            type="drag"
            paste
            accept=".mp4"
            :format="['audio/mp4','video/mp4']"
            action="//jsonplaceholder.typicode.com/posts/">
        <div style="padding: 20px 0">
            <Icon type="ios-cloud-upload" size="52" style="color: #3399ff"></Icon>
            <p>Click or drag files here to upload</p>
        </div>
    </Upload>
</template>
<script>
    export default {

    }
</script>
