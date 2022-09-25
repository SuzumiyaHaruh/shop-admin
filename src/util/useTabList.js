import {ref} from 'vue'
import {onBeforeRouteUpdate, useRoute, useRouter} from "vue-router";
import {useCookies} from "@vueuse/integrations/useCookies";

export const useTabList = () => {
    const router = useRouter()
    const route = useRoute()
    const cookie = useCookies()

    const activeTab = ref(route.path)
    const tabList = ref([
        {
            title: '后台首页',
            path: '/'
        },
        {
            title: '商城管理',
            path: '/goods/list'
        }
    ])
    /**
     * 添加标签导航
     */
    const addTab = (tab) => {
        let noTab = tabList.value.findIndex(item => {
            return (item.path === tab.path)
        })
        if (noTab === -1) {
            tabList.value.push(tab)
        }
        cookie.set("tabList", tabList.value)
    }

// 初始化标签导航列表
    const initTabList=()=> {
        let tbs = cookie.get("tabList")
        if (tbs) {
            tabList.value = tbs
        }
    }

    initTabList()
    /**
     *点击标签触发路由跳转
     */
    const changeTab = (path) => {
        activeTab.value = path
        router.push(path)
    }
    /**
     * 关闭
     */
    const removeTab = (t) => {
        let tabs = tabList.value
        let a = activeTab.value
        if (a === t) {
            tabs.forEach((tab, index) => {
                if (tab.path === t) {
                    const nextTab = tabs[index + 1] || tabs[index - 1]
                    if (nextTab) {
                        a = nextTab.path
                    }
                }
            })
        }

        activeTab.value = a
        tabList.value = tabList.value.filter(tab => tab.path !== t)

        cookie.set("tabList", tabList.value)
    }
    /**
     * 监听路由
     */
    onBeforeRouteUpdate((to, from) => {
        activeTab.value = to.path
        addTab({
            title: to.meta.title,
            path: to.path
        })
    })
    /**
     * 下拉菜单事件
     */
    const handleClose = (c) => {
        switch (c) {
            case "clearOther":
                onClearOther()
                break;
            case "clearAll":
                onClearAll()
                break;
        }
    }
    /**
     * 清除其他
     */
    const onClearOther = () => {
        //过滤除自己和首页以外的所有
        tabList.value = tabList.value.filter(item => item.path === '/' || item.path === activeTab.value)
    }
    /**
     * 清除所有
     */
    const onClearAll = () => {
        //切换回首页
        activeTab.value = '/'
        //过滤只剩下首页
        tabList.value = [{
            title: '后台首页',
            path: '/'
        }]
    }
    return {
        activeTab,
        tabList,
        changeTab,
        removeTab,
        handleClose,
    }
}