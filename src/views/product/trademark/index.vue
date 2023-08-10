<template>
    <div>
        <el-card class="box-card">
            <!-- 卡片顶部添加品牌按钮 -->
            <el-button type="primary" icon="Plus" @click="addTrademark">添加品牌</el-button>
            <!-- 表格组件：用于展示已有的品牌数据 -->
            <!-- 
            table
            ----boder:设置表格纵向是否有边框
            ----label:设置某列是否有标题及标题内容
            ----width:设置某列的宽度
            ----align:设置某列的对齐方式
         -->
            <el-table style="margin:10px 0;" border :data="trademarkArr">
                <el-table-column label="序号" width="80px" align="center" type="index"></el-table-column>
                <!-- el-table-column:默认展示数据用div -->
                <el-table-column label="品牌名称" property="tmName" align="center">
                    <template #="{ row, $index }">
                        <pre>{{ row.tmName }}</pre>
                    </template>
                </el-table-column>
                <el-table-column label="品牌LOGO">
                    <template #="{ row, $index }">
                        <img :src="RegExp(/http:/).exec(row.logoUrl) ? row.logoUrl : '/img_not_found.png'" alt=""
                            style="width:100px;height:100px;border-radius: 5px;object-fit: cover;box-shadow: 0 0 10px #D8D8D8;-webkit-user-drag:none;">
                    </template>
                </el-table-column>
                <el-table-column label="品牌操作">
                    <template #="{ row, $index }">
                        <el-button type="warning" icon="Edit" size="small" @click="updateTrademark(row)"></el-button>
                        <el-button type="danger" icon="Delete" size="small"></el-button>
                    </template>
                </el-table-column>
            </el-table>
            <!-- 分页器组件
            pagination 
                v-mode:current-page:设置分页器当前页码
                v-model:page-size:设置每页展示数据的条数
                :page-sizes:用于设置下拉菜单数据
                :background:用于设置分页器选页按钮是否有背景颜色
                layout:用于设置分页器六个子组件的布局调整
        -->
            <el-pagination :pager-count="9" @size-change="sizeChange" @current-change="getHasTrademark"
                v-model:current-page="pageNo" v-model:page-size="limit" :page-sizes="[3, 5, 7, 9]"
                layout="prev,pager,next,jumper,->,sizes,total" :total="total" />
        </el-card>
        <!-- 对话框组件 -->
        <!-- v-model属性，用于控制对话框显示于隐藏,true显示,false隐藏 -->
        <el-dialog v-model="dialogFormVisible" :title="dialogTitle">
            <el-form style="width:80%" :model="trademarkParmas" :rules="rules" ref="formRef">
                <el-form-item label="品牌名称" label-width="100px" prop="tmName">
                    <el-input placeholder="请输入品牌名称" v-model="trademarkParmas.tmName"></el-input>
                </el-form-item>
                <el-form-item label="品牌LOGO" label-width="100px" prop="logoUrl">
                    <!-- el-upload
                        action:上传图片的请求地址
                    -->
                    <el-upload class="avatar-uploader" action="/api/admin/product/fileUpload" :show-file-list="true"
                        :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload">
                        <img v-if="trademarkParmas.logoUrl" :src="trademarkParmas.logoUrl" class="avatar" />
                        <el-icon v-else class="avatar-uploader-icon">
                            <Plus />
                        </el-icon>
                    </el-upload>
                </el-form-item>
            </el-form>
            <!-- 具名插槽：footer -->
            <template #footer>
                <el-button @click="cancel">取消</el-button>
                <el-button type="primary" @click="confirm">确定</el-button>
            </template>
        </el-dialog>
    </div>
</template>

<script setup lang="ts">
// 引入组合式APIref
import { ref, onMounted, reactive } from 'vue'
import { reqHasTrademark, reqAddOrUpdateTrademark } from '@/api/product/trademark/index'
import type { Records, TradeMarkResponseData, TradeMark } from '@/api/product/trademark/type'
import type { UploadProps } from 'element-plus'
import { ElMessage } from 'element-plus'
// 当前页码
let pageNo = ref<number>(1)
// 定义每页展示数据条数
let limit = ref<number>(3)
// 存储已有品牌数据
let trademarkArr = ref<Records>([])
// 获取已有品牌的接口封装为函数
// 存储已有的品牌数据总是
let total = ref<number>(0)
// 控制对话框显示与隐藏属性
let dialogFormVisible = ref<boolean>(false)
// 控制对话框标题
let dialogTitle = ref<string>('')
// 定义一个收集新增品牌数据
let trademarkParmas = reactive<TradeMark>({
    tmName: '',
    logoUrl: ''
})
// 获取el-form组件实例
const formRef = ref()
// 表单校验对象规则
const rules = {
    tmName: [
        { required: true, trigger: 'blur', validator: validatortmName }
    ],
    logoUrl: [{ required: true, validator: validatorLogoUrl }]
}
const getHasTrademark = async (pager = 1) => {
    // 当前页码
    pageNo.value = pager
    let result: TradeMarkResponseData = await reqHasTrademark(pageNo.value, limit.value)
    // console.log(result)
    total.value = result.data.total
    trademarkArr.value = result.data.records
}
// 组件挂载完毕，获取一次请求
onMounted(() => {
    getHasTrademark()
})
// 当前页码发生变化时，会调用下方函数
// 对于当前页码发生变化的自定义事件，组件pagination父组件回传了数据（当前页码）
// function changePageNo(){
//     getHasTrademark()
// }

function sizeChange() {
    // 当前每页数据量发生变化时，页码数归1
    getHasTrademark()
}
// 添加品牌
function addTrademark() {
    dialogFormVisible.value = true
    dialogTitle.value = '添加品牌'
    // 清空收集的数据
    trademarkParmas.tmName = ''
    trademarkParmas.logoUrl = ''
    delete trademarkParmas.id
    formRef.value?.clearValidate()
}

// 编辑品牌信息
// row即为当前已有的品牌
function updateTrademark(row: TradeMark) {
    formRef.value?.clearValidate()
    dialogFormVisible.value = true
    dialogTitle.value = '修改品牌'
    // trademarkParmas.logoUrl = row.logoUrl
    // trademarkParmas.tmName = row.tmName
    // trademarkParmas.id = row.id
    Object.assign(trademarkParmas, row)
    // console.log(trademarkParmas)
    // reqAddOrUpdateTrademark(trademarkParmas)
}

// 对话框底部取消按钮
function cancel() {
    // 对话框隐藏
    dialogFormVisible.value = false
}

// 对话框底部确定按钮
const confirm = async () => {
    // 在发送请求之前，验证表单是否合规
    await formRef.value.validate()
    // 对话框隐藏
    let result = await reqAddOrUpdateTrademark(trademarkParmas)
    if (result.code == 200) {
        // 关闭对话框
        dialogFormVisible.value = false
        // 弹出提示信息
        ElMessage({
            type: 'success',
            message: `${dialogTitle.value}成功`
        })
        // 修改后清空trademarkParmas数据内的ID
        // console.log(trademarkParmas)
        // 再次发请求，获取已有的全部数据
        getHasTrademark(trademarkParmas.id ? pageNo.value : 1)
    } else {
        ElMessage({
            type: 'error',
            message: `${dialogTitle.value}失败`
        })
    }
    dialogFormVisible.value = false

}

// 上传图片组件->上传图片之前触发的钩子函数
const beforeAvatarUpload: UploadProps['beforeUpload'] = (rawFile) => {
    // 要求:上传图片格式jpg|png|gif 4m
    if (rawFile.type == 'image/png' || rawFile.type == 'image/jpeg' || rawFile.type == 'image/gif') {
        if (rawFile.size / 1024 / 1024 < 4) {
            return true
        } else {
            ElMessage({
                type: 'error',
                message: '上传的文件大小务必小于4MB'
            })
            return false
        }
    } else {
        ElMessage({
            type: 'error',
            message: '上传的文件格式务必是PNG|JPG|GIF'
        })
        return false
    }
}

// 图片上传成功的钩子
const handleAvatarSuccess: UploadProps['onSuccess'] = (response) => {
    // response即为当前这次上传图片post请求服务器返回的数据
    // 收集上传的图片地址
    trademarkParmas.logoUrl = response.data
    // console.log(trademarkParmas.logoUrl)
    // 如果图片上传成功，清除掉表单校验信息
    formRef.value.clearValidate('logoUrl')
}

// 品牌校验自定义tmName校验规则
function validatortmName(rule: any, value: any, callBack: any) {
    // 自定义校验规则
    if (value.trim().length >= 2 && value.trim().length <= 12) {
        callBack()
    } else {
        // 校验未通过展示的错误信息
        callBack(new Error('品牌名称应2-12位'))
    }
}
// 品牌校验自定义logoUrl校验规则
function validatorLogoUrl(rule: any, value: any, callBack: any) {
    // 如果图片上传完毕
    if (value) {
        callBack()
    } else {
        callBack(new Error('LOGO图片务必上传'))
    }
}
</script>

<style scoped></style>
<style scoped>
.avatar-uploader .avatar {
    width: 178px;
    height: 178px;
    display: block;
}
</style>

<style>
.avatar-uploader .el-upload {
    border: 1px dashed var(--el-border-color);
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    transition: var(--el-transition-duration-fast);
}

.avatar-uploader .el-upload:hover {
    border-color: var(--el-color-primary);
}

.el-icon.avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    text-align: center;
}
</style>
