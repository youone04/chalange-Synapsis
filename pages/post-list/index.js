import 'bootstrap/dist/css/bootstrap.min.css';
import styles from '../../app/page.module.css'
import { Button, Card, Container, Row, Col } from 'react-bootstrap';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router'
import NavbarComp from '@/app/component/navbar';
import Footer from '@/app/component/footer';
import ReactPaginate from 'react-paginate';

export default function PostList({ data }) {

    // initial state pagination
    const [offset, setOffset] = useState(0)
    const [dataPagination, setData] = useState([])
    const [perPage] = useState(5)
    const [pageCount, setPageCount] = useState(0)

    const router = useRouter();
    useEffect(() => {
        AOS.init({
            delay: 150,
        });
    }, [])

    //pagination function
    const pagination = async () => {

        const slices = data.slice(offset * perPage, offset * perPage + perPage)
        let i = offset * perPage + 1;
        const dataHasilPagination = slices.map((item, index) => (
            <div key={index} onClick={() => {
                router.push({
                    pathname: `/detail/${item.id}`
                })
            }} data-aos="fade-up" className='shadow mb-2 rounded p-3' style={index % 2 == 0 ? { cursor: 'pointer', backgroundColor: '#5A96E3' } : { cursor: 'pointer', backgroundColor: '#A0C49D' }}>
                <h4>{item.title}</h4>
                <hr />
                <p>{item.body}</p>
                <hr/>
                <b className='text-white'>Klik For Detail</b>
            </div>

        ))
        setData(dataHasilPagination)
        setPageCount(Math.ceil(data.length / perPage))
    }
    useEffect(() => {
        pagination()
    }, [offset]);

    const handlePageClick = (e) => {
        const selectedPage = e.selected;
        setOffset(selectedPage)
    };


    return (
        <main className={styles.main}>
            <NavbarComp />
            <Card style={{ minHeight: '85vh' }}>
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
                        dataPagination
                    }
                </Card.Body>
            </Card>
            <ReactPaginate
                previousLabel={"prev"}
                previousClassName={"page-item"}
                previousLinkClassName={"page-link"}
                nextLabel={"next"}
                nextClassName={"page-item"}
                nextLinkClassName={"page-link"}
                breakLabel={"..."}
                breakClassName={"break-me page-item"}
                breakLinkClassName={"page-link"}
                pageCount={pageCount}
                marginPagesDisplayed={2}
                pageRangeDisplayed={5}
                onPageChange={handlePageClick}
                containerClassName={"pagination"}
                subContainerClassName={"pages pagination"}
                pageClassName={"page-item"}
                pageLinkClassName={"page-link"}
                activeClassName={"active"} />
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