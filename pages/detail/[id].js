import styles from '../../app/page.module.css'
import { useRouter } from 'next/router'
import { Button, Card, Container, Row, Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useEffect } from 'react';
import NavbarComp from '@/app/component/navbar';
import Footer from '@/app/component/footer';

export default function Detail({ dataPost }) {
  const router = useRouter();
  useEffect(() => {
    AOS.init({
      delay: 150,
    });
  }, [])

  return (
    <main className={styles.main}>
      <NavbarComp />
      <Card style={{ minHeight: 500 }}>
        <Card.Header as="h5">
          <Container>
            <Row>
              <Col lg={10}> Post List</Col>
              <Col>
                <Button onClick={() => router.back()} varian='success'>{'Back>>'}</Button>
              </Col>
            </Row>
          </Container>
        </Card.Header>
        <Card.Body>
          {
            dataPost.filter(item => item.id == router.query.id).map((item, index) => {
              return (
                <div data-aos="fade-up" className='shadow mb-2 rounded p-3' style={index % 2 == 0 ? { cursor: 'pointer', backgroundColor: '#5A96E3' } : { cursor: 'pointer', backgroundColor: '#A0C49D' }}>
                  <h4>{item.title}</h4>
                  <hr />
                  <p>{item.body}</p>

                  <div>
                    <h4>Komentar : </h4>
                    {
                      item.komentar ?
                        item.komentar.map((kom, index) => {
                          return (
                            <div key={index} className='m-1 mb-2'>
                              <b>{kom.name}</b>
                              <p>{kom.body}</p>
                            </div>
                          )
                        }) :
                        <p style={{ color: 'red' }}>Tidak adakomentar!</p>
                    }
                  </div>
                </div>
              )
            })
          }
        </Card.Body>
      </Card>
      <Footer />
    </main>
  )
}
export const getServerSideProps = async () => {
  // Fetch data from external API
  const headers = {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    'Authorization': 'Bearer 68453512a5aaca213c265c86ab9c8fb50ce4eac23a2627a13c8ad30e065e51bd'
  };
  const res = await fetch('https://gorest.co.in/public/v2/posts', {
    method: 'GET',
    headers
  });

  const res2 = await fetch('https://gorest.co.in/public/v2/comments', {
    method: 'GET',
    headers
  });


  const dataPost = await res.json();
  const dataKom = await res2.json();
  // Pass dataPost to the page via props
  for (let i = 0; i < dataPost.length; i++) {
    for (let j = 0; j < dataKom.length; j++) {
      if (dataPost[i].id === dataKom[j].post_id) {
        if (dataPost[i]['komentar'] == undefined) {
          dataPost[i]['komentar'] = [dataKom[j]]
        } else {
          dataPost[i]['komentar'].push(dataKom[j])

        }

      }

    }
  }

  return {
    props: {
      dataPost
    }
  }
}