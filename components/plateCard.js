import styled from 'styled-components';
import { Card as BS4Card, Row, Col } from 'react-bootstrap';
export const Card = styled(BS4Card)`
  .card-img-top {
    height: 160px;
    background-image: url(${props => props.mainImg});
    background-repeat: no-repeat;
    background-position: center center;
    background-size: cover;
  }
  img:hover {
    background-image: url(${props => props.secondImg});
  }
`;
export const CardPersonImage = styled.div`
  height: 95px;
  width: 95px;
  background-image: url(${props => props.mainImg});
  background-repeat: no-repeat;
  background-position: center center;
  background-size: cover;
  position: absolute;
  top: 113px;
  left: 5px;
  border-bottom-left-radius: 12px;
  border-bottom-right-radius: 12px;
  border-top-left-radius: 12px;
  border-top-right-radius: 12px;
`;
export const PlateCard = props => {
  const { car, number, date } = props;
  return (
    <Card
      style={{ width: '16.4rem', marginBottom: '10px' }}
      mainImg={'/image/' + car.carimg}
    >
      {car && car.carimg && <Card.Img variant="top" />}
      <Card.Body>
        <Card.Title>
          <Row>
            <Col># {number && number}</Col>
          </Row>
        </Card.Title>
        <Card.Text>Date: {date && date}</Card.Text>
      </Card.Body>
    </Card>
  );
};
