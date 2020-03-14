import Taro, { Component } from '@tarojs/taro'
import { View, Text, Image, Swiper, SwiperItem } from '@tarojs/components'

import './index.less'

export default class Index extends Component {
    config = {
        navigationBarTitleText: 'NEWS'
    }

    constructor(props) {
        super(props)
        this.state = {
            news: []
        }
    }

    componentDidMount() {
        Taro.cloud
            .callFunction({
                name: 'findNews'
            })
            .then(res => {
                this.setState({ news: res.result })
            })
    }

    render() {
        return (
            <View className='container'>
                <Swiper autoplay indicatorDots indicatorColor='#000' indicatorActiveColor='#fff' interval={3000}>
                    {this.state.news.slice(1, 4).map(item => (
                        <SwiperItem key={item._id}>
                            <Image mode='scaleToFill' src={item.banner} />
                        </SwiperItem>
                    ))}
                </Swiper>
                <View className='news'>
                    {this.state.news.map(item => (
                        <View className='news_item' key={item._id}>
                            <View className='news_banner'>
                                <Image mode='aspectFill' src={item.banner} />
                            </View>
                            <View className='news_title'>
                                <Text className='title'>{item.title}</Text>
                                <Text className='time'>{item.created_at}</Text>
                            </View>
                        </View>
                    ))}
                </View>
            </View>
        )
    }
}
