import 'bootstrap/dist/css/bootstrap.min.css';
import styles from '../../app/page.module.css'
import { Card } from 'react-bootstrap';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useEffect } from 'react';
import { useRouter } from 'next/router'
import NavbarComp from '@/app/component/navbar';
import Footer from '@/app/component/footer';

export default function PostList({ data }) {
    const router = useRouter();
    useEffect(() => {
        AOS.init({
            delay: 150,
        });
    }, [])
    return (
        <main className={styles.main}>
            <NavbarComp />
            <Card>
                <Card.Header as="h5">Post List</Card.Header>
                <Card.Body>
                    {
                        data.map((item, index) => {
                            return (
                                <div key={index} onClick={() => {
                                    router.push({
                                        pathname: `/detail/${item.id}`
                                    })
                                }} data-aos="fade-up" className='shadow mb-2 rounded p-3' style={index % 2 == 0 ? { cursor: 'pointer', backgroundColor: '#5A96E3' } : { cursor: 'pointer', backgroundColor: '#A0C49D' }}>
                                    <h4>{item.title}</h4>
                                    <hr />
                                    <p>{item.body}</p>
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
    const data = await res.json();
    // Pass data to the page via props
    return {
        props: {
            data
        }
    }
}