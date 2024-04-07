<script  setup>
import { ref, onMounted, onBeforeMount } from 'vue'
import { useRouter } from 'vue-router'
import useUserData from '@/store/user/index.js'
import { registerAPI, loginAPI } from '@/api/user/index.js'
import { ElMessage } from 'element-plus'
const router = useRouter()
const userInfo = ref({
    username: '',
    password: ''
})
const rules = {
    username: [
        { required: true, message: 'Please Input Account', trigger: 'blur' },
        { min: 1, max: 5, message: '长度在 1 到 5 个字符', trigger: 'change' }
    ],
    password: [
        { required: true, message: 'Please Input Password', trigger: 'blur' },
        { min: 1, max: 5, message: '长度在 1 到 5 个字符', trigger: 'change' }
    ]

}
const userStatus = ref(true)
const refForm = ref()
//注册
const login = async () => {
    refForm.value.validate().then(async (valid) => {
        if (valid) {
            const r = await registerAPI(userInfo.value);
            if (r?.code === 200) {
                ElMessage({
                    type: 'success',
                    message: r.data + ',请继续登录',
                })
                userStatus.value = true
            } else {
                ElMessage({
                    type: 'error',
                    message: r.data,
                })
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
            const r = await loginAPI(userInfo.value)
            console.log(r);
            switch (r?.code) {
                case 200:
                    console.log(r.data);
                    alert('登录成功')
                    router.push('/home')
                    break;
                case 201:
                    alert('密码错误')
                    userInfo.value.password = ''
                    break;
                case 202:
                    alert('账号不存在,请注册')
                    userStatus.value = false
                    userInfo.value = {
                        username: '',
                        password: ''
                    }
                    break;
                default:
                    alert('异常错误')
            }
        }
    })
}
//token
//有：正常操作
//无：跳转登录
//登录：首次登录 => 无token => 后端返回token => 存入localstore中 => toHome
//注册：无token => 注册成功 => 跳转登陆界面
//退出：清除token

//后端
//登录成功 => 根据用户身份生成token => 分发token
//后续请求操作 => 请求拦截器携带token => 后端中间件中检查token => 检查通过next()放行

//打字机效果
const typeWrite = ref('H')
let loop = null
const print = () => {
    const text = 'Hello My Friend!'
    let current = 1
    let status = 1
    loop = setInterval(() => {
        //增长状态
        if (status) {
            typeWrite.value = text.slice(0, current)
            current++
            if (current === text.length + 1) {
                status = 0
            }
        }
        //倒退状态
        else {
            typeWrite.value = text.slice(0, current)
            current--
            if (current === 1) {
                status = 1
            }
        }

    }, 200)
}
onMounted(() => {
    print()
})
onBeforeMount(() => {
    clearInterval(loop)
})
</script>

<template>
    <div class='container'>
        <div class="typeWrite"> {{ typeWrite }}</div>
        <el-form class="form" ref="refForm" :model="userInfo" :rules="rules">
            <el-form-item style="margin-top: 10px;" prop="username" label="账号">
                <el-input class="elInput" v-model="userInfo.username" type="text" name="username" />
            </el-form-item>
            <el-form-item prop="password" label="密码">
                <el-input class="elInput" v-model="userInfo.password" type="text" name="password" />
            </el-form-item>
            <el-form-item style="margin-left: 35px;">
                <el-button v-if="userStatus" type="primary" @click="enterHome">登录</el-button>
                <el-button v-if="!userStatus" type="warning" @click="login">注册</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<style scoped lang='scss'>
.container {
    // margin-top: 200px;
    height: 100%;
    display: flex;
    flex-flow: column;
    justify-content: center;
    align-items: center;

    .typeWrite {
        font-size: 30px;
        font-weight: 700;
        margin: 150px 0 100px 0;
    }

    .form {
        height: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        margin-left: -45px;

        .elInput {
            border: .5px solid gray;
            border-radius: 5px;
        }
    }
}
</style>