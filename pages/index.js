import React from 'react';
import Head from 'next/head';
import Nav from '../components/nav';
import { Button, Container, Row, Col } from 'react-bootstrap';
import { H1, H2 } from '../components/Headers';
import { Input } from '../components/Inputs';
import { Logo } from '../components/Logo';
import AmazonBuckets from '../api';
import App from '../components/app';
import { PlateCard } from '../components/plateCard';
import moment from 'moment';

class Home extends React.Component {
  static async getInitialProps(initialProps) {
    this.amazonAPI = new AmazonBuckets();
    const response = await this.amazonAPI.listObjects();
    //const object = await this.amazonAPI.getSignedUrl();
    return { awsResponse: response.Contents };
  }
  constructor(props) {
    super(props);

    let cars = {};
    this.props.awsResponse.map(car => {
      const imgName = car.Key.split('.')[0];
      const imgArr = imgName.split('_');
      const plate = imgName.split('_')[0];
      const identifier = imgName.split('_')[1];

      if (cars[plate] === undefined) {
        cars[plate] = { plate, dateIn: car.LastModified };
      }
      if (imgArr.length === 3) {
        cars[plate].carimg = car.Key;
      } else {
        if (identifier === 'FACE') {
          cars[plate].faceimg = car.Key;
        } else {
          cars[plate].plateimg = car.Key;
        }
      }
    });

    this.state = {
      awsResponse: this.props.awsResponse,
      cars: Object.values(cars),
      carSearch: [],
    };
  }
  onSearchChange = evt => {
    let { cars } = this.state;
    cars = cars.filter(obj => {
      return obj.plate.toUpperCase().includes(evt.target.value.toUpperCase());
    });
    console.log('cars', cars);
    this.setState({ carSearch: cars });
  };
  render() {
    const { awsResponse, cars, carSearch } = this.state;
    let displayCars = cars;
    if (carSearch.length != 0) {
      displayCars = carSearch;
    }
    return (
      <App>
        <Head>
          <title>Home </title>
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <Container>
          <Row className="justify-content-md-center">
            <Logo src={'/static/img/accenture_logo.png'} />
          </Row>
          <H1>Smart Access</H1>
          <Row>
            <Col lg={12}>
              <H2>Search your plate number: </H2>
              <Input
                fontSize={'3rem'}
                rounded
                onChange={this.onSearchChange}
              ></Input>
            </Col>
            <Col lg={4}></Col>
          </Row>
          <br />
          <Row>
            {displayCars &&
              displayCars.map((car, index) => {
                return (
                  <Col lg={3} key={car.plate + index}>
                    <PlateCard
                      car={car}
                      number={car.plate}
                      date={moment(new Date(car.dateIn)).format('lll')}
                    ></PlateCard>
                  </Col>
                );
              })}
          </Row>
        </Container>
      </App>
    );
  }
}

export default Home;
