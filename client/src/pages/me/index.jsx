import Taro, { Component } from '@tarojs/taro'
import { View, Text, Button } from '@tarojs/components'

import shareBG from '../../resources/share_bg.png'
import icon from '../../resources/icon.png'
import manage from '../../resources/manage.png'
import right from '../../resources/right.png'
import tran_records from '../../resources/tran_records.png'
import addresses from '../../resources/addresses.png'
import setting from '../../resources/setting.png'
import info from '../../resources/info.png'
import help from '../../resources/help.png'

import './index.less'

export default class Index extends Component {
    config = {
        navigationBarTitleText: '我的'
    }

    componentWillMount() {}

    componentDidMount() {}

    componentWillUnmount() {}

    componentDidShow() {}

    componentDidHide() {}

    render() {
        return (
            <View className='container'>
                <View className='me_wrap'>
                    <View
                        className='share_wrap'
                        style={{
                            backgroundImage:
                                'url(https://7368-shoes-wmp-84021c-1254403165.tcb.qcloud.la/HPB%20Wallet/share_bg.png?sign=680702f6194832baba7fba59b3ab335a&t=1583752936)'
                        }}>
                        <Image src={icon} />
                        <Text>分享 HPB Wallet 给好友</Text>
                        <Button>立即分享</Button>
                    </View>
                    <View className='item'>
                        <Image src={manage} />
                        <Text>管理钱包</Text>
                        <Image src={right} />
                    </View>
                    <View className='item'>
                        <Image src={tran_records} />
                        <Text>交易记录</Text>
                        <Image src={right} />
                    </View>
                    <View className='item'>
                        <Image src={addresses} />
                        <Text>地址薄</Text>
                        <Image src={right} />
                    </View>
                </View>

                <View className='system_wrap'>
                    <View className='item'>
                        <Image src={setting} />
                        <Text>系统设置</Text>
                        <Image src={right} />
                    </View>
                    <View className='item'>
                        <Image src={info} />
                        <Text>关于我们</Text>
                        <Image src={right} />
                    </View>
                    <View className='item'>
                        <Image src={help} />
                        <Text>帮助中心</Text>
                        <Image src={right} />
                    </View>
                </View>
            </View>
        )
    }
}
