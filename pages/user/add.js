import { Form, Card, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import styles from '../../app/page.module.css'
import { useRouter } from 'next/router'
import { useState } from 'react';
import NavbarComp from '@/app/component/navbar';
import Footer from '@/app/component/footer';

export default function AddUser() {
  const router = useRouter()
  // intial state
  const [form, setForm] = useState(({
    name: '',
    email: '',
    gender: '',
    status: ''

  }))

  // acttion submit data
  const actionSubmitAddUser = async () => {
    try {

      const headers = {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer 68453512a5aaca213c265c86ab9c8fb50ce4eac23a2627a13c8ad30e065e51bd'
      };

      const result = await fetch('https://gorest.co.in/public/v2/users', {
        method: 'POST',
        headers,
        body: JSON.stringify(form)
      });

      const res = await result.json();
      if (result.status === 201) {
        alert("Success Add Data");
        setForm({
          name: '',
          email: '',
          gender: '',
          status: ''
        })
      } else {
        alert(`Failed, ${res[0].field} ${res[0].message}`);
      }

    } catch (e) {
      alert('kesalahan')
    }
  }

  return (
    <main className={styles.main}>
      <NavbarComp />
      <Card style={{ minHeight: 500 }}>
        <Card.Header as="h5">Add User</Card.Header>
        <Card.Body>
          <Form>
            <Form.Group className="mb-3" controlId="name">
              <Form.Label>Name</Form.Label>
              <Form.Control
                onChange={(e) => setForm({
                  ...form,
                  name: e.target.value
                })}
                value={form.name}
                name='name'
                type="text"
                placeholder="Yudi Gunawan" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="email">
              <Form.Label>Email</Form.Label>
              <Form.Control onChange={(e) => setForm({
                ...form,
                email: e.target.value
              })} name="email" type="email" placeholder="yudi.gunawan@gmail.com" value={form.email} />
            </Form.Group>
            <Form.Group className="mb-3" controlId="gender">
              <Form.Label>Gender</Form.Label>
              <Form.Select
                value={form.gender}
                onChange={(e) => setForm({
                  ...form,
                  gender: e.target.value
                })}
                name='gender' aria-label="Default select example">
                <option>Open this select menu</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
              </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3" controlId="status">
              <Form.Label>Gender</Form.Label>
              <Form.Select
                onChange={(e) => setForm({
                  ...form,
                  status: e.target.value
                })}
                value={form.status}
                name='status' aria-label="Default select example">
                <option>Open this select menu</option>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </Form.Select>
            </Form.Group>
          </Form>
          <Button onClick={() => actionSubmitAddUser()} variant="primary m-2">Save</Button>
          <Button onClick={() => router.push('/user')} variant="danger">Back</Button>
        </Card.Body>
      </Card>
      <Footer />
    </main>
  );
}
