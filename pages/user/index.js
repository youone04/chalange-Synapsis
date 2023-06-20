import { Card, Button, Table, Container, Row, Col, Form } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import styles from '../../app/page.module.css'
import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/router'
import NavbarComp from '@/app/component/navbar';
import Footer from '@/app/component/footer';

export default function Home({ data }) {
  const router = useRouter()
  // initial state
  const [dataUser, setDatauser] = useState(data)
  const [textSearch, setTextSearch] = useState('');

  // for delete data user
  const actionDelete = async (id) => {
    try {
      const headers = {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer 68453512a5aaca213c265c86ab9c8fb50ce4eac23a2627a13c8ad30e065e51bd'
      };

      const confirm = window.confirm("Anda yakin akan menghapus item?")
      if (confirm) {
        const result = await fetch(`https://gorest.co.in/public/v2/users/${id}`, {
          method: 'DELETE',
          headers
        });

        if (result.status === 204) {
          const deletData = dataUser.filter(item => item.id != id);
          setDatauser(deletData);
          alert("Success Delete Data")
        }else{
          alert('Gagal Delete Data')
        };
      }
    } catch (e) {
      console.log(e)
      alert('Terjadi Kesalahan!')
    }
  }

  return (
    <main className={styles.main}>
      <NavbarComp />
      <Card style={{ minHeight: 500 }}>
        <Card.Header as="h5">Data User</Card.Header>
        <Container>
          <Row>
            <Col><Link href={'/user/add'}> <Button variant="primary m-2">Add User</Button></Link></Col>
            <Col>
              <Form.Group className="pt-2" controlId="search">
                <Form.Control onChange={e => setTextSearch(e.target.value)} type="text" placeholder="Search by email or name..." />
              </Form.Group></Col>
          </Row>
        </Container>
        <Card.Body>
          <div className="table-responsive">
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>No</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Gender</th>
                  <th>Status</th>
                  <th>Atcion</th>
                </tr>
              </thead>
              <tbody>
                {
                  textSearch === "" ?
                    dataUser?.map((item, index) => {
                      return (

                        <tr key={index}>
                          <td>{index + 1}</td>
                          <td>{item.name}</td>
                          <td style={{ width: 90 }}>{item.email}</td>
                          <td>{item.gender}</td>
                          <td>{item.status}</td>
                          <td>
                            <Button
                              onClick={() => {
                                router.push({
                                  pathname: `/user/update/${item.id}`
                                })
                              }}
                              className='sm m-1' variant="success">update</Button>
                            <Button onClick={() => actionDelete(item.id)} className='sm m-1' variant="danger">delete</Button></td>
                        </tr>

                      )
                    }) :
                    <>{
                      dataUser?.filter(data =>
                        data.name.toLowerCase().includes(textSearch.toLowerCase()) ||
                        data.email.toLowerCase().includes(textSearch.toLowerCase())
                      ).map((item, index) => {
                        return (

                          <tr key={index}>
                            <td>{index + 1}</td>
                            <td>{item.name}</td>
                            <td style={{ width: 90 }}>{item.email}</td>
                            <td>{item.gender}</td>
                            <td>{item.status}</td>
                            <td>
                              <Button
                                onClick={() => {
                                  router.push({
                                    pathname: `/user/update/${item.id}`
                                  })
                                }}
                                className='sm m-1' variant="success">update</Button>
                              <Button onClick={() => actionDelete(item.id)} className='sm m-1' variant="danger">delete</Button></td>
                          </tr>

                        )
                      })
                    }
                    </>
                }
              </tbody>
            </Table>
          </div>
        </Card.Body>
      </Card>
      <Footer />
    </main>
  )
}


export const getServerSideProps = async () => {
  const headers = {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    'Authorization': 'Bearer 68453512a5aaca213c265c86ab9c8fb50ce4eac23a2627a13c8ad30e065e51bd'
  };
  const res = await fetch('https://gorest.co.in/public/v2/users', {
    method: 'GET',
    headers
  });
  const data = await res.json();
  // Pass data to the page via props
  return {
    props: {
      data
    }
  }
}
