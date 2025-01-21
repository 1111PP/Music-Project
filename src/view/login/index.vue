<script setup>
import { ref, onMounted, onBeforeMount } from 'vue'
import { useRouter } from 'vue-router'
import { registerAPI, loginAPI } from '@/api/user/index.js'
import { ElMessage } from 'element-plus';
import useUserData from '@/store/user/index.js'

import { storeToRefs } from 'pinia'


const loading = ref(false)
let { userInfo } = storeToRefs(useUserData())

const router = useRouter()

const rules = {
    username: [
        { required: true, message: '请输入账号', trigger: 'blur' },
        { min: 5, max: 10, message: '长度在 5 到 10 个字符', trigger: 'change' }
    ],
    password: [
        { required: true, message: '请输入密码', trigger: 'blur' },
        { min: 5, max: 10, message: '长度在 5 到 10 个字符', trigger: 'change' }
    ]

}


const currStatus = ref(0)
const userStatus = ref(true)
const refForm = ref()

//0:注册 1:登录
const toRegister = () => {
    currStatus.value = 0
    userInfo.value = { username: '', password: '' }
}
const toLogin = () => {
    currStatus.value = 1
    userInfo.value = { username: '', password: '' }
}
//注册
const login = async () => {
    refForm.value.validate().then(async (valid) => {
        if (valid) {
            const r = await registerAPI(userInfo.value);
            if (r?.code === 200) {
                ElMessage.success(r.message + ',请继续登录')
                toLogin()
                userStatus.value = true
            } else {
                ElMessage.error(r.message)
            }
            userInfo.value = {
                username: '',
                password: ''
            }
        }
    })
}
//登录
const enterHome = async () => {
    refForm.value.validate().then(async (valid) => {
        if (valid) {
            const r = await loginAPI({
                username: userInfo.value.username,
                password: userInfo.value.password
            })
            // console.log('登录',r);
            switch (r?.code) {
                case 200:
                    localStorage.setItem('username', userInfo.value.username)
                    // console.log('登录成功', r?.data);
                    ElMessage.success('登录成功')
                    router.push('/')
                    break;
                case 201:
                    ElMessage.error('密码错误')
                    userInfo.value.password = ''
                    break;
                case 203:
                    ElMessage.error('账号不存在,请注册')
                    userStatus.value = false
                    userInfo.value = {
                        username: '',
                        password: ''
                    }
                    break;
                default:
                    ElMessage.error('异常错误')
            }
        }
    })
}


//打字机效果
const typeWrite = ref('H')
let loop = null

onMounted(() => {
    currStatus.value = 1
    print('WELCOME TO\nTHIS PROJECT')
})
onBeforeMount(() => {
    clearInterval(loop)
})

let text = ref('')
// 打印机效果
const print = async (printInfo) => {
    let printText = printInfo
    for (let i = 0; i < printText.length; i++) {
        let str = printText.slice(i, i + 1)
        if (str === '\n') {
            text.value = text.value + '<br>'
        } else {
            await new Promise((resolve) => {
                setTimeout(() => {
                    text.value = text.value + str
                    resolve(null)
                }, 80)
            })
        }
    }
    text.value = text.value
}
</script>

<template>
    <div class="bg">
        <div class="login-container" v-loading="loading">
            <!-- 可拖拽 -->
            <div class="drag"></div>
            <div class="left">
                <div class="title" v-html="text"></div>
                <!-- <div class="desc">关于<span @click="aboutWaiFChat">歪fCHat</span></div> -->
            </div>
            <div class="right">
                <el-form ref="refForm" :model="userInfo" :rules="rules">
                    <el-form-item style="margin-top: 10px;" prop="username">
                        <el-input style="height:50px" class="elInput" placeholder="请输入账号" v-model="userInfo.username"
                            type="text" name="username" />
                    </el-form-item>
                    <el-form-item prop="password">
                        <el-input style="height:50px" class="elInput" placeholder="请输入密码" v-model="userInfo.password"
                            type="text" name="password" />
                    </el-form-item>
                    <div v-if="currStatus == 1">还没有账号?<span @click="toRegister" style="color:blue">去注册</span></div>
                    <div v-else>已有账号?<span @click="toLogin" style="color:blue">去登录</span></div>
                    <el-form-item style="margin-left: 0px;">
                        <el-button v-if="currStatus == 1" type="primary" @click="enterHome">登录</el-button>
                        <el-button v-else type="warning" @click="login">注册</el-button>
                    </el-form-item>
                    <!-- <input type="text" class="inputs user" placeholder="请输入您的账号" v-model="userInfo.phone" />
                    <input type="password" class="inputs pwd" placeholder="请输入您的密码" v-model="userInfo.password" />
                    <div class="tips">
                        <div v-if="currStatus == 1">还没有账号?<span @click="toRegister">去注册</span></div>
                        <div v-else>已有账号?<span @click="toLogin">去登录</span></div>
                    </div>
                    <button v-if="currStatus == 1" @click="enterHome">登录</button>
                    <button v-else @click="login">注册</button> -->
                </el-form>
            </div>
        </div>
        <!-- <WindowsBtn v-if="!proxy.isMac && $route.path !== '/notes'" :color="'#4F4F4F'" /> -->
    </div>
</template>

<style scoped lang="scss">
.drag {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 30px;
    user-select: none;
    -webkit-app-region: drag;
}

@font-face {
    font-family: "Regular";
    font-weight: 400;
    src: url("../../assets/iconfont/login_register.woff2") format("woff2"),
        url("../../assets/iconfont/login_register.woff") format("woff");
    font-display: swap;
}

:deep(.el-input) {
    --el-input-focus-border-color: rgb(209, 200, 200) !important;
    --el-input-focus-bg-color: white !important;
}

:deep(.el-input__wrapper) {
    background: linear-gradient(to right, #eaf0fa, #f8eef7) !important;
    border-radius: 10px !important;
}

.bg {
    width: 100vw;
    height: 100vh;
    // background-color: #121212;
    display: flex;
    justify-content: center;
    align-items: center;
}

.login-container {
    width: 1000px;
    height: 600px;
    display: flex;
    position: absolute;
    top: 50%;
    transform: translate(-50%, -50%);
    left: 50%;

    .left {
        width: 100%;
        height: 100%;
        flex: 16;
        position: relative;
        display: flex;
        flex-direction: column;
        padding: 20% 0;
        box-sizing: border-box;

        &::before {
            content: '';
            position: absolute;
            top: 40%;
            left: 30%;
            width: 280px;
            height: 100px;
            background: linear-gradient(to right, #4460f1, #c471ed, #f64f59);
            filter: blur(70px);
            transition: all .5s;
        }

        &:has(.desc:hover) {
            &::before {
                filter: blur(55px);
            }
        }

        .title {
            width: 100%;
            height: 120px;
            line-height: 60px;
            font-size: 40px;
            font-weight: bold;
            font-family: Regular;
            padding-left: 25%;
            box-sizing: border-box;
            color: var(--login-text-color);
            z-index: 2;
        }

        .desc {
            font-size: 15px;
            font-weight: bold;
            padding-left: 45%;
            margin-top: 10px;
            color: var(--login-about-color);
            cursor: pointer;
            z-index: 2;

            span {
                color: #5140f0;
                text-decoration: underline;
            }
        }
    }

    .right {
        flex: 18;
        height: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;

        .inputs {
            display: block;
            width: 290px;
            height: 55px;
            border-radius: 10px;
            border: 0;
            background-color: var(--login-input-bg-color);
            color: var(--login-input-text-color);
            outline: none;
            padding: 20px;
            box-sizing: border-box;
            font-size: 15px;

            &::-webkit-input-placeholder {
                font-size: 13.5px;
            }
        }

        .user {
            margin-bottom: 25px;
        }

        .tips {
            width: 290px;
            text-align: right;
            margin-top: 10px;
            color: var(--login-tips-color);
            font-size: 13px;

            span {
                color: rgb(68, 96, 241);
                cursor: pointer;
            }
        }

        button {
            width: 290px;
            height: 50px;
            background-color: #4460f1;
            border-radius: 10px;
            font-size: 15px;
            color: var(--login-button-text-color);
            border: 0;
            font-weight: 600;
            margin: 30px 0;
            cursor: pointer;
            box-shadow: #4460f1 0 20px 30px -10px;
            transition: box-shadow .3s;

            &:hover {
                box-shadow: #4460f1 0 10px 30px -10px;
            }
        }
    }
}
</style>