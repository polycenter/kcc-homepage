import styled from 'styled-components'
import Column from '../Column'
import { HomePageWrap } from '../../pages/home/index'
import { useTranslation } from 'react-i18next'

export interface ActivityCardProps {
  id: number
  title: string
  deadline: string
  thumbnail?: string
  content?: string
  valid?: boolean
}

const ActivityCardWrap = styled(Column)`
  width: 280px;
  height: 208px;
  background: rgba(151, 208, 195, 0.21);
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  align-items: center;
`
const Title = styled.div`
  font-size: 20px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #ffffff;
`
export const Button = styled.div`
  width: 88px;
  height: 32px;
  background: #49ffa1;
  border-radius: 4px;
  color: #000;
  text-align: center;
  line-height: 32px;
  margin-top: 56px;
  cursor: pointer;
  &:hover {
    background: rgba(0, 0, 0, 0.6);
    color: #fff;
  }
`
const InvalidButton = styled(Button)`
  background: rgba(0, 0, 0, 0.6);
  color: #fff;
  &:hover {
    background: #49ffa1;
    color: #000;
  }
`

const ActivityCard: React.FunctionComponent<ActivityCardProps> = (props) => {
  const { t } = useTranslation()
  return (
    <ActivityCardWrap>
      <Title>{props.title}</Title>
      {props.valid ? <Button>{t('Participate Now')}</Button> : <InvalidButton>{t(`View Event`)}</InvalidButton>}
    </ActivityCardWrap>
  )
}

export default ActivityCard
