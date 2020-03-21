<template>
  <div>
    <el-dialog
      :title="title"
      :visible.sync="dialogVisible"
      :show-close="false"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      modal-append-to-body
      center
    >
      <span>{{ content }}</span>
      <span slot="footer">
        <el-button @click="handleCancel">{{ cancelTitle }}</el-button>
        <el-button type="primary" @click="handleYes">{{ yesTitle }}</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  props: {
    dialogVisible: Boolean,
    title: String,
    content: String,
    cancelTitle: String,
    yesTitle: String
  },
  data() {
    return {
      visible: false
    };
  },
  methods: {
    handleCancel() {
      this.$emit("on-cancel");
    },
    handleYes() {
      this.$emit("on-yes");
    }
  }
};
</script>