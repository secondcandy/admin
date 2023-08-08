<template>
    <div class="login_container">
        <el-row>
            <el-col :span="8" :xs="0"></el-col>
            <el-col :span="8" :xs="24" class="login_position">
                <el-form class="login_form" :model="loginForm" :rules="rules" ref="loginForms">
                    <h1>Hello</h1>
                    <h2>欢迎使用本网站</h2>
                    <el-form-item prop="username">
                        <el-input type="text" :prefix-icon="User" v-model="loginForm.username"
                            placeholder="请输入账号"></el-input>
                    </el-form-item>
                    <el-form-item prop="password">
                        <el-input type="password" :prefix-icon="Lock" v-model="loginForm.password" show-password
                            placeholder="请输入密码"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button class="login_btn" :loading="loading" type="primary" size="default" @click="login">
                            登录
                        </el-button>
                    </el-form-item>
                </el-form>
            </el-col>
            <el-col :span="8" :xs="0"></el-col>
        </el-row>
    </div>
</template>

<script setup lang="ts">
import { User, Lock } from '@element-plus/icons-vue'
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
// 引入用户相关的小仓库
import userStore from '@/store/modules/user'
// 引入提示信息
import { ElNotification } from 'element-plus'
// 引入时间信息
import helloTime from '@/utils/time'
// 获取el-form组件
let loginForms = ref()
// 获取路由器
let $router = useRouter()
// 获取小仓库
let useStore = userStore()
// 收集账号密码信息
let loginForm = reactive({ username: '', password: '' })
// 定义变量控制按钮加载效果
let loading = ref(false)

// 登录按钮的回调
const login = async () => {
    // 验证表单数据符合规范
    await loginForms.value.validate()
    loading.value = true
    // 通知仓库发送登录请求
    // 请求成功->跳转到首页
    // 请求失败->弹出失败登录信息
    try {
        await useStore.userLogin(loginForm)
        $router.push('/')
        // 登陆成功的提示信息
        ElNotification({
            type: 'success',
            message: `Hi!${helloTime}好`,
        })
        // 登录成功加载效果也消失
        loading.value = false
    } catch (error) {
        // 登录失败加载效果消失
        loading.value = false
        console.log(error)
        //登录失败的提示信息
        ElNotification({
            type: 'error',
            message: (error as Error).message,
        })
    }
}

// 自定义校验用户名规则
function validatorUserName(rule: any, value:any, callback: any) {
    // rule即为校验规则对象
    // value即为表单元素的文本内容
    // callback是函数:如果符合条件，callback放行，即为通过校验，如果不符合条件，callback方法，注入错误信息
    if (value.length >= 5 && value.length <= 10) {
        callback()
    } else {
        callback(new Error('账号长度应为6-10位'))
    }
}
// 自定应校验密码规则
function validatorPassWord(rule: any, value:any, callback: any) {
    if (value.length >= 6 && value.length <= 15) {
        callback()
    } else {
        callback(new Error('密码长度应为6-15位'))
    }
}
// 定义表单校验需要的配置对象
const rules = {
    username: [
        // { required: true, message: '用户名不能为空', trigger: "blur" },
        // { required: true, min: 6, max: 10, message: '账号长度至少6位,至多10位', trigger: "change" }
        { trigger: 'change', validator: validatorUserName }
    ],
    password: [
        // { required: true, message: '密码不能为空', trigger: "blur" },
        // { required: true, min: 6, max: 15, message: '密码长度应在6-15位之间', trigger: "change" }
        { trigger: 'change', validator: validatorPassWord }
    ]
}
</script>

<style scoped lang="scss">
.login_container {
    width: 100%;
    height: 100vh;
    background: url('@/assets/images/background_test.jpg') no-repeat;
    background-size: cover;
}

.login_position {
    display: flex;
    justify-content: center;
    align-content: center;
}

.login_form {
    position: relative;
    width: 80%;
    top: 30vh;
    background: url('@/assets/images/login_form.png') no-repeat;
    background-size: cover;
    padding: 40px;

    h1 {
        color: white;
        font-size: 40px;
    }

    h2 {
        color: white;
        margin: 20px 0;
    }

    .login_btn {
        width: 100%;
    }
}
</style>
