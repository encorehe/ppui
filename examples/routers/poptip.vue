<template>
    <div>
        <Poptip confirm title="您正在批量设置中防认证，请确认？" content="设置为中防认证后，订单包含认证商品时，商品发货后会在订单列表、订单详情显示保单管理入口" transfer @on-ok="online(0)">
            <Button>中防认证</Button>
        </Poptip>
        <Poptip trigger="hover" title="Title" content="content">
            <Button>Hover</Button>
        </Poptip>
        <Poptip title="Title" content="content">
            <Button>Click</Button>
        </Poptip>
        <Poptip trigger="focus" title="Title" content="content">
            <Button>Focus</Button>
        </Poptip>
        <Poptip trigger="focus" title="Title" content="content">
            <Input placeholder="Input focus" />
        </Poptip>
    </div>
</template>
<script>
    export default {

    }
</script>
