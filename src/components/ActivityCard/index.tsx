import styled from 'styled-components'
import Column from '../Column'
import { useTranslation } from 'react-i18next'

export interface ActivityCardProps {
  id: number
  title: string
  deadline: string
  thumbnail?: string
  content?: string
  valid?: boolean
}

const Title = styled.div`
  font-size: 20px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #ffffff;
`
export const Button = styled.div`
  transition: all 0.3s ease-in-out;
  opacity: 0;
  width: auto;
  height: 32px;
  background: #49ffa1;
  border-radius: 4px;
  padding: 0 10px;
  color: #000;
  text-align: center;
  line-height: 32px;
  margin-top: 56px;
  cursor: pointer;
  @media (max-width: 1200px) {
    opacity: 1;
  }
`
const InvalidButton = styled(Button)`
  background: rgba(0, 0, 0, 0.6);
  color: #fff;
`

const ActivityCardWrap = styled(Column)`
  width: 280px;
  height: 208px;
  background: rgba(151, 208, 195, 0.21);
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  align-items: center;
  transition: all 0.3s ease-in-out;
  &:hover ${Button} {
    opacity: 1;
  }
`

const ActivityCard: React.FunctionComponent<ActivityCardProps> = (props) => {
  const { t } = useTranslation()
  return (
    <ActivityCardWrap>
      <Title>{props.title}</Title>
      {props.valid ? <Button>{t('Participate now')}</Button> : <InvalidButton>{t(`View Event`)}</InvalidButton>}
    </ActivityCardWrap>
  )
}

export default ActivityCard
