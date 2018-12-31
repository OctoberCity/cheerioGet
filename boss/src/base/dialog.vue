<template>
  <div class="dialog">
    <el-dialog :visible.sync="dialogVisible" width="100%" top="100px" modal-append-to-body="false" :before-close="handleClose">
      <slot></slot>
      <div class="foot-body">
        <div class="self-botton-cancel " @click="handleClose">取 消</div>
        <div class="self-botton-commit" type="primary" @click="commitQuery">确 定</div>
      </div>
    </el-dialog>
  </div>
</template>
<script>
export default {
  data () {
    return {

    }
  },
  props: {
    dialogVisible: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    handleClose (done) {
      this.$emit('on-close')
    },
    commitQuery () {
      this.handleClose()
      this.$emit('commitQuery')
    }
  },
  watch () {}
}

</script>
<style>
  .foot-body {
    padding: 0px;
    margin: 0px;
    display: flex;
    text-align: center;
  }

  .self-botton-cancel {
    background: #fff;
    color: #000;
    width: 50%;
    padding:5px 0;
  }
  .self-botton-commit {
    background: #4fc08d;
    color: #fff;
    width: 50%;
    padding:5px 0;

  }

  .el-dialog__header {
    display: none;
  }

  .el-dialog__body {
    padding: 0;
  }

</style>
