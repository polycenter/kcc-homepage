import styled from 'styled-components'
import Column from '../Column'

export interface ActivityCardProps {
  title: string
  deadLine: string
  route: string
}

const ActivityCardWrap = styled(Column)`
  width: 280px;
  height: 208px;
  background: rgba(151, 208, 195, 0.21);
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
  &:hover {
    background: rgba(0, 0, 0, 0.6);
    color: #fff;
  }
`

const ActivityCard: React.SFC<ActivityCardProps> = () => {
  return (
    <ActivityCardWrap>
      <Title>kkk</Title>
      <Button>立即参与</Button>
    </ActivityCardWrap>
  )
}

export default ActivityCard
