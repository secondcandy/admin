// 小仓库:layout组件相关配置仓库
import { defineStore } from "pinia";

let useLayOutSettingStore = defineStore('SettingStore',{
    state:()=>{
        return{
            fold:false, //用户用于控制菜单折叠或收起
            refresh:false //用户用于控制刷新效果
        }
    }
})

export default useLayOutSettingStore