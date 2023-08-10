/**
 * @description 插件
 * @author liqinglin <1740242084@qq.com>
 */

import { Dialog, NavBar, Tabbar, TabbarItem, NumberKeyboard, Toast, setToastDefaultOptions, Collapse, CollapseItem, ShareSheet, BackTop, Skeleton, SkeletonTitle, SkeletonImage, SkeletonAvatar, SkeletonParagraph } from 'vant'

// Toast
import 'vant/es/toast/style'

// Dialog
import 'vant/es/dialog/style'

// Notify
import 'vant/es/notify/style'

// ImagePreview
import 'vant/es/image-preview/style'

// 修改 Toast 默认配置
setToastDefaultOptions({ duration: 600 })

setToastDefaultOptions('loading', { forbidClick: true })

// 放入数组中
const plugins = [Dialog, NavBar, Tabbar, TabbarItem, NumberKeyboard, Toast, Collapse, CollapseItem, ShareSheet, BackTop, Skeleton, SkeletonTitle, SkeletonImage, SkeletonAvatar, SkeletonParagraph]

export default function getVant (app) {
  // 循环数组
  plugins.forEach((item) => {
    return app.use(item)
  })
}
