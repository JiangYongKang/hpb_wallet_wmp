import Taro, { Component } from '@tarojs/taro'
import Index from './pages/index'

import './app.less'

class App extends Component {
    config = {
        pages: [
            'pages/launch/index',
            'pages/dummy/index',

            'pages/index/index',
            'pages/index/create_wallet',
            'pages/index/create_wallet_success',
            'pages/index/backup_wallet',
            'pages/index/confirm_mnemonic',

            'pages/me/index'
        ],
        window: {
            backgroundTextStyle: 'light',
            navigationBarTitleText: 'HPB Wallet',
            navigationBarTextStyle: 'white',
            navigationBarBackgroundColor: '#2E2F47'
        },
        tabBar: {
            color: '#babdc1',
            selectedColor: '#334364',
            list: [
                {
                    text: '钱包',
                    pagePath: 'pages/index/index',
                    iconPath: 'resources/funds.png',
                    selectedIconPath: 'resources/fund_selected.png'
                },
                {
                    text: '我的',
                    pagePath: 'pages/me/index',
                    iconPath: 'resources/me.png',
                    selectedIconPath: 'resources/me_selected.png'
                }
            ]
        },
        cloud: true
    }

    componentDidMount() {
        if (process.env.TARO_ENV === 'weapp') {
            Taro.cloud.init()
        }
    }

    componentDidShow() {}

    componentDidHide() {}

    componentDidCatchError() {}

    render() {
        return <Index />
    }
}

Taro.render(<App />, document.getElementById('app'))
