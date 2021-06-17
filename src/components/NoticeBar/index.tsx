import React from 'react'
import styled from 'styled-components'
import { SoundFilled } from '@ant-design/icons'
import { AutoRow, RowBetween } from '../Row/index'
import axios from 'axios'
import { message } from 'antd'
import { useTranslation } from 'react-i18next'
import moment from 'moment'

import Slider from 'react-slick'

import { KCC } from '../../constants'

import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import './index.less'
import { theme } from '../../constants/theme'
import { MobileView } from '../Common'
import { BrowserView } from '../Common/index'

export interface NoticeBarProps {}

const BG = require('../../assets/images/home/why-top-cover.png').default

const NoticeBarWrap = styled(AutoRow)`
  flex-flow: row nowrap;
  height: 44px;
  align-items: center;
  justify-content: center;
  position: relative;
  z-index: 2;
  @media (max-width: 768px) {
    height: 44px;
    margin: 0 24px;
    padding: 12px;
    width: calc(100% - 48px);
    transform: translateY(-50%);
    background: #242525;
  }
`

const NoticeBgWrap = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  background: rgba(255, 255, 255, 0.36);
  opacity: 0.08;
`

const Text = styled.div`
  padding: 0;
  font-family: URWDIN-Regular;
  font-size: 12px;
  color: #fff !important;
  margin-left: 8px;
  cursor: pointer;
  width: 750px;
  max-width: 750px;
  height: 20px;
  line-height: 20px;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  &:hover {
    text-decoration: underline;
  }
  @media (max-width: 768px) {
    height: 20px;
    flex: 1;
  }
`

const DateText = styled.div`
  font-family: URWDIN-Regular;
  font-size: 12px;
  color: #fff;
  height: 20px;
  line-height: 20px;
  margin-left: 8px;
  width: 120px;
  text-align: right;
`

interface Announcement {
  title: string
  pubDate: string
  link: string
  thumbnail?: string
}

/* export function formatDate(timestamp: number) {
  const now = new Date(timestamp)
  var year = now.getFullYear()
  var month = now.getMonth() + 1
  var date = now.getDate()
  var hour = now.getHours()
  var minute = now.getMinutes()
  var second = now.getSeconds()
  return year + '-' + month + '-' + date + ' ' + hour + ':' + minute + ':' + second
} */

const NoticeBar: React.FunctionComponent<NoticeBarProps> = () => {
  const { t, i18n } = useTranslation()

  const [announcementList, setAnnoucementList] = React.useState<Announcement[]>([
    {
      title: '...',
      pubDate: '',
      link: '',
    },
  ])

  const getAnnouncemet = async () => {
    try {
      const res = await axios({
        url: KCC.MEDIA_API,
      })
      const list = [...res?.data?.items]
      console.log(list)
      // filter by language
      let announcment: any[] = []
      if (i18n.language === 'zh-CN') {
        for (let i = 0; i < list.length; i++) {
          if (list[i].categories.includes('zh')) {
            const t = new Date(list[i]?.pubDate).getTime() + 1000 * 60 * 60 * 8
            const temp: any = { ...list[i] }
            temp.pubDate = t && moment(new Date(t)).format('YYYY-MM-DD HH:mm:ss')
            announcment.push(temp)
          }
        }
      } else {
        for (let i = 0; i < list.length; i++) {
          console.log(list[i].categories)
          if (!list[i].categories.includes('zh')) {
            announcment.push(list[i])
          }
        }
      }
      const arr = announcment.length > 3 ? announcment.splice(0, 3) : announcment
      console.log('arr', arr)
      setAnnoucementList(() => arr)
    } catch {
      message.error(t(`Get Announcement Faied.`))
    }
  }

  React.useEffect(() => {
    getAnnouncemet()
  }, [i18n.language])

  const nav2Announcement = (route: string) => {
    if (route) {
      window.open(route, '_blank')
    }
  }

  const List = React.useMemo(() => {
    return announcementList.map((item, index) => {
      return (
        <div key={index}>
          <RowBetween
            style={{
              width: '100%',
              marginTop: '10px',
              alignItems: 'cetner',
            }}
          >
            <Text onClick={nav2Announcement.bind(null, item.link)}>
              {item.title}
              <MobileView> {item.pubDate}</MobileView>
            </Text>
            <BrowserView>
              <DateText>{item.pubDate}</DateText>
            </BrowserView>
          </RowBetween>
        </div>
      )
    })
  }, [announcementList])

  const settings = {
    dots: false,
    infinite: true,
    slidesToShow: 1,
    pauseOnHover: true,
    autoplay: true,
    speed: 1000,
    slidesToScroll: 1,
    vertical: true,
    verticalSwiping: true,
  }

  return (
    <NoticeBarWrap>
      <NoticeBgWrap />
      <SoundFilled style={{ color: theme.colors.primary }} />
      <div style={{ maxWidth: '940px', height: '40px', overflow: 'hidden' }}>
        <Slider {...settings}>{List}</Slider>
      </div>
    </NoticeBarWrap>
  )
}

export default NoticeBar
