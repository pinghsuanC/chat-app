const zh = {
  TOOLBAR: {
    THEME: '主题',
    LANGUAGE: '语言',
  },
  SIDEBAR: {
    SEARCH_PLACEHOLDER: '查找或开始对话',
    DIRECT_MESSAGES: '私信',
    NO_RESULTS: '未找到结果',
  },
  REGISTER: {
    CREATE_ACCOUNT: '创建账号',
    CHECK_EMAIL: '我们已向 {{email}} 发送了验证码',
    STEP_DETAILS: '填写信息',
    STEP_VERIFY: '验证邮箱',
    USERNAME: '用户名',
    CONFIRM_PASSWORD: '确认密码',
    PASSWORDS_DONT_MATCH: '两次密码不一致',
    CONTINUE: '继续',
    VERIFICATION_CODE: '验证码',
    CODE_HINT: '如果1分钟内未收到，请重新发送验证码',
    VERIFY: '验证邮箱',
    BACK: '返回',
    HAVE_ACCOUNT: '已有账号？',
  },

  AUTH: {
    WELCOME_BACK: '欢迎回来！',
    EMAIL: '邮箱',
    PASSWORD: '密码',
    LOGIN: '登录',
    OR: '或',
    CONTINUE_WITH_GOOGLE: '使用 Google 继续',
    NO_ACCOUNT: '还没有账号？',
    REGISTER: '注册',
  },

  CHAT: {
    EMPTY_HISTORY_LINE1: '这是你与以下用户私信历史的开始：',
    MESSAGE_PLACEHOLDER: '发消息给 @{{name}}',
    SEND_HINT: '按 <0>Enter</0> 发送 · <1>Shift+Enter</1> 换行',
    SEND_TITLE: '发送消息',
  },
} as const

export default zh
